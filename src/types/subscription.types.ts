export interface CreateSubscriptionDTO {
  email: string;
  paymentMethodId: string;
  priceId: string;
  couponCode?: string;
  billingDay?: number;
}

export interface CreateCustomerDTO {
  email: string;
  name: string;
  phone?: string;
}

export interface SubscriptionResponse {
  subscriptionId: string;
  clientSecret: string;
  status: string;
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
