import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Trophy, Target, Brain, Zap } from "lucide-react";
import { SITE } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/PageHero";
import { CredibilityBar } from "@/components/home/CredibilityBar";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/common/SocialLinks";
import { CreatorAvatar } from "@/components/common/CreatorAvatar";
import { getMarckiemooSkin } from "@/config/brawlhalla";

export const metadata: Metadata = buildMetadata({
  title: "About Marckiemoo",
  description:
    "World Champion 2026, PR 1, Peak 3000 Elo. Meet Marckiemoo and learn why players trust him to help them rank up in Brawlhalla.",
  path: "/about",
});

const WHY = [
  {
    icon: Trophy,
    title: "Proven at the highest level",
    text: "World Champion 2026, PR 1 and a peak of 3000 Elo. You're learning from someone who has actually done it.",
  },
  {
    icon: Target,
    title: "Coaching tailored to you",
    text: "No copy-paste advice. Every session is built around your gameplay, your rank and your goals.",
  },
  {
    icon: Brain,
    title: "Fundamentals to mind games",
    text: "From spacing and neutral to matchup theory and mental game — I coach the whole player, not just mechanics.",
  },
  {
    icon: Zap,
    title: "Fast, clear improvement",
    text: "You leave every session knowing exactly what to work on next. Real, measurable progress.",
  },
];

export default function AboutPage() {
  const heroSkin = getMarckiemooSkin("Mordex");
  const ctaSkin = getMarckiemooSkin("Mirage");

  return (
    <>
      <PageHero
        eyebrow="About"
        title="Meet Marckiemoo"
        subtitle={SITE.bio}
        skinSrc={heroSkin?.src}
      />

      <CredibilityBar />

      {/* Story */}
      <section className="container py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-5 text-base leading-relaxed text-foreground/90">
            <div className="flex items-center gap-4">
              <CreatorAvatar size={64} priority />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-foreground">
                  {SITE.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  YouTube · Twitch · TikTok creator
                </span>
              </div>
            </div>
            <h2 className="font-display text-2xl font-bold">My story</h2>
            <p>
              I&apos;m Marckiemoo — a professional {SITE.game} player, tournament
              winner and the 2026 World Champion. I&apos;ve spent years at the very
              top of the ladder, peaking at 3000 Elo and holding a PR 1 ranking.
            </p>
            <p>
              But being good at the game and being good at <em>teaching</em> the
              game are two different things. Over hundreds of coaching sessions
              I&apos;ve learned how to spot exactly what&apos;s holding a player
              back — and how to explain the fix in a way that actually sticks.
            </p>
            <p>
              Whether you&apos;re a Gold player tired of hard-stuck losses or a
              Diamond grinder chasing the next tier, I&apos;ll meet you where you
              are and build a clear path to where you want to be.
            </p>

            <div className="mt-2">
              <SocialLinks />
            </div>
          </div>

          {/* Quick palmarès card */}
          <aside className="h-fit rounded-lg border border-border bg-card p-6">
            <h3 className="font-display text-lg font-semibold">Palmarès</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              {[
                "World Champion 2026",
                "Power Ranking #1 (PR 1)",
                "Peak 3000 Elo",
                "Multiple tournament wins",
                "Hundreds of players coached",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Trophy className="h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Why train with me */}
      <section className="border-y border-border bg-card/30">
        <div className="container py-16">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Why train with me
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {WHY.map((w) => (
              <div
                key={w.title}
                className="flex gap-4 rounded-lg border border-border bg-card p-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <w.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{w.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — with Marckiemoo (Mirage) floating bottom-left, just above the footer */}
      <section className="relative overflow-hidden">
        {ctaSkin && (
          <div
            className="pointer-events-none absolute -left-8 bottom-0 hidden h-[120%] w-[15rem] md:block lg:w-[19rem]"
            aria-hidden
          >
            <Image
              src={ctaSkin.src}
              alt=""
              fill
              sizes="19rem"
              unoptimized
              className="animate-floaty object-contain object-bottom opacity-90 drop-shadow-[0_16px_36px_rgba(0,0,0,0.6)] [mask-image:linear-gradient(to_bottom,black_85%,transparent)]"
            />
          </div>
        )}
        <div className="container relative z-10 py-24 text-center">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Let&apos;s get you ranking up
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Pick the format that fits you and book your first session today.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/shop">
              Browse coaching <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
