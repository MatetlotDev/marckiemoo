// =============================================================================
// config/site.ts
// -----------------------------------------------------------------------------
// Identity, credibility, links and marketing copy — all editable here.
// Everything customer-facing is in ENGLISH (US / international audience).
//
// HOW TO EDIT (no coding needed):
//   • Bio / tagline / credentials -> edit the strings below.
//   • Social links                -> edit SITE.social.
//   • Testimonials                -> fill in SITE.testimonials (placeholders now).
//   • Alternative payment         -> edit SITE.altPayment.
//   • When real product photos are ready, set FEATURE.useProductImages = true.
// =============================================================================

export const SITE = {
  name: "Marckiemoo",
  /** Used in <title> templates and the header. */
  shortName: "Marckiemoo",
  tagline: "Train With a Medalist. Rise Like a Legend.",
  /** One-line bio / credibility strip. */
  bio: "PR 1 · Professional Player · Tournament Winner · Peak 3000 Elo · World Champion 2026",
  /** Slightly longer intro used on the homepage hero subheading. */
  heroIntro:
    "World Champion Brawlhalla coaching. 1v1, 2v2 and replay reviews built to take you from stuck to ranking up — fast.",
  game: "Brawlhalla",

  /** Headline credentials shown in the credibility bar (Home + About). */
  credentials: [
    { value: "PR 1", label: "Power Ranking" },
    { value: "2026", label: "World Champion" },
    { value: "3000", label: "Peak Elo" },
    { value: "100s", label: "Players Coached" }, // placeholder — adjust the real number
  ],

  social: {
    youtube: "https://youtube.com/@Marckiemoo",
    twitch: "https://twitch.tv/marckiemoo",
    tiktok: "https://tiktok.com/@marckiemoobh",
    discord: "https://discord.gg/fKAZrBkJhS",
  },

  /** Alternative payment, surfaced on the checkout + FAQ pages. */
  altPayment: {
    cashapp: "Marckiemo0",
    note: "If you can't or don't feel like using PayPal — send a screenshot on Discord.",
  },

  /** Support contact shown on the Contact page. */
  contact: {
    discord: "https://discord.gg/fKAZrBkJhS",
    email: "", // optional — add a support email here if you want one shown
  },

  /** "How it works" — 4 simple steps shown on the homepage. */
  howItWorks: [
    {
      title: "Pick your format",
      text: "Choose 1v1, 2v2 or a replay review — and the length that fits you.",
    },
    {
      title: "Book & checkout",
      text: "Add it to your cart and check out. Fast, clear, no hassle.",
    },
    {
      title: "Get your slot on Discord",
      text: "I reach out on Discord to lock in your session time.",
    },
    {
      title: "Train & rank up",
      text: "We work through your game, you get a plan, and you start ranking up.",
    },
  ],

  /**
   * Testimonials — STRUCTURED PLACEHOLDERS. Replace text/name/rank/avatar with
   * real student results. Leave avatar empty to show initials automatically.
   */
  testimonials: [
    {
      name: "[Student name]",
      rank: "Gold → Platinum",
      text: "[Add a real student quote here — e.g. how many ranks they gained and what clicked.]",
      avatar: "", // e.g. "/images/testimonials/1.jpg"
    },
    {
      name: "[Student name]",
      rank: "Platinum → Diamond",
      text: "[Add a real student quote here.]",
      avatar: "",
    },
    {
      name: "[Student name]",
      rank: "Diamond grinder",
      text: "[Add a real student quote here.]",
      avatar: "",
    },
  ],

  /** SEO defaults — overridden per-page via generateMetadata. */
  seo: {
    url: "https://marckiemoo.com",
    description:
      "Coaching from a World Champion Brawlhalla player. 1v1, 2v2 and replay reviews to help you rank up faster.",
    /** OG/Twitter share image (add the file to /public). */
    ogImage: "/images/og.jpg",
    twitterHandle: "@marckiemoobh",
  },
} as const;

/**
 * YouTube Shorts carousel on the homepage.
 * NOTE: These are preview frames from /public/assets/shorts (real inline players
 * aren't embedded). Each card opens the Shorts feed on YouTube. To point a card
 * at a specific short, add its `url` (e.g. "https://youtube.com/shorts/<id>").
 */
export const SHORTS = {
  channelUrl: "https://www.youtube.com/@marckiemoo/shorts",
  items: [
    { image: "/assets/shorts/short1.png", url: "" },
    { image: "/assets/shorts/short2.png", url: "" },
    { image: "/assets/shorts/short3.png", url: "" },
    { image: "/assets/shorts/short4.png", url: "" },
    { image: "/assets/shorts/short5.png", url: "" },
    { image: "/assets/shorts/short6.png", url: "" },
    { image: "/assets/shorts/short7.png", url: "" },
  ],
} as const;

/**
 * Feature flags — small toggles Marckiemoo can flip without touching components.
 */
export const FEATURE = {
  /**
   * false  -> render branded gradient placeholders for products (default; no
   *           image files needed).
   * true   -> use the real images set in config/products.ts via next/image.
   */
  useProductImages: false,
} as const;

/** Footer nav groups. */
export const FOOTER_LINKS = {
  shop: [
    { label: "All Coaching", href: "/shop" },
    { label: "1v1 Coaching", href: "/shop?category=1v1" },
    { label: "2v2 Coaching", href: "/shop?category=2v2" },
    { label: "Replay Reviews", href: "/shop?category=replay-reviews" },
    { label: "Packs & More", href: "/shop?category=packs" },
  ],
  about: [
    { label: "About Marckiemoo", href: "/about" },
    { label: "Contact & Support", href: "/contact" },
    { label: "Returns & FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
} as const;

/** Primary navigation in the header. */
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
] as const;
