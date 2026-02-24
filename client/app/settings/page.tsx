"use client";

import { Card } from "@heroui/react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslation } from "@/contexts";

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <Card className="mx-auto max-w-lg p-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">{t("settings.title")}</h2>
        <LanguageSwitcher />
      </div>
    </Card>
  );
}
