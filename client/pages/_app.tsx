import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import Providers from './provider';
import { fontMono, fontSans } from '@/config/fonts';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    // <AuthProvider>
    //   <HeroUIProvider navigate={router.push}>
    //     <NextThemesProvider attribute="class" defaultTheme="light">
    //       <Component {...pageProps} />
    //     </NextThemesProvider>
    //   </HeroUIProvider>
    // </AuthProvider>
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
