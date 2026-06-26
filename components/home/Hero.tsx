import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { SITE } from "@/config/site";
import { BRAWLHALLA, getLegend } from "@/config/brawlhalla";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/common/SocialLinks";

export function Hero() {
  const leftLegend = getLegend("Mordex");
  const rightLegend = getLegend("Zariel");

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow" aria-hidden />
      <div className="absolute inset-0 bg-grid" aria-hidden />

      {/* Flanking Brawlhalla legends (desktop only, decorative) */}
      {leftLegend && (
        <div
          className="pointer-events-none absolute -left-10 bottom-0 hidden h-[78%] w-[22rem] xl:w-[26rem] lg:block"
          aria-hidden
        >
          <Image
            src={leftLegend.src}
            alt=""
            fill
            sizes="26rem"
            className="animate-floaty object-contain object-bottom opacity-90 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] [mask-image:linear-gradient(to_bottom,black_82%,transparent)]"
          />
        </div>
      )}
      {rightLegend && (
        <div
          className="pointer-events-none absolute -right-8 bottom-0 hidden h-[70%] w-[24rem] xl:w-[30rem] lg:block"
          aria-hidden
        >
          <Image
            src={rightLegend.src}
            alt=""
            fill
            sizes="30rem"
            style={{ animationDelay: "1.5s" }}
            className="animate-floaty object-contain object-bottom opacity-90 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] [mask-image:linear-gradient(to_bottom,black_82%,transparent)]"
          />
        </div>
      )}

      <div className="container relative z-10 flex flex-col items-center py-20 text-center sm:py-28">
        {/* Game logo — this is Brawlhalla coaching */}
        <div className="mb-7 flex flex-col items-center gap-2">
          <Image
            src={BRAWLHALLA.logo}
            alt="Brawlhalla"
            width={200}
            height={150}
            priority
            className="h-auto w-[150px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] sm:w-[180px]"
          />
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Coaching
          </span>
        </div>

        {/* Credibility pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          <Trophy className="h-4 w-4" />
          World Champion 2026 · PR 1 · Peak 3000 Elo
        </div>

        <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          <span className="text-gradient">{SITE.tagline}</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          {SITE.heroIntro}
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/shop">
              Book your coaching <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/about">Why train with me</Link>
          </Button>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Follow the grind
          </span>
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
