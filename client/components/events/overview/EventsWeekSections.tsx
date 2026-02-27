import { useTranslation } from "@/contexts/IntlContext";
import { CSKEvent } from "@/lib/apiClient";

import { EventListCard } from "./EventListCard";

interface EventWeekGroup {
  key: string;
  weekNumber: number;
  rangeLabel: string;
  items: CSKEvent[];
}

interface EventsWeekSectionsProps {
  weeks: EventWeekGroup[];
}

export const EventsWeekSections = ({ weeks }: EventsWeekSectionsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8">
      {weeks.map((weekGroup) => (
        <div key={weekGroup.key} className="flex flex-col gap-3">
          <div className="flex items-baseline gap-2">
            <h2 className="text-default-900 text-xl font-semibold">
              {t("common.week")} {weekGroup.weekNumber}
            </h2>
            <span className="text-default-500 text-sm">{weekGroup.rangeLabel}</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {weekGroup.items.map((event) => (
              <EventListCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
