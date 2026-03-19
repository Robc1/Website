# Personal Dashboard - WebApp Startup Guide

This guide explains how to start up both the backend and frontend of the Personal Dashboard application.

## Prerequisites

- Node.js 18+ installed
- npm installed
- All dependencies installed (run `npm install` in both `backend/` and `frontend/` directories if not already done)

## Quick Start (Recommended)

### Terminal 1: Start the Backend

```bash
cd backend
npm run build
node dist/src/main.js
```

Expected output:
```
Loading .env from: C:\persoonlijk_dashboard\Website\backend\.env
DATABASE_URL: file:c:/persoonlijk_dashboard/Website/backend/dev.db
[Nest] <PID> - <DATE>, <TIME>     LOG [NestFactory] Starting Nest application...
[Nest] <PID> - <DATE>, <TIME>     LOG [InstanceLoader] PrismaModule dependencies initialized
...
[Nest] <PID> - <DATE>, <TIME>     LOG [InstanceLoader] HabitsModule dependencies initialized
[Nest] <PID> - <DATE>, <TIME>     LOG [RouterExplorer] Mapped {/habits, POST} route
Server running on port 3000
```

The backend API will be available at **http://localhost:3000**

### Terminal 2: Start the Frontend

```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

The frontend application will be available at **http://localhost:5173**

## Detailed Instructions

### Backend Setup & Startup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies (if not done):**
   ```bash
   npm install
   ```

3. **Build the backend:**
   ```bash
   npm run build
   ```

4. **Start the backend:**
   ```bash
   node dist/src/main.js
   ```

   **Alternative: Start in watch mode (auto-recompile on changes):**
   ```bash
   npm run start:dev
   ```

5. **Verify backend is running:**
   - Backend should show "Server running on port 3000"
   - Test endpoint: `GET http://localhost:3000` should return `"Hello World!"`
   - Test habits endpoint: `GET http://localhost:3000/habits` should return `[]` (empty array)

### Frontend Setup & Startup

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies (if not done):**
   ```bash
   npm install
   ```

3. **Create `.env.local` file** (if not already created):
   ```bash
   # Content of frontend/.env.local
   VITE_API_URL=http://localhost:3000
   ```

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   - Navigate to `http://localhost:5173`
   - The dashboard should load with the habit tracking interface

### Database

- **Database file location:** `backend/dev.db` (SQLite)
- **Created automatically** on first backend startup
- **Persists data** between restarts in the `dev.db` file

## API Endpoints

Once the backend is running, the following endpoints are available:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check (returns "Hello World!") |
| GET | `/habits` | Get all habits |
| GET | `/habits/:id` | Get a specific habit by ID |
| POST | `/habits` | Create a new habit |
| PATCH | `/habits/:id` | Update a habit |
| DELETE | `/habits/:id` | Delete a habit |

### Example: Create a Habit

```bash
curl -X POST http://localhost:3000/habits \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Morning Exercise",
    "duration": "30 minutes",
    "unit": "Day",
    "frequency": 1,
    "days": "Monday, Wednesday, Friday",
    "color": "blue"
  }'
```

## Troubleshooting

### Backend won't start - Port 3000 already in use

**Solution:** Kill the process using port 3000:

**Windows (PowerShell):**
```powershell
Stop-Process -Name node -Force
```

**MacOS/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

Then try starting the backend again.

### Frontend not connecting to backend

**Solution:** Make sure `.env.local` in the frontend directory contains:
```
VITE_API_URL=http://localhost:3000
```

Then restart the frontend development server.

### Database errors

**Solution:** Reset the database by deleting `backend/dev.db` and restarting the backend:

```bash
cd backend
rm dev.db
node dist/src/main.js
```

## Development Commands

### Backend

- `npm run build` - Compile TypeScript
- `npm run start:dev` - Start with watch mode (auto-recompile on file changes)
- `npm run start:prod` - Start production build
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint and fix issues

### Frontend

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint and fix issues
- `npm run preview` - Preview production build locally

## Architecture

- **Backend:** NestJS + Prisma ORM + SQLite
- **Frontend:** React 19 + Vite + React Router + Recharts + Tailwind CSS
- **Communication:** REST API via HTTP

For more information, see the README files in the [backend](backend/README.md) and [frontend](frontend/README.md) directories.
