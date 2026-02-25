import type { ReactNode } from "react";

import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";

import { DEFAULT_LOCALE, LOCALE_COOKIE_KEY, isLocale, messages } from "./intl-config";

export default async function IntlProvider({
  children,
}: {
  children: ReactNode;
}): Promise<React.JSX.Element> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE_KEY)?.value;
  const locale = isLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;

  return (
    <NextIntlClientProvider
      getMessageFallback={({ key }) => key}
      locale={locale}
      messages={messages[locale]}
    >
      {children}
    </NextIntlClientProvider>
  );
}
