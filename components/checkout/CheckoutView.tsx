"use client";

// =============================================================================
// CheckoutView — looks like a real checkout, but NO payment is processed.
// It collects an email, shows the order, and calls the decoupled checkoutService
// (currently the mock provider). The payment-method buttons are intentionally
// disabled placeholders. See lib/checkout/* to wire a real provider.
// =============================================================================

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Lock, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { SITE } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Price } from "@/components/common/Price";
import { startCheckout, isMockCheckout } from "@/lib/checkout/checkoutService";

const PAYMENT_METHODS = [
  { id: "paypal", label: "PayPal" },
  { id: "card", label: "Credit / Debit Card" },
  { id: "cashapp", label: "Cashapp" },
] as const;

export function CheckoutView() {
  const router = useRouter();
  const { detailedLines, subtotalUSD, itemCount, clear, hydrated } = useCart();
  const { currencyCode } = useCurrency();

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!hydrated) {
    return <div className="h-80 animate-pulse rounded-lg border border-border bg-card" />;
  }

  if (detailedLines.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card py-16 text-center">
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Button asChild className="mt-5">
          <Link href="/shop">Browse coaching</Link>
        </Button>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = await startCheckout({
      items: detailedLines.map((l) => ({
        productId: l.productId,
        name: l.product.name,
        quantity: l.quantity,
        unitPriceUSD: l.product.priceUSD,
      })),
      subtotalUSD,
      currencyCode,
      email,
    });

    if (result.ok && result.redirectUrl) {
      clear();
      router.push(result.redirectUrl);
    } else {
      setError(result.error ?? "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {isMockCheckout && (
          <div className="rounded-md border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
            <strong className="font-semibold">Demo checkout.</strong> This is a
            front-end preview — no real payment is taken yet.
          </div>
        )}

        {/* Contact */}
        <section className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold">Contact</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            We use this to send your receipt. Booking details come via Discord.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </section>

        {/* Payment (placeholder) */}
        <section className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold">Payment method</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Payment providers connect here. Buttons are placeholders for now.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m.id}
                type="button"
                disabled
                aria-disabled="true"
                title="Coming soon"
                className="flex h-12 cursor-not-allowed items-center justify-center rounded-md border border-border bg-background text-sm font-medium text-muted-foreground opacity-70"
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-md border border-border bg-background px-4 py-3 text-xs text-muted-foreground">
            Prefer Cashapp? Send to{" "}
            <span className="font-semibold text-foreground">
              {SITE.altPayment.cashapp}
            </span>{" "}
            and {SITE.altPayment.note.toLowerCase()}
          </div>
        </section>

        {error && (
          <p className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" disabled={submitting} className="w-full">
          {submitting ? (
            <>
              <Loader2 className="animate-spin" /> Processing…
            </>
          ) : (
            <>
              <Lock /> Place order (demo)
            </>
          )}
        </Button>

        <Link
          href="/cart"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to cart
        </Link>
      </form>

      {/* Order summary */}
      <aside className="h-fit rounded-lg border border-border bg-card p-6 lg:sticky lg:top-24">
        <h2 className="font-display text-lg font-semibold">
          Order summary ({itemCount})
        </h2>

        <ul className="mt-5 flex flex-col gap-4">
          {detailedLines.map((l) => (
            <li key={l.productId} className="flex items-start justify-between gap-3 text-sm">
              <span className="flex flex-col">
                <span className="font-medium">{l.product.name}</span>
                <span className="text-muted-foreground">Qty {l.quantity}</span>
              </span>
              <Price amountUSD={l.lineTotalUSD} className="font-semibold" />
            </li>
          ))}
        </ul>

        <div className="mt-5 flex justify-between border-t border-border pt-4 text-base font-semibold">
          <span>Total</span>
          <Price amountUSD={subtotalUSD} />
        </div>

        <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Secure checkout · Session delivered on Discord
        </p>
      </aside>
    </div>
  );
}
