import express from 'express';

import { asyncRoute } from '@/shared/utils/asyncRoute';
import { SubscriptionController } from '@/controllers/SubscriptionController';

const router = express.Router();

router.get(
  '/',
  asyncRoute((req, res) => SubscriptionController.getSubscriptions(req as any, res))
);
router.post(
  '/',
  asyncRoute((req, res) => SubscriptionController.create(req as any, res))
);
router.delete(
  '/:subscriptionId',
  asyncRoute((req, res) => SubscriptionController.cancelSubscription(req as any, res))
);
router.post(
  '/test-payment-method',
  asyncRoute((req, res) => SubscriptionController.createTestPaymentMethod(req as any, res))
);

router.post(
  '/setup-intent',
  asyncRoute((req, res) => SubscriptionController.createSetupIntent(req as any, res))
);

router.post(
  '/create-from-setup',
  asyncRoute((req, res) => SubscriptionController.createSubscriptionFromSetup(req as any, res))
);

router.post(
  '/confirm-setup-test',
  asyncRoute((req, res) => SubscriptionController.confirmSetupIntentTest(req as any, res))
);

router.put(
  '/:subscriptionId/payment-method',
  asyncRoute((req, res) => SubscriptionController.updatePaymentMethod(req as any, res))
);

router.post(
  '/:subscriptionId/retry-payment',
  asyncRoute((req, res) => SubscriptionController.retryPayment(req as any, res))
);

router.post(
  '/reactivate',
  asyncRoute((req, res) => SubscriptionController.reactivateSubscription(req as any, res))
);

export default router;
