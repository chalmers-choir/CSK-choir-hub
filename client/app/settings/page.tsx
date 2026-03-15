'use client';

import { useTranslations } from 'next-intl';

import { Card } from '@heroui/react';

import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeSwitch } from '@/components/theme-switch';

export default function SettingsPage() {
  const t = useTranslations();

  return (
    <Card className="mx-auto max-w-lg p-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">{t('settings.title')}</h2>
        <p className="text-default-600 text-sm">{t('settings.language')}</p>
        <LanguageSwitcher />
        <p className="text-default-600 text-sm">{t('settings.theme')}</p>
        <ThemeSwitch />
      </div>
    </Card>
  );
}
