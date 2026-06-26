// =============================================================================
// lib/checkout/types.ts
// -----------------------------------------------------------------------------
// Shared types for the checkout layer. The UI talks ONLY to these types and to
// checkoutService — never directly to a payment provider. That keeps the swap
// to Stripe / Fourthwall / Cal.com a one-file change (see mockProvider.ts).
// =============================================================================

export interface CheckoutLineItem {
  productId: string;
  name: string;
  quantity: number;
  /** Unit price in USD (base currency). */
  unitPriceUSD: number;
}

export interface CheckoutPayload {
  items: CheckoutLineItem[];
  /** Total in USD before any currency conversion. */
  subtotalUSD: number;
  /** Currency the customer was viewing (for display + future provider hints). */
  currencyCode: string;
  /** Customer email collected at checkout. */
  email: string;
}

export interface CheckoutResult {
  ok: boolean;
  /** Internal reference id for the (mock) order. */
  orderId?: string;
  /**
   * Where to send the customer next. For a real provider this would be a hosted
   * payment URL; for the mock it's our local success page.
   */
  redirectUrl?: string;
  error?: string;
}

/**
 * The contract every payment provider must implement. Swap the implementation
 * in checkoutService.ts to go live — the UI never changes.
 */
export interface CheckoutProvider {
  readonly id: string;
  createCheckout(payload: CheckoutPayload): Promise<CheckoutResult>;
}
