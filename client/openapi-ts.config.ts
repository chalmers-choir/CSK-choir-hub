import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "../server/src/api/docs/openapi.yaml",
  output: "lib/api-client",
  plugins: [
    { name: "@hey-api/schemas" },
    { name: "@hey-api/sdk", auth: true },
    {
      name: "@hey-api/typescript",
      case: "PascalCase",
      definitions: {
        case: "PascalCase",
        name: "{{name}}",
      },
      enums: {
        case: "SCREAMING_SNAKE_CASE",
        constantsIgnoreNull: false,
        enabled: true,
        mode: "typescript-const",
      },
      errors: {
        case: "PascalCase",
        name: "{{name}}Error",
        error: "{{name}}Errors",
      },
      requests: {
        case: "PascalCase",
        name: "{{name}}Data",
      },
      responses: {
        case: "PascalCase",
        name: "{{name}}Responses",
        response: "{{name}}Response",
      },
      webhooks: {
        case: "PascalCase",
        name: "{{name}}WebhookRequest",
        payload: "{{name}}Payload",
      },
      topType: "unknown",
    },
    {
      name: "@hey-api/client-next",
      throwOnError: false,
      runtimeConfigPath: "../../config/hey-api.ts",
    },
    "zod",
  ],
});
