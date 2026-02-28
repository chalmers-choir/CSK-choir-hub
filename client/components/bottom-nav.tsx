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
      className="fixed bottom-2 left-0 right-0 z-50 mx-auto flex h-auto max-w-md items-center justify-around px-1 sm:hidden"
    >
      <div className="backdrop-blur-xs backdrop-saturate-40 flex w-full flex-row items-center justify-between rounded-[21] border border-white/80 bg-neutral-200/15 p-3 shadow-lg">
        {siteConfig.bottomNavItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                "relative flex items-center justify-center transition-transform active:scale-95"
              }
              aria-current={isActive ? "page" : undefined}
            >
              {/* Glass pill background for active state */}
              {isActive && (
                <div className="animate-in fade-in zoom-in-95 duration-400 absolute -inset-2 aspect-square rounded-[20] border border-white/80 bg-gray-400/30 shadow-lg" />
              )}

              {/* Icon */}
              <div
                className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-200 ${
                  isActive ? "scale-110" : "scale-100 hover:scale-105"
                }`}
              >
                <Icon
                  name={item.icon}
                  aria-hidden={true}
                  fontSize="large"
                  className={`transition-all duration-200 ${
                    isActive
                      ? "text-tertiary drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
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
