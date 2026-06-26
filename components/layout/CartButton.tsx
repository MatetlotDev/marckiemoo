"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

/** Header cart link with a live item-count badge. */
export function CartButton({ className }: { className?: string }) {
  const { itemCount, hydrated } = useCart();
  const showBadge = hydrated && itemCount > 0;

  return (
    <Link
      href="/cart"
      aria-label={`Cart${showBadge ? `, ${itemCount} item${itemCount > 1 ? "s" : ""}` : " (empty)"}`}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <ShoppingCart className="h-5 w-5" />
      {showBadge && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-gradient px-1 text-[0.7rem] font-bold text-white shadow-glow">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}
