@echo off
echo 🚀 Setting up Project...

:: Clean up any existing node_modules and lock files
echo 🧹 Cleaning up existing dependencies...
rmdir /s /q node_modules
del /q package-lock.json

rmdir /s /q server\node_modules
del /q server\package-lock.json

rmdir /s /q client\node_modules
del /q client\package-lock.json

:: Install root dependencies
echo 📦 Installing root dependencies...
npm install

:: Install server dependencies
echo 📦 Installing server dependencies...
cd server
npm install
cd ..

:: Install client dependencies
echo 📦 Installing client dependencies...
cd client
npm install
cd ..

:: Build TypeScript
echo 🔨 Building server TypeScript...
npm run build

:: Set up Prisma
echo 🌱 Setting up Prisma...
cd server
npx prisma generate
cd ..

:: Run script that drops all tables in the database
:: Ask for confirmation first, otherwise skip the drop
set /p confirm=⚠️  This RESETS the database. Are you sure? (y/N) 
if /i "%confirm%"=="y" goto :resetdb
if /i "%confirm%"=="yes" goto :resetdb
goto :done

:resetdb
  npm run docker:down
  docker volume rm csk_pgdata
  rmdir /s /q server\prisma\migrations
  echo ⏳ Running database migrations...
  npm run docker:up
  cd server
  npx prisma migrate dev --name init
  npx prisma db seed
  cd ..
  npm run docker:down

:done
echo ✅ Setup complete! You can now run:
echo npm run dev
pause