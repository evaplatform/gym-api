import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { Stripe } from 'node_modules/stripe/esm/stripe.core';

export interface CreateCustomerDTO {
  email: string;
  name?: string;
  phone?: string;
}

export interface CreateSubscriptionDTO {
  email: string;
  paymentMethodId: string;
  priceId: string;
  couponCode?: string;
}

export interface SubscriptionResponse {
  subscriptionId: string;
  clientSecret: string;
  status: Stripe.Subscription.Status;
}

export interface CreateSubscriptionFromSetupDTO {
  customerId: string;
  paymentMethodId: string;
  priceId: string;
  couponCode?: string;
  billingDay?: number; // 1-28
}

export interface BillingDayPreviewDTO {
  billingDay: number;
  priceId: string;
  email: string;
}

export interface BillingDayPreview {
  billingDay: number;
  nextBillingDate: string;
  daysUntilBilling: number;
  prorationAmount: number;
  currency: string;
}

export interface ISubscriptionService {
  createCustomer(data: CreateCustomerDTO): Promise<Stripe.Customer>;
  createSubscription(data: CreateSubscriptionDTO): Promise<SubscriptionResponse>;
  cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription>;
  getCustomerSubscriptions(email: string): Promise<Stripe.Subscription[]>;
  updatePaymentMethod(
    subscriptionId: string,
    paymentMethodId: string
  ): Promise<Stripe.Subscription>;
  createTestPaymentMethod(req: AuthenticatedRequest, res: Response): Promise<Stripe.PaymentMethod>;
  createSetupIntent(
    email: string
  ): Promise<{ setupIntent: Stripe.SetupIntent; customer: Stripe.Customer }>;
  createSubscriptionFromSetup(data: CreateSubscriptionFromSetupDTO): Promise<SubscriptionResponse>;
  previewBillingDay(data: BillingDayPreviewDTO): Promise<BillingDayPreview>;
  updateBillingDay(subscriptionId: string, billingDay: number): Promise<Stripe.Subscription>;
}
