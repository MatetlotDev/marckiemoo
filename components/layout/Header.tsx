"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/config/site";
import { CurrencySelector } from "./CurrencySelector";
import { CartButton } from "./CartButton";
import { CreatorAvatar } from "@/components/common/CreatorAvatar";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo / wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => setOpen(false)}
        >
          <CreatorAvatar size={34} priority />
          <span className="font-display text-lg font-bold tracking-tight">
            {SITE.shortName}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex" aria-label="Primary">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive(link.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <CurrencySelector className="hidden sm:flex" />
          <CartButton />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-foreground md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container flex flex-col gap-1 py-4" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-3 text-base font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-card text-foreground"
                    : "text-muted-foreground hover:bg-card hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-border px-3 pt-4">
              <span className="text-sm text-muted-foreground">Currency</span>
              <CurrencySelector />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
