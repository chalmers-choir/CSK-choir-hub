"use client";

import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { AuthContextType, RegisterForm } from "../types/auth";
import { AuthService, User } from "@/lib/apiClient";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await AuthService.authenticate();

      setUser(res.user);
    } catch {
      setUser(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (username: string, password: string, redirectTo = "/") => {
    setLoading(true);
    try {
      const res = await AuthService.loginUser({ requestBody: { username, password } });

      setUser(res.user);
      router.push(redirectTo);
    } catch {
      setUser(undefined);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Omit<RegisterForm, "confirmPassword">) => {
    setLoading(true);

    try {
      await AuthService.registerUser({ requestBody: userData });
      router.push("/login");
    } catch {
      setUser(undefined);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);

    try {
      await AuthService.logout();
      setUser(undefined);
      router.push("/");
    } catch {
      setUser(undefined);
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.groups.some((group) => group.name === "Admins") ?? false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
