export interface CreateSubscriptionDTO {
  email: string;
  paymentMethodId: string;
  priceId: string;
  couponCode?: string;
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