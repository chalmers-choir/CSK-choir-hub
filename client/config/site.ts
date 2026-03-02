export type SiteConfig = typeof siteConfig;

const links = {
  login: "/login",
  register: "/register",
  profile: "/profile",
  settings: "/settings",
  events: "/events",
  songs: "/songs",
};

const adminLinks = {
  dashboard: "/admin",
  users: "/admin/users",
};

type BottomNavItem = {
  labelKey: string;
  href: string;
  icon: string;
  iconVariant: "filled" | "outlined" | "rounded" | "sharp" | "two-tone";
};

const bottomNavItems: BottomNavItem[] = [
  {
    labelKey: "common.events",
    href: links.events,
    icon: "event",
    iconVariant: "outlined",
  },
  {
    labelKey: "common.songs",
    href: links.songs,
    icon: "music_note",
    iconVariant: "outlined",
  },
  {
    labelKey: "common.home",
    href: "/",
    icon: "home",
    iconVariant: "outlined",
  },
  {
    labelKey: "common.settings",
    href: links.settings,
    icon: "settings",
    iconVariant: "outlined",
  },
  {
    labelKey: "common.profile",
    href: links.profile,
    icon: "person",
    iconVariant: "outlined",
  },
];

export const siteConfig = {
  name: "CSK Medlemsportal",
  description: "En medlemsportal for Chalmers Sångkör",
  navItems: [
    {
      labelKey: "common.home",
      href: "/",
    },
    {
      labelKey: "common.events",
      href: links.events,
    },
    {
      labelKey: "common.settings",
      href: links.settings,
    },
  ],
  navMenuItems: [],
  bottomNavItems,
  links,
  admin: {
    navItems: [
      {
        labelKey: "admin.dashboard",
        href: adminLinks.dashboard,
      },
      {
        labelKey: "common.users",
        href: adminLinks.users,
      },
    ],
    adminLinks,
  },
  // Default to the same port as the generated OpenAPI spec (5050) so local auth works out of the box.
  apiBaseUrl: process.env.API_BASE_URL || "http://localhost:5050/api",
};
