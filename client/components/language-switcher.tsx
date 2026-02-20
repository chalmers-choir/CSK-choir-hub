import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";

import { useIntl } from "@/contexts/IntlContext";

const languages = [
  { code: "sv", label: "Svenska" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
] as const;

export const LanguageSwitcher = () => {
  const { locale, setLocale } = useIntl();

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="ghost" size="sm" color="primary">
          {currentLanguage.label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language selection"
        onAction={(key) => setLocale(key as "sv" | "en" | "de")}
      >
        {languages.map((lang) => (
          <DropdownItem key={lang.code}>{lang.label}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
