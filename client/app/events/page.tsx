import { Suspense } from "react";

import { EventsListContent } from "@/components/events/overview/EventsListContent";
import { EventsPageHeader } from "@/components/events/overview/EventsPageHeader";
import { EventsService } from "@/lib/serverApiClient";

/**
 * Server component that fetches events data.
 * Wrapped in Suspense to enable streaming.
 */
async function EventsDataLoader() {
  const res = await EventsService.getEvents();
  const events = res.events;

  return <EventsListContent events={events} />;
}

/**
 * Loading skeleton for events list.
 */
function EventsLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="bg-default-100 h-6 w-32 animate-pulse rounded" />
          <div className="bg-default-100 h-24 animate-pulse rounded-lg" />
        </div>
      ))}
    </div>
  );
}

/**
 * Events page.
 * Header renders immediately, events list streams in when ready.
 */
export default function EventsPage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 py-8 md:py-10">
      <EventsPageHeader />
      <Suspense fallback={<EventsLoadingSkeleton />}>
        <EventsDataLoader />
      </Suspense>
    </section>
  );
}
