import { siteConfig } from "@/config/site";

import { OpenAPI } from "./api-client/core/OpenAPI";

export * from "./api-client";

OpenAPI.BASE = siteConfig.apiBaseUrl;
OpenAPI.WITH_CREDENTIALS = true;
OpenAPI.CREDENTIALS = "include";
