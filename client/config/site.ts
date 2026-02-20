export type SiteConfig = typeof siteConfig;

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
      href: "/events",
    },
  ],
  navMenuItems: [],
  links: {
    login: "/login",
    register: "/login/register",
    profile: "/profile",
    settings: "/settings",
    events: "/events",
  },
  // Default to the same port as the generated OpenAPI spec (5050) so local auth works out of the box.
  apiBaseUrl: process.env.API_BASE_URL || "http://localhost:5050/api",
};
