"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS, type CategoryId } from "@/config/products";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

type Filter = CategoryId | "all";
type Sort = "featured" | "price-asc" | "price-desc" | "duration-asc" | "duration-desc";

const SORT_OPTIONS: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "duration-asc", label: "Duration: short to long" },
  { value: "duration-desc", label: "Duration: long to short" },
];

export function ProductGrid({ initialCategory = "all" }: { initialCategory?: Filter }) {
  const [filter, setFilter] = useState<Filter>(initialCategory);
  const [sort, setSort] = useState<Sort>("featured");

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "All" },
    ...CATEGORIES.map((c) => ({ value: c.id as Filter, label: c.name })),
  ];

  const products = useMemo(() => {
    const base =
      filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);
    const sorted = [...base];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.priceUSD - b.priceUSD);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.priceUSD - a.priceUSD);
        break;
      case "duration-asc":
        sorted.sort(
          (a, b) => (a.durationMinutes ?? Infinity) - (b.durationMinutes ?? Infinity),
        );
        break;
      case "duration-desc":
        sorted.sort(
          (a, b) => (b.durationMinutes ?? -Infinity) - (a.durationMinutes ?? -Infinity),
        );
        break;
      default:
        break; // keep catalogue order ("featured")
    }
    return sorted;
  }, [filter, sort]);

  return (
    <div className="flex flex-col gap-8">
      {/* Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Category filters */}
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter coaching by category"
        >
          {filters.map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  active
                    ? "border-transparent bg-brand-gradient text-white shadow-glow"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-muted-foreground">
            Sort by
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-10 rounded-md border border-border bg-card px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        {products.length} {products.length === 1 ? "option" : "options"}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 3} />
        ))}
      </div>
    </div>
  );
}
