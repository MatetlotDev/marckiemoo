"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/** Accessible -/+ quantity control. */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
  label = "Quantity",
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  className?: string;
  label?: string;
}) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-card",
        className,
      )}
    >
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
        className="flex h-10 w-10 items-center justify-center rounded-l-md text-foreground transition-colors hover:bg-primary/10 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span
        className="w-10 text-center text-sm font-semibold tabular-nums"
        aria-live="polite"
        aria-label={`${label}: ${value}`}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
        className="flex h-10 w-10 items-center justify-center rounded-r-md text-foreground transition-colors hover:bg-primary/10 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
