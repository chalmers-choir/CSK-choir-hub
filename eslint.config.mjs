import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import i18next from "eslint-plugin-i18next";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

// ESLint Flat Config notes:
// - This file is evaluated top-to-bottom.
// - Later entries can add to or override earlier entries when `files` patterns match.
// - We intentionally keep one shared config file for the monorepo, but split rules by area:
//   base (all code), client (React/Next), server (Node/Express), and tests.
export default defineConfig([
  // Global ignore list for generated/build artifacts and non-source files.
  // Example: `client/.next`, `server/dist`, coverage folders, CSS files.
  globalIgnores([
    ".now/*",
    "**/*.css",
    "**/.changeset",
    "**/dist",
    "esm/*",
    "public/*",
    "tests/*",
    "scripts/*",
    "**/*.config.js",
    "**/.DS_Store",
    "**/node_modules",
    "**/coverage",
    "**/.next",
    "**/build",
    "!**/.commitlintrc.cjs",
    "!**/.lintstagedrc.cjs",
    "!**/jest.config.js",
    "!**/plopfile.js",
    "!**/react-shim.js",
    "!**/tsup.config.ts",
  ]),
  // Core ESLint recommended rules for plain JavaScript files only.
  // We scope this to JS files so TypeScript files can rely on TS-aware rules instead.
  // Example matches: `setup.sh` is NOT linted here (not JS), `some-script.js` is.
  {
    ...js.configs.recommended,
    files: ["**/*.{js,jsx,cjs,mjs}"],
  },
  // Shared base rules for both client and server source files.
  // This is the "common baseline" for code style and general hygiene.
  // Example matches:
  // - `client/pages/index.tsx`
  // - `server/src/index.ts`
  // - `eslint.config.mjs`
  {
    files: ["**/*.{js,jsx,cjs,mjs,ts,tsx}"],
    plugins: {
      "unused-imports": unusedImports,
      "@typescript-eslint": typescriptEslint,
      prettier: fixupPluginRules(prettier),
      i18next: fixupPluginRules(i18next),
    },
    languageOptions: {
      // Use the TS parser across JS/TS so one config can parse modern syntax consistently.
      parser: tsParser,
      // Prefer latest syntax support instead of locking to a specific ECMAScript year.
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          // Enables parsing JSX in client code and any JSX-bearing utility files.
          jsx: true,
        },
      },
    },
    rules: {
      // Keep console as a warning by default (server + tests override this later).
      "no-console": "warn",
      // Surface Prettier differences in ESLint output (warn, not error).
      "prettier/prettier": "warn",
      // Turn off base no-unused-vars because TypeScript plugin handles this better.
      "no-unused-vars": "off",
      "unused-imports/no-unused-vars": "off",
      // Auto-fixable: remove unused imports.
      "unused-imports/no-unused-imports": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          // Example: function foo(_unused: string, used: string) {} -> `_unused` allowed.
          args: "after-used",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_.*?$",
        },
      ],
      "padding-line-between-statements": [
        "warn",
        {
          // Visual separation before returns improves readability.
          blankLine: "always",
          prev: "*",
          next: "return",
        },
        {
          // Leave a blank line after declarations before executable statements...
          blankLine: "always",
          prev: ["const", "let", "var"],
          next: "*",
        },
        {
          // ...except when declarations are grouped together.
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
      ],
    },
  },
  // Client-only override (Next.js + React app).
  // Example matches:
  // - `client/pages/login/index.tsx`
  // - `client/components/icons.tsx`
  {
    files: ["client/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: fixupPluginRules(react),
      "react-hooks": fixupPluginRules(reactHooks),
      "@next/next": fixupPluginRules(nextPlugin),
      "jsx-a11y": fixupPluginRules(jsxA11Y),
    },
    languageOptions: {
      globals: {
        // Browser globals for frontend code (`window`, `document`, etc.).
        ...globals.browser,
        // Allow common Next.js env usage on the client build side without enabling full Node globals.
        // This is intentionally narrower than `...globals.node` to catch accidental Node API usage.
        process: "readonly",
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        // Automatically detect installed React version for rule compatibility.
        version: "detect",
      },
      next: {
        // Tells the Next plugin where the Next.js app root lives in this monorepo.
        rootDir: "client",
      },
    },
    rules: {
      // React rules
      ...react.configs.recommended.rules,
      "react/prop-types": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/self-closing-comp": "warn",
      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: false,
          shorthandFirst: false,
          noSortAlphabetically: true,
          reservedFirst: true,
        },
      ],

      // React Hooks rules
      ...reactHooks.configs.recommended.rules,
      // Kept off for now to reduce friction; this can be re-enabled as `warn` later.
      // Example noisy case: effects intentionally skipping a stable dependency.
      "react-hooks/exhaustive-deps": "off",

      // JSX Accessibility rules
      ...jsxA11Y.configs.recommended.rules,
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/interactive-supports-focus": "warn",

      // Next.js rules
      // Example this catches: <a href="/login"> instead of Next routing-aware links.
      "@next/next/no-html-link-for-pages": ["warn", "client/pages"],
    },
  },
  // Server-only override (Node/Express runtime code).
  // Example matches:
  // - `server/src/index.ts`
  // - `server/src/routes/auth.ts`
  {
    files: ["server/**/*.{js,cjs,mjs,ts}"],
    languageOptions: {
      globals: {
        // Node globals are expected on the backend (`Buffer`, `process`, etc.).
        ...globals.node,
      },
      parser: tsParser,
    },
    rules: {
      // Server logging is expected in API/runtime code.
      "no-console": "off",
      // Helps avoid importing runtime values when only a type is needed.
      // Example:
      //   `import { User } from "./types"` -> prefer `import type { User } from "./types"`
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
    },
  },
  // Test override (applies to both client/server tests if present).
  // This comes AFTER server/client overrides so test-specific behavior wins when needed.
  // Example matches:
  // - `server/src/services/tests/authService.test.ts`
  // - `client/components/__tests__/button.spec.tsx`
  {
    files: ["**/*.{test,spec}.{js,jsx,ts,tsx}", "**/__tests__/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        // `describe`, `it`, `expect`, etc.
        ...globals.jest,
        // Tests often still run in Node for this repo.
        ...globals.node,
      },
    },
    rules: {
      // Test debugging/logging is often useful while writing or diagnosing failures.
      "no-console": "off",
    },
  },
]);
