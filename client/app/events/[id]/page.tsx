"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import EventDetailCard from "@/components/events/EventDetailCard";
import DefaultLayout from "@/layouts/default";
import { CSKEvent, EventsService } from "@/lib/api-client";

export default function IndexPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [event, setEvent] = useState<CSKEvent | undefined>(undefined);

  useEffect(() => {
    if (!id) return; // wait until id is available
    const eventId = parseInt(Array.isArray(id) ? id[0] : id, 10);

    if (Number.isNaN(eventId)) return;

    const fetchEvent = async () => {
      try {
        const res = await EventsService.getEventById({ eventId });

        setEvent(res.event);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch event");
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
