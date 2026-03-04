import { Suspense } from "react";

import { notFound } from "next/navigation";

import EventDetailCard from "@/components/events/detail/EventDetailCard";
import { ApiError, EventsService } from "@/lib/serverApiClient";

/**
 * Server component that fetches event data.
 * Wrapped in Suspense to enable streaming.
 */
async function EventDataLoader({ eventId }: { eventId: number }) {
  try {
    const res = await EventsService.getEventById({ eventId });

    if (!res.event) {
      notFound();
    }

    return <EventDetailCard event={res.event} />;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }
}

/**
 * Loading skeleton for event details.
 */
function EventDetailsLoadingSkeleton() {
  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="bg-default-100 h-64 animate-pulse rounded-lg" />
      <div className="space-y-2">
        <div className="bg-default-100 h-8 w-3/4 animate-pulse rounded" />
        <div className="bg-default-100 h-4 w-1/2 animate-pulse rounded" />
      </div>
    </div>
  );
}

/**
 * Event detail page.
 * Static layout renders immediately, event data streams in when ready.
 */
export default async function EventDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const eventId = Number.parseInt(params.id, 10);

  if (Number.isNaN(eventId)) {
    notFound();
  }

  return (
    <section className="flex min-h-[70vh] w-full items-center justify-center py-8">
      <Suspense fallback={<EventDetailsLoadingSkeleton />}>
        <EventDataLoader eventId={eventId} />
      </Suspense>
    </section>
  );
}
