'use client';

import { LanguageSwitcher } from '@/components/settings/LanguageSwitcher';
import { ThemeSwitch } from '@/components/settings/ThemeSwitcher';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/contexts';

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <Card className="mx-auto max-w-lg p-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">{t('settings.title')}</h2>
        <p className="text-muted-foreground text-sm">{t('settings.language')}</p>
        <LanguageSwitcher />
        <p className="text-muted-foreground text-sm">{t('settings.theme')}</p>
        <ThemeSwitch />
      </div>
    </Card>
  );
}
