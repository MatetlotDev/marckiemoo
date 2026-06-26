import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS, SITE } from "@/config/site";
import { BRAWLHALLA } from "@/config/brawlhalla";
import { SocialLinks } from "@/components/common/SocialLinks";
import { CreatorAvatar } from "@/components/common/CreatorAvatar";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <CreatorAvatar size={34} />
              <span className="font-display text-lg font-bold">{SITE.shortName}</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">{SITE.tagline}</p>
            <SocialLinks />
            <div className="mt-2 flex items-center gap-2">
              <Image
                src={BRAWLHALLA.logo}
                alt="Brawlhalla"
                width={120}
                height={90}
                className="h-auto w-[96px] opacity-90"
              />
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Coaching
              </span>
            </div>
          </div>

          {/* Shop */}
          <FooterColumn title="Coaching" links={FOOTER_LINKS.shop} />
          {/* About */}
          <FooterColumn title="Marckiemoo" links={FOOTER_LINKS.about} />
          {/* Legal */}
          <FooterColumn title="Legal" links={FOOTER_LINKS.legal} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© 2026 {SITE.name}. All rights reserved.</p>
          <p>
            Alt payment: Cashapp{" "}
            <span className="font-semibold text-foreground">
              {SITE.altPayment.cashapp}
            </span>{" "}
            — message on Discord.
          </p>
        </div>

        {/* Independent coaching — not affiliated with Ubisoft / Blue Mammoth. */}
        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground/70">
          {BRAWLHALLA.disclaimer}
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
