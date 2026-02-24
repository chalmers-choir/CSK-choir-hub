"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

import { TextField } from "@/components";
import AdminLayout from "@/layouts/admin";
import { User, UsersService } from "@/lib/api-client";

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"ascending" | "descending">("ascending");

  useEffect(() => {
    UsersService.getUsers().then((response) => {
      setUsers(response.users);
      setLoading(false);
    });
  }, []);

  const columns = [
    { name: "NAME", key: "name" },
    { name: "MAIL", key: "mail" },
    // { name: "CHOIR", key: "choir" },
  ];

  // const users = [
  //   { name: "John Doe", role: "Admin", status: "Active" },
  //   { name: "Jane Smith", role: "User", status: "Inactive" },
  // ];

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "ascending" ? "descending" : "ascending");
    } else {
      setSortColumn(columnKey);
      setSortDirection("ascending");
    }
  };

  const filteredUsers = users?.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedUsers = filteredUsers?.sort((a, b) => {
    let compareValue = 0;

    if (sortColumn === "name") {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();

      compareValue = nameA.localeCompare(nameB);
    } else if (sortColumn === "mail") {
      compareValue = a.email.toLowerCase().localeCompare(b.email.toLowerCase());
    }

    return sortDirection === "ascending" ? compareValue : -compareValue;
  });

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold">Admin - Users</h1>

        <TextField
          placeholder="Search users..."
          value={searchTerm}
          onChange={setSearchTerm}
          className="my-4 max-w-sm"
        />

        {loading ? (
          <p>Loading...</p>
        ) : (
          sortedUsers && (
            <Table>
              <TableHeader>
                {columns.map((column) => (
                  <TableColumn
                    key={column.key}
                    className="cursor-pointer"
                    onClick={() => handleSort(column.key)}
                  >
                    {column.name}
                    {sortColumn === column.key && (
                      <span className="ml-2">{sortDirection === "ascending" ? "↑" : "↓"}</span>
                    )}
                  </TableColumn>
                ))}
              </TableHeader>

              <TableBody>
                {sortedUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    onClick={() => router.push(`/admin/users/${user.id}`)}
                    className="hover:bg-default-100 cursor-pointer transition-colors"
                  >
                    <TableCell>{user.firstName + " " + user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )
        )}
      </div>
    </AdminLayout>
  );
}
