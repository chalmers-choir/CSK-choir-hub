"use client";

import { useEffect, useMemo, useState } from "react";

import { EventsListContent } from "@/components/events/EventsListContent";
import { EventsPageHeader } from "@/components/events/EventsPageHeader";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/IntlContext";
import DefaultLayout from "@/layouts/default";
import { CSKEvent, EventsService } from "@/lib/apiClient";

const getIsoWeekNumber = (date: Date) => {
  const tempDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNumber = tempDate.getUTCDay() || 7;
  tempDate.setUTCDate(tempDate.getUTCDate() + 4 - dayNumber);

  const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
  return Math.ceil(((tempDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

const getWeekMeta = (isoDate: string) => {
  const date = new Date(isoDate);
  const weekNumber = getIsoWeekNumber(date);

  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  startOfWeek.setDate(startOfWeek.getDate() + diffToMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const dayFormatter = new Intl.DateTimeFormat("sv-SE", { month: "short", day: "numeric" });

  return {
    key: `${startOfWeek.getFullYear()}-v${weekNumber}`,
    weekNumber,
    rangeLabel: `${dayFormatter.format(startOfWeek)}–${dayFormatter.format(endOfWeek)}`,
  };
};

export default function IndexPage() {
  const { t } = useTranslation();

  const { isAdmin } = useAuth();

  const [events, setEvents] = useState<CSKEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setEventsLoading(true);
      setError(null);

      try {
        const response = await EventsService.getEvents();
        const eventList = response.events;

        const sortedEvents = [...eventList].sort(
          (a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime(),
        );

        setEvents(sortedEvents);
      } catch (err) {
        setError(err instanceof Error ? err.message : t("events.failed_to_load_events"));
      } finally {
        setEventsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const eventsByWeek = useMemo(() => {
    const grouped = new Map<
      string,
      { key: string; weekNumber: number; rangeLabel: string; items: CSKEvent[] }
    >();

    events.forEach((event) => {
      const weekMeta = getWeekMeta(event.dateStart);
      const existing = grouped.get(weekMeta.key);

      if (existing) {
        existing.items.push(event);
      } else {
        grouped.set(weekMeta.key, { ...weekMeta, items: [event] });
      }
    });

    return Array.from(grouped.values());
  }, [events]);

  return (
    <DefaultLayout>
      <section className="mx-auto flex max-w-3xl flex-col gap-6 py-8 md:py-10">
        <EventsPageHeader isAdmin={isAdmin} />
        <EventsListContent
          error={error}
          eventsByWeek={eventsByWeek}
          eventsCount={events.length}
          eventsLoading={eventsLoading}
        />
      </section>
    </DefaultLayout>
  );
}
