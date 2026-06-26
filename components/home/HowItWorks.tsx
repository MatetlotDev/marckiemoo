import { SITE } from "@/config/site";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";

export function HowItWorks() {
  return (
    <section className="border-y border-border bg-card/30">
      <div className="container py-20">
        <SectionHeading
          eyebrow="How it works"
          title="From checkout to ranking up in 4 steps"
          subtitle="No confusing process. Pick, pay, and we handle the rest on Discord."
        />

        <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SITE.howItWorks.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08}>
              <div className="relative flex h-full flex-col gap-3 rounded-lg border border-border bg-card p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient font-display text-base font-bold text-white shadow-glow">
                  {i + 1}
                </span>
                <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
