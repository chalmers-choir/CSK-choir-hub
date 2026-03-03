import { AdminUsersTable } from "@/components/admin/AdminUsersTable";
import { UsersService } from "@/lib/serverApiClient";

export default async function AdminUsersPage() {
  const response = await UsersService.getUsers({ includeGroups: true });
  const users = response.users || [];

  return (
    <>
      <h1 className="text-2xl font-bold">Users</h1>
      <AdminUsersTable users={users} />
    </>
  );
}
