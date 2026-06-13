'use client';

import { FC, useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import { MoonFilledIcon, SunFilledIcon } from '@/components/icons/icons';

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="h-6 w-6" />;

  const isDark = theme === 'dark';

  return (
    <button
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`text-muted-foreground cursor-pointer px-px transition-opacity hover:opacity-80 ${className ?? ''}`}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <SunFilledIcon size={22} /> : <MoonFilledIcon size={22} />}
    </button>
  );
};
