import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import EventDetailCard from "@/components/events/EventDetailCard";
import DefaultLayout from "@/layouts/default";
import { CSKEvent, EventsService } from "@/lib/api-client";

export default function IndexPage() {
  const { query } = useRouter();
  const { id } = query;

  const [event, setEvent] = useState<CSKEvent | undefined>(undefined);

  useEffect(() => {
    if (!id) return; // wait until id is available
    const eventId = parseInt(id as string, 10);

    const fetchEvent = async () => {
      try {
        const res = await EventsService.getEventById({ eventId });

        setEvent(res.event);
      } catch (err: any) {
        console.log(err.message || "Failed to fetch event");
      }
    };

    fetchEvent();
  }, [id]);

  return (
    <DefaultLayout>
      <EventDetailCard event={event} />
    </DefaultLayout>
  );
}
