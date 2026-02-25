"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Button, addToast } from "@heroui/react";
import { ArrowBackIosNew } from "@mui/icons-material";

import { TextField } from "@/components";
import { useTranslation } from "@/contexts/IntlContext";
import { ApiError, User, UsersService } from "@/lib/api-client";

/**
 * Admin page for viewing and editing user details.
 * @returns The rendered user detail page.
 */
export default function UserDetailPage() {
  const { t } = useTranslation();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (!id) return; // wait until id is available
    const userId = parseInt(Array.isArray(id) ? id[0] : id, 10);

    if (Number.isNaN(userId)) return;

    const fetchUser = async () => {
      try {
        const res = await UsersService.getUser({ userId });

        setUser(res.user);
      } catch (error) {
        let errorMessage = "Failed to fetch user details. Please try again.";

        if (error instanceof ApiError && error.body?.message) {
          errorMessage = error.body.message;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        addToast({
          title: "Error",
          description: errorMessage,
          color: "danger",
          timeout: 2000,
        });
      }
    };

    fetchUser();
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
        },
      });

      addToast({
        title: "Success",
        description: "User updated successfully!",
        color: "success",
        timeout: 2000,
      });
    } catch (error) {
      let errorMessage = "Failed to update user. Please try again.";

      if (error instanceof ApiError && error.body?.message) {
        errorMessage = error.body.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      addToast({
        title: "Error",
        description: errorMessage,
        color: "danger",
        timeout: 2000,
      });
    }
  };

  return (
    <>
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
          <Button type="submit" color="primary">
            {t("buttons.save")}
          </Button>
        </form>
      ) : (
        <p>Loading user details...</p>
      )}
    </>
  );
}
