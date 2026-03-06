'use client';

import React from 'react';

import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';

import { HeroUIProvider, ToastProvider } from '@heroui/react';

import { AuthProvider } from '@/contexts/AuthContext';

/**
 * A wrapper component that provides authentication, theming, and UI context to its children.
 * If more providers are needed, they can be added here.
 *
 * @returns {JSX.Element} The combined providers wrapping the children components.
 */
export default function Providers({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <NextIntlClientProvider>
      <AuthProvider>
        <HeroUIProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <ToastProvider />
            {children}
          </ThemeProvider>
        </HeroUIProvider>
      </AuthProvider>
    </NextIntlClientProvider>
  );
}
