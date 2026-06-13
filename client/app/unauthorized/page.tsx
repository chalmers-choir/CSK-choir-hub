import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-4xl font-bold text-red-600">Access Denied</h1>
      <p className="mb-6 text-lg text-gray-600">
        You don&apos;t have permission to access this page.
      </p>
      <div className="flex gap-4">
        <Link className={buttonVariants()} href="/">
          Go Home
        </Link>
        <Link className={buttonVariants({ variant: 'outline' })} href="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
