import { stripe } from '@/config/stripe';
import {
  BillingDayPreview,
  BillingDayPreviewDTO,
  CreateCustomerDTO,
  CreateSubscriptionDTO,
  CreateSubscriptionFromSetupDTO,
  SubscriptionResponse,
} from '@/types/subscription.types';

export class SubscriptionService {
  // ─────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────

  /** * Calcula o billing_cycle_anchor para um dia específico do mês. * Sempre retorna uma data futura. * Limita o dia ao máximo de 28 para evitar problemas com fevereiro. */
  private calculateBillingAnchor(billingDay: number): number {
    const safeBillingDay = Math.min(Math.max(1, billingDay), 28);
    const now = new Date();

    const targetDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      safeBillingDay,
      0,
      0,
      0,
      0
    );

    // Se o dia já passou neste mês, avançar para o próximo mês
    if (targetDate <= now) {
      targetDate.setMonth(targetDate.getMonth() + 1);
    }

    return Math.floor(targetDate.getTime() / 1000);
  }

  /** * Calcula quantos dias faltam para uma data Unix timestamp */
  private daysUntil(unixTimestamp: number): number {
    const now = Date.now();
    const target = unixTimestamp * 1000;
    return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  }

  /** * Busca ou cria um cliente no Stripe pelo email */
  private async findOrCreateCustomer(email: string, paymentMethodId?: string) {
    const customers = await stripe.customers.list({ email, limit: 1 });

    if (customers.data.length > 0) {
      const customer = customers.data[0];

      if (paymentMethodId) {
        await stripe.paymentMethods.attach(paymentMethodId, {
          customer: customer.id,
        });
        await stripe.customers.update(customer.id, {
          invoice_settings: { default_payment_method: paymentMethodId },
        });
      }

      return customer;
    }

    return stripe.customers.create({
      email,
      ...(paymentMethodId && {
        payment_method: paymentMethodId,
        invoice_settings: { default_payment_method: paymentMethodId },
      }),
    });
  }

  /** * Extrai clientSecret da subscription expandida */
  private extractClientSecret(subscription: any): string {
    const invoice = subscription.latest_invoice;
    const paymentIntent = invoice?.payment_intent;

    if (paymentIntent?.client_secret) {
      return paymentIntent.client_secret;
    }

    // Subscription com trial ou billing_cycle_anchor pode não ter payment_intent imediato
    return '';
  }

  // ─────────────────────────────────────────────
  // CUSTOMER
  // ─────────────────────────────────────────────

  async createCustomer(data: CreateCustomerDTO) {
    try {
      return await stripe.customers.create({
        email: data.email,
        name: data.name,
        phone: data.phone,
      });
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      throw error;
    }
  }

  // ─────────────────────────────────────────────
  // PAYMENT METHOD
  // ─────────────────────────────────────────────

  async createTestPaymentMethod(req: Request, res: Response) {
    return stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: '4242424242424242',
        exp_month: 12,
        exp_year: 2025,
        cvc: '123',
      },
    });
  }

  // ─────────────────────────────────────────────
  // SETUP INTENT
  // ─────────────────────────────────────────────

  async createSetupIntent(email: string) {
    const customer = await this.findOrCreateCustomer(email);

    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      payment_method_types: ['card'],
    });

    return { setupIntent, customer };
  }

  async confirmSetupIntentTest(setupIntentId: string) {
    try {
      const cleanId = setupIntentId.split('_secret_')[0];

      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: { token: 'tok_visa' },
      });

      const setupIntent = await stripe.setupIntents.confirm(cleanId, {
        payment_method: paymentMethod.id,
      });

      return setupIntent;
    } catch (error: any) {
      console.error('Erro ao confirmar setup intent:', error.message);
      throw error;
    }
  }

  // ─────────────────────────────────────────────
  // SUBSCRIPTION
  // ─────────────────────────────────────────────

  async createSubscription(data: CreateSubscriptionDTO): Promise<SubscriptionResponse> {
    try {
      const customer = await this.findOrCreateCustomer(data.email, data.paymentMethodId);

      const subscriptionData: Parameters<typeof stripe.subscriptions.create>[0] = {
        customer: customer.id,
        items: [{ price: data.priceId }],
        default_payment_method: data.paymentMethodId,
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      };

      if (data.billingDay) {
        subscriptionData.billing_cycle_anchor = this.calculateBillingAnchor(data.billingDay);
        subscriptionData.proration_behavior = 'none';
      }

      if (data.couponCode) {
        (subscriptionData as any).coupon = data.couponCode;
      }

      const subscription = await stripe.subscriptions.create(subscriptionData);

      return {
        subscriptionId: subscription.id,
        clientSecret: this.extractClientSecret(subscription),
        status: subscription.status,
      };
    } catch (error) {
      console.error('Erro ao criar assinatura:', error);
      throw error;
    }
  }

  async createSubscriptionFromSetup(
    data: CreateSubscriptionFromSetupDTO
  ): Promise<SubscriptionResponse> {
    // Anexar payment method ao cliente
    await stripe.paymentMethods.attach(data.paymentMethodId, {
      customer: data.customerId,
    });

    await stripe.customers.update(data.customerId, {
      invoice_settings: { default_payment_method: data.paymentMethodId },
    });

    const subscriptionData: Parameters<typeof stripe.subscriptions.create>[0] = {
      customer: data.customerId,
      items: [{ price: data.priceId }],
      default_payment_method: data.paymentMethodId,
      expand: ['latest_invoice.payment_intent'],
    };

    // ✅ Aplicar billing_cycle_anchor se billingDay fornecido
    if (data.billingDay) {
      subscriptionData.billing_cycle_anchor = this.calculateBillingAnchor(data.billingDay);
      subscriptionData.proration_behavior = 'none';
    }

    if (data.couponCode) {
      (subscriptionData as any).coupon = data.couponCode;
    }

    const subscription = await stripe.subscriptions.create(subscriptionData);

    return {
      subscriptionId: subscription.id,
      clientSecret: this.extractClientSecret(subscription),
      status: subscription.status,
    };
  }

  async cancelSubscription(subscriptionId: string) {
    try {
      return await stripe.subscriptions.cancel(subscriptionId);
    } catch (error) {
      console.error('Erro ao cancelar assinatura:', error);
      throw error;
    }
  }

  async getCustomerSubscriptions(email: string) {
    try {
      const customers = await stripe.customers.list({ email, limit: 1 });

      if (customers.data.length === 0) return [];

      const subscriptions = await stripe.subscriptions.list({
        customer: customers.data[0].id,
        status: 'all',
        expand: ['data.default_payment_method'],
      });

      return subscriptions.data;
    } catch (error) {
      console.error('Erro ao buscar assinaturas:', error);
      throw error;
    }
  }

  // ─────────────────────────────────────────────
  // BILLING DAY
  // ─────────────────────────────────────────────

  /** * Retorna preview de quando será a próxima cobrança para um determinado dia */
  async previewBillingDay(data: BillingDayPreviewDTO): Promise<BillingDayPreview> {
    const safeBillingDay = Math.min(Math.max(1, data.billingDay), 28);
    const anchorTimestamp = this.calculateBillingAnchor(safeBillingDay);
    const daysUntilBilling = this.daysUntil(anchorTimestamp);

    // Buscar preço para obter a moeda
    const price = await (stripe as any).prices.retrieve(data.priceId);
    const currency = price.currency;
    const unitAmount = price.unit_amount ?? 0;

    // Calcular valor proporcional dos dias até a próxima cobrança
    // (apenas informativo, pois usamos proration_behavior: 'none')
    const daysInMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate();

    const prorationAmount = Math.round((unitAmount / daysInMonth) * daysUntilBilling);

    const nextBillingDate = new Date(anchorTimestamp * 1000).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    return {
      billingDay: safeBillingDay,
      nextBillingDate,
      daysUntilBilling,
      prorationAmount,
      currency,
    };
  }

  /** * Atualiza o dia de cobrança de uma assinatura existente */
  async updateBillingDay(subscriptionId: string, billingDay: number) {
    try {
      const anchorTimestamp = this.calculateBillingAnchor(billingDay);

      const subscription = await stripe.subscriptions.update(subscriptionId, {
        billing_cycle_anchor: anchorTimestamp,
        proration_behavior: 'none',
      } as any);

      return subscription;
    } catch (error) {
      console.error('Erro ao atualizar dia de cobrança:', error);
      throw error;
    }
  }

  // ─────────────────────────────────────────────
  // PAYMENT
  // ─────────────────────────────────────────────

  async updatePaymentMethod(subscriptionId: string, paymentMethodId: string) {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: subscription.customer as string,
      });

      await stripe.customers.update(subscription.customer as string, {
        invoice_settings: { default_payment_method: paymentMethodId },
      });

      return await stripe.subscriptions.update(subscriptionId, {
        default_payment_method: paymentMethodId,
      });
    } catch (error) {
      console.error('Erro ao atualizar método de pagamento:', error);
      throw error;
    }
  }

  async retryPayment(subscriptionId: string) {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
        expand: ['latest_invoice'],
      });

      const invoice = subscription.latest_invoice as any;

      if (!invoice) throw new Error('Nenhuma fatura encontrada');

      const paidInvoice = await stripe.invoices.pay(invoice.id);

      return { status: paidInvoice.status, paid: paidInvoice.paid };
    } catch (error: any) {
      console.error('Erro ao tentar cobrar:', error);
      throw new Error(error.message || 'Falha ao processar pagamento');
    }
  }

  async reactivateSubscription(data: { customerId: string; priceId: string; paymentMethodId?: string; billingDay?: number; }) {
    try {
      if (data.paymentMethodId) {
        await stripe.paymentMethods.attach(data.paymentMethodId, {
          customer: data.customerId,
        });
        await stripe.customers.update(data.customerId, {
          invoice_settings: { default_payment_method: data.paymentMethodId },
        });
      }

      const subscriptionData: Parameters<typeof stripe.subscriptions.create>[0] = {
        customer: data.customerId,
        items: [{ price: data.priceId }],
        default_payment_method: data.paymentMethodId,
        expand: ['latest_invoice.payment_intent'],
      };

      if (data.billingDay) {
        subscriptionData.billing_cycle_anchor = this.calculateBillingAnchor(data.billingDay);
        subscriptionData.proration_behavior = 'none';
      }

      const subscription = await stripe.subscriptions.create(subscriptionData);

      return {
        subscriptionId: subscription.id,
        status: subscription.status,
        message: '✅ Assinatura reativada com sucesso!',
      };
    } catch (error) {
      console.error('Erro ao reativar assinatura:', error);
      throw error;
    }
  }
}