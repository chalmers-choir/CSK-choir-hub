# Turnekören 25/26

A full-stack choir management platform built with **TypeScript**, React frontend (Vite) and Node.js/Express backend connected to PostgreSQL database.

## Features

- **User Authentication**: Secure login/register system with JWT tokens
- **User Management**: Admin panel for managing choir members
- **Responsive Design**: Modern UI built with Tailwind CSS
- **TypeScript**: Full type safety across frontend and backend
- **Fast Development**: Vite for lightning-fast hot module replacement

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Hook Form** for form handling
- **Lucide React** for icons

### Backend
- **Node.js** with **TypeScript**
- **Express.js** framework
- **PostgreSQL** database
- **JWT** authentication
- **bcryptjs** for password hashing
- **CORS** enabled
- **Rate limiting** and security middleware

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

### Quick Setup (Recommended)

**For macOS/Linux:**
```bash
git clone <repository-url>
cd turnekoren
(chmod +x setup.sh)
./setup.sh
```

### Manual Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd turnekoren
   ```

2. **Clean and install dependencies**
   ```bash
   # Clean existing dependencies
   rm -rf node_modules package-lock.json
   rm -rf server/node_modules server/package-lock.json
   rm -rf client/node_modules client/package-lock.json
   
   # Install all dependencies
   npm run install-all
   ```

3. **Update the .end**
   - Update the database configuration in `server/env.example` and rename it to `.env`


## Running the Application

### Development Mode
Run both frontend and backend simultaneously:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend development server (Vite) on http://localhost:3000

### Production Mode
1. Build the backend:
   ```bash
   cd server && npm run build
   ```

2. Build the frontend:
   ```bash
   npm run build
   ```

3. Start the backend:
   ```bash
   npm run server
   ```

### Type Checking
Run TypeScript type checking:
```bash
npm run type-check
```

## Troubleshooting

### Dependency Conflicts
If you encounter dependency conflicts, run the setup script:
```bash
# macOS/Linux
./setup.sh

# Windows
setup.bat
```

### Common Issues

1. **TypeScript compilation errors**: Run `npm run type-check` to identify issues
2. **Database connection errors**: Ensure PostgreSQL is running and credentials are correct
3. **Port conflicts**: Change the PORT in server/.env if 5000 is already in use
4. **Vite HMR issues**: Clear browser cache or restart the dev server

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create new event (admin only)
- `PUT /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)
- `POST /api/events/:id/register` - Register for event
- `DELETE /api/events/:id/register` - Unregister from event

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/events` - Get user's event participations

## Default Users

The database setup script creates these default users:

- **Admin User**
  - Username: `admin`
  - Password: `password123`
  - Role: `admin`

- **Member Users**
  - Username: `member1`, Password: `password123`
  - Username: `member2`, Password: `password123`

## Database Schema

### Tables
- `users` - User accounts and profiles
- `events` - Choir events and rehearsals
- `event_participants` - Many-to-many relationship for event registration
- `songs` - Choir repertoire
- `rehearsals` - Rehearsal sessions

## Project Structure

```
turnekoren/
├── client/                 # React TypeScript frontend (Vite)
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable components (.tsx)
│   │   ├── contexts/       # React contexts (.tsx)
│   │   ├── pages/          # Page components (.tsx)
│   │   ├── types/          # TypeScript type definitions
│   │   └── index.tsx       # App entry point
│   ├── index.html          # Vite entry point
│   ├── vite.config.ts      # Vite configuration
│   ├── tsconfig.json       # TypeScript configuration
│   ├── tsconfig.node.json  # Node.js TypeScript config
│   └── package.json
├── server/                 # Node.js TypeScript backend
│   ├── src/
│   │   ├── config/         # Database configuration (.ts)
│   │   ├── routes/         # API routes (.ts)
│   │   ├── scripts/        # Database setup scripts (.ts)
│   │   ├── types/          # TypeScript type definitions
│   │   └── index.ts        # Server entry point
│   ├── dist/               # Compiled JavaScript output
│   ├── tsconfig.json       # TypeScript configuration
│   ├── nodemon.json        # Development configuration
│   └── package.json
├── setup.sh               # Setup script for macOS/Linux
├── setup.bat              # Setup script for Windows
└── package.json           # Root package.json
```