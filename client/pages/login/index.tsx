"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { Form } from "@heroui/react";
import { button as buttonStyles } from "@heroui/theme";

import AuthLoading from "@/components/AuthLoading";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/contexts/AuthContext";
import DefaultLayout from "@/layouts/default";

export default function LoginPage() {
  const { login, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && isAuthenticated) {
      const redirectTo = (router.query.next as string) || "/";

      router.replace(redirectTo);
    }
  }, [isAuthenticated, loading, router, router.query.next]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const redirectTo = (router.query.next as string) || "/";

      await login(username, password, redirectTo);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <DefaultLayout>
      {loading ? (
        <AuthLoading />
      ) : (
        <Form className="mx-auto mt-20 flex max-w-sm flex-col gap-2" onSubmit={handleSubmit}>
          <h2 className="w-full text-center text-lg font-semibold">Login</h2>
          <Input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button
            className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
            type="submit"
          >
            Login
          </Button>
          <Link
            className="mt-4 inline-block w-full text-center text-sm text-blue-500"
            href={siteConfig.links.register}
          >
            Inget konto? Registrera
          </Link>
        </Form>
      )}
    </DefaultLayout>
  );
}
