// =============================================================================
// config/brawlhalla.ts
// -----------------------------------------------------------------------------
// Brawlhalla game assets (logo, banners, official legend artwork) and how they
// map onto the site. These are the real images dropped in /public/assets.
//
// HOW TO EDIT:
//   • Add a legend     -> drop the .webp in /public/assets/characters and add a
//                         line to LEGENDS.
//   • Change a product's legend art -> edit PRODUCT_LEGEND (keyed by product id).
//     Any product without an entry falls back to a stable auto-pick.
// =============================================================================

export const BRAWLHALLA = {
  /** Full Brawlhalla wordmark logo (transparent). */
  logo: "/assets/logo/Brawlhalla_Logo_100M_Full.webp",
  /** Wide key-art banner. */
  header: "/assets/banners/header.jpg",
  /** Full roster splash (used as a darkened section background). */
  roster: "/assets/banners/capsule_616x353.jpg",
  /** Shown in the footer — independent coaching, not an official partner. */
  disclaimer:
    "Brawlhalla and all related characters and artwork are property of Blue Mammoth Games / Ubisoft. This is an independent coaching service and is not affiliated with or endorsed by Ubisoft.",
} as const;

export interface Legend {
  /** In-game legend name. */
  name: string;
  /** Transparent artwork path under /public/assets/characters. */
  src: string;
}

export const LEGENDS: Legend[] = [
  { name: "Zariel", src: "/assets/characters/Official_Artwork_Zariel.webp" },
  { name: "Mordex", src: "/assets/characters/Official_Artwork_Mordex.webp" },
  { name: "Artemis", src: "/assets/characters/Official_Artwork_Artemis.webp" },
  { name: "Azoth", src: "/assets/characters/Official_Artwork_Azoth.webp" },
  { name: "Asuri", src: "/assets/characters/Official_Artwork_Asuri.webp" },
  { name: "Ada", src: "/assets/characters/Official_Artwork_Ada.webp" },
  { name: "Cross", src: "/assets/characters/Official_Artwork_Cross.webp" },
  { name: "Onyx", src: "/assets/characters/Official_Artwork_Onyx.webp" },
  { name: "Sidra", src: "/assets/characters/Official_Artwork_Sidra.webp" },
  { name: "Arcadia", src: "/assets/characters/Official_Artwork_Arcadia.webp" },
];

const LEGEND_BY_NAME = Object.fromEntries(LEGENDS.map((l) => [l.name, l])) as Record<
  string,
  Legend
>;

/** Hand-picked legend per product so each shop card shows varied game art. */
export const PRODUCT_LEGEND: Record<string, string> = {
  "1v1-15min": "Asuri",
  "1v1-30min": "Zariel",
  "1v1-45min": "Cross",
  "1v1-1hr": "Ada",
  "2v2-15min": "Onyx",
  "2v2-30min": "Sidra",
  "2v2-45min": "Arcadia",
  "2v2-1hr": "Mordex",
  "replay-review-1": "Azoth",
  "replay-review-2": "Cross",
  "replay-review-3": "Asuri",
  "replay-review-4": "Onyx",
  "replay-review-5": "Zariel",
  "long-term-improvement-pack": "Artemis",
  "climbing-pack": "Mordex",
  "2v2-ranked-with-me": "Sidra",
};

/** Stable fallback pick so any product always gets a legend. */
function fallbackLegend(productId: string): Legend {
  let hash = 0;
  for (let i = 0; i < productId.length; i++) {
    hash = (hash * 31 + productId.charCodeAt(i)) >>> 0;
  }
  return LEGENDS[hash % LEGENDS.length];
}

/** Resolve the legend art for a product. */
export function legendForProduct(productId: string): Legend {
  const name = PRODUCT_LEGEND[productId];
  return (name && LEGEND_BY_NAME[name]) || fallbackLegend(productId);
}

/** Convenience getters for hero / decorative placements. */
export const getLegend = (name: string): Legend | undefined => LEGEND_BY_NAME[name];

// -----------------------------------------------------------------------------
// Marckiemoo's own creator art: his real YouTube avatar + custom Brawlhalla
// legend skins wearing his avatar head. Used to tie the coach to the creator.
// NOTE: the legend images sit on a solid BLACK background (no transparency), so
// they're shown inside framed cards (object-cover) — never as floating cut-outs.
// -----------------------------------------------------------------------------
export const MARCKIEMOO = {
  /** Real YouTube channel avatar (used as the brand mark in header/footer). */
  avatar: "/assets/marckiemoo/youtube_miniature.jpg",
  /** Custom legend skins with his avatar head. `as` = the legend it's based on. */
  legends: [
    { as: "Bödvar", src: "/assets/marckiemoo/marckiemoo_bodvar.png" },
    { as: "Mirage", src: "/assets/marckiemoo/marckiemoo_mirage.png" },
    { as: "Mordex", src: "/assets/marckiemoo/marckiemoo_mordex.png" },
  ],
} as const;
