import { Suspense } from "react";

import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowBackIosNew } from "@mui/icons-material";

import { AdminUserDetails } from "@/components";
import { ApiError, UsersService } from "@/lib/serverApiClient";

/**
 * Server component that fetches user data.
 * Wrapped in Suspense to enable streaming.
 */
async function UserDataLoader({ userId }: { userId: number }) {
  try {
    const res = await UsersService.getUser({ userId });

    if (!res.user) {
      notFound();
    }

    return <AdminUserDetails initialUser={res.user} />;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }
}

/**
 * Loading skeleton for user details form.
 */
function UserDetailsLoadingSkeleton() {
  return (
    <div className="max-w-md space-y-4">
      <div className="bg-default-100 h-8 w-48 animate-pulse rounded-lg" />
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="bg-default-100 h-4 w-24 animate-pulse rounded" />
            <div className="bg-default-100 h-10 animate-pulse rounded-lg" />
          </div>
        ))}
      </div>
      <div className="bg-default-100 h-10 w-24 animate-pulse rounded-lg" />
    </div>
  );
}

const BackArrow = () => (
  <div className="flex items-center gap-2">
    <Link
      href="/admin/users"
      className="text-default-500 hover:text-default-700 text-md flex items-center gap-1 transition-colors"
    >
      <ArrowBackIosNew className="text-xl" />
      Back
    </Link>
  </div>
);

/**
 * Admin page for viewing and editing user details.
 * Static content (back button, title) renders immediately,
 * user data streams in when ready.
 */
export default async function UserDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const userId = Number.parseInt(params.id, 10);

  if (Number.isNaN(userId)) {
    notFound();
  }

  return (
    <>
      <BackArrow /> {/* TODO: Add proper back arrow functionality */}
      <h1 className="mb-6 mt-4 text-2xl font-semibold">User Details</h1>
      <Suspense fallback={<UserDetailsLoadingSkeleton />}>
        <UserDataLoader userId={userId} />
      </Suspense>
    </>
  );
}
