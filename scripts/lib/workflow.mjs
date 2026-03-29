import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const rootDir = path.resolve(__dirname, "..", "..");
export const serverDir = path.join(rootDir, "server");
export const clientDir = path.join(rootDir, "client");

export const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
export const npxCmd = process.platform === "win32" ? "npx.cmd" : "npx";
const nodeCmd = process.platform === "win32" ? "node.exe" : "node";

export function log(message = "") {
  process.stdout.write(`${message}\n`);
}

export function run(command, args, options = {}) {
  const { cwd = rootDir, allowFailure = false, env = process.env } = options;
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    shell: false,
    env,
  });

  if (result.error) {
    if (allowFailure) {
      log(`⚠️  Command failed (ignored): ${command} ${args.join(" ")}`);

      return false;
    }
    throw result.error;
  }

  if (result.status !== 0) {
    if (allowFailure) {
      log(`⚠️  Command exited with code ${result.status} (ignored): ${command} ${args.join(" ")}`);

      return false;
    }

    throw new Error(`Command exited with code ${result.status}: ${command} ${args.join(" ")}`);
  }

  return true;
}

export function parseEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return {};
  }

  const content = readFileSync(filePath, "utf8");
  const vars = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const equalsIndex = line.indexOf("=");

    if (equalsIndex === -1) {
      continue;
    }

    const key = line.slice(0, equalsIndex).trim();
    let value = line.slice(equalsIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    vars[key] = value;
  }

  return vars;
}

export function getDatabaseUrl() {
  const envVars = parseEnvFile(path.join(serverDir, ".env"));
  const databaseUrl = process.env.DATABASE_URL || envVars.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      'DATABASE_URL is not set. Add it to server/.env. Example: DATABASE_URL="postgresql://user:pass@localhost:5432/cskdb?schema=public"',
    );
  }

  return databaseUrl;
}

export function assertDatabaseRunning(databaseUrl = getDatabaseUrl()) {
  const checkScript = `
const { Client } = require("pg");
const client = new Client({ connectionString: process.env.DATABASE_URL });

(async () => {
  try {
    await client.connect();
    await client.query("SELECT 1");
    await client.end();
  } catch (error) {
    console.error(error?.message || error);
    process.exit(1);
  }
})();
`;

  const result = spawnSync(nodeCmd, ["-e", checkScript], {
    cwd: serverDir,
    stdio: "inherit",
    shell: false,
    env: { ...process.env, DATABASE_URL: databaseUrl },
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error("Could not connect to PostgreSQL using DATABASE_URL. Ensure the database is running.");
  }
}

function removeDirIfExists(targetPath) {
  if (existsSync(targetPath)) {
    rmSync(targetPath, { force: true, recursive: true });
  }
}

export function cleanWorkspaceNodeModules() {
  removeDirIfExists(path.join(rootDir, "node_modules"));
  removeDirIfExists(path.join(serverDir, "node_modules"));
  removeDirIfExists(path.join(clientDir, "node_modules"));
}

export function installWorkspaceDependencies({ ci = false, clean = false } = {}) {
  if (clean) {
    log("🧹 Cleaning up existing dependencies...");
    cleanWorkspaceNodeModules();
  }

  const installArgs = ci ? ["ci"] : ["install"];

  log("📦 Installing root dependencies...");
  run(npmCmd, installArgs, { cwd: rootDir });

  log("📦 Installing server dependencies...");
  run(npmCmd, installArgs, { cwd: serverDir });

  log("📦 Installing client dependencies...");
  run(npmCmd, installArgs, { cwd: clientDir });
}

export function generateApiClient() {
  log("🔌 Generating API client...");
  run(npmCmd, ["run", "api:generate"], { cwd: clientDir });
}

export function generatePrismaClient() {
  log("🌱 Generating Prisma client...");
  run(npxCmd, ["prisma", "generate"], { cwd: serverDir });
}

export function applyDatabaseMigrations() {
  const databaseUrl = getDatabaseUrl();
  log("🔎 Verifying PostgreSQL connection...");
  assertDatabaseRunning(databaseUrl);
  log("🗂️ Applying database migrations...");
  run(npxCmd, ["prisma", "migrate", "deploy"], { cwd: serverDir });
}

export function resetDatabase() {
  const databaseUrl = getDatabaseUrl();
  log("🔎 Verifying PostgreSQL connection...");
  assertDatabaseRunning(databaseUrl);
  log("💥 Resetting database...");
  run(npxCmd, ["prisma", "migrate", "reset", "--force", "--skip-seed"], { cwd: serverDir });
  log("🌱 Seeding database...");
  run(npxCmd, ["prisma", "db", "seed"], { cwd: serverDir });
}

export function buildWorkspace() {
  log("🔨 Building project...");
  run(npmCmd, ["run", "build"], { cwd: rootDir });
}

export function runChecksAndTests() {
  log("🧹 Checking formatting...");
  run(npmCmd, ["run", "format:check"], { cwd: rootDir });
  log("🔎 Running lint checks...");
  run(npmCmd, ["run", "lint:check"], { cwd: rootDir });
  log("🧪 Running type checks...");
  run(npmCmd, ["run", "type-check"], { cwd: rootDir });
  log("✅ Running server tests...");
  run(npmCmd, ["test"], { cwd: serverDir });
}

export async function runMain(task) {
  try {
    await task();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

