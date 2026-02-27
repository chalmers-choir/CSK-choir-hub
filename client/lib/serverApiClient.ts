import { headers } from "next/headers";

import "server-only";

import { siteConfig } from "@/config/site";

import { OpenAPI } from "./api-client/core/OpenAPI";

export * from "./api-client";

OpenAPI.BASE = siteConfig.apiBaseUrl;
OpenAPI.WITH_CREDENTIALS = true;
OpenAPI.CREDENTIALS = "include";

OpenAPI.HEADERS = async () => {
  const h = await headers();
  const cookie = h.get("cookie");

  return {
    ...(cookie ? { cookie } : {}),
  };
};
