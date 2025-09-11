import { fontSans } from '@/config/fonts';
import clsx from 'clsx';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={clsx('bg-background min-h-screen font-sans antialiased', fontSans.variable)}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
