// =============================================================================
// config/products.ts
// -----------------------------------------------------------------------------
// The full coaching catalogue. Prices are ALWAYS in USD and converted to the
// visitor's currency at display time (see config/currencies.ts + lib/currency).
//
// HOW TO EDIT (no coding needed):
//   • Change a price        -> edit `priceUSD`.
//   • Add a product         -> copy a block, give it a unique `id` (the URL
//                              slug), set the fields. Nothing else to wire up.
//   • Highlight an offer     -> set `badge: "bestseller"` or `"best-value"`.
//   • Reorder               -> just move the objects; the shop respects order.
//   • Swap in a real image  -> drop the file in /public/images/products and set
//                              `image`, then flip FEATURE.useProductImages to
//                              true in config/site.ts.
// =============================================================================

export type CategoryId = "1v1" | "2v2" | "replay-reviews" | "packs";

export interface Category {
  id: CategoryId;
  /** Shown in shop filters and section titles. */
  name: string;
  /** One-line description of the category. */
  description: string;
}

export interface Product {
  /** Unique slug — becomes the URL /product/[id]. Keep it lowercase-dashed. */
  id: string;
  name: string;
  category: CategoryId;
  /** Base price in USD. */
  priceUSD: number;
  /** Session length in minutes — used for "sort by duration" (optional). */
  durationMinutes?: number;
  /** One benefit-driven line shown on the product card. */
  shortDescription: string;
  /** Longer paragraph shown on the product detail page. */
  description: string;
  /** Bullet list — "what you'll get out of it". */
  whatYouGet: string[];
  /** Who this is for (skill level). */
  forWho?: string;
  /** Step-by-step of how the session goes. */
  sessionFlow?: string[];
  /** Image path under /public. Until real assets exist, a branded placeholder
   *  is rendered automatically (see FEATURE.useProductImages in site.ts). */
  image: string;
  /** Optional highlight badge. */
  badge?: "bestseller" | "best-value";
  /** Show a quantity stepper on the product page (buy multiple sessions). */
  allowQuantity?: boolean;
}

export const CATEGORIES: Category[] = [
  {
    id: "1v1",
    name: "1v1 Coaching",
    description: "One-on-one sessions built around your gameplay and your goals.",
  },
  {
    id: "2v2",
    name: "2v2 Coaching",
    description: "Master synergy, rotations and doubles strategy with your partner.",
  },
  {
    id: "replay-reviews",
    name: "Replay Reviews",
    description: "I break down your replays and tell you exactly what to fix.",
  },
  {
    id: "packs",
    name: "Packs & More",
    description: "Bundled value for serious, long-term grinders.",
  },
];

