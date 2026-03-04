import { Suspense } from "react";

import { AdminUsersTable } from "@/components";
import { UsersService } from "@/lib/serverApiClient";

/**
 * Server component that fetches users data.
 * Wrapped in Suspense to enable streaming.
 */
async function UsersDataLoader() {
  const response = await UsersService.getUsers({ includeGroups: true });
  const users = response.users || [];

  return <AdminUsersTable users={users} />;
}

/**
 * Loading skeleton for the users table.
 */
function UsersLoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="bg-default-100 h-10 w-64 animate-pulse rounded-lg" />
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-default-100 h-16 animate-pulse rounded-lg" />
        ))}
      </div>
    </div>
  );
}

/**
 * Admin users page.
 * Static content renders immediately, users data streams in when ready.
 */
export default function AdminUsersPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Users</h1>
      <Suspense fallback={<UsersLoadingSkeleton />}>
        <UsersDataLoader />
      </Suspense>
    </>
  );
}
