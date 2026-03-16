# Mock UI Implementation

## Screen Coverage (S01-S09)
- **S01** Landing / entry context
- **S02** Authentication placeholder (prototype-only gate)
- **S03** Dashboard
- **S04** Events list
- **S05** Event detail
- **S06** Reminder plan editor
- **S07** Reminder preview / confirmation
- **S08** Notification history view
- **S09** Settings / prototype controls

## Screen-to-API Mapping
- **Dashboard (S03)** → `GET /dashboard/summary`
- **Events List (S04)** → `GET /events`
- **Event Detail (S05)** → `GET /events/{id}`
- **Reminder Save (S06/S07)** → `PUT /events/{id}/reminder-plan`
- **Notification History (S08 content on detail flow)** → `GET /events/{id}/notification-history`

## Frontend Integration Notes
- Frontend service endpoint base URL: `VITE_API_BASE_URL` (default `http://localhost:3000`).
- Web app remains deploy-compatible on Vercel because only runtime fetch targets are configurable and no backend bundling assumptions are introduced.
- Deterministic fallback fixtures remain available for local frontend-only runs when backend is not running.

## Mock Service Layer Mapping
Frontend services map to backend contracts in `reminder-app/apps/api`:
- `listEvents()` -> `GET /events`
- `getDashboardSummary()` -> `GET /dashboard/summary`
- `getEventById(id)` -> `GET /events/{id}`
- `saveReminderSettings(payload)` -> `PUT /events/{id}/reminder-plan`
- `getNotificationHistoryPreview(id)` -> `GET /events/{id}/notification-history`

## Navigation Flows
- S03 -> S04 -> S05 -> S06 -> S07
- S03 -> S08 (history branch)
- S09 provides deterministic scenario toggles (latency/error mode) for prototype testing.
