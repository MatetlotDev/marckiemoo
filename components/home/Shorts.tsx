import { SITE } from "@/config/site";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CreatorAvatar } from "@/components/common/CreatorAvatar";
import { SocialLinks } from "@/components/common/SocialLinks";
import { ShortsCarousel } from "./ShortsCarousel";

/**
 * Homepage Shorts section — a swipeable carousel of YouTube Shorts, with smaller
 * social links underneath. Replaces the old channel-tiles section.
 */
export function Shorts() {
  return (
    <section className="border-y border-border bg-card/30">
      <div className="container py-20">
        <div className="mb-5 flex justify-center">
          <CreatorAvatar size={64} />
        </div>
        <SectionHeading
          eyebrow="YouTube Shorts"
          title="See me play before you book"
          subtitle="Quick clips, combos and highlights — watch the gameplay, then train the same way."
        />

        <div className="mt-12">
          <ShortsCarousel />
        </div>

        {/* Smaller social buttons */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Follow me everywhere
          </span>
          <SocialLinks size="sm" />
          <a
            href={SITE.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary transition-colors hover:text-accent"
          >
            Watch all my Shorts on YouTube →
          </a>
        </div>
      </div>
    </section>
  );
}
