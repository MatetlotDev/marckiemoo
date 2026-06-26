import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { PRODUCTS } from "@/config/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.seo.url;
  const now = new Date();

  const staticRoutes = ["", "/shop", "/about", "/contact", "/faq", "/terms", "/privacy"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const productRoutes = PRODUCTS.map((p) => ({
    url: `${base}/product/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
