"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";

import * as MuiIcons from "@mui/icons-material";

import { siteConfig } from "@/config/site";
import { useTranslation } from "@/contexts/IntlContext";

/**
 * Resolves a Material Icon component by name.
 * Accepts either the exact PascalCase MUI icon key (e.g. "Home", "EventNote")
 * or a lowercase single-word name (e.g. "home") which is auto-capitalised.
 * Multi-word icons must be provided in PascalCase (e.g. "AccountCircle").
 */
function resolveIcon(name: string): React.ComponentType<{ fontSize?: string; className?: string; "aria-hidden"?: boolean }> | null {
  const key = name.charAt(0).toUpperCase() + name.slice(1);
  const Icon = MuiIcons[key as keyof typeof MuiIcons];

  return (Icon as React.ComponentType<{ fontSize?: string; className?: string; "aria-hidden"?: boolean }>) ?? null;
}

export const BottomNav = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <nav aria-label="Mobilnavigering" className="sm:hidden fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-divider bg-background/80 backdrop-blur-md safe-area-inset-bottom">
      {siteConfig.bottomNavItems.map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        const IconComponent = resolveIcon(item.icon);

        return (
          <NextLink
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-1 text-xs transition-colors ${
              isActive ? "text-primary" : "text-default-500 hover:text-default-800"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {IconComponent && (
              <IconComponent aria-hidden={true} fontSize="small" className={isActive ? "text-primary" : "text-default-500"} />
            )}
            <span>{t(item.labelKey)}</span>
          </NextLink>
        );
      })}
    </nav>
  );
};
