"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "@/components/Icon";
import { siteConfig } from "@/config/site";

export const BottomNav = () => {
  const pathname = usePathname();
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicatorPosition, setIndicatorPosition] = useState({ x: 0, width: 0 });

  // Find the active index
  const activeIndex = siteConfig.bottomNavItems.findIndex((item) => {
    return item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
  });

  useEffect(() => {
    if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
      const activeItem = itemRefs.current[activeIndex];

      if (activeItem) {
        // Extract the element's position directly
        const { offsetLeft, offsetWidth } = activeItem;

        setIndicatorPosition({
          x: offsetLeft + offsetWidth / 2,
          width: 64,
        });
      }
    }
  }, [activeIndex]);

  return (
    <nav
      aria-label="Mobilnavigering"
      className="fixed bottom-2 left-0 right-0 z-50 mx-auto flex h-auto max-w-md items-center justify-around px-1 sm:hidden"
    >
      <div className="backdrop-blur-xs backdrop-saturate-40 relative flex w-full flex-row items-center justify-between rounded-[21] border border-white/80 bg-neutral-200/15 p-1 shadow-lg">
        {/* Sliding indicator background */}
        {activeIndex !== -1 && (
          <div
            className="absolute left-0 aspect-square rounded-[30] border border-white/80 bg-gray-400/30 shadow-lg transition-transform duration-300 ease-out"
            style={{
              width: `${indicatorPosition.width}px`,
              transform: `translateX(${indicatorPosition.x - indicatorPosition.width / 2}px)`,
            }}
          />
        )}

        {siteConfig.bottomNavItems.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <Link
              key={item.href}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              href={item.href}
              className={
                "relative flex h-16 items-center justify-center transition-transform active:scale-95"
              }
              aria-current={isActive ? "page" : undefined}
            >
              {/* Icon */}
              <div
                className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-200 ${
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
