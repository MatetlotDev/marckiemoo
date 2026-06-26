import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/PageHero";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  ...buildMetadata({ title: "Your Cart", path: "/cart" }),
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <PageHero title="Your cart" subtitle="Review your coaching before checkout." />
      <div className="container py-12">
        <CartView />
      </div>
    </>
  );
}
