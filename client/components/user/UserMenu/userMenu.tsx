import { AccountCircleOutlined } from '@mui/icons-material';

import { Avatar } from '@heroui/react';

import { LinkDropDownMenuRef, LinkDropdownMenu } from '@/components/menus';
import { siteConfig } from '@/config/site';
import { User } from '@/lib/api-client';

export interface UserMenuProps {
  isAuthenticated: boolean;
  user?: User | undefined;
  logout: () => void;
}

export const UserMenu = ({ isAuthenticated, logout, user }: UserMenuProps) => {
  const menuTrigger = isAuthenticated ? (
    <Avatar
      isBordered
      as="button"
      className="transition-transform"
      color="primary"
      name={user?.firstName + ' ' + user?.lastName}
      size="sm"
    />
  ) : (
    <AccountCircleOutlined />
  );

  const items: LinkDropDownMenuRef[] = isAuthenticated
    ? [
        { key: 'profile', name: 'Profile', href: siteConfig.links.profile },
        { key: 'settings', name: 'Settings', href: siteConfig.links.settings },
        { key: 'logout', className: 'text-danger', name: 'Logout', onPress: logout },
      ]
    : [
        { key: 'login', name: 'Login', href: siteConfig.links.login },
        { key: 'register', name: 'Register', href: siteConfig.links.register },
      ];

  return <LinkDropdownMenu trigger={menuTrigger} items={items} />;
};
