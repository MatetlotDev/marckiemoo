"use client";

import { useState } from "react";
import { X } from "lucide-react";

/**
 * Floating "demo site" badge shown on every page. Marks this build as a
 * front-end preview (the checkout is mocked — no real payments). Dismissible
 * for the current session; reappears on a full reload.
 *
 * Positioning/centering lives on the OUTER wrapper; the inner pill does a
 * one-shot CSS entrance (.animate-demo-in). We deliberately avoid a JS/transform
 * animation library here so the inline transform can't override the wrapper's
 * `-translate-x-1/2` centering.
 */
export function DemoBanner() {
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-50 w-max max-w-[calc(100vw-1.5rem)] -translate-x-1/2">
      <div
        role="status"
        className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-primary/40 bg-card/95 py-2 pl-4 pr-2 text-xs shadow-glow sm:text-sm"
      >
        {/* Status dot */}
        <span className="h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />

        <span className="font-semibold text-foreground">Demo site</span>
        <span className="hidden text-muted-foreground sm:inline">
          — front-end preview, no real payments
        </span>

        <button
          type="button"
          onClick={() => setHidden(true)}
          aria-label="Dismiss demo notice"
          className="ml-0.5 flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-card hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
