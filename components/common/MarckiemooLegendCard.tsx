import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A framed card showing one of Marckiemoo's custom legend skins (his avatar head
 * on a Brawlhalla legend body). The source images have a solid black background,
 * so the card uses `bg-black` + `object-cover` — the image fills it edge-to-edge
 * and the black blends seamlessly (no transparency tricks needed).
 */
export function MarckiemooLegendCard({
  src,
  label,
  priority = false,
  className,
}: {
  src: string;
  label: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-black transition-all duration-300 hover:border-primary/50 hover:shadow-glow",
        className,
      )}
    >
      <div className="relative aspect-square">
        <Image
          src={src}
          alt={`Marckiemoo as ${label}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 320px"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        {/* Bottom shade for caption legibility + brand tint on hover (over image) */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3">
        <span className="font-display text-sm font-semibold text-white">Marckiemoo</span>
        <span className="rounded-full border border-white/15 bg-background/70 px-2 py-0.5 text-[0.7rem] font-medium uppercase tracking-wide text-foreground/80 backdrop-blur">
          as {label}
        </span>
      </figcaption>
    </figure>
  );
}
