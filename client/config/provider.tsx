"use client";

import React from "react";

import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { IntlProvider } from "@/contexts/IntlContext";

/**
 * A wrapper component that provides authentication, theming, and UI context to its children.
 * If more providers are needed, they can be added here.
 *
 * @returns {JSX.Element} The combined providers wrapping the children components.
 */
export default function Providers({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <IntlProvider>
      <AuthProvider>
        <HeroUIProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <ToastProvider />
            {children}
          </ThemeProvider>
        </HeroUIProvider>
      </AuthProvider>
    </IntlProvider>
  );
}
