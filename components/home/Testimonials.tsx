import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { SITE } from "@/config/site";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";

function initials(name: string): string {
  const clean = name.replace(/[\[\]]/g, "").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (!parts.length) return "M";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

export function Testimonials() {
  return (
    <section className="container py-20">
      <SectionHeading
        eyebrow="Results"
        title="Players who ranked up with me"
        subtitle="Real students, real rank-ups. (Quotes below are placeholders — swap in real ones in config/site.ts.)"
      />

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {SITE.testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <figure className="flex h-full flex-col gap-4 rounded-lg border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <Quote className="h-7 w-7 text-primary/60" />
                <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-accent text-accent"
                      aria-hidden
                    />
                  ))}
                </div>
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-foreground/90">
                {t.text}
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-border pt-4">
                {t.avatar ? (
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                    {initials(t.name)}
                  </span>
                )}
                <span className="flex flex-col">
                  <span className="text-sm font-semibold">{t.name}</span>
                  <span className="text-xs text-muted-foreground">{t.rank}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
