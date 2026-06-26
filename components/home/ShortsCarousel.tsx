"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { SHORTS } from "@/config/site";

/**
 * Horizontal, swipeable carousel of YouTube Shorts preview frames.
 * The images are static frames (no inline player) — clicking a card opens the
 * Shorts feed (or a specific short if a `url` is set in config). Prev/Next
 * buttons scroll the row; on touch it's a native swipe.
 */
export function ShortsCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Prev / Next (desktop) */}
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollByAmount(-1)}
          aria-label="Previous Shorts"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount(1)}
          aria-label="Next Shorts"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <ul
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
        aria-label="YouTube Shorts"
      >
        {SHORTS.items.map((short, i) => (
          <li
            key={short.image}
            className="w-[170px] shrink-0 snap-start sm:w-[200px]"
          >
            <a
              href={short.url || SHORTS.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch Short ${i + 1} on YouTube`}
              className="group relative block aspect-[9/16] overflow-hidden rounded-xl border border-border bg-black transition-all duration-300 hover:border-primary/50 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Image
                src={short.image}
                alt={`Marckiemoo Short ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, 200px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Shadow + Shorts badge */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"
                aria-hidden
              />
              <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-white backdrop-blur">
                <Play className="h-2.5 w-2.5 fill-current" /> Shorts
              </span>

              {/* Decorative play button (no inline playback) */}
              <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-gradient text-white shadow-glow transition-transform duration-300 group-hover:scale-110">
                <Play className="h-5 w-5 translate-x-0.5 fill-current" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
