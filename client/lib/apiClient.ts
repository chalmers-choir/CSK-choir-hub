import { getApiBaseUrl } from "@/config/site";

import { OpenAPI } from "./api-client/core/OpenAPI";

export * from "./api-client";

// Set the API base URL dynamically
OpenAPI.BASE = getApiBaseUrl();
OpenAPI.WITH_CREDENTIALS = true;
OpenAPI.CREDENTIALS = "include";
