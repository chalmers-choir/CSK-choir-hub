"use client";

import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/IntlContext";

export const EventsPageHeader = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAuth();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-center sm:text-left">
        <h1 className="text-default-900 text-3xl font-bold">{t("events.title")}</h1>
        <p className="text-default-500 mt-1">{t("events.subtitle")}</p>
      </div>
      {isAdmin && (
        <Link
          className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
          href="/events/create"
        >
          {t("events.create_event")}
        </Link>
      )}
    </div>
  );
};
