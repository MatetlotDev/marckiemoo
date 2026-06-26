"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Plus, ShoppingCart } from "lucide-react";
import type { Product } from "@/config/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/common/Price";
import { QuantityStepper } from "@/components/common/QuantityStepper";

/** Price + quantity + add-to-cart block on the product detail page. */
export function ProductPurchase({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product.id, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="flex flex-col gap-5 rounded-lg border border-border bg-card p-6">
      <div className="flex items-baseline gap-3">
        <Price amountUSD={product.priceUSD} className="text-3xl font-bold" />
        <span className="text-sm text-muted-foreground">USD base price</span>
      </div>

      {product.allowQuantity && (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Quantity</span>
          <QuantityStepper value={qty} onChange={setQty} />
        </div>
      )}

      <Button type="button" size="lg" onClick={handleAdd} className="w-full">
        {added ? (
          <>
            <Check /> Added to cart
          </>
        ) : (
          <>
            <Plus /> Add to cart
          </>
        )}
      </Button>

      <Button asChild variant="secondary" size="lg" className="w-full">
        <Link href="/cart">
          <ShoppingCart /> View cart &amp; checkout
        </Link>
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Secure checkout · Booking details delivered on Discord
      </p>
    </div>
  );
}
