"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

import { TextField } from "@/components";
import { useTranslation } from "@/contexts";
import DefaultLayout from "@/layouts/default";
import { User, UsersService } from "@/lib/api-client";
import { GroupType } from "@/types/group";

export default function AdminUsersPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"ascending" | "descending">("ascending");

  useEffect(() => {
    UsersService.getUsers({ includeGroups: true }).then((response) => {
      setUsers(response.users);
      setLoading(false);
    });
  }, []);

  const columns = [
    { name: t("admin.name_column"), key: "name" },
    { name: t("admin.choir_column"), key: "choir" },
  ];

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
    } else if (sortColumn === "choir") {
      const choirA = a.groups
        ?.filter((group) => group.type === GroupType.CHOIR)
        .map((group) => group.name)
        .join(", ")
        .toLowerCase();
      const choirB = b.groups
        ?.filter((group) => group.type === GroupType.CHOIR)
        .map((group) => group.name)
        .join(", ")
        .toLowerCase();

      // Users with no choir should sort together at the bottom
      if (!choirA && !choirB) compareValue = 0;
      else if (!choirA)
        compareValue = 1; // No choir sorts lower
      else if (!choirB)
        compareValue = -1; // No choir sorts higher
      else compareValue = choirA.localeCompare(choirB);
    }

    return sortDirection === "ascending" ? compareValue : -compareValue;
  });

  return (
    <DefaultLayout>
      <h1 className="text-2xl font-bold">{t("admin.users_title")}</h1>

      <TextField
        placeholder={t("admin.search_users")}
        value={searchTerm}
        onChange={setSearchTerm}
        className="my-4 max-w-sm"
      />

      {loading ? (
        <p>{t("admin.loading")}</p>
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
                  <TableCell>
                    {user.groups
                      .filter((group) => group.type === GroupType.CHOIR)
                      .map((group) => group.name)
                      .join(", ") || t("admin.no_choir")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      )}
    </DefaultLayout>
  );
}
