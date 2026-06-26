"use client";

// Wraps the app in client-side providers (currency + cart). Imported once in
// app/layout.tsx so every page/component can use the hooks.

import { CurrencyProvider } from "./CurrencyContext";
import { CartProvider } from "./CartContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      <CartProvider>{children}</CartProvider>
    </CurrencyProvider>
  );
}
