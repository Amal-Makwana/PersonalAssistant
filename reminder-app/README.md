# Reminder App Monorepo

## Frontend-Only Local Prototype Phase

This repository currently includes a **frontend-only mock-first prototype** under `apps/web`.

### Current implemented vertical slice
- Dashboard (S03): upcoming/status summary + CTA navigation
- Events List (S04): mock list + filter state + detail navigation
- Event Detail (S05): mock detail + reminder edit/save simulation

### Scope of this phase
- Implement UI flows/components/pages with deterministic mock behavior.
- Use local fixtures and mock services to simulate app behavior.
- Validate loading, empty, error, success, permission, and validation states.

### Deferred by design
- No backend services
- No databases
- No API endpoints
- No external authentication providers
- No external integrations/cloud dependencies

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

## Vercel deployment (frontend-only)
- Project root: `reminder-app/apps/web`
- Build command: `npm run build`
- Output directory: `dist`
- SPA routing uses `vercel.json` rewrite to `index.html` for deep links
- No secrets/environment variables required for prototype deployment

## Project structure
- `apps/web/src/features` — feature/screen modules
- `apps/web/src/components` — shared UI shell elements
- `apps/web/src/mocks` — local fixtures
- `apps/web/src/services/mock` — async mock service contracts
- `apps/web/src/types` — DTO-like interfaces for future API compatibility

## Prototype documentation (parallel set)
To avoid changing canonical docs, prototype planning/governance docs are stored in:
- `docs/prototype-frontend-only/`
