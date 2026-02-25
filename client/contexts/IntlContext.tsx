import { useTranslations } from "next-intl";

export { type Locale } from "./intl-config";

type TranslationFn = (key: string, values?: Record<string, unknown>) => string;

export const useTranslation = () => {
  const t = useTranslations() as unknown as TranslationFn;

  return { t };
};
