# Reminder App Monorepo

## Prototype Phase

This repository now includes a **hybrid prototype**:
- frontend app under `apps/web`
- backend API under `apps/api`

### Current implemented vertical slice
- Dashboard (S03): mock summary + CTA navigation
- Events List (S04): backend-backed GET `/events` (Supabase/Postgres) + detail navigation
- Event Detail (S05): mock detail + reminder edit/save simulation
- Events Persistence Slice: POST `/events` -> DB insert -> created event response

### Scope of this phase
- Keep UI flows/components/pages deterministic and safe for rapid iteration.
- Move Events list/create into real persistence using Supabase/Postgres.
- Continue using mock fixtures for non-persistence backend flows during prototype.

### Deferred by design
- Full production backend architecture beyond current routes/controllers/services/repositories pattern
- External authentication providers
- External integrations/cloud dependencies beyond Supabase/Postgres for events persistence

## Frontend stack
- React + TypeScript
- Vite
- React Router
- Tailwind CSS
- Vitest + React Testing Library
- ESLint + Prettier

## Run locally (offline-compatible)
From `reminder-app/apps/web`:

1. Install dependencies:
   - `npm install`
2. Start development server:
   - `npm run dev`
3. Open:
   - `http://localhost:5173`

## Quality checks
From `reminder-app/apps/web`:
- `npm run lint`
- `npm run test`
- `npm run build`

## Vercel deployment (two projects from one repo)

### Project 1: Frontend (`reminder-web`)
- Root directory: `reminder-app/apps/web`
- Framework preset: `Vite`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`
- Node version: default Vercel Node runtime
- Required environment variable:
  - `VITE_API_BASE_URL=https://<backend-project-domain>`
- Routing note: keep `apps/web/vercel.json` rewrite to `index.html` for SPA deep links.

### Project 2: Backend (`reminder-api`)
- Root directory: `reminder-app/apps/api`
- Framework preset: `Other`
- Install command: `npm install`
- Build command: none (handled by Vercel serverless builder in `apps/api/vercel.json`)
- Output directory: none
- Runtime entrypoint: `api/index.ts` (Express app exported as serverless handler)
- Routing note: all incoming paths rewrite to the serverless entry so `/events` and `/dashboard/*` remain stable.
- Local env file: `apps/api/.env.local` (must define `DATABASE_URL`)

### Shared-repo setup requirement
- Create **two separate Vercel projects** and link both to this same Git repository.
- Do not combine frontend and backend into one project.

### Optional single-domain future pattern
- If a single domain is needed later, add a third edge/proxy project (or equivalent rewrite layer) to route frontend and backend paths behind one host.
- This repository intentionally does **not** implement that proxy yet.

## Project structure
- `apps/web/src/features` — feature/screen modules
- `apps/web/src/components` — shared UI shell elements
- `apps/web/src/mocks` — local fixtures
- `apps/web/src/services/mock` — async mock service contracts
- `apps/web/src/types` — DTO-like interfaces for future API compatibility

## Prototype documentation
- See `docs/prototype/` for prototype architecture and deployment notes.
