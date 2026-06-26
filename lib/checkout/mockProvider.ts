// =============================================================================
// lib/checkout/mockProvider.ts
// -----------------------------------------------------------------------------
// ⚠️  PLACEHOLDER PROVIDER — NO REAL PAYMENT HAPPENS HERE.
//
// This simulates a payment provider so the checkout flow looks and feels real
// during development. It validates the payload, fakes a short network delay,
// generates a fake order id, and points the customer at our local success page.
//
// TO GO LIVE: implement CheckoutProvider with a real provider (Stripe session,
// Fourthwall checkout, Cal.com booking, ...) and swap it in checkoutService.ts.
// Nothing in the UI needs to change.
// =============================================================================

import type {
  CheckoutPayload,
  CheckoutProvider,
  CheckoutResult,
} from "./types";

function makeOrderId(): string {
  return "MOCK-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const mockProvider: CheckoutProvider = {
  id: "mock",

  async createCheckout(payload: CheckoutPayload): Promise<CheckoutResult> {
    // Basic guards so the mock behaves like a real endpoint would.
    if (!payload.items.length) {
      return { ok: false, error: "Your cart is empty." };
    }
    if (!isValidEmail(payload.email)) {
      return { ok: false, error: "Please enter a valid email address." };
    }

    // Simulate provider latency.
    await new Promise((r) => setTimeout(r, 900));

    const orderId = makeOrderId();
    // NOTE: in a real integration this would be the provider's hosted URL.
    return {
      ok: true,
      orderId,
      redirectUrl: `/checkout/success?order=${orderId}`,
    };
  },
};
