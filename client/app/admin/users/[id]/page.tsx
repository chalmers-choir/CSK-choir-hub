import Link from "next/link";

import { AdminUserDetails } from "@/components/admin/AdminUserDetails";
import { ApiError, User, UsersService } from "@/lib/serverApiClient";

function UserNotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-3 py-8">
      <h1 className="text-2xl font-semibold">User not found</h1>
      <p className="text-default-600">The user may have been removed or the link is invalid.</p>
      <Link
        href="/admin/users"
        className="bg-foreground text-background w-fit rounded-md px-4 py-2"
      >
        Back to users
      </Link>
    </section>
  );
}

/**
 * Admin page for viewing and editing user details.
 * Server Component that fetches user data and renders the client form component.
 */
export default async function UserDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const userId = Number.parseInt(params.id, 10);

  if (Number.isNaN(userId)) {
    return <UserNotFound />;
  }

  let user: User;

  try {
    const res = await UsersService.getUser({ userId });

    if (!res.user) {
      return <UserNotFound />;
    }

    user = res.user;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return <UserNotFound />;
    }

    throw error;
  }

  return <AdminUserDetails initialUser={user} />;
}
