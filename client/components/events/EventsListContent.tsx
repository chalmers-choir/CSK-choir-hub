import { CSKEvent } from "@/lib/apiClient";

import { useTranslation } from "@/contexts/IntlContext";
import { EventsWeekSections } from "./EventsWeekSections";

interface EventWeekGroup {
  key: string;
  weekNumber: number;
  rangeLabel: string;
  items: CSKEvent[];
}

interface EventsListContentProps {
  error: string | null;
  eventsLoading: boolean;
  eventsCount: number;
  eventsByWeek: EventWeekGroup[];
}

export const EventsListContent = ({
  error,
  eventsLoading,
  eventsCount,
  eventsByWeek,
}: EventsListContentProps) => {
  const { t } = useTranslation();

  return (
    <>
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {eventsLoading ? (
        <div className="text-default-500 flex justify-center py-10">{t("events.loading_events")}</div>
      ) : eventsCount === 0 ? (
        <div className="border-default-200 bg-default-100/60 text-default-500 rounded-lg border p-6 text-center">
          {t("events.no_events")}
        </div>
      ) : (
        <EventsWeekSections weeks={eventsByWeek} />
      )}
    </>
  );
};
