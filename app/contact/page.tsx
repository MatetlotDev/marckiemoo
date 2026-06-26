import type { Metadata } from "next";
import { MessageCircle, Mail } from "lucide-react";
import { SITE } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/PageHero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "Contact & Support",
  description: "Get in touch with Marckiemoo for coaching questions and support.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Contact & support"
        subtitle="Questions before you book, or need help with an order? Reach out — Discord is the fastest way."
      />

      <div className="container py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Discord */}
          <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
              <MessageCircle className="h-6 w-6" />
            </span>
            <h2 className="font-display text-xl font-semibold">Discord (fastest)</h2>
            <p className="text-sm text-muted-foreground">
              Join the community and message me directly for coaching questions,
              scheduling and order support.
            </p>
            <Button asChild className="mt-2 self-start">
              <a href={SITE.social.discord} target="_blank" rel="noopener noreferrer">
                Join the Discord
              </a>
            </Button>
          </div>

          {/* Email / other */}
          <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Mail className="h-6 w-6" />
            </span>
            <h2 className="font-display text-xl font-semibold">Other ways to reach me</h2>
            <p className="text-sm text-muted-foreground">
              {SITE.contact.email
                ? "Prefer email? Use the address below."
                : "Follow and DM me on socials — I'm most active on Discord."}
            </p>
            {SITE.contact.email ? (
              <a
                href={`mailto:${SITE.contact.email}`}
                className="font-medium text-primary hover:underline"
              >
                {SITE.contact.email}
              </a>
            ) : (
              <ul className="flex flex-col gap-1 text-sm">
                <li>
                  YouTube:{" "}
                  <a className="text-primary hover:underline" href={SITE.social.youtube}>
                    @Marckiemoo
                  </a>
                </li>
                <li>
                  Twitch:{" "}
                  <a className="text-primary hover:underline" href={SITE.social.twitch}>
                    marckiemoo
                  </a>
                </li>
                <li>
                  TikTok:{" "}
                  <a className="text-primary hover:underline" href={SITE.social.tiktok}>
                    @marckiemoobh
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Alt payment note */}
        <div className="mt-6 rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
          <strong className="text-foreground">Alternative payment:</strong> You can
          pay via Cashapp{" "}
          <span className="font-semibold text-foreground">
            {SITE.altPayment.cashapp}
          </span>
          . {SITE.altPayment.note}
        </div>
      </div>
    </>
  );
}
