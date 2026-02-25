export type SiteConfig = typeof siteConfig;

const links = {
  login: "/login",
  register: "/register",
  profile: "/profile",
  settings: "/settings",
  events: "/events",
};

const adminLinks = {
  dashboard: "/admin",
  users: "/admin/users",
};

/**
 * Get the API base URL dynamically based on the current environment.
 * In the browser, it uses the current hostname with port 5050.
 * On the server (SSR), it uses the environment variable or localhost.
 */
export function getApiBaseUrl(): string {
  // If API_BASE_URL is explicitly set, use it
  if (process.env.API_BASE_URL) {
    return process.env.API_BASE_URL;
  }

  // In the browser, use the current hostname with port 5050
  if (typeof window !== "undefined") {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;

    return `${protocol}//${hostname}:5050/api`;
  }

  // Fallback for server-side rendering
  return "http://localhost:5050/api";
}

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
};
