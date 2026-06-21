declare module 'stripe' {
  namespace Stripe {
    interface StripeConfig {
      apiVersion?: string;
      typescript?: boolean;
    }

    interface Customer {
      id: string;
      email?: string | null;
      name?: string | null;
      phone?: string | null;
    }

    interface ListResponse<T> {
      data: T[];
    }

    interface CustomerListParams {
      email?: string;
      limit?: number;
    }

    interface CustomerCreateParams {
      email?: string;
      name?: string;
      phone?: string;
    }

    interface CustomerUpdateParams {
      invoice_settings?: {
        default_payment_method?: string;
      };
    }

    interface PaymentMethod {
      id: string;
      type?: string;
    }

    interface PaymentMethodCreateParams {
      type: 'card' | string;
      card?: {
        number?: string;
        exp_month?: number;
        exp_year?: number;
        cvc?: string;
        token?: string;
      };
    }

    interface PaymentMethodAttachParams {
      customer: string;
    }

    interface SubscriptionItem {
      price: string;
    }

    interface PaymentIntent {
      id?: string;
      client_secret?: string | null;
      status?: string;
    }

    interface Invoice {
      payment_intent?: string | PaymentIntent | null;
      status?: string;
      paid?: boolean;
    }

    interface Subscription {
      id: string;
      status: string;
      customer: string;
      latest_invoice?: string | Invoice | null;
    }

    interface SubscriptionCreateParams {
      customer: string;
      items: SubscriptionItem[];
      default_payment_method?: string;
      payment_behavior?: string;
      expand?: string[];
      coupon?: string;
    }

    interface SubscriptionUpdateParams {
      default_payment_method?: string;
    }

    interface SubscriptionListParams {
      customer: string;
      status?: 'all' | 'active' | 'canceled' | 'incomplete' | string;
      expand?: string[];
    }

    interface SetupIntent {
      id: string;
      status?: string;
      client_secret?: string | null;
    }

    interface SetupIntentCreateParams {
      customer: string;
      payment_method_types: string[];
    }

    interface SetupIntentConfirmParams {
      payment_method: string;
    }
  }

  class Stripe {
    constructor(apiKey: string, config?: Stripe.StripeConfig);

    customers: {
      create(params: Stripe.CustomerCreateParams): Promise<Stripe.Customer>;
      list(params: Stripe.CustomerListParams): Promise<Stripe.ListResponse<Stripe.Customer>>;
      update(id: string, params: Stripe.CustomerUpdateParams): Promise<Stripe.Customer>;
      retrieve(id: string): Promise<Stripe.Customer>;
    };

    paymentMethods: {
      create(params: Stripe.PaymentMethodCreateParams): Promise<Stripe.PaymentMethod>;
      attach(id: string, params: Stripe.PaymentMethodAttachParams): Promise<Stripe.PaymentMethod>;
    };

    subscriptions: {
      create(params: Stripe.SubscriptionCreateParams): Promise<Stripe.Subscription>;
      cancel(id: string): Promise<Stripe.Subscription>;
      list(
        params: Stripe.SubscriptionListParams
      ): Promise<Stripe.ListResponse<Stripe.Subscription>>;
      update(id: string, params: Stripe.SubscriptionUpdateParams): Promise<Stripe.Subscription>;
      retrieve(id: string, params?: { expand?: string[] }): Promise<Stripe.Subscription>;
    };

    invoices: {
      pay(id: string, params?: { expand?: string[] }): Promise<Stripe.Invoice>;
    };

    setupIntents: {
      create(params: Stripe.SetupIntentCreateParams): Promise<Stripe.SetupIntent>;
      confirm(id: string, params: Stripe.SetupIntentConfirmParams): Promise<Stripe.SetupIntent>;
    };
  }

  export = Stripe;
}
