import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { SITE } from "@/config/site";
import { MARCKIEMOO } from "@/config/brawlhalla";
import { Button } from "@/components/ui/button";
import { CreatorAvatar } from "@/components/common/CreatorAvatar";
import { SocialLinks } from "@/components/common/SocialLinks";
import { Reveal } from "@/components/common/Reveal";

export function MeetYourCoach() {
  // Featured custom legend skin (his avatar head on a Brawlhalla legend body).
  const featured = MARCKIEMOO.legends[0];

  return (
    <section className="container py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Text / creator identity */}
        <Reveal>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <CreatorAvatar size={56} />
              <div className="flex flex-col">
                <span className="flex items-center gap-1.5 font-display text-xl font-bold">
                  {SITE.name}
                  <BadgeCheck className="h-5 w-5 text-primary" />
                </span>
                <span className="text-sm text-muted-foreground">
                  Creator · Coach · World Champion 2026
                </span>
              </div>
            </div>

            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              The creator behind the coaching
            </h2>
            <p className="text-muted-foreground">
              You&apos;ve probably seen me on YouTube, Twitch or TikTok. I don&apos;t
              just play {SITE.game} at the highest level — I break it down so you can
              actually learn from it. Book a session and get that same coaching
              one-on-one.
            </p>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer">
                  Watch on YouTube <ArrowRight />
                </a>
              </Button>
              <SocialLinks />
            </div>
          </div>
        </Reveal>

        {/* His custom legend skin — floating cutout */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto flex h-[360px] w-full max-w-md items-end justify-center sm:h-[440px]">
            <div className="absolute inset-0 bg-grid opacity-20" aria-hidden />
            <Image
              src={featured.src}
              alt={`Marckiemoo as ${featured.as}`}
              fill
              sizes="(max-width: 1024px) 90vw, 440px"
              priority
              unoptimized
              className="animate-floaty object-contain p-2 drop-shadow-[0_22px_44px_rgba(0,0,0,0.55)]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
