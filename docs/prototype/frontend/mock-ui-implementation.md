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
- Web app remains deploy-compatible on Vercel as a standalone project rooted at `reminder-app/apps/web`.
- Deterministic fallback fixtures remain available for local frontend-only runs when backend is not running.

## Frontend API Configuration
- Frontend API requests use `API_BASE_URL` from `apps/web/src/config/api.ts`.
- `API_BASE_URL` automatically switches by hostname:
  - `window.location.hostname === "localhost"` → `http://localhost:3000`
  - any other hostname → `https://<backend-vercel-url>` (placeholder deployed backend URL)
- This keeps local development pointed to the local backend while allowing deployed frontend builds to call the deployed backend, without introducing environment variables.

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

## Frontend↔API Integration Test Coverage
The prototype now includes integration coverage for:
- S03 Dashboard (`GET /dashboard/summary`) success + error.
- S04 Events List (`GET /events`) success + empty + error.
- S05 Event Detail (`GET /events/:id`) success + 404 + error.
- S06/S07 Reminder save (`PUT /events/:id/reminder-plan`) success + server error, with validation behavior covered in existing detail-flow tests.
- S08 Notification history (`GET /events/:id/notification-history`) success + error.
- Contract-shape checks for backend fixture fields consumed by frontend mapping logic.
