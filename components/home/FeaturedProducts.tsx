import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/config/products";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/ProductCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";

export function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="container py-20">
      <SectionHeading
        eyebrow="Coaching"
        title="Start ranking up today"
        subtitle="Hand-picked offers — including my flagship Long Term Improvement Pack. Prices shown in your currency."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((product, i) => (
          <Reveal key={product.id} delay={i * 0.06}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/shop">
            Browse all coaching <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
