"use client";

import { useEffect, useMemo, useState } from "react";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/IntlContext";
import DefaultLayout from "@/layouts/default";

type EventType = "REHEARSAL" | "CONCERT" | "GIG" | "PARTY" | "MEETING" | "OTHER";

type Event = {
  id: number;
  name: string;
  type: EventType;
  place: string;
  dateStart: string;
  dateEnd?: string | null;
  description?: string | null;
  requiresAttendance: boolean;
  requiresRegistration: boolean;
};

type EventsResponse = {
  events?: Event[];
};

const eventTypeMeta: Record<EventType, { label: string; color: string }> = {
  REHEARSAL: { label: "Repetition", color: "bg-sky-100 text-sky-700" },
  CONCERT: { label: "Konsert", color: "bg-purple-100 text-purple-700" },
  GIG: { label: "Gig", color: "bg-amber-100 text-amber-800" },
  PARTY: { label: "Fest", color: "bg-pink-100 text-pink-700" },
  MEETING: { label: "Möte", color: "bg-emerald-100 text-emerald-700" },
  OTHER: { label: "Annat", color: "bg-slate-200 text-slate-700" },
};

const formatDate = (isoDate: string) =>
  new Intl.DateTimeFormat("sv-SE", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(isoDate));

const formatTimeRange = (start: string, end?: string | null) => {
  const from = new Intl.DateTimeFormat("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(start));

  if (!end) return from;

  const to = new Intl.DateTimeFormat("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(end));

  return from === to ? from : `${from}–${to}`;
};

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

const EventCard = ({ event }: { event: Event }) => {
  const badge = eventTypeMeta[event.type] ?? eventTypeMeta.OTHER;

  return (
    <Link
      aria-label={`Visa detaljer för ${event.name}`}
      className="block"
      href={`/events/${event.id}`}
    >
      <Card className="border-default-100/80 bg-content1/70 hover:border-primary/40 border shadow-sm backdrop-blur transition hover:-translate-y-[1px] hover:shadow-md">
        <CardHeader className="flex flex-col gap-1">
          <div className="flex w-full flex-wrap items-center justify-between">
            <span className="bg-default-100 text-default-500 rounded-full px-3 py-1 text-xs font-medium">
              {event.place}
            </span>
            <div className="text-default-700 font-semibold">{formatDate(event.dateStart)}</div>
          </div>
          <div className="text-default-500 flex w-full flex-wrap justify-between text-sm">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge.color}`}>
              {badge.label}
            </span>
            <div>{formatTimeRange(event.dateStart, event.dateEnd)}</div>
          </div>
        </CardHeader>
        <CardBody className="gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="text-default-900 text-xl font-semibold">{event.name}</h3>
            {event.description && <p className="text-default-500 text-sm">{event.description}</p>}
          </div>
          <div className="flex flex-wrap gap-2">
            {event.requiresAttendance && (
              <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-semibold text-red-700">
                Närvarokrav
              </span>
            )}
            {event.requiresRegistration && (
              <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
                Anmälan krävs
              </span>
            )}
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};

export default function IndexPage() {
  const { t } = useTranslation();

  const { isAuthenticated, isAdmin, loading: authLoading } = useAuth();

  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setEvents([]);
      return;
    }

    const controller = new AbortController();

    const fetchEvents = async () => {
      setEventsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${siteConfig.apiBaseUrl}/events`, {
          credentials: "include",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Kunde inte hämta evenemang (status ${response.status}).`);
        }

        const payload = (await response.json()) as EventsResponse | Event[];
        const eventList: Event[] = Array.isArray(payload) ? payload : (payload.events ?? []);

        const now = new Date();
        const upcomingEvents = eventList.filter(
          (event) => new Date(event.dateStart).getTime() >= now.getTime(),
        );

        const sortedEvents = [...eventList].sort(
          // const sortedEvents = [...upcomingEvents].sort(
          (a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime(),
        );

        setEvents(sortedEvents);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(
          err instanceof Error ? err.message : "Något gick fel när evenemangen skulle hämtas.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setEventsLoading(false);
        }
      }
    };

    fetchEvents();

    return () => controller.abort();
  }, [isAuthenticated]);

  const eventsByWeek = useMemo(() => {
    const grouped = new Map<
      string,
      { key: string; weekNumber: number; rangeLabel: string; items: Event[] }
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

  const loginPrompt = (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <p className="mb-2 text-lg">Vänligen logga in för att se evenemang.</p>
      </div>
      <div className="flex justify-center gap-3">
        <Link
          className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
          href={siteConfig.links.login}
        >
          Login
        </Link>
        <Link
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.register}
        >
          Register
        </Link>
      </div>
    </div>
  );

  return (
    <DefaultLayout>
      <section className="mx-auto flex max-w-3xl flex-col gap-6 py-8 md:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-default-900 text-3xl font-bold">Evenemang</h1>
            <p className="text-default-500 mt-1">Översikt över kommande rep, konserter och gig.</p>
          </div>
          {isAuthenticated && isAdmin && (
            <Link
              className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
              href="/events/create"
            >
              Skapa evenemang
            </Link>
          )}
        </div>

        {authLoading ? (
          <div className="text-default-500 flex justify-center py-10">Laddar innehåll...</div>
        ) : isAuthenticated ? (
          <>
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {eventsLoading ? (
              <div className="text-default-500 flex justify-center py-10">Laddar evenemang...</div>
            ) : events.length === 0 ? (
              <div className="border-default-200 bg-default-100/60 text-default-500 rounded-lg border p-6 text-center">
                Inga kommande evenemang att visa just nu.
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {eventsByWeek.map((week) => (
                  <div key={week.key} className="flex flex-col gap-3">
                    <div className="flex items-baseline justify-between">
                      <h2 className="text-default-900 text-xl font-semibold">
                        Vecka {week.weekNumber}
                      </h2>
                      <span className="text-default-500 text-sm">{week.rangeLabel}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {week.items.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          loginPrompt
        )}
      </section>
    </DefaultLayout>
  );
}
