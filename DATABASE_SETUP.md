# Backend Setup Instructions

## Database Setup

The project uses Prisma with PostgreSQL. There are two options:

### Option 1: Use Prisma Postgres (Recommended for Development)

Prisma Postgres provides a managed PostgreSQL instance. To start it:

```bash
cd backend
npx prisma dev
```

This will:
- Start a local PostgreSQL database
- Run the migrations automatically
- Generate the Prisma Client

Then in another terminal, run the backend:

```bash
cd backend
npm run start:dev
```

### Option 2: Local PostgreSQL Database

If you have PostgreSQL installed locally, update the `DATABASE_URL` in `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/habits_db"
```

Then run:

```bash
cd backend
npx prisma migrate dev --name init_habits
npm run start:dev
```

## Generate Prisma Client

After setting up the database, make sure to generate the Prisma Client:

```bash
cd backend
npx prisma generate
```

## Running the Backend

Once the database is set up:

```bash
cd backend
npm run start:dev
```

The backend will be available at `http://localhost:3000`

## API Endpoints

All habit endpoints are available at `http://localhost:3000/habits`:

- `GET /habits` - Get all habits
- `GET /habits/:id` - Get a specific habit
- `POST /habits` - Create a new habit
- `PATCH /habits/:id` - Update a habit
- `DELETE /habits/:id` - Delete a habit

## Frontend Configuration

The frontend communicates with the backend via the `VITE_API_URL` environment variable.

Create a `.env.local` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:3000
```

## Running Frontend

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`
