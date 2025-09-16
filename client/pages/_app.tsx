import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { HeroUIProvider } from '@heroui/system';

import { fontMono, fontSans } from '@/config/fonts';
import { AuthProvider } from '@/contexts/AuthContext';
import '@/styles/globals.css';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AuthProvider>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class" defaultTheme="light">
          <Component {...pageProps} />
        </NextThemesProvider>
      </HeroUIProvider>
    </AuthProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
