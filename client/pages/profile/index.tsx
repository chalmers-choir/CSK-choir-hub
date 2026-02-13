import { useEffect, useState } from "react";

import { Button, Form, addToast } from "@heroui/react";

import { TextField } from "@/components";
import { useAuth } from "@/contexts";
import DefaultLayout from "@/layouts/default";
import { UsersService } from "@/lib/api-client";
import { GroupType } from "@/types/group";

/**
 * Profile page for editing user information.
 * @returns
 */
export default function ProfilePage() {
  const { user } = useAuth();

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

      console.log("Saving profile with data:", data);

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
      console.error("Error updating profile:", error);
      addToast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        color: "danger",
        timeout: 2000,
      });
    }
  };

  return (
    <DefaultLayout>
      <h1 className="mb-6 text-2xl font-semibold">Hi {user?.firstName}</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextField label="First Name" value={user?.firstName} readOnly />
        <TextField label="Last Name" value={user?.lastName} readOnly />
        <TextField label="Email" value={user?.email} readOnly />

        <TextField
          readOnly
          label="Kör(er)"
          value={user?.groups
            .filter((g) => g.type == GroupType.CHOIR)
            ?.map((c) => c.name)
            .join(", ")}
        />
        <TextField
          readOnly
          label="Kommittér"
          value={
            user?.groups
              .filter((g) => g.type == GroupType.COMMITTEE)
              ?.map((c) => c.name)
              .join(", ") || "Inga kommittéer"
          }
        />
        <TextField
          readOnly
          label="Other"
          value={user?.groups
            .filter((g) => g.type == GroupType.OTHER)
            ?.map((c) => c.name)
            .join(", ")}
        />
        <TextField readOnly label="Roller" value={user?.roles?.map((c) => c.name).join(", ")} />
        <Form onSubmit={handleSave}>
          <p className="mb-4 mt-8 text-xl font-semibold">Redigera din profil</p>
          <TextField label="Matpref" value={dietPref} onChange={(val) => setDietPref(val)} />
          <Button variant="ghost" type="submit" color="primary">
            Save
          </Button>
        </Form>
      </div>
    </DefaultLayout>
  );
}
