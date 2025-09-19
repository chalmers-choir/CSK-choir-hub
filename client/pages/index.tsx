import { Link } from '@heroui/link';
import { button as buttonStyles } from '@heroui/theme';

import { subtitle, title } from '@/components/primitives';
import { siteConfig } from '@/config/site';
import { useAuth } from '@/contexts/AuthContext';
import DefaultLayout from '@/layouts/default';

export default function IndexPage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl justify-center text-center">
          <span className={title()}>Körsveriges&nbsp;</span>
          <span className={title({ color: 'violet' })}>fetaste&nbsp;</span>
          <br />
          <span className={title()}>medlemsportal.</span>
          <div className={subtitle({ class: 'mt-4' })}>Imagine att Klok var en app.</div>
        </div>

        {isAuthenticated ? (
          <div className="text-center">
            <p className="mb-2 text-lg">Välkommen tillbaka, {user?.firstName}!</p>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              className={buttonStyles({ color: 'primary', radius: 'full', variant: 'shadow' })}
              href={siteConfig.links.login}
            >
              Login
            </Link>
            <Link
              className={buttonStyles({ variant: 'bordered', radius: 'full' })}
              href={siteConfig.links.register}
            >
              Register
            </Link>
          </div>
        )}
      </section>
    </DefaultLayout>
  );
}
