import { useAuth } from '@/contexts/AuthContext';
import DefaultLayout from '@/layouts/default';
import { Link } from '@heroui/link';
import { button as buttonStyles } from '@heroui/theme';

export default function IndexPage() {
  const { isAuthenticated } = useAuth();

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {isAuthenticated ? (
          <div className="text-center">
            <p className="mb-2 text-lg">Events!</p>
          </div>
        ) : (
          <div>
            <div className="text-center">
              <p className="mb-2 text-lg">Vänligen logga in för att se evenemang.</p>
            </div>
            <div className="flex justify-center gap-3">
              <Link
                className={buttonStyles({ color: 'primary', radius: 'full', variant: 'shadow' })}
                href="/login"
              >
                Login
              </Link>
              <Link
                className={buttonStyles({ variant: 'bordered', radius: 'full' })}
                href="/register"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </section>
    </DefaultLayout>
  );
}
