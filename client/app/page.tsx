"use client";

import AuthLoading from "@/components/AuthLoading";
import LoggedOutCta from "@/components/LoggedOutCta";
import { subtitle, title } from "@/components/primitives";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/IntlContext";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const { t } = useTranslation();

  if (loading) {
    return (
      <DefaultLayout>
        <AuthLoading />
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl justify-center text-center">
          <span className={title()}>{t("home.title_part1")}&nbsp;</span>
          <span className={title({ color: "violet" })}>{t("home.title_part2")}&nbsp;</span>
          <br />
          <span className={title()}>{t("home.title_part3")}</span>
          <div className={subtitle({ class: "mt-4" })}>{t("home.subtitle")}</div>
        </div>

        {isAuthenticated ? (
          <div className="text-center">
            <p className="mb-2 text-lg">{t("common.welcome_back", { name: user?.firstName })}</p>
          </div>
        ) : (
          <LoggedOutCta />
        )}
      </section>
    </DefaultLayout>
  );
}
