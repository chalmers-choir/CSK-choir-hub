import type { ReactNode } from "react";

import type { Metadata, Viewport } from "next";

import clsx from "clsx";

import { fontSans } from "@/config/fonts";
import Providers from "@/config/provider";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <body className={clsx("bg-background min-h-screen font-sans antialiased", fontSans.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
