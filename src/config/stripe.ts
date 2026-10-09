import Stripe from 'stripe';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const API_VERSION = '2026-05-27.dahlia' as const;

function makeStripe(key: string | undefined, label: string): Stripe {
  if (!key) {
    throw new Error(`${label} não configurada`);
  }
  return new Stripe(key, { apiVersion: API_VERSION, typescript: true });
}

// Cached instances — created on first use, not at import time.
let _stripe: Stripe | null = null;
let _stripeTest: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = makeStripe(process.env.STRIPE_SECRET_KEY, 'STRIPE_SECRET_KEY');
  }
  return _stripe;
}

export function getStripeTest(): Stripe {
  if (!_stripeTest) {
    _stripeTest = makeStripe(process.env.STRIPE_SECRET_KEY_TEST, 'STRIPE_SECRET_KEY_TEST');
  }
  return _stripeTest;
}