import Image from "next/image";
import { getLegend } from "@/config/brawlhalla";

/** Compact page header used on shop / about / legal pages. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  /** Optional Brawlhalla legend name to show as a decorative accent. */
  legend,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  legend?: string;
}) {
  const legendArt = legend ? getLegend(legend) : undefined;

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-radial-glow" aria-hidden />
      <div className="absolute inset-0 bg-grid" aria-hidden />

      {legendArt && (
        <div
          className="pointer-events-none absolute -right-6 bottom-0 hidden h-[115%] w-[20rem] md:block lg:w-[24rem]"
          aria-hidden
        >
          <Image
            src={legendArt.src}
            alt=""
            fill
            sizes="24rem"
            className="object-contain object-bottom opacity-70 drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
          />
        </div>
      )}

      <div className="container relative z-10 py-14 sm:py-16">
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
