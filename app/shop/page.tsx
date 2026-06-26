import type { Metadata } from "next";
import { CATEGORIES, type CategoryId } from "@/config/products";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/PageHero";
import { ProductGrid } from "@/components/shop/ProductGrid";

export const metadata: Metadata = buildMetadata({
  title: "Shop Coaching",
  description:
    "Browse all Brawlhalla coaching: 1v1, 2v2, replay reviews and packs from World Champion Marckiemoo. Prices in your currency.",
  path: "/shop",
});

function isCategory(value: string | undefined): value is CategoryId {
  return !!value && CATEGORIES.some((c) => c.id === value);
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const initialCategory = isCategory(category) ? category : "all";

  return (
    <>
      <PageHero
        eyebrow="Brawlhalla coaching store"
        title="Train with a World Champion"
        subtitle="Every product is a coaching service. Pick your format, pick your length, and start ranking up. Prices shown in your selected currency."
        legend="Asuri"
      />
      <div className="container py-12">
        <ProductGrid initialCategory={initialCategory} />
      </div>
    </>
  );
}
