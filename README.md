# CSK-Choir-Hub 25/26

A full-stack choir management platform built with **TypeScript**, React frontend (Vite) and Node.js/Express backend connected to PostgreSQL database.

## Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls

### Backend
- **Node.js** with **TypeScript**
- **Express.js** framework
- **PostgreSQL** database
- **JWT** authentication
- **bcryptjs** for password hashing
- **CORS** enabled

## Installation

### Quick Setup (Recommended)

1. **For macOS/Linux:**
```bash
(chmod +x setup.sh)
./setup.sh
```

2. **Update the .end**
   - Update the database configuration in `server/env.example` and rename it to `.env`


## Running the Application

### Development Mode
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