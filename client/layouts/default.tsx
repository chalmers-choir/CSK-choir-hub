"use client";

import { Link } from "@heroui/link";

import { BottomNav } from "@/components/bottom-nav";
import { Navbar } from "@/components/navbar";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen flex-col">
      <Navbar />
      <main className="container mx-auto max-w-7xl flex-grow px-6 pt-16 pb-16 sm:pb-0">{children}</main>
      <footer className="hidden sm:flex w-full items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://github.com/chalmers-choir"
          title="webmästariets github"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">Chalmers Sångkörs Webbmästeri</p>
        </Link>
      </footer>
      <BottomNav />
    </div>
  );
}
