import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Clock, Target, ListChecks } from "lucide-react";
import {
  PRODUCTS,
  getProduct,
  getCategory,
  getProductsByCategory,
} from "@/config/products";
import { buildMetadata, productJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/common/PageHero";
import { ProductImage } from "@/components/common/ProductImage";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductCard } from "@/components/shop/ProductCard";
import { JsonLd } from "@/components/common/JsonLd";
import { Badge } from "@/components/ui/badge";

// Pre-render every product page at build time.
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };
  return buildMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/product/${product.id}`,
  });
}

function formatDuration(minutes?: number): string | null {
  if (!minutes) return null;
  if (minutes < 60) return `${minutes} min`;
  const h = minutes / 60;
  return Number.isInteger(h) ? `${h} hr${h > 1 ? "s" : ""}` : `${minutes} min`;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const duration = formatDuration(product.durationMinutes);
  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={productJsonLd(product)} />

      <PageHero eyebrow={category?.name} title={product.name} />

      <div className="container py-12">
        <Link
          href="/shop"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* Visual + meta */}
          <div className="flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-lg border border-border">
              <ProductImage product={product} priority />
              {product.badge && (
                <div className="absolute left-4 top-4">
                  <Badge
                    variant={product.badge === "bestseller" ? "bestseller" : "bestValue"}
                  >
                    {product.badge === "bestseller" ? "Bestseller" : "Best value"}
                  </Badge>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              {duration && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" /> {duration}
                </span>
              )}
              {product.forWho && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground">
                  <Target className="h-4 w-4" /> {product.forWho}
                </span>
              )}
            </div>

            <p className="text-base leading-relaxed text-foreground/90">
              {product.description}
            </p>
          </div>

          {/* Purchase + details */}
          <div className="flex flex-col gap-8">
            <ProductPurchase product={product} />

            {/* What you'll get */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
                <ListChecks className="h-5 w-5 text-primary" /> What you&apos;ll get
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {product.whatYouGet.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Session flow */}
            {product.sessionFlow && product.sessionFlow.length > 0 && (
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="font-display text-lg font-semibold">How the session goes</h2>
                <ol className="mt-4 flex flex-col gap-4">
                  {product.sessionFlow.map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold">More {category?.name}</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
