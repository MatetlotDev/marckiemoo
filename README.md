# Marckiemoo — Coaching Store

Premium, dark-themed storefront for **Marckiemoo** — World Champion 2026 Brawlhalla
player, coach and creator. Every product is a coaching service (1v1, 2v2, replay
reviews, packs). Built to convert: fast, mobile-first, and easy to edit.

> **Frontend only.** The cart and checkout look and feel real, but **no payment is
> processed yet**. The payment layer is decoupled so a real provider (Stripe,
> Fourthwall, Cal.com…) can be plugged in without touching the UI.

---

## Tech stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** + custom shadcn-style UI components
- **Framer Motion** (subtle scroll/hover micro-animations)
- Cart & currency state: **React Context + localStorage** (no backend)
- SEO: `generateMetadata`, Open Graph / Twitter, `sitemap.ts`, `robots.ts`, JSON-LD

---

## Run it locally

```bash
npm install      # install dependencies
npm run dev      # start the dev server -> http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

Requires Node 18.18+ (tested on Node 22).

---

## Edit the content (no coding needed)

Everything customer-facing lives in **`/config`**. All copy is in English.

| What you want to change | File | How |
|---|---|---|
| **A price** | `config/products.ts` | Edit `priceUSD` (always USD; it auto-converts). |
| **Add / remove a product** | `config/products.ts` | Copy a product block, give it a unique `id` (the URL slug). Nothing else to wire up. |
| **Highlight an offer** | `config/products.ts` | Set `badge: "bestseller"` or `"best-value"`. |
| **Homepage featured items** | `config/products.ts` | Edit `FEATURED_PRODUCT_IDS`. |
| **Exchange rates / currencies** | `config/currencies.ts` | Edit each `rate` (1 USD = rate × currency). Add/remove currencies here. |
| **Default currency** | `config/currencies.ts` | Edit `DEFAULT_CURRENCY`. |
| **Bio, tagline, credentials** | `config/site.ts` | Edit the strings in `SITE`. |
| **Social links** | `config/site.ts` | Edit `SITE.social`. |
| **Testimonials** | `config/site.ts` | Fill in `SITE.testimonials` (placeholders for now). |
| **Alt payment (Cashapp)** | `config/site.ts` | Edit `SITE.altPayment`. |
| **Nav / footer links** | `config/site.ts` | Edit `NAV_LINKS` / `FOOTER_LINKS`. |
| **FAQ entries** | `app/faq/page.tsx` | Edit the `FAQ` array. |
| **Terms / Privacy** | `app/terms/page.tsx`, `app/privacy/page.tsx` | Replace placeholder copy. |

### Adding real images

By default the site shows branded gradient placeholders, so it never looks broken.
To use real photos:

1. Drop files in `/public/images/...`
2. Point each product's `image` at its file in `config/products.ts`
3. In `config/site.ts`, set `FEATURE.useProductImages = true`

Add a `1200×630` social image at `/public/images/og.jpg` for link previews.

---

## Wiring a real payment provider later

The UI never talks to a payment provider directly — only to a small service.

```
lib/checkout/
  types.ts            # CheckoutProvider contract + payloads
  mockProvider.ts     # current placeholder (no real payment)
  checkoutService.ts  # the UI calls startCheckout() — swap the provider here
```

To go live: implement `CheckoutProvider` for your provider (e.g. a Stripe Checkout
session) and assign it to `activeProvider` in `checkoutService.ts`. **No UI changes
needed.**

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com), **New Project → Import** the repo.
3. Framework preset auto-detects **Next.js** — no extra config needed.
4. Click **Deploy**.

After the first deploy, set the production URL in `config/site.ts` → `SITE.seo.url`
so canonical links, sitemap and Open Graph tags point to the right domain.

---

## Project structure

```
app/            # routes (home, shop, product, cart, checkout, about, legal…)
components/     # ui primitives + layout / home / shop / product / cart / checkout
config/         # ★ editable content: products, currencies, site
context/        # cart + currency providers (Context + localStorage)
lib/            # currency, seo, checkout service (decoupled)
public/images/  # real assets go here (placeholders until then)
```
