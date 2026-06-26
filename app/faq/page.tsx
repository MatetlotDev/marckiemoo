import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { SITE } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/PageHero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "Returns & FAQ",
  description: "Answers about coaching, scheduling, payment and returns.",
  path: "/faq",
});

// Edit these freely — copy is placeholder where noted.
const FAQ = [
  {
    q: "How do I receive my session after buying?",
    a: "After checkout, I reach out on Discord to schedule your session and share all the details. Make sure to join the Discord so I can contact you.",
  },
  {
    q: "What format should I choose?",
    a: "If you want live coaching one-on-one, pick 1v1. Playing doubles? Go 2v2. Short on time or prefer detailed written feedback? Replay Reviews are perfect. Serious about a long-term grind? The Long Term Improvement Pack is the best value.",
  },
  {
    q: "How long are sessions and which length is right for me?",
    a: "Sessions range from 15 minutes (a quick focused fix) to 1 hour (a full deep-dive). 30 minutes is the most popular — enough to fix a real weakness and leave with a plan.",
  },
  {
    q: "What rank do I need to be?",
    a: "Any rank. I coach everyone from Gold players breaking out of the plateau to Diamond grinders chasing the next tier. Each session is tailored to your level.",
  },
  {
    q: "Can I pay another way instead of PayPal?",
    a: `Yes. You can pay via Cashapp ${SITE.altPayment.cashapp}. ${SITE.altPayment.note}`,
  },
  {
    q: "What's your refund / returns policy?",
    a: "[Placeholder] Because coaching is a personalized digital service, please reach out on Discord before your session if you have any concerns. Refund terms will be detailed here — edit this in app/faq/page.tsx.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Help"
        title="Returns & FAQ"
        subtitle="Everything you need to know before booking. Still stuck? Ask on Discord."
      />

      <div className="container py-12">
        <div className="mx-auto flex max-w-3xl flex-col gap-3">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group rounded-lg border border-border bg-card p-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-base font-semibold">
                {item.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-lg border border-border bg-card p-6 text-center">
          <h2 className="font-display text-lg font-semibold">Still have a question?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The fastest way to reach me is Discord.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Button asChild>
              <a href={SITE.social.discord} target="_blank" rel="noopener noreferrer">
                Join the Discord
              </a>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/contact">Contact & support</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
