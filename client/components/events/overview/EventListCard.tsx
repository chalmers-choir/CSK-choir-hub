import { Card, CardBody, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";

import { useTranslation } from "@/contexts/IntlContext";
import { CSKEvent, CSKEventType } from "@/lib/apiClient";

const eventTypeMeta: Record<CSKEventType, { label: string; color: string }> = {
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

interface EventListCardProps {
  event: CSKEvent;
}

export const EventListCard = ({ event }: EventListCardProps) => {
  const { t } = useTranslation();
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
                {t("events.attendance_required")}
              </span>
            )}
            {event.requiresRegistration && (
              <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
                {t("events.registration_required")}
              </span>
            )}
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};
