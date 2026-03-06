import { notFound } from 'next/navigation';

import { EventsListContent } from '@/components/events/overview/EventsListContent';
import { EventsPageHeader } from '@/components/events/overview/EventsPageHeader';
import { getEvents } from '@/lib/api-client';

export default async function IndexPage() {
  const res = await getEvents();
  const events = res.data?.events;

  if (!events || events.length === 0) {
    return notFound();
  }

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 py-8 md:py-10">
      <EventsPageHeader />
      <EventsListContent events={events} />
    </section>
  );
}
