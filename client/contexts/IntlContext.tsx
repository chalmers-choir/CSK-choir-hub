import IntlMessageFormat from "intl-messageformat";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

import deMessages from "../locales/de.json";
import enMessages from "../locales/en.json";
import svMessages from "../locales/sv.json";

type Locale = "en" | "sv" | "de";

type TranslationValue = string | { [key: string]: TranslationValue };
type Messages = { [key: string]: TranslationValue };

interface IntlContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, values?: Record<string, any>) => string;
}

const IntlContext = createContext<IntlContextValue | undefined>(undefined);

const messages: Record<Locale, Messages> = {
  en: enMessages,
  sv: svMessages,
  de: deMessages,
};

const LOCALE_STORAGE_KEY = "preferred-locale";

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

  const t = (key: string, values?: Record<string, any>): string => {
    const keys = key.split(".");
    let message: any = messages[locale];

    for (const k of keys) {
      if (message && typeof message === "object") {
        message = message[k];
      } else {
        message = undefined;
        break;
      }
    }

    if (!message) {
      console.warn(`Translation key not found: ${key}`);

      return key;
    }

    if (typeof message !== "string") {
      console.warn(`Translation value is not a string: ${key}`);

      return key;
    }

    if (values) {
      try {
        const formatter = new IntlMessageFormat(message, locale);

        return formatter.format(values) as string;
      } catch (error) {
        console.error(`Error formatting message for key: ${key}`, error);

        return message;
      }
    }

    return message;
  };

  return <IntlContext.Provider value={{ locale, setLocale, t }}>{children}</IntlContext.Provider>;
};

export const useIntl = (): IntlContextValue => {
  const context = useContext(IntlContext);

  if (!context) {
    throw new Error("useIntl must be used within IntlProvider");
  }

  return context;
};

export const useTranslation = () => {
  const { t } = useIntl();

  return { t };
};
