import type { AppProps } from 'next/app';

import Providers from './provider';
import { fontMono, fontSans } from '@/config/fonts';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
