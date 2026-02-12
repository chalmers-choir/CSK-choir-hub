import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';

export interface LinkDropdownMenuProps {
  trigger: React.ReactNode;
  items: LinkDropDownMenuRef[];
}

export type LinkDropDownMenuRef = {
  key: string;
  name: string;
  href?: string;
  onPress?: () => void;
  className?: string;
};

export const LinkDropdownMenu = ({ items, trigger }: LinkDropdownMenuProps) => {
  return (
    <Dropdown>
      <DropdownTrigger>{trigger}</DropdownTrigger>

      <DropdownMenu>
        {items.map((item) => (
          <DropdownItem
            key={item.key}
            href={item.href}
            onPress={item.onPress}
            className={item.className}
          >
            {item.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
