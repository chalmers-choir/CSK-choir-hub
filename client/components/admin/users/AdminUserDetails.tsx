"use client";

import { useState } from "react";

import { Button, addToast } from "@heroui/react";

import { TextField } from "@/components";
import { useTranslation } from "@/contexts/IntlContext";
import { ApiError, User, UsersService } from "@/lib/api-client";

interface AdminUserDetailsProps {
  initialUser: User;
}

/**
 * Client component for editing user details with form state management.
 */
export function AdminUserDetails({ initialUser }: AdminUserDetailsProps) {
  const { t } = useTranslation();
  const [user, setUser] = useState<User>(initialUser);

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
    <form className="max-w-md space-y-4" onSubmit={handleSubmit}>
      <TextField
        label={t("user.firstName")}
        value={user.firstName}
        onChange={(val) => setUser((prev) => ({ ...prev, firstName: val }))}
      />
      <TextField
        label={t("user.lastName")}
        value={user.lastName}
        onChange={(val) => setUser((prev) => ({ ...prev, lastName: val }))}
      />
      <TextField
        label={t("user.email")}
        value={user.email}
        onChange={(val) => setUser((prev) => ({ ...prev, email: val }))}
      />
      <Button type="submit" color="primary">
        {t("buttons.save")}
      </Button>
    </form>
  );
}
