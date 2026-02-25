import { applyDatabaseMigrations, buildWorkspace, generateApiClient, generatePrismaClient, installWorkspaceDependencies, log, runMain } from "./lib/workflow.mjs";

async function main() {
  log("🚀 Running production setup...");
  installWorkspaceDependencies({ ci: true });
  generateApiClient();
  generatePrismaClient();
  applyDatabaseMigrations();
  buildWorkspace();
  log("");
  log("✅ Production setup complete.");
}

await runMain(main);

