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

## API Consumption by Screen
- **S03 Dashboard:** `GET /dashboard/summary`
- **S04 Events list:** `GET /events`
- **S05 Event detail:** `GET /events/{id}`
- **S06 Reminder plan editor:** `PUT /events/{id}/reminder-plan`
- **S07 Confirmation:** uses write response from `PUT /events/{id}/reminder-plan`
- **S08 Notification history:** `GET /events/{id}/notification-history`
- **S01/S02/S09:** local fixture/config-driven; no external integration calls

## Mock Service Layer Mapping
Frontend services map to backend API contracts in `reminder-app/apps/api`:
- `listEvents()` -> `GET /events`
- `getDashboardSummary()` -> `GET /dashboard/summary`
- `getEventById(id)` -> `GET /events/{id}`
- `saveReminderSettings(id, payload)` -> `PUT /events/{id}/reminder-plan`
- `getNotificationHistoryPreview(id)` -> `GET /events/{id}/notification-history`

## Navigation Flows
- S03 -> S04 -> S05 -> S06 -> S07
- S03 -> S08 (history branch)
- S09 provides deterministic scenario toggles (latency/error mode) for prototype testing.

## Fixture Usage
- API-level fixtures are canonical for implemented endpoints.
- UI fallback fixtures remain only as deterministic local fallback for unavailable local backend during frontend-only runs.
- Shared IDs and status enums remain aligned across frontend and backend fixtures.
