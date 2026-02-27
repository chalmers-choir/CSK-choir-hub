"use client";

import { useTranslation } from "@/contexts/IntlContext";
import { CSKEvent } from "@/lib/apiClient";

import { EventsWeekSections } from "./EventsWeekSections";

const getIsoWeekNumber = (date: Date) => {
  const tempDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNumber = tempDate.getUTCDay() || 7;

  tempDate.setUTCDate(tempDate.getUTCDate() + 4 - dayNumber);

  const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));

  return Math.ceil(((tempDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

const getWeekMeta = (isoDate: string) => {
  const eventDate = new Date(isoDate);
  const weekNumber = getIsoWeekNumber(eventDate);

  const startOfWeek = new Date(eventDate);
  const weekdayIndex = startOfWeek.getDay();
  const daysToMonday = weekdayIndex === 0 ? -6 : 1 - weekdayIndex;

  startOfWeek.setDate(startOfWeek.getDate() + daysToMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);

  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const dayFormatter = new Intl.DateTimeFormat("sv-SE", { month: "short", day: "numeric" });

  return {
    key: `${startOfWeek.getFullYear()}-v${weekNumber}`,
    weekNumber,
    rangeLabel: `${dayFormatter.format(startOfWeek)}-${dayFormatter.format(endOfWeek)}`,
  };
};

interface EventsListContentProps {
  events: CSKEvent[];
}

export const EventsListContent = ({ events }: EventsListContentProps) => {
  const { t } = useTranslation();

  const eventsGroupedByWeek = new Map<
    string,
    { key: string; weekNumber: number; rangeLabel: string; items: CSKEvent[] }
  >();

  events.forEach((event) => {
    const weekMeta = getWeekMeta(event.dateStart);
    const existingWeekGroup = eventsGroupedByWeek.get(weekMeta.key);

    if (existingWeekGroup) {
      existingWeekGroup.items.push(event);
    } else {
      eventsGroupedByWeek.set(weekMeta.key, { ...weekMeta, items: [event] });
    }
  });

  const eventsByWeek = Array.from(eventsGroupedByWeek.values());

  return (
    <>
      {eventsByWeek.length === 0 ? (
        <div className="border-default-200 bg-default-100/60 text-default-500 rounded-lg border p-6 text-center">
          {t("events.no_events")}
        </div>
      ) : (
        <EventsWeekSections weeks={eventsByWeek} />
      )}
    </>
  );
};
