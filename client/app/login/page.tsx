"use client";

import { Suspense, useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { Form } from "@heroui/react";
import { button as buttonStyles } from "@heroui/theme";

import AuthLoading from "@/components/AuthLoading";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/IntlContext";
import DefaultLayout from "@/layouts/default";

function LoginPageContent() {
  const { login, isAuthenticated, loading } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const redirectTo = searchParams.get("next") || "/";

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, loading, redirectTo, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
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
        <Form
          className="mx-auto mt-20 flex max-w-sm flex-col items-center gap-2"
          onSubmit={handleSubmit}
        >
          <h2 className="w-full text-center text-lg font-semibold">{t("welcome.singer")}</h2>
          <Input
            name="username"
            placeholder={t("common.username")}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            name="password"
            placeholder={t("common.password")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button
            className={
              buttonStyles({ color: "primary", radius: "md", variant: "shadow" }) + " px-8"
            }
            type="submit"
          >
            {t("common.login")}
          </Button>
          <Link
            className="mt-4 inline-block w-full text-center text-sm text-blue-500"
            href={siteConfig.links.register}
          >
            {t("common.no_account")}
          </Link>
        </Form>
      )}
    </DefaultLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <DefaultLayout>
          <AuthLoading />
        </DefaultLayout>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
