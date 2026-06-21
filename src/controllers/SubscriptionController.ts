import { SubscriptionService } from '@/services/stripe/SubscriptionService';
import { CatchErrors } from '@/shared/decorators/CatchErrors';
import { Request, Response } from 'express';

const subscriptionService = new SubscriptionService();

export class SubscriptionController {
  @CatchErrors
  static async create(req: Request, res: Response) {
    try {
      const { email, paymentMethodId, priceId, couponCode } = req.body;

      // Validações
      if (!email || !paymentMethodId || !priceId) {
        return res.status(400).json({
          error: 'Email, paymentMethodId e priceId são obrigatórios',
        });
      }

      const subscription = await subscriptionService.createSubscription({
        email,
        paymentMethodId,
        priceId,
        couponCode,
      });

      return res.status(201).json(subscription);
    } catch (error: any) {
      console.error('Erro no controller:', error);
      return res.status(500).json({
        error: error.message || 'Erro ao criar assinatura',
      });
    }
  }

  @CatchErrors
  static async createTestPaymentMethod(req: Request, res: Response) {
    try {
      const response = (await subscriptionService.createTestPaymentMethod(
        req as any,
        res as any
      )) as any;

      return res.json({
        paymentMethodId: response.id,
        card: {
          brand: response.card?.brand,
          last4: response.card?.last4,
        },
        message: '✅ Use este paymentMethodId para criar a assinatura',
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  @CatchErrors
  static async cancelSubscription(req: Request, res: Response) {
    try {
      const { subscriptionId } = req.params;

      const subscription = await subscriptionService.cancelSubscription(subscriptionId);

      return res.json({
        message: 'Assinatura cancelada com sucesso',
        subscription,
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message || 'Erro ao cancelar assinatura',
      });
    }
  }

  @CatchErrors
  static async getSubscriptions(req: Request, res: Response) {
    try {
      const { email } = req.query;

      if (!email || typeof email !== 'string') {
        return res.status(400).json({
          error: 'Email é obrigatório',
        });
      }

      const subscriptions = await subscriptionService.getCustomerSubscriptions(email);

      return res.json({ subscriptions });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message || 'Erro ao buscar assinaturas',
      });
    }
  }

  @CatchErrors
  static async createSetupIntent(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Email é obrigatório' });
      }

      const { setupIntent, customer } = await subscriptionService.createSetupIntent(email);

      return res.json({
        clientSecret: setupIntent.client_secret,
        customerId: customer.id,
        message: '✅ Use este clientSecret no app mobile para coletar o cartão',
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  @CatchErrors
  static async createSubscriptionFromSetup(req: Request, res: Response) {
    try {
      const { customerId, paymentMethodId, priceId, couponCode } = req.body;

      if (!customerId || !paymentMethodId || !priceId) {
        return res.status(400).json({
          error: 'customerId, paymentMethodId e priceId são obrigatórios',
        });
      }

      const subscription = await subscriptionService.createSubscriptionFromSetup({
        paymentMethodId,
        priceId,
        couponCode,
        customerId,
      });

      return res.status(201).json({
        subscriptionId: (subscription as any).id,
        status: subscription.status,
        message: '✅ Assinatura criada com sucesso!',
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  @CatchErrors
  static async confirmSetupIntentTest(req: Request, res: Response) {
    try {
      const { setupIntentId, clientSecret } = req.body;

      // ✅ Aceitar tanto o ID quanto o clientSecret
      let id = setupIntentId;

      if (!id && clientSecret) {
        // Extrair ID do clientSecret (antes do _secret_)
        id = clientSecret.split('_secret_')[0];
      }

      if (!id) {
        return res.status(400).json({
          error: 'setupIntentId ou clientSecret é obrigatório',
        });
      }

      const setupIntent = (await subscriptionService.confirmSetupIntentTest(id)) as any;

      return res.json({
        paymentMethodId: setupIntent.payment_method,
        status: setupIntent.status,
        customerId: setupIntent.customer,
        message: '✅ Setup confirmado! Use o paymentMethodId para criar assinatura',
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message || 'Erro ao confirmar setup intent',
      });
    }
  }

  @CatchErrors
  static async updatePaymentMethod(req: Request, res: Response) {
    try {
      const { subscriptionId } = req.params;
      const { paymentMethodId } = req.body;

      if (!paymentMethodId) {
        return res.status(400).json({
          error: 'paymentMethodId é obrigatório',
        });
      }

      const result = await subscriptionService.updatePaymentMethod(subscriptionId, paymentMethodId);

      return res.json({
        message: '✅ Método de pagamento atualizado com sucesso',
        subscription: result,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  @CatchErrors
  static async retryPayment(req: Request, res: Response) {
    try {
      const { subscriptionId } = req.params;

      const result = await subscriptionService.retryPayment(subscriptionId);

      return res.json({
        message: '✅ Cobrança processada',
        status: result.status,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  @CatchErrors
  static async reactivateSubscription(req: Request, res: Response) {
    try {
      const { customerId, priceId, paymentMethodId } = req.body;

      if (!customerId || !priceId) {
        return res.status(400).json({
          error: 'customerId e priceId são obrigatórios',
        });
      }

      const subscription = await subscriptionService.reactivateSubscription({
        customerId,
        priceId,
        paymentMethodId,
      });

      return res.status(201).json(subscription);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
