import EventDetailCard from "@/components/events/EventDetailCard";
import { EventsService } from "@/lib/api-client";

export default async function EventDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const res = await EventsService.getEventById({ eventId: parseInt(id, 10) });

  return <EventDetailCard event={res.event} />;
}
