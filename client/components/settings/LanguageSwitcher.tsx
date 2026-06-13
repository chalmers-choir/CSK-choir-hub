'use client';

import { Button } from '@/components/ui/button';
import { useIntl } from '@/contexts';

const languages = [
  { code: 'sv', label: 'SWE 🇸🇪' },
  { code: 'en', label: 'ENG 🇬🇧' },
  { code: 'de', label: 'DEU 🇧🇪' },
] as const;

export const LanguageSwitcher = () => {
  const { locale, setLocale } = useIntl();

  return (
    <div className="flex" aria-label="Language selection" role="group">
      {languages.map((lang) => {
        const isActive = locale === lang.code;

        return (
          <Button
            key={lang.code}
            aria-pressed={isActive}
            className={isActive ? 'font-bold' : undefined}
            variant={isActive ? 'default' : 'outline'}
            onClick={() => setLocale(lang.code)}
          >
            {lang.label}
          </Button>
        );
      })}
    </div>
  );
};
