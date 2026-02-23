"use client";

import { useEffect, useState } from "react";

import { Button, Form, addToast } from "@heroui/react";

import { TextField } from "@/components";
import { useAuth, useTranslation } from "@/contexts";
import DefaultLayout from "@/layouts/default";
import { ApiError, UsersService } from "@/lib/api-client";
import { GroupType } from "@/types/group";

/**
 * Profile page for editing user information.
 * @returns
 */
export default function ProfilePage() {
  const { user } = useAuth();
  const { t } = useTranslation();

  const [dietPref, setDietPref] = useState<string>();

  useEffect(() => {
    setDietPref(user?.dietaryPreferences || "");
  }, [user?.dietaryPreferences]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = {
        dietaryPreferences: dietPref,
      };

      if (!user) return;

      await UsersService.updateUser({
        userId: user.id,
        requestBody: data,
      });

      addToast({
        title: "Success",
        description: "Profile updated successfully!",
        color: "success",
        timeout: 2000,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error updating profile:", error);

      let errorMessage = "Failed to update profile. Please try again.";

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
    <DefaultLayout>
      <h1 className="mb-6 text-2xl font-semibold">Hi {user?.firstName}</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextField label={t("user.firstName")} value={user?.firstName} readOnly />
        <TextField label={t("user.lastName")} value={user?.lastName} readOnly />
        <TextField label={t("user.email")} value={user?.email} readOnly />

        <TextField
          readOnly
          label={t("user.voice_group")}
          value={user?.groups
            .filter((g) => g.type == GroupType.VOICE)
            ?.map((c) => c.name)
            .join(", ")}
        />
        <TextField
          readOnly
          label={t("user.choirs")}
          value={user?.groups
            .filter((g) => g.type == GroupType.CHOIR)
            ?.map((c) => c.name)
            .join(", ")}
        />
        <TextField
          readOnly
          label={t("user.committee")}
          value={
            user?.groups
              .filter((g) => g.type == GroupType.COMMITTEE)
              ?.map((c) => c.name)
              .join(", ") || t("profile.no_committees")
          }
        />
        <TextField
          readOnly
          label={t("user.other")}
          value={user?.groups
            .filter((g) => g.type == GroupType.OTHER)
            ?.map((c) => c.name)
            .join(", ")}
        />
        <TextField
          readOnly
          label={t("user.roles")}
          value={user?.roles?.map((c) => c.name).join(", ")}
        />
        <Form onSubmit={handleSave}>
          <p className="mb-4 mt-8 text-xl font-semibold">{t("profile.edit_profile")}</p>
          <TextField
            label={t("user.dietary_preferences")}
            value={dietPref}
            onChange={(val) => setDietPref(val)}
          />
          <Button variant="ghost" type="submit" color="primary">
            {t("buttons.save")}
          </Button>
        </Form>
      </div>
    </DefaultLayout>
  );
}
