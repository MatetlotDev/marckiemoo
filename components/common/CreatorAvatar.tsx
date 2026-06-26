import Image from "next/image";
import { MARCKIEMOO } from "@/config/brawlhalla";
import { cn } from "@/lib/utils";

/** Marckiemoo's real YouTube avatar, circular. References the creator. */
export function CreatorAvatar({
  size = 36,
  className,
  ring = true,
  priority = false,
}: {
  size?: number;
  className?: string;
  ring?: boolean;
  priority?: boolean;
}) {
  return (
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden rounded-full bg-card",
        ring && "ring-2 ring-primary/60 ring-offset-2 ring-offset-background",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={MARCKIEMOO.avatar}
        alt="Marckiemoo"
        fill
        sizes={`${size}px`}
        priority={priority}
        className="object-cover"
      />
    </span>
  );
}
