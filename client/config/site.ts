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
  bottomNavItems: [
    {
      labelKey: "common.events",
      href: links.events,
      icon: "event",
    },
    {
      labelKey: "common.songs",
      href: links.songs,
      icon: "music_note",
    },
    {
      labelKey: "common.home",
      href: "/",
      icon: "home",
    },
    {
      labelKey: "common.settings",
      href: links.settings,
      icon: "settings",
    },
    {
      labelKey: "common.profile",
      href: links.profile,
      icon: "person",
    },
  ],
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
