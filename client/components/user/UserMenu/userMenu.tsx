import { Avatar } from "@heroui/react";
import { AccountCircleOutlined } from "@mui/icons-material";

import { LinkDropDownMenuRef, LinkDropdownMenu } from "@/components/menus";
import { siteConfig } from "@/config/site";
import { useTranslation } from "@/contexts/IntlContext";
import { User } from "@/lib/api-client";

export interface UserMenuProps {
  isAuthenticated: boolean;
  user?: User | undefined;
  logout: () => void;
}

export const UserMenu = ({ isAuthenticated, logout, user }: UserMenuProps) => {
  const { t } = useTranslation();

  const menuTrigger = isAuthenticated ? (
    <Avatar
      isBordered
      as="button"
      className="transition-transform"
      color="primary"
      name={user?.firstName + " " + user?.lastName}
      size="sm"
    />
  ) : (
    <AccountCircleOutlined />
  );

  const items: LinkDropDownMenuRef[] = isAuthenticated
    ? [
        { key: "profile", name: t("common.profile"), href: siteConfig.links.profile },
        { key: "settings", name: t("common.settings"), href: siteConfig.links.settings },
        { key: "logout", className: "text-danger", name: t("common.logout"), onPress: logout },
      ]
    : [
        { key: "login", name: t("common.login"), href: siteConfig.links.login },
        { key: "register", name: t("common.register"), href: siteConfig.links.register },
      ];

  return <LinkDropdownMenu trigger={menuTrigger} items={items} />;
};
