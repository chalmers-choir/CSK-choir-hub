"use client";

export default function EventsPageError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-3 py-8 md:py-10">
      <h2 className="text-xl font-semibold">Could not load events</h2>
      <p className="text-default-600">Something went wrong while fetching the event overview.</p>
      <button
        type="button"
        onClick={() => reset()}
        className="bg-foreground text-background w-fit rounded-md px-4 py-2"
      >
        Try again
      </button>
    </section>
  );
}
