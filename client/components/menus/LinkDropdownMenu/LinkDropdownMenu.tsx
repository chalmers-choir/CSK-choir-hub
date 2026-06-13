import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
    <DropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {items.map((item) => (
          <DropdownMenuItem key={item.key} className={item.className} onClick={item.onPress}>
            {item.href ? <a href={item.href}>{item.name}</a> : item.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
