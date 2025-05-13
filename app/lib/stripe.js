import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRIT_KEY);
