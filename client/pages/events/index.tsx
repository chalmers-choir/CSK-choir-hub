import DefaultLayout from '@/layouts/default';
import RequireAuth from '@/components/RequireAuth';
import LoggedOutCta from '@/components/LoggedOutCta';

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
          </div>
        </section>
      </RequireAuth>
    </DefaultLayout>
  );
}
