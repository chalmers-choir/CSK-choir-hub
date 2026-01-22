import { OpenAPI } from './api-client/core/OpenAPI';
import { siteConfig } from '@/config/site';

export * from './api-client';

OpenAPI.BASE = siteConfig.apiBaseUrl;
OpenAPI.WITH_CREDENTIALS = true;
OpenAPI.CREDENTIALS = 'include';
