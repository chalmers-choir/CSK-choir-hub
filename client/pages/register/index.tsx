"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { Form } from "@heroui/react";
import { button as buttonStyles } from "@heroui/theme";
import clsx from "clsx";

import AuthLoading from "@/components/AuthLoading";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/contexts/AuthContext";
import DefaultLayout from "@/layouts/default";

export default function RegisterPage() {
  const { register, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({
        username,
        password,
        email,
        firstName,
        lastName,
      });
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
          <h2 className="w-full text-center text-lg font-semibold">Register</h2>
          <Input
            required
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            required
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            required
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            required
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <Input
            required
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          {error && <p className="text-red-500">{error}</p>}

          <Button
            className={clsx(
              buttonStyles({ color: "primary", radius: "md", variant: "shadow" }),
              "px-8",
            )}
            type="submit"
          >
            Register
          </Button>
          <Link
            className="mt-4 inline-block w-full text-center text-sm text-blue-500"
            href={siteConfig.links.login}
          >
            Already have an account? Login
          </Link>
        </Form>
      )}
    </DefaultLayout>
  );
}
