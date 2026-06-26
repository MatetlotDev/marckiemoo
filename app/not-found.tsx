import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <span className="bg-brand-gradient bg-clip-text font-display text-7xl font-extrabold text-transparent">
        404
      </span>
      <h1 className="mt-4 font-display text-2xl font-bold">Page not found</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        That page got edgeguarded. Let&apos;s get you back to the action.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild size="lg">
          <Link href="/">Back home</Link>
        </Button>
        <Button asChild variant="secondary" size="lg">
          <Link href="/shop">Browse coaching</Link>
        </Button>
      </div>
    </div>
  );
}
