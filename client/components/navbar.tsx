import NextLink from "next/link";

import {
  Navbar as HeroUINavbar,
  Input,
  Kbd,
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
import { Logo, SearchIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/IntlContext";

export const Navbar = () => {
  const { t } = useTranslation();
  const searchInput = (
    <Input
      aria-label={t("common.search")}
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder={t("common.search")}
      startContent={
        <SearchIcon className="text-default-400 pointer-events-none flex-shrink-0 text-base" />
      }
      type="search"
    />
  );
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="max-w-fit gap-3">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <Logo />
          </NextLink>
        </NavbarBrand>
        <div className="ml-2 hidden justify-start gap-4 md:flex">
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
        </div>
      </NavbarContent>

      <NavbarContent className="hidden basis-1/5 sm:flex sm:basis-full" justify="end">
        <NavbarItem className="hidden gap-2 sm:flex">
          <ThemeSwitch />
        </NavbarItem>
        {/* <NavbarItem className="hidden sm:flex">{isAuthenticated && logoutButton}</NavbarItem> */}
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <UserMenu isAuthenticated={isAuthenticated} logout={logout} user={user} />
      </NavbarContent>

      <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
        <UserMenu isAuthenticated={isAuthenticated} logout={logout} user={user} />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {/* <UserInfo /> */}
        {searchInput}
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
