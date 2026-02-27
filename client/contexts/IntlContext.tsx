"use client";

import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { NextIntlClientProvider, useTranslations } from "next-intl";

import deMessages from "../locales/de.json";
import enMessages from "../locales/en.json";
import svMessages from "../locales/sv.json";

type Locale = "en" | "sv" | "de";

type TranslationValue = string | { [key: string]: TranslationValue };
type Messages = { [key: string]: TranslationValue };

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

interface IntlContextValue extends LocaleContextValue {
  t: (key: string, values?: Record<string, unknown>) => string;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

const messages: Record<Locale, Messages> = {
  en: enMessages,
  sv: svMessages,
  de: deMessages,
};

const LOCALE_STORAGE_KEY = "preferred-locale";
const DEFAULT_TIME_ZONE = "Europe/Stockholm";

export const IntlProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>("sv"); // Default to Swedish

  useEffect(() => {
    // Load saved locale from localStorage
    if (typeof window !== "undefined") {
      const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;

      if (savedLocale && (savedLocale === "en" || savedLocale === "sv" || savedLocale === "de")) {
        setLocaleState(savedLocale);
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider
        getMessageFallback={({ key }) => key}
        locale={locale}
        messages={messages[locale]}
        timeZone={DEFAULT_TIME_ZONE}
        onError={(error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        }}
      >
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
};

export const useIntl = (): IntlContextValue => {
  const context = useContext(LocaleContext);
  const translate = useTranslations();

  if (!context) {
    throw new Error("useIntl must be used within IntlProvider");
  }

  return {
    ...context,
    t: translate as unknown as (key: string, values?: Record<string, unknown>) => string,
  };
};

export const useTranslation = () => {
  const t = useTranslations() as unknown as (
    key: string,
    values?: Record<string, unknown>,
  ) => string;

  return { t };
};
