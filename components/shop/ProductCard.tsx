import Link from "next/link";
import { Clock } from "lucide-react";
import type { Product } from "@/config/products";
import { getCategory } from "@/config/products";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/common/Price";
import { ProductImage } from "@/components/common/ProductImage";
import { AddToCartButton } from "@/components/product/AddToCartButton";

function formatDuration(minutes?: number): string | null {
  if (!minutes) return null;
  if (minutes < 60) return `${minutes} min`;
  const h = minutes / 60;
  return Number.isInteger(h) ? `${h} hr` : `${minutes} min`;
}

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const duration = formatDuration(product.durationMinutes);
  const category = getCategory(product.category);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow">
      <Link
        href={`/product/${product.id}`}
        className="relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`View ${product.name}`}
      >
        <ProductImage product={product} priority={priority} />
        {product.badge && (
          <div className="absolute left-3 top-3">
            <Badge variant={product.badge === "bestseller" ? "bestseller" : "bestValue"}>
              {product.badge === "bestseller" ? "Bestseller" : "Best value"}
            </Badge>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="uppercase tracking-wide">{category?.name}</span>
          {duration && (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {duration}
            </span>
          )}
        </div>

        <h3 className="font-display text-lg font-semibold leading-tight">
          <Link
            href={`/product/${product.id}`}
            className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {product.name}
          </Link>
        </h3>

        <p className="flex-1 text-sm text-muted-foreground">
          {product.shortDescription}
        </p>

        <div className="mt-1 flex items-center justify-between gap-3">
          <Price amountUSD={product.priceUSD} className="text-xl font-bold" />
          <AddToCartButton productId={product.id} size="sm" label="Add" />
        </div>
      </div>
    </article>
  );
}
