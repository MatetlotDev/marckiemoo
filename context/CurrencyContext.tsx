"use client";

// =============================================================================
// context/CurrencyContext.tsx
// -----------------------------------------------------------------------------
// Holds the visitor's selected display currency, persisted to localStorage and
// applied everywhere (cards, product page, cart, checkout). Pure frontend.
// =============================================================================

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CURRENCIES,
  CURRENCY_STORAGE_KEY,
  DEFAULT_CURRENCY,
  getCurrency,
  type Currency,
} from "@/config/currencies";
import { formatPriceFromUSD } from "@/lib/currency";

interface CurrencyContextValue {
  currency: Currency;
  currencyCode: string;
  setCurrencyCode: (code: string) => void;
  /** Format a USD base price into the active currency. */
  format: (amountUSD: number) => string;
  currencies: Currency[];
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currencyCode, setCurrencyCodeState] = useState<string>(DEFAULT_CURRENCY);

  // Load persisted choice on mount.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (saved && CURRENCIES.some((c) => c.code === saved)) {
        setCurrencyCodeState(saved);
      }
    } catch {
      /* localStorage unavailable — keep default */
    }
  }, []);

  const setCurrencyCode = useCallback((code: string) => {
    setCurrencyCodeState(code);
    try {
      window.localStorage.setItem(CURRENCY_STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<CurrencyContextValue>(() => {
    const currency = getCurrency(currencyCode);
    return {
      currency,
      currencyCode,
      setCurrencyCode,
      format: (amountUSD: number) => formatPriceFromUSD(amountUSD, currencyCode),
      currencies: CURRENCIES,
    };
  }, [currencyCode, setCurrencyCode]);

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return ctx;
}
