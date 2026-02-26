import NextLink from "next/link";

import {
  Navbar as HeroUINavbar,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  link as linkStyles,
} from "@heroui/react";
import clsx from "clsx";

import { UserMenu } from "@/components";
import { Logo } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/IntlContext";

export const Navbar = () => {
  const { t } = useTranslation();
  const { isAuthenticated, logout, user, isAdmin } = useAuth();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="max-w-fit shrink-0 gap-3">
          <NextLink className="flex shrink-0 items-center justify-start gap-1" href="/">
            <Logo />
          </NextLink>
        </NavbarBrand>
        <div className="ml-2 hidden min-w-0 justify-start gap-4 md:flex">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {t(item.labelKey)}
              </NextLink>
            </NavbarItem>
          ))}
          {isAdmin &&
            siteConfig.admin.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {t(item.labelKey)}
                </NextLink>
              </NavbarItem>
            ))}
        </div>
      </NavbarContent>

      <NavbarContent className="hidden basis-1/5 sm:flex sm:basis-full" justify="end">
        <NavbarItem className="hidden gap-2 sm:flex">
          <ThemeSwitch />
        </NavbarItem>
        <UserMenu isAuthenticated={isAuthenticated} logout={logout} user={user} />
      </NavbarContent>

      <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
        <UserMenu isAuthenticated={isAuthenticated} logout={logout} user={user} />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {/* <UserInfo /> */}
        <div className="w-75 mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link href={item.href} size="lg" color={"foreground"}>
                {t(item.labelKey)}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <ThemeSwitch />
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
