# Formatting and Linting Responsibilities

This repo uses two tools that affect how code looks and how code quality is enforced:

- `.prettierrc` (Prettier): code formatting
- `eslint.config.mjs` (ESLint): code quality + code-style rules + environment-specific checks

They work together, but they do not have the same job.

## Quick Rule of Thumb

- If the question is "How should this code be printed?" -> Prettier (`.prettierrc`)
- If the question is "Is this code safe/correct/allowed here?" -> ESLint (`eslint.config.mjs`)

## `.prettierrc` Responsibilities (What Prettier Owns)

Prettier is responsible for automatic formatting decisions that should be consistent and mostly non-negotiable.

In this repo, `.prettierrc` currently controls:

- Line length / wrapping (`printWidth`)
- Indentation width (`tabWidth`)
- Semicolons (`semi`)
- Quote style (`singleQuote`)
- Trailing commas (`trailingComma`)
- Arrow function parenthesis style (`arrowParens`)
- Import sorting behavior via `@trivago/prettier-plugin-sort-imports`
- Tailwind class sorting via `prettier-plugin-tailwindcss`
- JSON/YAML formatting override (`printWidth: 80`)

### Examples of things Prettier should handle

- Wrapping a long function call across multiple lines
- Converting spacing to the standard format
- Reordering imports according to `importOrder` in `.prettierrc`
- Sorting Tailwind classes in `className`

### Things Prettier should NOT be responsible for

- Detecting unused variables/imports
- Catching React Hooks mistakes
- Checking whether browser-only code uses Node globals incorrectly
- Enforcing backend-specific rules for Express/Node

## `eslint.config.mjs` Responsibilities (What ESLint Owns)

ESLint is responsible for linting rules, code-quality checks, and environment-aware constraints.

In this repo, `eslint.config.mjs` currently handles:

- Base linting rules for JS/TS files
- Unused imports and unused variables warnings
- Import grouping/order consistency (`import/order`)
- General style rules that are not purely "printing" (e.g. padding lines)
- React rules (client only)
- React Hooks rules (client only)
- Next.js rules (client only)
- Accessibility rules (client only)
- Node/Express backend rules (server only)
- Jest globals and test-specific behavior (test files)
- Repo-wide ignore patterns (build output, generated files, etc.)

### Examples of things ESLint should handle

- Warning on `console.log` in client code (but allowing it on server/tests)
- Warning on unused imports
- Enforcing React Hooks rules in `client/**/*`
- Enforcing Node globals only in `server/**/*`
- Catching invalid/undesired patterns based on file location

### Things ESLint should NOT be responsible for (ideally)

- Deciding exact line wrapping and whitespace formatting details that Prettier already handles
- Becoming the primary formatter for the codebase

## How They Interact in This Repo

This repo uses `eslint-plugin-prettier`, which means Prettier formatting differences can show up as ESLint warnings (`prettier/prettier`).

What that means:

- Prettier still decides formatting
- ESLint can report when a file is not formatted according to Prettier
- Running ESLint may surface formatting issues, but the formatting rules still come from `.prettierrc`

## Important Overlap: Imports (Current Setup)

There is intentional overlap right now:

- Prettier sorts imports using `@trivago/prettier-plugin-sort-imports` (`.prettierrc`)
- ESLint also enforces import grouping/order with `import/order` (`eslint.config.mjs`)

This can work well, but it requires the two configs to stay aligned.

### Practical responsibility split for imports

- Prettier plugin: physical ordering/sorting of import statements and specifiers
- ESLint `import/order`: grouping expectations and blank lines between groups

If import formatting starts "fighting" (format on save changes one way, lint fixes another):

- First check `.prettierrc` `importOrder`
- Then check ESLint `import/order` groups/pathGroups
- Align them rather than adding more rules

## Which File Should I Edit?

Edit `.prettierrc` when changing:

- Line length
- Quotes / semicolons / commas
- Import sorting plugin behavior
- Tailwind class sort behavior
- Formatting overrides for JSON/YAML/Markdown/etc.

Edit `eslint.config.mjs` when changing:

- Warnings/errors for code quality
- React / Next.js lint rules
- Server-only lint behavior
- Test globals/rules
- Ignore patterns for linting
- Environment-specific globals (`window`, `process`, `Buffer`, `jest`, etc.)

## Typical Workflow

1. Prettier formats code consistently (editor format-on-save or `npm run format`)
2. ESLint checks for code issues and repo-specific rules (`npm run lint:check`)
3. ESLint may also report Prettier formatting drift via `prettier/prettier`

## Why We Keep Both

Using both keeps responsibilities clean:

- Prettier removes style debates and handles formatting fast
- ESLint enforces correctness and framework/runtime rules
- One root ESLint config can serve both client and server, while still applying different rules to each area

