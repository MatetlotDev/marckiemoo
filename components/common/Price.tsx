"use client";

import { useCurrency } from "@/context/CurrencyContext";
import { cn } from "@/lib/utils";

/**
 * Renders a USD base price formatted in the visitor's active currency.
 * Re-renders automatically when the currency changes.
 */
export function Price({
  amountUSD,
  className,
}: {
  amountUSD: number;
  className?: string;
}) {
  const { format } = useCurrency();
  return (
    <span className={cn("tabular-nums", className)} suppressHydrationWarning>
      {format(amountUSD)}
    </span>
  );
}
