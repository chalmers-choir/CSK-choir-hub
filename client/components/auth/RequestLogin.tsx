import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

interface RequestLoginProps {
  children?: string;
}

export const RequestLogin = ({ children }: RequestLoginProps) => {
  return (
    <div>
      <div className="text-center">
        <p className="mb-2 text-lg">{children ?? <>Vänligen logga in för att se innehållet.</>}</p>
      </div>
      <div className="flex justify-center gap-3">
        <Link className={buttonVariants()} href="/login">
          Login
        </Link>
        <Link className={buttonVariants({ variant: 'outline' })} href="/register">
          Register
        </Link>
      </div>
    </div>
  );
};
