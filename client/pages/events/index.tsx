import Link from 'next/link';

import LoggedOutCta from '@/components/LoggedOutCta';
import RequireAuth from '@/components/RequireAuth';
import DefaultLayout from '@/layouts/default';

export default function IndexPage() {
  return (
    <DefaultLayout>
      <RequireAuth
        fallback={
          <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <LoggedOutCta message="Vänligen logga in för att se evenemang." />
          </section>
        }
      >
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="text-center">
            <p className="mb-2 text-lg">Events!</p>
            <Link href="/events/create">Create new event</Link>
          </div>
        </section>
      </RequireAuth>
    </DefaultLayout>
  );
}
