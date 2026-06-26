import Image from "next/image";
import { FEATURE } from "@/config/site";
import { legendForProduct } from "@/config/brawlhalla";
import type { Product } from "@/config/products";
import { cn } from "@/lib/utils";

const CATEGORY_LABEL: Record<Product["category"], string> = {
  "1v1": "1v1",
  "2v2": "2v2",
  "replay-reviews": "Replay",
  packs: "Pack",
};

/**
 * Product visual. By default it shows official Brawlhalla legend artwork on a
 * branded gradient so every card reads as "Brawlhalla coaching". When real
 * coaching photos exist, set FEATURE.useProductImages = true (config/site.ts)
 * and they'll be used instead via next/image (lazy by default).
 */
export function ProductImage({
  product,
  priority = false,
  className,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  if (FEATURE.useProductImages) {
    return (
      <div className={cn("relative aspect-[4/3] overflow-hidden", className)}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  const legend = legendForProduct(product.id);

  return (
    <div
      className={cn(
        "relative flex aspect-[4/3] items-end justify-center overflow-hidden bg-card",
        className,
      )}
    >
      <div className="absolute inset-0 bg-radial-glow opacity-90" aria-hidden />
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />

      {/* Legend artwork (transparent) leaping out of the card. */}
      <Image
        src={legend.src}
        alt={`${legend.name} — Brawlhalla legend`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        priority={priority}
        className="object-contain object-bottom p-2 drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-[1.06]"
      />

      {/* Category tag */}
      <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-background/70 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-foreground/80 backdrop-blur">
        {CATEGORY_LABEL[product.category]}
      </span>

      {/* Legend name */}
      <span className="absolute bottom-2 left-3 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-muted-foreground">
        {legend.name}
      </span>
    </div>
  );
}
