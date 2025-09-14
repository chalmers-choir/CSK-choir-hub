# CSK-Choir-Hub 25/26

A full-stack choir management platform built with **TypeScript**, React frontend (Vite) and Node.js/Express backend connected to PostgreSQL database.

## Installation

### Quick Setup (Recommended)

1. **Create the .env (important)**
   - Create the database configuration in `server/.env` using `server/.env.example`

2. **For macOS/Linux:**

```bash
(chmod +x setup.sh)
./setup.sh
```

2. **For Windows:**

```batch
setup.bat
```

## Running the Application

Run both frontend and backend simultaneously:

```bash
npm run dev
```

This will start:

- Docker database on localhost:5432
- Backend server on http://localhost:5000
- Frontend development server (Vite) on http://localhost:3000

### Common Issues

1. **Database connection errors**: Ensure PostgreSQL is running and credentials are correct
2. **Port conflicts**: Change the PORT in server/.env if 5000 is already in use
