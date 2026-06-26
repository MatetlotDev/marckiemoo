import type { Metadata } from "next";
import { SITE } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/PageHero";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for Marckiemoo coaching.",
  path: "/privacy",
});

// NOTE: Placeholder legal copy. Replace with a reviewed policy before launch.
export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" subtitle="Last updated: [date]" />
      <div className="container py-12">
        <article className="mx-auto flex max-w-3xl flex-col gap-6 text-sm leading-relaxed text-muted-foreground">
          <p className="rounded-md border border-border bg-card p-4 text-foreground">
            This is placeholder copy. Replace it with your reviewed Privacy Policy
            before launch (edit <code>app/privacy/page.tsx</code>).
          </p>

          <Section title="1. Information we collect">
            When you place an order we collect the email address you provide and
            your order details. Scheduling happens on Discord, where standard
            Discord data applies.
          </Section>

          <Section title="2. How we use it">
            We use your information solely to deliver your coaching, send receipts
            and provide support. We do not sell your data.
          </Section>

          <Section title="3. Currency & local storage">
            Your selected currency and cart are stored locally in your browser
            (localStorage) for convenience. This data never leaves your device
            and is not sent to a server.
          </Section>

          <Section title="4. Third parties">
            [Placeholder] When a payment provider is connected, its handling of
            your payment data will be governed by its own privacy policy. List
            those providers here.
          </Section>

          <Section title="5. Contact">
            Privacy questions? Reach out via Discord or the Contact page.
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
