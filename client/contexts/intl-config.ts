import deMessages from "../locales/de.json";
import enMessages from "../locales/en.json";
import svMessages from "../locales/sv.json";

export type Locale = "en" | "sv" | "de";

export const DEFAULT_LOCALE: Locale = "sv";
export const LOCALE_COOKIE_KEY = "preferred-locale";

export const messages = {
  en: enMessages,
  sv: svMessages,
  de: deMessages,
} as const;

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "sv" || value === "de";
}
