import { stripe } from '@/config/stripe';
import {
  CreateCustomerDTO,
  CreateSubscriptionDTO,
  SubscriptionResponse,
} from '@/types/subscription.types';

export class SubscriptionService {
  // Criar cliente no Stripe
  async createCustomer(data: CreateCustomerDTO) {
    try {
      const customer = await stripe.customers.create({
        email: data.email,
        name: data.name,
        phone: data.phone,
      });

      return customer;
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      throw error;
    }
  }

  async createTestPaymentMethod(req: Request, res: Response) {
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: '4242424242424242', // Cartão de teste do Stripe
        exp_month: 12,
        exp_year: 2025,
        cvc: '123',
      },
    });

    return paymentMethod;
  }

  // Criar assinatura
  async createSubscription(data: CreateSubscriptionDTO): Promise<SubscriptionResponse> {
    try {
      // 1. Buscar cliente existente
      const customers = await stripe.customers.list({
        email: data.email,
        limit: 1,
      });

      let customer;

      if (customers.data.length > 0) {
        // Cliente já existe
        customer = customers.data[0];
      } else {
        // Criar novo cliente SEM anexar o payment method ainda
        customer = await stripe.customers.create({
          email: data.email,
        });
      }

      // 2. Anexar método de pagamento ao cliente
      await stripe.paymentMethods.attach(data.paymentMethodId, {
        customer: customer.id,
      });

      // 3. Definir como método padrão
      await stripe.customers.update(customer.id, {
        invoice_settings: {
          default_payment_method: data.paymentMethodId,
        },
      });

      // 4. Criar assinatura
      const subscriptionData: Parameters<typeof stripe.subscriptions.create>[0] = {
        customer: customer.id,
        items: [{ price: data.priceId }],
        default_payment_method: data.paymentMethodId, // ✅ Adicione esta linha
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      };

      // Adicionar cupom se fornecido
      if (data.couponCode) {
        (subscriptionData as any).coupon = data.couponCode;
      }

      const subscription = await stripe.subscriptions.create(subscriptionData);

      // 5. Extrair client_secret
      const latestInvoice = subscription.latest_invoice;

      let clientSecret = '';
      let status = subscription.status;

      if (latestInvoice && typeof latestInvoice === 'object') {
        const paymentIntent = latestInvoice.payment_intent;

        if (paymentIntent && typeof paymentIntent === 'object') {
          clientSecret = paymentIntent.client_secret || '';
          status = paymentIntent.status || subscription.status;
        }
      }

      if (!clientSecret && subscription.status === 'active') {
        return {
          subscriptionId: subscription.id,
          clientSecret: '',
          status: 'active',
          // message: '✅ Assinatura criada e ativa!',
        };
      }

      return {
        subscriptionId: subscription.id,
        clientSecret: clientSecret,
        status: status,
      };
    } catch (error: any) {
      console.error('❌ Erro ao criar assinatura:', error);
      throw new Error(error.message || 'Erro ao criar assinatura');
    }
  }

  // Cancelar assinatura
  async cancelSubscription(subscriptionId: string) {
    try {
      const subscription = await stripe.subscriptions.cancel(subscriptionId);
      return subscription;
    } catch (error) {
      console.error('Erro ao cancelar assinatura:', error);
      throw error;
    }
  }

  // Listar assinaturas de um cliente
  async getCustomerSubscriptions(email: string) {
    try {
      const customers = await stripe.customers.list({
        email: email,
        limit: 1,
      });

      if (customers.data.length === 0) {
        return [];
      }

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

  // Atualizar método de pagamento
  async updatePaymentMethod(subscriptionId: string, paymentMethodId: string) {
    try {
      const subscription = await stripe.subscriptions.update(subscriptionId, {
        default_payment_method: paymentMethodId,
      });

      return subscription;
    } catch (error) {
      console.error('Erro ao atualizar método de pagamento:', error);
      throw error;
    }
  }

  async createSetupIntent(email: string) {
    // Buscar ou criar cliente
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    let customer;
    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: email,
      });
    }

    // Criar Setup Intent
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      payment_method_types: ['card'],
    });

    return { setupIntent, customer };
  }

  async createSubscriptionFromSetup({
    paymentMethodId,
    priceId,
    couponCode,
    customerId,
  }: Omit<CreateSubscriptionDTO, 'email'> & { customerId: string }) {
    // Anexar payment method ao cliente
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    // Definir como padrão
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Criar assinatura
    const subscriptionData: Parameters<typeof stripe.subscriptions.create>[0] = {
      customer: customerId,
      items: [{ price: priceId }],
      default_payment_method: paymentMethodId,
      expand: ['latest_invoice.payment_intent'],
    };

    if (couponCode) {
      (subscriptionData as any).coupon = couponCode;
    }

    const subscription = await stripe.subscriptions.create(subscriptionData);
    return subscription;
  }

  async confirmSetupIntentTest(setupIntentId: string) {
    try {
      // ✅ Garantir que não tem a parte _secret_
      const cleanId = setupIntentId.split('_secret_')[0];

      console.log('🔍 Setup Intent ID limpo:', cleanId);

      // 1. Criar um payment method de teste
      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
          token: 'tok_visa',
        },
      });

      console.log('✅ Payment Method criado:', paymentMethod.id);

      // 2. Confirmar setup intent (usar ID limpo)
      const setupIntent = await stripe.setupIntents.confirm(cleanId, {
        payment_method: paymentMethod.id,
      });

      console.log('✅ Setup Intent confirmado:', setupIntent.id);

      return setupIntent;
    } catch (error: any) {
      console.error('❌ Erro ao confirmar setup intent:', error.message);
      throw error;
    }
  }
}
