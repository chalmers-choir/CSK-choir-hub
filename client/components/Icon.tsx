import React from "react";

import MuiIcon, { IconProps as MuiIconProps } from "@mui/material/Icon";

export interface IconProps extends MuiIconProps {
  /** Name of the Material Icon (e.g., "home", "event", "account_circle") */
  name: string;
}

/**
 * Icon component using Material Icons font.
 *
 * Usage:
 *   <Icon name="home" fontSize="small" />
 *   <Icon name="event" className="text-primary" />
 *   <Icon name="account_circle" />
 *
 * Icon names are lowercase with underscores (Material Icons font format).
 * See: https://fonts.google.com/icons
 */
export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  return <MuiIcon {...props}>{name}</MuiIcon>;
};
