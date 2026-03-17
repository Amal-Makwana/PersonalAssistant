# Prototype Documentation

This folder tracks prototype-only implementation details and contracts.

## Monorepo Locations
- Frontend app: `reminder-app/apps/web`
- Backend app: `reminder-app/apps/api` (events list/create now use real Supabase/Postgres persistence)

## Vercel Deployment Model (Two Projects, One Repo)

Deploy frontend and backend as **two separate Vercel projects** linked to the same Git repository.

### Frontend project settings
- Project type: separate Vercel project (suggested name: `reminder-web`)
- Root Directory: `reminder-app/apps/web`
- Framework Preset: `Vite`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Required environment variable:
  - `VITE_API_BASE_URL=https://<your-backend-project>.vercel.app`

### Backend project settings
- Project type: separate Vercel project (suggested name: `reminder-api`)
- Root Directory: `reminder-app/apps/api`
- Framework Preset: `Other`
- Install Command: `npm install`
- Build Command: leave empty (serverless build is configured in `apps/api/vercel.json`)
- Output Directory: not applicable
- Runtime entrypoint: `api/index.ts`
- Routing behavior: all request paths rewrite to serverless handler so backend endpoints stay at `/events/*` and `/dashboard/*`

### Frontend -> backend call behavior in deployed environments
- Frontend must call backend using `VITE_API_BASE_URL`.
- In production/preview, set `VITE_API_BASE_URL` on the frontend Vercel project to the backend project URL.
- Local default remains `http://localhost:3000` when the env var is not set.

### Future single-domain option (not implemented)
- If one shared domain is required later, introduce a dedicated proxy/rewrites layer (for example, a third Vercel project or edge proxy) to route frontend and backend paths.
- Do not combine frontend and backend into one Vercel project for this prototype.

## Local Run

### Backend (local only)
```bash
cd reminder-app/apps/api
npm install
npm run dev
```

### Frontend (Vercel-compatible build)
```bash
cd reminder-app/apps/web
npm install
npm run dev
```

Optional frontend API base URL override:
```bash
VITE_API_BASE_URL=http://localhost:3000 npm run dev
```

## Integration Test Runs (local-only)

### Backend route integration tests
```bash
cd reminder-app/apps/api
npm test
```

### Frontend↔API integration tests (plus existing frontend test suite)
```bash
cd reminder-app/apps/web
npm test
```

### What integration coverage now exists
- Backend route contract coverage for:
  - `GET /events`
  - `GET /events/:id`
  - `PUT /events/:id/reminder-plan`
  - `GET /dashboard/summary`
  - `GET /events/:id/notification-history`
- Frontend integration coverage for:
  - Dashboard loading/error behavior from backend response shape
  - Events list loading/empty/error behavior
  - Event detail success/404/error behavior
  - Reminder save success/error behavior
  - Notification history success/error behavior
  - Contract-shape assertions to catch payload mismatches

### Intentionally not covered in prototype tests
- No end-to-end database integration tests against shared cloud instances.
- No external service integration tests.
- No cloud/deployment environment tests.
- No heavy end-to-end browser automation.

## Endpoint Verification Examples
- `GET http://localhost:3000/events`
- `GET http://localhost:3000/events/22222222-2222-4222-8222-222222222222`
- `PUT http://localhost:3000/events/22222222-2222-4222-8222-222222222222/reminder-plan`
- `GET http://localhost:3000/dashboard/summary`
- `GET http://localhost:3000/events/22222222-2222-4222-8222-222222222222/notification-history`

```bash
curl "http://localhost:3000/events"
curl "http://localhost:3000/events/22222222-2222-4222-8222-222222222222"
curl "http://localhost:3000/dashboard/summary"
curl "http://localhost:3000/events/22222222-2222-4222-8222-222222222222/notification-history"
curl -X PUT "http://localhost:3000/events/22222222-2222-4222-8222-222222222222/reminder-plan" \
  -H "Content-Type: application/json" \
  -d '{"reminderPlan":[{"offset":"2h"},{"offset":"45m"}],"channels":{"push":true,"email":true,"sms":false}}'
```

## Prototype Rules (Updated)
- Event runtime flows are aligned to canonical schema tables (`events`, `reminders`, `delivery_attempts`).
- Runtime API IDs are UUID-based.
- Avoid fixture-style IDs in endpoint verification examples.
