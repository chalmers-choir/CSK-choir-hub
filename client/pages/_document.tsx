import { Head, Html, Main, NextScript } from 'next/document';

import clsx from 'clsx';

import { fontSans } from '@/config/fonts';

export default function Document() {
  return (
    <Html lang="se">
      <Head />
      <body className={clsx('bg-background min-h-screen font-sans antialiased', fontSans.variable)}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
