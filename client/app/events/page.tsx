"use client";

import Link from "next/link";

import { useTranslation } from "@/contexts/IntlContext";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const { t } = useTranslation();

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="text-center">
          <p className="mb-2 text-lg">{t("events.title")}</p>
          <Link href="/events/create">{t("common.create_new_event")}</Link>
        </div>
      </section>
    </DefaultLayout>
  );
}
