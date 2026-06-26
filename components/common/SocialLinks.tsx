import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";

/* Brand glyphs as inline SVG (lucide doesn't ship all of these). */
function YouTubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  );
}
function TwitchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M4 2 2 6v15h5v3h3l3-3h4l5-5V2H4Zm17 11-3 3h-5l-3 3v-3H7V4h14v9Zm-3-6h-2v5h2V7Zm-5 0h-2v5h2V7Z" />
    </svg>
  );
}
function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16.5 3c.3 2.2 1.6 3.6 3.8 3.8v2.7c-1.3.1-2.5-.3-3.8-1v6.1c0 4-3 6.4-6.4 5.9-3-.4-5.1-3.2-4.6-6.3.4-2.6 2.6-4.5 5.3-4.3v2.8c-.4-.1-.9-.1-1.4 0-1.1.2-1.9 1.2-1.7 2.4.2 1.1 1.3 1.9 2.5 1.6 1-.2 1.7-1.1 1.7-2.2V3h2.6Z" />
    </svg>
  );
}
function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20 4.5A18 18 0 0 0 15.5 3l-.3.5a14 14 0 0 1 4 2 18 18 0 0 0-14.4 0 14 14 0 0 1 4-2L8.5 3A18 18 0 0 0 4 4.5C1.4 8.3.7 12 1 15.7A18 18 0 0 0 6.5 18.5l.7-1.1a11 11 0 0 1-1.8-.9l.4-.3a13 13 0 0 0 11.4 0l.4.3c-.6.4-1.2.7-1.8.9l.7 1.1A18 18 0 0 0 23 15.7c.4-4.3-.7-8-3-11.2ZM8.4 14c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Zm7.2 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Z" />
    </svg>
  );
}

const ICONS = {
  youtube: { Icon: YouTubeIcon, label: "YouTube", href: SITE.social.youtube },
  twitch: { Icon: TwitchIcon, label: "Twitch", href: SITE.social.twitch },
  tiktok: { Icon: TikTokIcon, label: "TikTok", href: SITE.social.tiktok },
  discord: { Icon: DiscordIcon, label: "Discord", href: SITE.social.discord },
} as const;

export function SocialLinks({
  className,
  iconClassName,
  size = "md",
}: {
  className?: string;
  iconClassName?: string;
  size?: "sm" | "md";
}) {
  const box = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const icon = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {Object.entries(ICONS).map(([key, { Icon, label, href }]) => (
        <li key={key}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (opens in a new tab)`}
            className={cn(
              "group flex items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              box,
            )}
          >
            <Icon className={cn(icon, iconClassName)} />
          </a>
        </li>
      ))}
    </ul>
  );
}
