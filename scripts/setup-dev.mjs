import { applyDatabaseMigrations, generateApiClient, generatePrismaClient, installWorkspaceDependencies, log, runMain } from "./lib/workflow.mjs";

async function main() {
  log("🚀 Running development setup...");
  installWorkspaceDependencies({ ci: false });
  generateApiClient();
  generatePrismaClient();
  applyDatabaseMigrations();
  log("");
  log("✅ Development setup complete.");
  log("Next steps:");
  log("  npm run db:up   # if you need a local Postgres container");
  log("  npm run dev");
}

await runMain(main);

