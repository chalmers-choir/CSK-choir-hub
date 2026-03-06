export type Locale = "en" | "sv" | "de";

export const DEFAULT_LOCALE: Locale = "sv";
export const LOCALE_COOKIE_KEY = "preferred-locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "sv" || value === "de";
}
