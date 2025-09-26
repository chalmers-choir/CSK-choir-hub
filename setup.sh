echo "🚀 Setting up Project..."

# Clean up any existing node_modules and lock files
echo "🧹 Cleaning up existing dependencies..."
rm -rf node_modules package-lock.json
rm -rf server/node_modules server/package-lock.json
rm -rf client/node_modules client/package-lock.json

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

# Build TypeScript
echo "🔨 Building server TypeScript..."
npm run build

# Set up Prisma
echo "🌱 Setting up Prisma..."
cd server
npx prisma generate
cd ..

# Run script that drops all tables in the database
# Ask for confirmation first, otherwise skip the drop
# Ask for DB reset and target
read -p "⚠️  This RESETS the database. Are you sure? (y/N) " confirm
if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
  echo
  read -p "Use Docker Postgres or Local Postgres? [d/L]: " db_mode
  db_mode=${db_mode:-L}

  if [[ $db_mode =~ ^[dD]$ ]]; then
    echo "🐳 Using Docker Postgres..."
    npm run docker:down || true
    docker volume rm csk_pgdata || true
    rm -rf server/prisma/migrations
    echo "⏳ Running database migrations (Docker)..."
    npm run docker:up
    pushd server >/dev/null
    npx prisma migrate dev --name init
    npx prisma db seed
    popd >/dev/null
    npm run docker:down
  else
    echo "🖥️ Using Local Postgres..."
    # Ensure DATABASE_URL is set from server/.env
    if [[ -f "server/.env" ]]; then
      set -a
      source server/.env
      set +a
    fi
    if [[ -z "${DATABASE_URL:-}" ]]; then
      echo "❌ DATABASE_URL is not set. Add it to server/.env (local Postgres)."
      echo '   Example: DATABASE_URL="postgresql://user:pass@localhost:5432/cskdb?schema=public"'
      exit 1
    fi

    # Optional: verify local Postgres connection
    if command -v psql >/dev/null 2>&1; then
      if ! psql "$DATABASE_URL" -c '\q' >/dev/null 2>&1; then
        echo "⚠️  Could not connect to local Postgres. Ensure it's running."
        echo "    macOS (Homebrew): brew services start postgresql@15"
        # continue anyway; prisma may create the DB during migrate dev
      fi
    fi

    # Reset migrations (same behavior as your Docker flow)
    rm -rf server/prisma/migrations
    echo "⏳ Running database migrations (Local)..."
    pushd server >/dev/null
    echo "🗑️ Resetting database schema..."
    npx prisma migrate reset --force --skip-seed
    npx prisma migrate dev --name init
    echo "🌱 Seeding database..."
    npx prisma db seed
    popd >/dev/null
  fi
fi


echo "✅ Setup complete! You can now run:"
echo "npm run dev"