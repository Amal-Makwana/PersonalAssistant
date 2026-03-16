# Prototype Documentation

This folder tracks prototype-only implementation details and contracts.

## Monorepo Locations
- Frontend app: `reminder-app/apps/web`
- Mock backend app: `reminder-app/apps/api`

## Local Run

Backend:
```bash
cd reminder-app/apps/api
npm install
npm run dev
```

Frontend:
```bash
cd reminder-app/apps/web
npm install
npm run dev
```

## Endpoint Verification Examples
- `http://localhost:3000/events`
- `http://localhost:3000/events/evt-1`
- `http://localhost:3000/events/evt-1/notification-history`
- `http://localhost:3000/dashboard/summary`
- `curl -X PUT http://localhost:3000/events/evt-1/reminder-plan -H "Content-Type: application/json" -d '{"reminderPlan":[{"offset":"2h"}],"channels":{"push":true,"email":true,"sms":false}}'`

## Prototype Rules (Preserved)
- No database.
- No external integrations.
- Mock deterministic fixture responses only.
- Backend is local-run only.
