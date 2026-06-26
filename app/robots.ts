import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Don't index transient commerce routes.
      disallow: ["/cart", "/checkout"],
    },
    sitemap: `${SITE.seo.url}/sitemap.xml`,
  };
}
