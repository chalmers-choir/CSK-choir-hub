import NextLink from 'next/link';

import clsx from 'clsx';

import { Logo } from '@/components/icons/icons';
import { UserMenu } from '@/components/navigation/UserMenu/UserMenu';
import { ThemeSwitch } from '@/components/settings/ThemeSwitcher';
import { siteConfig } from '@/config/site';
import { useAuth, useTranslation } from '@/contexts';

export const Navbar = () => {
  const { t } = useTranslation();
  const { isAuthenticated, logout, user, isAdmin } = useAuth();

  return (
    <nav className="border-border bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Left: Brand + Nav links */}
        <div className="flex items-center gap-6">
          <NextLink className="flex shrink-0 items-center justify-start gap-1" href="/">
            <Logo />
          </NextLink>
          <div className="hidden gap-4 md:flex">
            {siteConfig.navItems.map((item) => (
              <NextLink
                key={item.href}
                className={clsx('text-foreground hover:text-primary text-sm transition-colors')}
                href={item.href}
              >
                {t(item.labelKey)}
              </NextLink>
            ))}
            {isAdmin &&
              siteConfig.admin.navItems.map((item) => (
                <NextLink
                  key={item.href}
                  className={clsx('text-foreground hover:text-primary text-sm transition-colors')}
                  href={item.href}
                >
                  {t(item.labelKey)}
                </NextLink>
              ))}
          </div>
        </div>

        {/* Right: Theme switch + User menu */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex">
            <ThemeSwitch />
          </div>
          <UserMenu isAuthenticated={isAuthenticated} logout={logout} user={user} />
        </div>
      </div>
    </nav>
  );
};
