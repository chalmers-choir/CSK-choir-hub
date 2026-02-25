import EventDetailCard from "@/components/events/EventDetailCard";
import DefaultLayout from "@/layouts/default";
import { EventsService } from "@/lib/api-client";

export default async function EventDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const res = await EventsService.getEventById({ eventId: parseInt(id, 10) });

  return (
    <DefaultLayout>
      <EventDetailCard event={res.event} />
    </DefaultLayout>
  );
}
