"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useParams } from "next/navigation";

import { ArrowBackIosNew } from "@mui/icons-material";

import AdminLayout from "@/layouts/admin";
import { User, UsersService } from "@/lib/api-client";

export default function UserDetailPage() {
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
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <AdminLayout>
      <div className="flex items-center gap-2">
        <Link
          href="/admin/users"
          className="text-default-500 hover:text-default-700 text-md flex items-center gap-1 transition-colors"
        >
          <ArrowBackIosNew className="cursor-pointer" onClick={() => window.history.back()} />
          Back
        </Link>
      </div>
      <div className="mx-auto mt-20 max-w-sm rounded-lg border p-6 shadow">
        <h2 className="mb-4 text-2xl font-bold">
          {user?.firstName} {user?.lastName}
        </h2>
        <p>
          <strong>Username:</strong> {user?.username}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Dietary Preferences:</strong> {user?.dietaryPreferences || "None"}
        </p>
      </div>
    </AdminLayout>
  );
}
