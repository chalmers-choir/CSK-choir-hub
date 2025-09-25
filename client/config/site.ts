export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'CSK Medlemsportal',
  description: 'Make beautiful websites regardless of your design experience.',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Events',
      href: '/events',
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Help & Feedback',
      href: '/help-feedback',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  links: {
    login: '/login',
    register: '/login/register',
  },
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:5050/api',
};