export const PRODUCTS: Product[] = [
  // ── 1v1 Coaching ──────────────────────────────────────────────────────────
  {
    id: "1v1-15min",
    name: "1v1 Coaching — 15 min",
    category: "1v1",
    priceUSD: 8.99,
    durationMinutes: 15,
    shortDescription: "A laser-focused 15 minutes on the single habit holding you back.",
    description:
      "Short on time but stuck on something specific? In 15 focused minutes we pinpoint the one habit costing you the most games and give you a clear way to fix it. Perfect for a quick tune-up before a ranked grind.",
    whatYouGet: [
      "A live look at your gameplay",
      "One concrete focus area to work on",
      "Actionable homework you can apply immediately",
    ],
    forWho: "Gold → Diamond players who want a quick, targeted fix.",
    sessionFlow: ["Quick goal check", "Live review or play", "Your #1 takeaway + next step"],
    image: "/images/products/1v1-15.jpg",
    allowQuantity: true,
  },
  {
    id: "1v1-30min",
    name: "1v1 Coaching — 30 min",
    category: "1v1",
    priceUSD: 17.99,
    durationMinutes: 30,
    shortDescription: "The sweet spot — enough time to fix a real weakness and lock in a plan.",
    description:
      "My most popular session. Thirty minutes is enough to dig into your decision-making, spacing and matchups, fix a genuine weakness, and leave with a plan you can actually follow. We play, we review, you improve.",
    whatYouGet: [
      "In-depth review of your strengths and gaps",
      "Two to three concrete things to fix",
      "A simple practice plan for the week",
    ],
    forWho: "Any player serious about reaching the next rank.",
    sessionFlow: ["Goals & current rank", "Live play + breakdown", "Personalized practice plan"],
    image: "/images/products/1v1-30.jpg",
    badge: "bestseller",
    allowQuantity: true,
  },
  {
    id: "1v1-45min",
    name: "1v1 Coaching — 45 min",
    category: "1v1",
    priceUSD: 26.99,
    durationMinutes: 45,
    shortDescription: "Go deep — multiple matchups, neutral game and edgeguarding in one sitting.",
    description:
      "Forty-five minutes gives us room to go beyond a single fix. We cover several matchups, sharpen your neutral game and edgeguarding, and build a layered plan so your improvement compounds instead of plateauing.",
    whatYouGet: [
      "Multi-matchup breakdown",
      "Neutral, recovery and edgeguard coaching",
      "Layered improvement plan",
    ],
    forWho: "Plat → Diamond players ready to grind out a real level-up.",
    sessionFlow: ["Deep goal setting", "Extended play + review", "Structured roadmap"],
    image: "/images/products/1v1-45.jpg",
    allowQuantity: true,
  },
  {
    id: "1v1-1hr",
    name: "1v1 Coaching — 1 hr",
    category: "1v1",
    priceUSD: 34.99,
    durationMinutes: 60,
    shortDescription: "The full deep-dive — no stone left unturned in your game.",
    description:
      "A full hour to rebuild the weak parts of your game from the ground up. We cover fundamentals, advanced spacing, mental game and matchup theory, then leave you with a complete roadmap. The closest thing to training with a World Champion.",
    whatYouGet: [
      "Complete review of your gameplay",
      "Fundamentals through advanced concepts",
      "Mental game & matchup coaching",
      "Full written improvement roadmap",
    ],
    forWho: "Players who want a complete, no-compromise coaching session.",
    sessionFlow: ["Full goal interview", "Hands-on play + deep review", "Complete roadmap"],
    image: "/images/products/1v1-60.jpg",
    allowQuantity: true,
  },

  // ── 2v2 Coaching ──────────────────────────────────────────────────────────
  {
    id: "2v2-15min",
    name: "2v2 Coaching — 15 min",
    category: "2v2",
    priceUSD: 9.99,
    durationMinutes: 15,
    shortDescription: "A quick doubles tune-up to fix your team's biggest mistake.",
    description:
      "Bring your partner (or come solo) for a fast doubles tune-up. In 15 minutes we spot the rotation or target-priority mistake that's losing you games and show you how to fix it together.",
    whatYouGet: ["Quick team review", "One rotation or priority fix", "Immediate homework"],
    forWho: "Duos who want a fast, focused correction.",
    sessionFlow: ["Team goal check", "Live doubles review", "Key takeaway"],
    image: "/images/products/2v2-15.jpg",
    allowQuantity: true,
  },
  {
    id: "2v2-30min",
    name: "2v2 Coaching — 30 min",
    category: "2v2",
    priceUSD: 19.99,
    durationMinutes: 30,
    shortDescription: "Build real synergy — rotations, target priority and team spacing.",
    description:
      "Thirty minutes to turn two solo players into a real team. We work on rotations, target priority, double-team timing and team spacing so you stop trading and start dominating doubles.",
    whatYouGet: [
      "Synergy & rotation coaching",
      "Target priority and timing",
      "A team practice plan",
    ],
    forWho: "Duos serious about ranking up in 2v2 together.",
    sessionFlow: ["Team goals", "Live doubles + breakdown", "Team practice plan"],
    image: "/images/products/2v2-30.jpg",
    allowQuantity: true,
  },
  {
    id: "2v2-45min",
    name: "2v2 Coaching — 45 min",
    category: "2v2",
    priceUSD: 25.99,
    durationMinutes: 45,
    shortDescription: "Deep doubles work — punishes, double-teams and momentum control.",
    description:
      "Forty-five minutes of focused doubles coaching. We cover advanced double-team setups, punish windows, momentum swings and how to close out games as a unit. Built for teams that want to rank up fast.",
    whatYouGet: [
      "Advanced double-team setups",
      "Punish windows & momentum control",
      "Closing-out strategy",
    ],
    forWho: "Established duos pushing for higher ranks.",
    sessionFlow: ["Deep team goals", "Extended doubles review", "Structured team roadmap"],
    image: "/images/products/2v2-45.jpg",
    allowQuantity: true,
  },
  {
    id: "2v2-1hr",
    name: "2v2 Coaching — 1 hr",
    category: "2v2",
    priceUSD: 31.99,
    durationMinutes: 60,
    shortDescription: "The complete doubles masterclass for serious teams.",
    description:
      "A full hour to master 2v2 as a team. From fundamentals of rotation to advanced double-team theory and mental coordination, we leave nothing untouched and give you a complete team roadmap.",
    whatYouGet: [
      "Complete doubles breakdown",
      "Rotation through advanced theory",
      "Team communication coaching",
      "Full team roadmap",
    ],
    forWho: "Teams that want the full doubles masterclass.",
    sessionFlow: ["Full team interview", "Hands-on doubles + review", "Complete team roadmap"],
    image: "/images/products/2v2-60.jpg",
    allowQuantity: true,
  },

  // ── Replay Reviews ─────────────────────────────────────────────────────────
  {
    id: "replay-review-1",
    name: "1 Replay Review",
    category: "replay-reviews",
    priceUSD: 6.99,
    shortDescription: "Send me a replay — I tell you exactly what to fix.",
    description:
      "Can't make a live session? Send me one replay and I'll break it down frame by frame: your mistakes, your missed punishes and the exact habits to change. You get clear, written feedback you can rewatch any time.",
    whatYouGet: [
      "Detailed breakdown of one replay",
      "Your key mistakes, clearly explained",
      "Specific fixes to work on",
    ],
    forWho: "Players who prefer detailed async feedback.",
    image: "/images/products/replay-1.jpg",
    allowQuantity: true,
  },
  {
    id: "replay-review-2",
    name: "2 Replay Reviews",
    category: "replay-reviews",
    priceUSD: 11.99,
    shortDescription: "Two replays reviewed — spot the patterns across your games.",
    description:
      "Two replays let me spot the patterns that one game can hide. I break down both, connect the recurring mistakes, and give you a focused list of fixes that will move your win rate.",
    whatYouGet: ["Two full replay breakdowns", "Pattern analysis across games", "Prioritized fix list"],
    forWho: "Players who want to see their recurring habits.",
    image: "/images/products/replay-2.jpg",
    allowQuantity: true,
  },
  {
    id: "replay-review-3",
    name: "3 Replay Reviews",
    category: "replay-reviews",
    priceUSD: 15.99,
    shortDescription: "Three replays — a full read on your strengths and leaks.",
    description:
      "Three replays give me a complete read on your game. I review all three, map your strengths and your biggest leaks, and hand you a clear improvement plan to start ranking up.",
    whatYouGet: ["Three full breakdowns", "Strengths & weaknesses map", "Improvement plan"],
    forWho: "Players who want a thorough async coaching package.",
    image: "/images/products/replay-3.jpg",
    badge: "best-value",
    allowQuantity: true,
  },
  {
    id: "replay-review-4",
    name: "4 Replay Reviews",
    category: "replay-reviews",
    priceUSD: 18.99,
    shortDescription: "Four replays — deep async coaching at a better rate.",
    description:
      "Four replays reviewed in depth. The more I see, the sharper the feedback — and the better the value per replay. Ideal if you want consistent, detailed guidance without booking live time.",
    whatYouGet: ["Four full breakdowns", "Deep pattern analysis", "Detailed improvement plan"],
    forWho: "Dedicated players grinding async improvement.",
    image: "/images/products/replay-4.jpg",
    allowQuantity: true,
  },
  {
    id: "replay-review-5",
    name: "5 Replay Reviews",
    category: "replay-reviews",
    priceUSD: 23.99,
    shortDescription: "Five replays — the complete async review package, best per-replay rate.",
    description:
      "The complete async package: five replays reviewed in full at the best per-replay rate. I track your progress across all five and build a step-by-step roadmap so your improvement actually sticks.",
    whatYouGet: [
      "Five full breakdowns",
      "Progress tracking across games",
      "Step-by-step roadmap",
    ],
    forWho: "Players committed to a serious async grind.",
    image: "/images/products/replay-5.jpg",
    allowQuantity: true,
  },

  // ── Packs & More ───────────────────────────────────────────────────────────
  {
    id: "long-term-improvement-pack",
    name: "Long Term Improvement Pack — 5 hrs",
    category: "packs",
    priceUSD: 149.99,
    durationMinutes: 300,
    shortDescription:
      "The full rank-up: 5 hours of structured coaching from a World Champion.",
    description:
      "My flagship program. Five hours of coaching, structured across multiple sessions, with a personalized improvement plan, progress tracking between sessions and priority access to me on Discord. This is how you go from stuck to ranking up — for real.",
    whatYouGet: [
      "5 hours of coaching total",
      "A personalized, long-term improvement plan",
      "Progress tracking between sessions",
      "Priority Discord access",
      "The best per-hour value I offer",
    ],
    forWho: "Anyone serious about ranking up fast and for good.",
    sessionFlow: [
      "Kickoff: full assessment & goals",
      "Multiple focused coaching sessions",
      "Ongoing tracking & adjustments",
      "Final review & next-level roadmap",
    ],
    image: "/images/products/long-term-pack.jpg",
    badge: "best-value",
  },
  {
    id: "climbing-pack",
    name: "Rank-Up Pack (Golds & Plats)",
    category: "packs",
    priceUSD: 29.99,
    shortDescription: "A targeted bundle built to push Gold and Plat players over the hump.",
    description:
      "Stuck in Gold or Plat? This bundle is built specifically for the habits that keep players at that level. We fix your fundamentals, your punish game and your decision-making so you can finally break through to the next rank.",
    whatYouGet: [
      "Coaching focused on the Gold/Plat plateau",
      "Fundamentals & punish-game fixes",
      "A clear path to your next rank",
    ],
    forWho: "Gold and Plat players ready to break through.",
    image: "/images/products/climbing-pack.jpg",
    badge: "bestseller",
  },
  {
    id: "2v2-ranked-with-me",
    name: "2v2 Ranked With Me — 30 min",
    category: "packs",
    priceUSD: 14.99,
    durationMinutes: 30,
    shortDescription: "Queue ranked 2v2 with a World Champion as your partner — learn while you rank up.",
    description:
      "Want to learn by doing? Queue ranked 2v2 with me as your partner for 30 minutes. You'll pick up positioning, rotations and decision-making in real games while we rack up wins together. Coaching and ranking up at the same time.",
    whatYouGet: [
      "30 minutes of ranked 2v2 with me as your partner",
      "Live, in-game guidance",
      "Real wins and real lessons at once",
    ],
    forWho: "Players who learn best in live, competitive games.",
    sessionFlow: ["Quick sync on Discord", "Queue ranked 2v2 together", "On-the-fly coaching"],
    image: "/images/products/2v2-ranked.jpg",
    allowQuantity: true,
  },
];

// ── Helpers (used by pages — no need to edit) ────────────────────────────────
export const getProduct = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === slug);

export const getProductsByCategory = (cat: CategoryId): Product[] =>
  PRODUCTS.filter((p) => p.category === cat);

export const getCategory = (id: CategoryId): Category | undefined =>
  CATEGORIES.find((c) => c.id === id);

/** Products chosen for the homepage "Featured" section (by id, in order). */
export const FEATURED_PRODUCT_IDS: string[] = [
  "long-term-improvement-pack",
  "1v1-30min",
  "climbing-pack",
  "2v2-ranked-with-me",
];

export const getFeaturedProducts = (): Product[] =>
  FEATURED_PRODUCT_IDS.map((id) => getProduct(id)).filter(
    (p): p is Product => Boolean(p),
  );
