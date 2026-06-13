'use client';

import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { useAuth, useTranslation } from '@/contexts';

export const EventsPageHeader = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAuth();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-bold">{t('events.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('events.subtitle')}</p>
      </div>
      {isAdmin && (
        <Link className={buttonVariants() + ' rounded-full'} href="/events/create">
          {t('events.create_event')}
        </Link>
      )}
    </div>
  );
};
