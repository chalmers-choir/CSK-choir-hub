"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

import { Button, ButtonGroup } from "@heroui/react";

import { DEFAULT_LOCALE, LOCALE_COOKIE_KEY, type Locale, isLocale } from "@/contexts/intl-config";

const languages = [
  { code: "sv", label: "SWE 🇸🇪" },
  { code: "en", label: "ENG 🇬🇧" },
  { code: "de", label: "DEU 🇧🇪" },
] as const;

export const LanguageSwitcher = () => {
  const router = useRouter();
  const activeLocale = useLocale();
  const locale = isLocale(activeLocale) ? activeLocale : DEFAULT_LOCALE;

  const setLocale = (nextLocale: Locale) => {
    document.cookie = `${LOCALE_COOKIE_KEY}=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    router.refresh();
  };

  return (
    <ButtonGroup aria-label="Language selection" variant="flat">
      {languages.map((lang) => {
        const isActive = locale === lang.code;

        return (
          <Button
            key={lang.code}
            aria-pressed={isActive}
            className={isActive ? "font-bold" : undefined}
            color={isActive ? "primary" : "default"}
            onPress={() => setLocale(lang.code)}
          >
            {lang.label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
