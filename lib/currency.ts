// =============================================================================
// lib/currency.ts
// -----------------------------------------------------------------------------
// Pure-frontend currency conversion + formatting.
// Base prices are in USD (config/products.ts). We convert with the hard-coded
// rates in config/currencies.ts and format with Intl.NumberFormat so each
// currency gets the correct symbol, separators and decimals automatically.
// =============================================================================

import { getCurrency, type Currency } from "@/config/currencies";

/** Convert a USD amount into the target currency (by code). */
export function convertFromUSD(amountUSD: number, currencyCode: string): number {
  const currency = getCurrency(currencyCode);
  return amountUSD * currency.rate;
}

/** Format an already-converted amount in the given currency. */
export function formatInCurrency(amount: number, currency: Currency): string {
  try {
    return new Intl.NumberFormat(currency.locale, {
      style: "currency",
      currency: currency.code,
    }).format(amount);
  } catch {
    // Fallback if a locale/currency pair is unsupported by the runtime.
    return `${currency.code} ${amount.toFixed(2)}`;
  }
}

/**
 * One-shot helper: take a USD price + a currency code and return the formatted
 * display string in that currency. Used everywhere prices are shown.
 */
export function formatPriceFromUSD(amountUSD: number, currencyCode: string): string {
  const currency = getCurrency(currencyCode);
  return formatInCurrency(convertFromUSD(amountUSD, currencyCode), currency);
}
