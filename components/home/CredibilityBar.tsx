import { SITE } from "@/config/site";

/** Key credentials strip — reassurance shown right under the hero. */
export function CredibilityBar() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="container grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
        {SITE.credentials.map((c) => (
          <div key={c.label} className="flex flex-col items-center text-center">
            <span className="bg-brand-gradient bg-clip-text font-display text-3xl font-extrabold text-transparent sm:text-4xl">
              {c.value}
            </span>
            <span className="mt-1 text-sm text-muted-foreground">{c.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
