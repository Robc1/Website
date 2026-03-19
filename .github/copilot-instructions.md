# AI Coding Instructions for Personal Dashboard

## Architecture Overview
This is a **full-stack TypeScript monorepo** with separate `backend/` (NestJS) and `frontend/` (React) directories:
- **Backend**: NestJS + Prisma ORM + PostgreSQL
- **Frontend**: React 19 + Vite + React Router + Recharts + Tailwind CSS
- **Services communicate** via REST API (base URL from `VITE_API_URL` env var)

## Key Development Workflows

### Backend (NestJS)
```bash
cd backend
npm run start:dev      # Watch mode development
npm run build && npm run start:prod  # Production
npm run test           # Unit tests (Jest)
npm run test:e2e       # End-to-end tests
npm run lint           # ESLint with auto-fix
```

### Frontend (React)
```bash
cd frontend
npm run dev            # Vite development server
npm run build          # TypeScript compile + Vite bundle
npm run lint           # ESLint
```

### Docker
Currently `docker-compose.yml` is empty - planned for future deployment setup.

## Code Patterns & Conventions

### Backend Structure
- **Controllers** handle HTTP routes and delegate to services (e.g., `AppController`)
- **Services** contain business logic (e.g., `AppService`)
- **Prisma** integration planned but basic schema setup - data model not yet implemented
- Entry point: `src/main.ts` (bootstraps AppModule)
- Module pattern: `@Module` decorator imports, provides controllers/services

### Frontend Structure
- **Pages** in `src/pages/` (Dashboard, Habits, Products, Finances, Analytics, Settings)
- **Layout** component (`src/components/Layout.tsx`): Sidebar navigation + main content wrapper
- **Reusable chart cards**: `BarChartCard`, `LineChartCard`, `PieChartCard` (using Recharts)
- **API service** in `services/api.ts`: Centralized fetch calls with `VITE_API_URL`
- **Mock data** in `data/mockData.ts`: Development data before API integration
- **Router setup** in `App.tsx`: Nested routes under Layout (outlet pattern)

### React Component Patterns
1. **Chart Card Props** (standardized):
   ```tsx
   interface ChartCardProps {
     title: string;
     data: ChartDataItem[];
     dataKeys: { key: string; color: string; name: string }[];
     xAxisKey: string;
   }
   ```
2. **Metric Cards**: Display icon, value, percentage change, color gradient
3. **Icons**: Use Lucide React icons (e.g., `Home`, `TrendingUp`, `Settings`)

### Styling Conventions
- **Tailwind CSS** with glass morphism theme:
  - Cards: `bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20`
  - Active nav items: Gradient backgrounds with shadow glow
  - Hover effects: `hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`
- No separate CSS files - all styling in className attributes

### API Integration Pattern
- Call via `fetch()` in `services/api.ts`:
  ```tsx
  const API_URL = import.meta.env.VITE_API_URL;
  export async function getSalesData() {
    const res = await fetch(`${API_URL}/metrics/sales`);
    return res.json();
  }
  ```
- Pages import functions from `api.ts` and call in `useEffect`
- Current state: Mock data used for UI development; ready for real endpoints

## Important Implementation Notes

1. **Monorepo coordination**: Always cd into correct directory before running npm commands
2. **TypeScript strict mode**: Both backend and frontend use strict TypeScript checking
3. **Prisma migrations**: Schema currently minimal - expand as data models defined
4. **Environment variables**: 
   - Frontend: `VITE_API_URL` (Vite prefix required)
   - Backend: DB connection via Prisma datasource
5. **Testing**: NestJS uses Jest; frontend has no tests yet (component testing not set up)
6. **Linting**: Both projects use ESLint with Prettier formatting

## When Adding Features

- **New page**: Create `.tsx` in `pages/`, add route in `App.tsx`, add nav item in `Layout.tsx`
- **New chart**: Create component in `components/`, follow ChartCard pattern with standardized props
- **New API endpoint**: Add method in NestJS service/controller, then create fetch function in `services/api.ts`
- **New mock data**: Add to `data/mockData.ts` for development, then replace with real API calls

