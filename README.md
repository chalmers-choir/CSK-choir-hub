# CSK-Choir-Hub 25/26

A full-stack choir management platform built with **TypeScript**, React frontend (Vite) and Node.js/Express backend connected to PostgreSQL database.

## Installation

### Quick Setup (Recommended)

1. **Create the .env (important)**
   - Create the database configuration in `server/.env` using `server/.env.example`

2. **Run the setup script (macOS/Linux/Windows):**

```bash
npm run setup
```

## Running the Application

Run both frontend and backend simultaneously:

```bash
npm run dev
```

This will start:

- Docker database on localhost:5432
- Backend server on http://localhost:5050
- Frontend development server (Vite) on http://localhost:3000

### Common Issues

1. **Database connection errors**: Ensure PostgreSQL is running and credentials are correct
