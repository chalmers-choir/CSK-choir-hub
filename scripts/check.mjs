import { log, runChecksAndTests, runMain } from "./lib/workflow.mjs";

async function main() {
  log("🔍 Running checks and tests...");
  runChecksAndTests();
  log("");
  log("✅ Checks/tests passed.");
}

await runMain(main);

