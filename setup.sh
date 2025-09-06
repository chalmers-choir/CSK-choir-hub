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

echo "⏳ Running database migrations..."
npm run docker:up
cd server
npx prisma migrate dev --name init
npx prisma db seed
cd ..
npm run docker:down

echo "✅ Setup complete! You can now run:"
echo "npm run dev"