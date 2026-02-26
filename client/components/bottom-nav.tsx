"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "@/components/Icon";
import { siteConfig } from "@/config/site";

export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobilnavigering"
      className="fixed bottom-4 left-0 right-0 z-50 mx-auto flex h-auto max-w-md items-center justify-around px-2 sm:hidden"
    >
      <div className="flex w-full flex-row items-center justify-around rounded-2xl border border-white/20 bg-neutral-400/20 py-3 shadow-lg backdrop-blur">
        {siteConfig.bottomNavItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex items-center justify-center transition-transform active:scale-95"
              aria-current={isActive ? "page" : undefined}
            >
              {/* Glass pill background for active state */}
              {isActive && (
                <div className="animate-in fade-in zoom-in-95 bg-primary/40 absolute -inset-2 aspect-square rounded-2xl border border-white/20 shadow-lg duration-200" />
              )}

              {/* Icon */}
              <div
                className={`relative z-10 rounded-2xl px-3 transition-all duration-200 ${
                  isActive ? "scale-110" : "scale-100 hover:scale-105"
                }`}
              >
                <Icon
                  name={item.icon}
                  aria-hidden={true}
                  fontSize="large"
                  className={`transition-all duration-200 ${
                    isActive
                      ? "text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                      : "text-default-400"
                  }`}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
