// =============================================================================
// lib/checkout/checkoutService.ts
// -----------------------------------------------------------------------------
// The single entry point the UI uses to start a checkout. It hides which
// provider is active behind a stable function. Today it's the mock provider;
// to go live, import your real provider and assign it to `activeProvider`.
//
//   import { stripeProvider } from "./stripeProvider";
//   const activeProvider: CheckoutProvider = stripeProvider;
//
// The checkout page calls `startCheckout(payload)` and reacts to the result —
// it has no idea (and doesn't care) which provider is behind it.
// =============================================================================

import type { CheckoutPayload, CheckoutProvider, CheckoutResult } from "./types";
import { mockProvider } from "./mockProvider";

// 👇 Swap this line when wiring a real payment/booking provider.
const activeProvider: CheckoutProvider = mockProvider;

export async function startCheckout(
  payload: CheckoutPayload,
): Promise<CheckoutResult> {
  return activeProvider.createCheckout(payload);
}

/** Exposed for debugging / showing "mock mode" notices in the UI. */
export const isMockCheckout = activeProvider.id === "mock";
