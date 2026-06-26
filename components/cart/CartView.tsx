"use client";

import Link from "next/link";
import { ArrowRight, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/common/Price";
import { ProductImage } from "@/components/common/ProductImage";
import { QuantityStepper } from "@/components/common/QuantityStepper";

export function CartView() {
  const { detailedLines, subtotalUSD, setQuantity, removeItem, itemCount, hydrated } =
    useCart();

  // Avoid SSR/CSR flash before localStorage hydration.
  if (!hydrated) {
    return <div className="h-64 animate-pulse rounded-lg border border-border bg-card" />;
  }

  if (detailedLines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-lg border border-border bg-card py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShoppingCart className="h-7 w-7" />
        </span>
        <div>
          <h2 className="font-display text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Find the coaching that fits your goals.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/shop">
            Browse coaching <ArrowRight />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      {/* Items */}
      <ul className="flex flex-col gap-4">
        {detailedLines.map((line) => (
          <li
            key={line.productId}
            className="flex gap-4 rounded-lg border border-border bg-card p-4"
          >
            <Link
              href={`/product/${line.productId}`}
              className="w-24 shrink-0 overflow-hidden rounded-md sm:w-32"
            >
              <ProductImage product={line.product} />
            </Link>

            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <Link
                  href={`/product/${line.productId}`}
                  className="font-display font-semibold leading-tight hover:text-primary"
                >
                  {line.product.name}
                </Link>
                <button
                  type="button"
                  onClick={() => removeItem(line.productId)}
                  aria-label={`Remove ${line.product.name} from cart`}
                  className="text-muted-foreground transition-colors hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <Price
                amountUSD={line.product.priceUSD}
                className="text-sm text-muted-foreground"
              />

              <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                <QuantityStepper
                  value={line.quantity}
                  onChange={(q) => setQuantity(line.productId, q)}
                />
                <Price
                  amountUSD={line.lineTotalUSD}
                  className="text-lg font-bold"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Summary */}
      <aside className="h-fit rounded-lg border border-border bg-card p-6 lg:sticky lg:top-24">
        <h2 className="font-display text-lg font-semibold">Order summary</h2>

        <dl className="mt-5 flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">
              Items ({itemCount})
            </dt>
            <dd>
              <Price amountUSD={subtotalUSD} />
            </dd>
          </div>
          <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
            <dt>Subtotal</dt>
            <dd>
              <Price amountUSD={subtotalUSD} />
            </dd>
          </div>
        </dl>

        <Button asChild size="lg" className="mt-6 w-full">
          <Link href="/checkout">
            Checkout <ArrowRight />
          </Link>
        </Button>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Secure checkout · Session details delivered on Discord
        </p>
      </aside>
    </div>
  );
}
