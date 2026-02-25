import { createInterface } from "node:readline/promises";
import process from "node:process";

import { log, resetDatabase, runMain } from "./lib/workflow.mjs";

async function confirmReset() {
  if (process.argv.includes("--yes")) {
    return true;
  }

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const answer = await rl.question("⚠️  This resets the database and deletes data. Continue? (y/N) ");

    return /^(y|yes)$/i.test(answer.trim());
  } finally {
    rl.close();
  }
}

async function main() {
  const confirmed = await confirmReset();

  if (!confirmed) {
    log("Database reset cancelled.");

    return;
  }

  resetDatabase();
  log("");
  log("✅ Database reset complete.");
}

await runMain(main);

