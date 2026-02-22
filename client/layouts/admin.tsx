import { Head } from "next/document";

import { Navbar } from "@heroui/react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen flex-col">
      <Head />
      <Navbar />
      <main className="container mx-auto max-w-7xl flex-grow px-6 pt-16">{children}</main>
    </div>
  );
}
