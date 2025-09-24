import { HeroUIProvider } from '@heroui/system';
import { ToastProvider } from '@heroui/toast';

import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from 'next-themes';

/**
 * A wrapper component that provides authentication, theming, and UI context to its children.
 * If more providers are needed, they can be added here.
 *
 * @returns {JSX.Element} The combined providers wrapping the children components.
 */
export default function Providers({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <AuthProvider>
      <HeroUIProvider>
        <ThemeProvider attribute="class" defaultTheme="light">
          <ToastProvider />
          {children}
        </ThemeProvider>
      </HeroUIProvider>
    </AuthProvider>
  );
}
