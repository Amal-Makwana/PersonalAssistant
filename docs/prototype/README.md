# Prototype Documentation

This folder tracks prototype-only implementation details and contracts.

## Monorepo Locations
- Frontend app: `reminder-app/apps/web`
- Mock backend app: `reminder-app/apps/api`

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
- No database integration tests.
- No external service integration tests.
- No cloud/deployment environment tests.
- No heavy end-to-end browser automation.

## Endpoint Verification Examples
- `GET http://localhost:3000/events`
- `GET http://localhost:3000/events/evt-001`
- `PUT http://localhost:3000/events/evt-001/reminder-plan`
- `GET http://localhost:3000/dashboard/summary`
- `GET http://localhost:3000/events/evt-001/notification-history`

```bash
curl "http://localhost:3000/events"
curl "http://localhost:3000/events/evt-001"
curl "http://localhost:3000/dashboard/summary"
curl "http://localhost:3000/events/evt-001/notification-history"
curl -X PUT "http://localhost:3000/events/evt-001/reminder-plan" \
  -H "Content-Type: application/json" \
  -d '{"reminderPlan":[{"offset":"2h"},{"offset":"45m"}],"channels":{"push":true,"email":true,"sms":false}}'
```

Error simulation:
```bash
curl "http://localhost:3000/events/evt-001?scenario=error"
curl -X PUT "http://localhost:3000/events/evt-001/reminder-plan?scenario=error" \
  -H "Content-Type: application/json" \
  -d '{"reminderPlan":[{"offset":"1h"}],"channels":{"push":true}}'
curl "http://localhost:3000/dashboard/summary?scenario=error"
curl "http://localhost:3000/events/evt-001/notification-history?scenario=error"
```

## Prototype Rules (Preserved)
- No database.
- No external integrations.
- Mock deterministic fixture responses only.
- Backend is local-run only.
