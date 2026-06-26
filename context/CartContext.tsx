"use client";

// =============================================================================
// context/CartContext.tsx
// -----------------------------------------------------------------------------
// Client-side cart: React Context + localStorage. No backend.
// Stores product ids + quantities; prices stay in USD and are converted for
// display by the currency layer. Subtotal is computed in USD.
// =============================================================================

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProduct, type Product } from "@/config/products";

const CART_STORAGE_KEY = "marckiemoo:cart";

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface CartLineDetailed extends CartLine {
  product: Product;
  lineTotalUSD: number;
}

interface CartContextValue {
  lines: CartLine[];
  detailedLines: CartLineDetailed[];
  itemCount: number;
  subtotalUSD: number;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  /** True once we've hydrated from localStorage (avoids SSR mismatch flicker). */
  hydrated: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as CartLine[];
        if (Array.isArray(parsed)) {
          // Drop any ids that no longer exist in the catalogue.
          setLines(parsed.filter((l) => getProduct(l.productId)));
        }
      }
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  // Persist on every change (after hydration).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, hydrated]);

  const addItem = useCallback((productId: string, quantity = 1) => {
    if (!getProduct(productId)) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId);
      if (existing) {
        return prev.map((l) =>
          l.productId === productId
            ? { ...l, quantity: l.quantity + quantity }
            : l,
        );
      }
      return [...prev, { productId, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.productId !== productId)
        : prev.map((l) =>
            l.productId === productId ? { ...l, quantity } : l,
          ),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { detailedLines, itemCount, subtotalUSD } = useMemo(() => {
    const detailed: CartLineDetailed[] = [];
    let count = 0;
    let subtotal = 0;
    for (const line of lines) {
      const product = getProduct(line.productId);
      if (!product) continue;
      const lineTotalUSD = product.priceUSD * line.quantity;
      detailed.push({ ...line, product, lineTotalUSD });
      count += line.quantity;
      subtotal += lineTotalUSD;
    }
    return { detailedLines: detailed, itemCount: count, subtotalUSD: subtotal };
  }, [lines]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      detailedLines,
      itemCount,
      subtotalUSD,
      addItem,
      removeItem,
      setQuantity,
      clear,
      hydrated,
    }),
    [lines, detailedLines, itemCount, subtotalUSD, addItem, removeItem, setQuantity, clear, hydrated],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
