import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "src/api/docs/openapi.yaml",
  output: "src/interface",
  plugins: [
    {
      name: "@hey-api/typescript",
    },
    "zod",
  ],
});
