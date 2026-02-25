"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "@/components/Icon";
import { siteConfig } from "@/config/site";
import { useTranslation } from "@/contexts/IntlContext";

export const BottomNav = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <nav
      aria-label="Mobilnavigering"
      className="border-divider bg-background/80 safe-area-inset-bottom fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t backdrop-blur-md sm:hidden"
    >
      {siteConfig.bottomNavItems.map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-1 text-xs transition-colors ${
              isActive ? "text-primary" : "text-default-500 hover:text-default-800"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon
              name={item.icon}
              aria-hidden={true}
              fontSize="large"
              className={isActive ? "text-primary" : "text-default-500"}
            />
            {/* <span>{t(item.labelKey)}</span> */}
          </Link>
        );
      })}
    </nav>
  );
};
