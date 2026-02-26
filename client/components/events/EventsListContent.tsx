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
    rangeLabel: `${dayFormatter.format(startOfWeek)}-${dayFormatter.format(endOfWeek)}`,
  };
};

interface EventsListContentProps {
  events: CSKEvent[];
}

export const EventsListContent = ({ events }: EventsListContentProps) => {
  const { t } = useTranslation();

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

  const eventsByWeek = Array.from(grouped.values());

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
