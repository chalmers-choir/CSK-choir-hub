import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import Pages from "vite-plugin-pages";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    Pages({
      dirs: "src/pages",
      extensions: ["tsx", "ts", "jsx", "js"],
      importMode: () => "sync", // force synchronous importing
    }),
  ],
  server: {
    port: 3000,
  },
});
