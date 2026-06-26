import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { SITE } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  ...buildMetadata({ title: "Order Confirmed", path: "/checkout/success" }),
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-16">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-primary/30 bg-card p-10 text-center">
        <div className="absolute inset-0 bg-radial-glow" aria-hidden />
        <div className="relative flex flex-col items-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
            <CheckCircle2 className="h-9 w-9" />
          </span>

          <h1 className="mt-6 font-display text-3xl font-bold">Thank you!</h1>
          <p className="mt-3 text-muted-foreground">
            Your order is confirmed. You&apos;ll receive your booking details on
            Discord — I&apos;ll reach out to lock in your session time.
          </p>

          {order && (
            <p className="mt-5 rounded-md border border-border bg-background px-4 py-2 text-sm">
              Order reference:{" "}
              <span className="font-semibold text-foreground">{order}</span>
            </p>
          )}

          {/* Demo note — there is no real payment yet. */}
          <p className="mt-4 text-xs text-muted-foreground">
            (Demo order — no real payment was processed.)
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a
                href={SITE.social.discord}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle /> Join the Discord
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/shop">Back to shop</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
