import { CreateClientConfig } from "@/lib/api-client/client";

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  // baseUrl: "https://example.com",
});
