// =============================================================================
// config/currencies.ts
// -----------------------------------------------------------------------------
// All supported display currencies. Product prices are ALWAYS stored in USD
// (see config/products.ts) and converted at display time.
//
// HOW TO EDIT (no coding needed):
//   • To change a rate: edit `rate`. It means "1 USD = `rate` units of this
//     currency". Example: EUR rate 0.92 => $10.00 shows as 9,20 €.
//   • To add a currency: copy a line, set code / label / locale / rate.
//   • To change the default currency a first-time visitor sees: edit
//     DEFAULT_CURRENCY below.
//
// Symbols, decimals and separators are handled automatically by
// Intl.NumberFormat using each currency's `locale` (see lib/currency.ts).
// No API calls — rates are hard-coded and updated by hand.
// =============================================================================

export interface Currency {
  /** ISO 4217 code, used by Intl.NumberFormat (e.g. "USD"). */
  code: string;
  /** Human-readable label shown in the currency dropdown. */
  label: string;
  /** Locale used to format the amount (symbol, separators, decimals). */
  locale: string;
  /** 1 USD = `rate` units of this currency. USD itself is 1. */
  rate: number;
}

/** Currency selected for first-time visitors (before they pick one). */
export const DEFAULT_CURRENCY = "USD";

/** localStorage key for the visitor's chosen currency. */
export const CURRENCY_STORAGE_KEY = "marckiemoo:currency";

export const CURRENCIES: Currency[] = [
  { code: "USD", label: "USD — US Dollar",         locale: "en-US", rate: 1.0 },
  { code: "EUR", label: "EUR — Euro",              locale: "de-DE", rate: 0.92 },
  { code: "CAD", label: "CAD — Canadian Dollar",   locale: "en-CA", rate: 1.37 },
  { code: "GBP", label: "GBP — British Pound",     locale: "en-GB", rate: 0.79 },
  { code: "AUD", label: "AUD — Australian Dollar", locale: "en-AU", rate: 1.51 },
  { code: "NZD", label: "NZD — NZ Dollar",         locale: "en-NZ", rate: 1.64 },
  { code: "SEK", label: "SEK — Swedish Krona",     locale: "sv-SE", rate: 10.5 },
  { code: "NOK", label: "NOK — Norwegian Krone",   locale: "nb-NO", rate: 10.7 },
  { code: "DKK", label: "DKK — Danish Krone",      locale: "da-DK", rate: 6.85 },
  { code: "PLN", label: "PLN — Polish Złoty",      locale: "pl-PL", rate: 3.95 },
  { code: "INR", label: "INR — Indian Rupee",      locale: "en-IN", rate: 83.3 },
  { code: "JPY", label: "JPY — Japanese Yen",      locale: "ja-JP", rate: 157 },
  { code: "MYR", label: "MYR — Malaysian Ringgit", locale: "ms-MY", rate: 4.72 },
  { code: "SGD", label: "SGD — Singapore Dollar",  locale: "en-SG", rate: 1.35 },
  { code: "MXN", label: "MXN — Mexican Peso",      locale: "es-MX", rate: 18.4 },
  { code: "BRL", label: "BRL — Brazilian Real",    locale: "pt-BR", rate: 5.45 },
  { code: "CHF", label: "CHF — Swiss Franc",       locale: "de-CH", rate: 0.89 },
];

/** Lookup helper used across the app. Falls back to the default currency. */
export function getCurrency(code: string): Currency {
  return (
    CURRENCIES.find((c) => c.code === code) ??
    CURRENCIES.find((c) => c.code === DEFAULT_CURRENCY) ??
    CURRENCIES[0]
  );
}
