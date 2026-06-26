import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/config/site";
import { BRAWLHALLA } from "@/config/brawlhalla";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/common/SocialLinks";

export function FinalCta() {
  return (
    <section className="container py-20">
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card p-10 text-center sm:p-16">
        {/* Full Brawlhalla roster, heavily darkened. */}
        <Image
          src={BRAWLHALLA.roster}
          alt=""
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover opacity-20"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/85 to-background"
          aria-hidden
        />
        <div className="absolute inset-0 bg-radial-glow" aria-hidden />
        <div className="relative flex flex-col items-center">
          <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl">
            Ready to <span className="text-gradient">rank up like a legend?</span>
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Book a session with a World Champion and start fixing what&apos;s
            actually holding you back.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/shop">
                Browse coaching <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href={SITE.social.discord} target="_blank" rel="noopener noreferrer">
                Join the Discord
              </a>
            </Button>
          </div>
          <div className="mt-8">
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
