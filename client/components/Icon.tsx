import React from "react";

import MuiIcon, { IconProps as MuiIconProps } from "@mui/material/Icon";

export type IconVariant = "filled" | "outlined" | "rounded" | "sharp" | "two-tone";

export interface IconProps extends MuiIconProps {
  /** Name of the Material Icon (e.g., "home", "event", "account_circle") */
  name: string;
  /** Icon variant style (default: "filled") */
  variant?: IconVariant;
}

/**
 * Icon component using Material Icons font.
 *
 * Usage:
 *   <Icon name="home" fontSize="small" />
 *   <Icon name="event" variant="outlined" className="text-primary" />
 *   <Icon name="account_circle" variant="rounded" />
 *
 * Icon names are lowercase with underscores (Material Icons font format).
 * Variants: filled (default), outlined, rounded, sharp, two-tone
 * See: https://fonts.google.com/icons
 */
export const Icon: React.FC<IconProps> = ({ name, variant = "filled", className, ...props }) => {
  const variantMap: Record<IconVariant, string> = {
    filled: "material-icons",
    outlined: "material-icons-outlined",
    rounded: "material-icons-round",
    sharp: "material-icons-sharp",
    "two-tone": "material-icons-two-tone",
  };

  return (
    <MuiIcon {...props} baseClassName={variantMap[variant]} className={className}>
      {name}
    </MuiIcon>
  );
};
