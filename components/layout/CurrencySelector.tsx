"use client";

import { useCurrency } from "@/context/CurrencyContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/** Accessible currency dropdown (Radix Select). Persists via CurrencyContext. */
export function CurrencySelector({ className }: { className?: string }) {
  const { currencyCode, setCurrencyCode, currencies } = useCurrency();

  return (
    <Select value={currencyCode} onValueChange={setCurrencyCode}>
      <SelectTrigger
        aria-label="Change display currency"
        className={cn("w-[5.5rem]", className)}
      >
        {/* Show just the 3-letter code in the compact header trigger. */}
        <SelectValue aria-label={currencyCode}>{currencyCode}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {currencies.map((c) => (
          <SelectItem key={c.code} value={c.code}>
            {c.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
