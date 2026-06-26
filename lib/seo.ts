// =============================================================================
// lib/seo.ts
// -----------------------------------------------------------------------------
// JSON-LD structured-data builders (Person + Product/Service) and a small
// metadata helper. Keeps SEO logic out of the page components.
// =============================================================================

import type { Metadata } from "next";
import { SITE } from "@/config/site";
import type { Product } from "@/config/products";
import { CATEGORIES } from "@/config/products";

const BASE_URL = SITE.seo.url;

/** Build per-page metadata with sane OG/Twitter defaults. */
export function buildMetadata(opts: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const description = opts.description ?? SITE.seo.description;
  const url = `${BASE_URL}${opts.path ?? ""}`;
  const image = opts.image ?? SITE.seo.ogImage;

  return {
    title: opts.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description,
      url,
      siteName: SITE.name,
      images: [{ url: image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description,
      images: [image],
      creator: SITE.seo.twitterHandle,
    },
  };
}

/** JSON-LD: the coach as a Person. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    description: SITE.bio,
    url: BASE_URL,
    jobTitle: "Professional Brawlhalla Player & Coach",
    sameAs: [
      SITE.social.youtube,
      SITE.social.twitch,
      SITE.social.tiktok,
      SITE.social.discord,
    ],
  };
}

/** JSON-LD: a single coaching offering as a Product with an Offer. */
export function productJsonLd(product: Product) {
  const category = CATEGORIES.find((c) => c.id === product.category)?.name;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    category,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      // Prices are stored/advertised in USD; visitors can switch currency in-app.
      price: product.priceUSD.toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/product/${product.id}`,
    },
  };
}

/** JSON-LD: the storefront as an Organization. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: BASE_URL,
    sameAs: [
      SITE.social.youtube,
      SITE.social.twitch,
      SITE.social.tiktok,
      SITE.social.discord,
    ],
  };
}
