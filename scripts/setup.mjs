import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const serverDir = path.join(rootDir, "server");
const clientDir = path.join(rootDir, "client");
const prismaMigrationsDir = path.join(serverDir, "src", "prisma", "migrations");
const shouldDeepClean = process.argv.includes("--clean");

const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
const npxCmd = process.platform === "win32" ? "npx.cmd" : "npx";

function log(message) {
  process.stdout.write(`${message}\n`);
}

function run(command, args, options = {}) {
  const { cwd = rootDir, allowFailure = false } = options;
  const shouldUseWindowsCmd = process.platform === "win32" && /\.(cmd|bat)$/i.test(command);
  const result = shouldUseWindowsCmd
    ? spawnSync(process.env.ComSpec || "cmd.exe", ["/d", "/s", "/c", command, ...args], {
        cwd,
        stdio: "inherit",
        shell: false,
        env: process.env,
      })
    : spawnSync(command, args, {
        cwd,
        stdio: "inherit",
        shell: false,
        env: process.env,
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
    process.exit(result.status ?? 1);
  }

  return true;
}

function removeDirIfExists(targetPath) {
  if (existsSync(targetPath)) {
    rmSync(targetPath, { force: true, recursive: true });
  }
}

function installDeps(dir, label) {
  const hasLockFile = existsSync(path.join(dir, "package-lock.json"));

  if (hasLockFile) {
    log(`📦 Installing ${label} dependencies with npm ci...`);
    run(npmCmd, ["ci", "--no-audit", "--no-fund"], { cwd: dir });

    return;
  }

  log(`📦 Installing ${label} dependencies with npm install...`);
  run(npmCmd, ["install", "--no-audit", "--no-fund"], { cwd: dir });
}

function parseEnvFile(filePath) {
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

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    vars[key] = value;
  }

  return vars;
}

function getDatabaseUrl() {
  const envVars = parseEnvFile(path.join(serverDir, ".env"));
  const databaseUrl = process.env.DATABASE_URL || envVars.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      'DATABASE_URL is not set. Add it to server/.env. Example: DATABASE_URL="postgresql://user:pass@localhost:5432/cskdb?schema=public"',
    );
  }

  return databaseUrl;
}

function assertDatabaseRunning(databaseUrl) {
  const nodeCmd = process.platform === "win32" ? "node.exe" : "node";
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
    throw new Error(
      "Could not connect to PostgreSQL using DATABASE_URL. Ensure the database is running before setup.",
    );
  }
}

async function ask(question) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const answer = await rl.question(question);

    return answer.trim();
  } finally {
    rl.close();
  }
}

async function maybeResetDatabase() {
  const confirm = await ask("⚠️  This RESETS the database. Are you sure? (y/N) ");

  if (!/^(y|yes)$/i.test(confirm)) {
    return;
  }

  const databaseUrl = getDatabaseUrl();
  log("🔎 Verifying PostgreSQL connection...");
  assertDatabaseRunning(databaseUrl);
  removeDirIfExists(prismaMigrationsDir);
  log("⏳ Running database migrations (Local)...");
  run(npxCmd, ["prisma", "migrate", "reset", "--force"], {
    cwd: serverDir,
    allowFailure: false,
  });
  run(npxCmd, ["prisma", "migrate", "dev", "--name", "init"], { cwd: serverDir });
  log("🌱 Seeding database...");
  run(npxCmd, ["prisma", "db", "seed"], { cwd: serverDir });
}

async function main() {
  process.chdir(rootDir);

  log("🚀 Setting up Project...");
  if (shouldDeepClean) {
    log("🧹 Cleaning up existing dependencies (--clean)...");
    removeDirIfExists(path.join(rootDir, "node_modules"));
    removeDirIfExists(path.join(serverDir, "node_modules"));
    removeDirIfExists(path.join(clientDir, "node_modules"));
  } else {
    log("⏭️  Skipping node_modules cleanup (pass --clean for a full wipe).");
  }

  installDeps(rootDir, "root");
  installDeps(serverDir, "server");
  installDeps(clientDir, "client");
  run(npmCmd, ["run", "api:generate"], { cwd: serverDir });

  log("🌱 Setting up Prisma...");
  run(npxCmd, ["prisma", "generate"], { cwd: serverDir });

  log("🔨 Building project...");
  run(npmCmd, ["run", "build"]);

  await maybeResetDatabase();

  log("");
  log("✅ Setup complete! You can now run:");
  log("npm run dev");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
