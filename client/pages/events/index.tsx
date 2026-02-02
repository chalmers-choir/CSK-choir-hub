import Link from 'next/link';

import DefaultLayout from '@/layouts/default';

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="text-center">
          <p className="mb-2 text-lg">Events!</p>
          <Link href="/events/create">Create new event</Link>
        </div>
      </section>
    </DefaultLayout>
  );
}
