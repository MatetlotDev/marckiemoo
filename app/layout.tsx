import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE } from "@/config/site";
import { Providers } from "@/context/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/common/JsonLd";
import { DemoBanner } from "@/components/common/DemoBanner";
import { organizationJsonLd, personJsonLd } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.seo.url),
  title: {
    default: `${SITE.name} — World Champion Brawlhalla Coaching`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.seo.description,
  applicationName: SITE.name,
  keywords: [
    "Brawlhalla coaching",
    "Brawlhalla coach",
    "World Champion",
    "1v1 coaching",
    "2v2 coaching",
    "replay review",
    "Marckiemoo",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.seo.url,
    title: `${SITE.name} — World Champion Brawlhalla Coaching`,
    description: SITE.seo.description,
    images: [{ url: SITE.seo.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    creator: SITE.seo.twitterHandle,
    title: `${SITE.name} — World Champion Brawlhalla Coaching`,
    description: SITE.seo.description,
    images: [SITE.seo.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <JsonLd data={personJsonLd()} />
        <JsonLd data={organizationJsonLd()} />
        {/* Skip link for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-4 focus:py-2 focus:text-foreground focus:ring-2 focus:ring-ring"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        <DemoBanner />
      </body>
    </html>
  );
}
