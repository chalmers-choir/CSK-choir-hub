import { Button, ButtonGroup } from "@heroui/react";

import { useIntl } from "@/contexts/IntlContext";

const languages = [
  { code: "sv", label: "SWE 🇸🇪" },
  { code: "en", label: "ENG 🇬🇧" },
  { code: "de", label: "DEU 🇧🇪" },
] as const;

export const LanguageSwitcher = () => {
  const { locale, setLocale } = useIntl();

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
