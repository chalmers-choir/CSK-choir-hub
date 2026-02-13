import AuthLoading from "@/components/AuthLoading";
import LoggedOutCta from "@/components/LoggedOutCta";
import { subtitle, title } from "@/components/primitives";
import { useAuth } from "@/contexts/AuthContext";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <DefaultLayout>
        <AuthLoading />
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl justify-center text-center">
          <span className={title()}>Körsveriges&nbsp;</span>
          <span className={title({ color: "violet" })}>fetaste&nbsp;</span>
          <br />
          <span className={title()}>medlemsportal.</span>
          <div className={subtitle({ class: "mt-4" })}>Imagine att Klok var en app.</div>
        </div>

        {isAuthenticated ? (
          <div className="text-center">
            <p className="mb-2 text-lg">Välkommen tillbaka, {user?.firstName}!</p>
          </div>
        ) : (
          <LoggedOutCta />
        )}
      </section>
    </DefaultLayout>
  );
}
