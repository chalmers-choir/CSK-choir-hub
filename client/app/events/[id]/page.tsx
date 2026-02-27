import Link from "next/link";

import EventDetailCard from "@/components/events/detail/EventDetailCard";
import { ApiError, CSKEvent, EventsService } from "@/lib/serverApiClient";

function EventNotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-3 py-8 md:py-10">
      <h1 className="text-2xl font-semibold">Event not found</h1>
      <p className="text-default-600">The event may have been removed or the link is invalid.</p>
      <Link href="/events" className="bg-foreground text-background w-fit rounded-md px-4 py-2">
        Back to events
      </Link>
    </section>
  );
}

export default async function EventDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const eventId = Number.parseInt(params.id, 10);

  if (Number.isNaN(eventId)) {
    return <EventNotFound />;
  }

  let event: CSKEvent;

  try {
    const res = await EventsService.getEventById({ eventId });

    if (!res.event) {
      return <EventNotFound />;
    }

    event = res.event;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return <EventNotFound />;
    }

    throw error;
  }

  return (
    <section className="flex min-h-[70vh] w-full items-center justify-center py-8">
      <div className="w-full max-w-2xl">
        <EventDetailCard event={event} />
      </div>
    </section>
  );
}
