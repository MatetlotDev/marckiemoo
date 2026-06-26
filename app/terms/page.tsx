import type { Metadata } from "next";
import { SITE } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/PageHero";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms of service for Marckiemoo coaching.",
  path: "/terms",
});

// NOTE: Placeholder legal copy. Replace with reviewed terms before going live.
export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Service" subtitle="Last updated: [date]" />
      <div className="container py-12">
        <article className="mx-auto flex max-w-3xl flex-col gap-6 text-sm leading-relaxed text-muted-foreground">
          <p className="rounded-md border border-border bg-card p-4 text-foreground">
            This is placeholder copy. Replace it with your reviewed Terms of
            Service before launch (edit <code>app/terms/page.tsx</code>).
          </p>

          <Section title="1. Services">
            {SITE.name} provides personalized {SITE.game} coaching services,
            including 1v1 and 2v2 coaching, replay reviews and bundled packs.
            Sessions are scheduled and delivered via Discord.
          </Section>

          <Section title="2. Bookings & scheduling">
            After purchase, session times are arranged directly on Discord.
            Please join the Discord and respond promptly so we can confirm your
            slot.
          </Section>

          <Section title="3. Payments">
            Prices are displayed in USD and may be shown in your local currency
            for convenience using indicative exchange rates. Alternative payment
            via Cashapp ({SITE.altPayment.cashapp}) is available on request.
          </Section>

          <Section title="4. Refunds">
            [Placeholder] Describe your refund and rescheduling policy here.
          </Section>

          <Section title="5. Conduct">
            Coaching sessions require respectful conduct from both sides. Abusive
            behavior may result in cancellation without refund.
          </Section>

          <Section title="6. Contact">
            Questions about these terms? Reach out on Discord or via the Contact
            page.
          </Section>
        </article>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
      <p>{children}</p>
    </section>
  );
}
