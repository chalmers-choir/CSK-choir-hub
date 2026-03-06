'use client';

import { siteConfig } from '@/config/site';

import { OpenAPI } from './api-client/core/OpenAPI';

export * from './api-client';

OpenAPI.BASE = siteConfig.apiBaseUrl;
OpenAPI.WITH_CREDENTIALS = true;
OpenAPI.CREDENTIALS = 'include';

OpenAPI.BASE = (() => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof window !== 'undefined') {
      const protocol = window.location.protocol;
      const hostname = window.location.hostname;

      return `${protocol}//${hostname}:5050/api`;
    }
  }

  return siteConfig.apiBaseUrl;
})();
