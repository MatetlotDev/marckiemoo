import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/PageHero";
import { CheckoutView } from "@/components/checkout/CheckoutView";

export const metadata: Metadata = {
  ...buildMetadata({ title: "Checkout", path: "/checkout" }),
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <>
      <PageHero title="Checkout" subtitle="Almost there — confirm your order below." />
      <div className="container py-12">
        <CheckoutView />
      </div>
    </>
  );
}
