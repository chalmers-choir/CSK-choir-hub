import { cookies } from 'next/headers';

import 'server-only';

import { siteConfig } from '@/config/site';

import { OpenAPI } from './api-client/core/OpenAPI';

export * from './api-client';

OpenAPI.BASE = siteConfig.apiBaseUrl;
OpenAPI.WITH_CREDENTIALS = true;
OpenAPI.CREDENTIALS = 'include';

OpenAPI.HEADERS = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value ?? null;

  return {
    ...(token ? { token } : {}),
  };
};
