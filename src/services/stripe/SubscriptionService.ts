import Stripe from 'stripe';
import { getStripe, getStripeTest } from '@/config/stripe';
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

  private calculateBillingAnchor(billingDay: number): number {
    const safeBillingDay = Math.min(Math.max(1, billingDay), 28);
    const now = new Date();

    const targetDate = new Date(now.getFullYear(), now.getMonth(), safeBillingDay, 0, 0, 0, 0);

    if (targetDate <= now) {
      targetDate.setMonth(targetDate.getMonth() + 1);
    }

    return Math.floor(targetDate.getTime() / 1000);
  }

  private daysUntil(unixTimestamp: number): number {
    const now = Date.now();
    const target = unixTimestamp * 1000;
    return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  }

  /**
   * Single entry point for a Stripe client.
   * Calls the lazy getters in config/stripe.ts, which create the
   * Stripe instance (via makeStripe) on first use — never at import time.
   */
  private getStripe(isTest: boolean = false): Stripe {
    return isTest ? getStripeTest() : getStripe();
  }

  private async findOrCreateCustomer(
    email: string,
    paymentMethodId?: string,
    isTest: boolean = false
  ) {
    const stripeInstance = this.getStripe(isTest);

    const customers = await stripeInstance.customers.list({ email, limit: 1 });

    if (customers.data.length > 0) {
      const customer = customers.data[0];
      if (paymentMethodId) {
        await stripeInstance.paymentMethods.attach(paymentMethodId, {
          customer: customer.id,
        });
        await stripeInstance.customers.update(customer.id, {
          invoice_settings: { default_payment_method: paymentMethodId },
        });
      }
      return customer;
    }

    return stripeInstance.customers.create({
      email,
      ...(paymentMethodId && {
        payment_method: paymentMethodId,
        invoice_settings: { default_payment_method: paymentMethodId },
      }),
    });
  }

  private extractClientSecret(subscription: any): string {
    const invoice = subscription.latest_invoice;
    const paymentIntent = invoice?.payment_intent;

    if (paymentIntent?.client_secret) {
      return paymentIntent.client_secret;
    }

    return '';
  }

  // ─────────────────────────────────────────────
  // CUSTOMER
  // ─────────────────────────────────────────────

  async createCustomer(data: CreateCustomerDTO) {
    try {
      return await this.getStripe().customers.create({
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

  async createTestPaymentMethod() {
    return this.getStripe(true).paymentMethods.create({
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

  async createSetupIntent(email: string, isTest: boolean = false) {
    const stripeInstance = this.getStripe(isTest);

    console.log(
      `[SetupIntent] Criando para ${email}, isTest=${isTest}, key_prefix=${isTest ? process.env.STRIPE_SECRET_KEY_TEST?.substring(0, 12) : process.env.STRIPE_SECRET_KEY?.substring(0, 12)}`
    );

    const customer = await this.findOrCreateCustomer(email, undefined, isTest);

    const setupIntent = await stripeInstance.setupIntents.create({
      customer: customer.id,
      payment_method_types: ['card'],
    });

    console.log(`[SetupIntent] Criado: ${setupIntent.id}, customer: ${customer.id}`);

    return { setupIntent, customer };
  }

  async confirmSetupIntentTest(setupIntentId: string) {
    try {
      const stripeInstance = this.getStripe(true);
      const cleanId = setupIntentId.split('_secret_')[0];

      const paymentMethod = await stripeInstance.paymentMethods.create({
        type: 'card',
        card: { token: 'tok_visa' },
      });

      const setupIntent = await stripeInstance.setupIntents.confirm(cleanId, {
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
      const stripeInstance = this.getStripe();
      const customer = await this.findOrCreateCustomer(data.email, data.paymentMethodId);

      const subscriptionData: Parameters<Stripe['subscriptions']['create']>[0] = {
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

      const subscription = await stripeInstance.subscriptions.create(subscriptionData);

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
    data: CreateSubscriptionFromSetupDTO & { isTest?: boolean }
  ): Promise<SubscriptionResponse> {
    const stripeInstance = this.getStripe(data.isTest);

    await stripeInstance.paymentMethods.attach(data.paymentMethodId, {
      customer: data.customerId,
    });

    await stripeInstance.customers.update(data.customerId, {
      invoice_settings: { default_payment_method: data.paymentMethodId },
    });

    const subscriptionData: Parameters<Stripe['subscriptions']['create']>[0] = {
      customer: data.customerId,
      items: [{ price: data.priceId }],
      default_payment_method: data.paymentMethodId,
      expand: ['latest_invoice.payment_intent'],
    };

    if (data.billingDay) {
      subscriptionData.billing_cycle_anchor = this.calculateBillingAnchor(data.billingDay);
      subscriptionData.proration_behavior = 'none';
    }

    const subscription = await stripeInstance.subscriptions.create(subscriptionData);

    return {
      subscriptionId: subscription.id,
      clientSecret: this.extractClientSecret(subscription),
      status: subscription.status,
    };
  }

  async cancelSubscription(subscriptionId: string, isTest: boolean = false) {
    try {
      return this.getStripe(isTest).subscriptions.cancel(subscriptionId);
    } catch (error) {
      console.error('Erro ao cancelar assinatura:', error);
      throw error;
    }
  }

  async getCustomerSubscriptions(email: string, isTest: boolean = false) {
    try {
      const stripeInstance = this.getStripe(isTest);

      const customers = await stripeInstance.customers.list({ email, limit: 1 });
      if (customers.data.length === 0) return [];

      const subscriptions = await stripeInstance.subscriptions.list({
        customer: customers.data[0].id,
        status: 'all',
        expand: ['data.default_payment_method'],
      });

      return subscriptions.data;
    } catch (e) {
      console.error('Erro ao buscar assinaturas:', e);
      throw e;
    }
  }

  // ─────────────────────────────────────────────
  // BILLING DAY
  // ─────────────────────────────────────────────

  async previewBillingDay(data: BillingDayPreviewDTO): Promise<BillingDayPreview> {
    const safeBillingDay = Math.min(Math.max(1, data.billingDay), 28);
    const anchorTimestamp = this.calculateBillingAnchor(safeBillingDay);
    const daysUntilBilling = this.daysUntil(anchorTimestamp);

    const price = await (this.getStripe() as any).prices.retrieve(data.priceId);
    const currency = price.currency;
    const unitAmount = price.unit_amount ?? 0;

    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

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

  async updateBillingDay(subscriptionId: string, billingDay: number) {
    try {
      const anchorTimestamp = this.calculateBillingAnchor(billingDay);

      const subscription = await this.getStripe().subscriptions.update(subscriptionId, {
        trial_end: anchorTimestamp,
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

  async updatePaymentMethod(
    subscriptionId: string,
    paymentMethodId: string,
    isTest: boolean = false
  ) {
    try {
      const stripeInstance = this.getStripe(isTest);

      const subscription = await stripeInstance.subscriptions.retrieve(subscriptionId);

      await stripeInstance.paymentMethods.attach(paymentMethodId, {
        customer: subscription.customer as string,
      });

      await stripeInstance.customers.update(subscription.customer as string, {
        invoice_settings: { default_payment_method: paymentMethodId },
      });

      return stripeInstance.subscriptions.update(subscriptionId, {
        default_payment_method: paymentMethodId,
      });
    } catch (error) {
      console.error('Erro ao atualizar método de pagamento:', error);
      throw error;
    }
  }

  async retryPayment(subscriptionId: string, isTest: boolean = false) {
    try {
      const stripeInstance = this.getStripe(isTest);

      const subscription = await stripeInstance.subscriptions.retrieve(subscriptionId, {
        expand: ['latest_invoice'],
      });

      const invoice = subscription.latest_invoice as any;
      if (!invoice) throw new Error('Nenhuma fatura encontrada');

      const paidInvoice = await stripeInstance.invoices.pay(invoice.id);
      return { status: paidInvoice.status, paid: paidInvoice.paid };
    } catch (error: any) {
      console.error('Erro ao tentar cobrar:', error);
      throw new Error(error.message || 'Falha ao processar pagamento');
    }
  }

  async reactivateSubscription(data: {
    customerId: string;
    priceId: string;
    paymentMethodId?: string;
    billingDay?: number;
    isTest?: boolean;
  }) {
    try {
      const stripeInstance = this.getStripe(data.isTest);

      if (data.paymentMethodId) {
        await stripeInstance.paymentMethods.attach(data.paymentMethodId, {
          customer: data.customerId,
        });
        await stripeInstance.customers.update(data.customerId, {
          invoice_settings: { default_payment_method: data.paymentMethodId },
        });
      }

      const subscriptionData: Parameters<Stripe['subscriptions']['create']>[0] = {
        customer: data.customerId,
        items: [{ price: data.priceId }],
        default_payment_method: data.paymentMethodId,
        expand: ['latest_invoice.payment_intent'],
      };

      if (data.billingDay) {
        subscriptionData.billing_cycle_anchor = this.calculateBillingAnchor(data.billingDay);
        subscriptionData.proration_behavior = 'none';
      }

      const subscription = await stripeInstance.subscriptions.create(subscriptionData);

      return {
        subscriptionId: subscription.id,
        status: subscription.status,
        message: 'Assinatura reativada com sucesso!',
      };
    } catch (error: any) {
      console.error('Erro ao reativar assinatura:', error);
      throw new Error(error.message || 'Falha ao reativar assinatura');
    }
  }
}
