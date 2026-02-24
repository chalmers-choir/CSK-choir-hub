"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Button, Select, SelectItem, addToast } from "@heroui/react";
import { ArrowBackIosNew } from "@mui/icons-material";

import { TextField } from "@/components";
import { useTranslation } from "@/contexts/IntlContext";
import AdminLayout from "@/layouts/admin";
import { GroupSummary, GroupsService, User, UsersService } from "@/lib/api-client";
import { GroupType } from "@/types/group";

/**
 * Admin page for viewing and editing user details.
 * @returns The rendered user detail page.
 */
export default function UserDetailPage() {
  const { t } = useTranslation();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [user, setUser] = useState<User | undefined>(undefined);
  const [currentChoirs, setCurrentChoirs] = useState<Set<string>>(new Set());
  const [choirs, setChoirs] = useState<GroupSummary[]>([]);

  useEffect(() => {
    if (!id) return; // wait until id is available
    const userId = parseInt(Array.isArray(id) ? id[0] : id, 10);

    if (Number.isNaN(userId)) return;

    const fetchUser = async () => {
      try {
        const res = await UsersService.getUser({ userId });

        setUser(res.user);
        if (res.user && res.user.groups) {
          const choirIds = res.user.groups
            .filter((g) => g.type === GroupType.CHOIR)
            .map((g) => String(g.id));

          setCurrentChoirs(new Set(choirIds));
        }
      } catch (error) {
        addToast({
          title: "Error",
          description:
            "Failed to fetch user details. Please try again." +
            (error instanceof Error ? ` (${error.message})` : ""),
          color: "danger",
          timeout: 2000,
        });
      }
    };
    const fetchChoirs = async () => {
      try {
        const res = await GroupsService.getGroups({ type: GroupType.CHOIR });

        setChoirs(res.groups ?? []);
      } catch (error) {
        addToast({
          title: "Error",
          description:
            "Failed to fetch choirs. Please try again." +
            (error instanceof Error ? ` (${error.message})` : ""),
          color: "danger",
          timeout: 2000,
        });
      }
    };

    fetchUser();
    fetchChoirs();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      // Update user info including group memberships
      await UsersService.updateUser({
        userId: user.id,
        requestBody: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          dietaryPreferences: user.dietaryPreferences,
          groupIds: Array.from(currentChoirs).map((id) => parseInt(id, 10)),
        },
      });

      addToast({
        title: "Success",
        description: "User updated successfully!",
        color: "success",
        timeout: 2000,
      });
    } catch (error) {
      addToast({
        title: "Error",
        description:
          "Failed to update user. Please try again." +
          (error instanceof Error ? ` (${error.message})` : ""),
        color: "danger",
        timeout: 2000,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center gap-2">
        <Link
          href="/admin/users"
          className="text-default-500 hover:text-default-700 text-md flex items-center gap-1 transition-colors"
        >
          <ArrowBackIosNew className="cursor-pointer" onClick={() => window.history.back()} />
          {t("buttons.back")}
        </Link>
      </div>
      <h1 className="mb-6 mt-4 text-2xl font-semibold">{t("admin.users_details")}</h1>
      {user ? (
        <form className="max-w-md space-y-4" onSubmit={handleSubmit}>
          <TextField
            label={t("user.firstName")}
            value={user.firstName}
            onChange={(val) => setUser((prev) => (prev ? { ...prev, firstName: val } : undefined))}
          />
          <TextField
            label={t("user.lastName")}
            value={user.lastName}
            onChange={(val) => setUser((prev) => (prev ? { ...prev, lastName: val } : undefined))}
          />
          <TextField
            label={t("user.email")}
            value={user.email}
            onChange={(val) => setUser((prev) => (prev ? { ...prev, email: val } : undefined))}
          />
          <Select
            selectionMode="multiple"
            label={t("user.choirs")}
            selectedKeys={currentChoirs}
            onSelectionChange={(keys) => {
              setCurrentChoirs(new Set(Array.from(keys).map(String)));
            }}
          >
            {choirs.map((choir) => (
              <SelectItem key={choir.id}>{choir.name}</SelectItem>
            ))}
          </Select>
          <Button type="submit" color="primary">
            {t("buttons.save")}
          </Button>
        </form>
      ) : (
        <p>Loading user details...</p>
      )}
    </AdminLayout>
  );
}
