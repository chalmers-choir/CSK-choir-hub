import { EventsListContent } from "@/components/events/overview/EventsListContent";
import { EventsPageHeader } from "@/components/events/overview/EventsPageHeader";
import { EventsService } from "@/lib/serverApiClient";

export default async function IndexPage() {
  const res = await EventsService.getEvents();
  const events = res.events;

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 py-8 md:py-10">
      <EventsPageHeader />
      <EventsListContent events={events} />
    </section>
  );
}
