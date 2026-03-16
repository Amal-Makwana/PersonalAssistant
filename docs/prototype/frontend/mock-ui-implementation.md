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
- **S03 Dashboard:** `GET /events` (+ future dashboard summary endpoint)
- **S04 Events list:** `GET /events`
- **S05 Event detail:** `GET /events/{id}`
- **S06 Reminder plan editor:** `GET /events/{id}`, `PUT /events/{id}/reminder-plan`
- **S07 Confirmation:** uses write response from `PUT /events/{id}/reminder-plan`
- **S08 Notification history:** future notification history endpoint
- **S01/S02/S09:** local fixture/config-driven; no external integration calls

## Mock Service Layer Mapping
Frontend services should map directly to backend API contracts:
- `fetchEvents(params)` -> `GET /events`
- `fetchEventById(id)` -> `GET /events/{id}`
- `saveReminderPlan(id, payload)` -> `PUT /events/{id}/reminder-plan`

Service adapters normalize DTOs to UI view models and enforce deterministic fallback behavior for scenario modes.

## Navigation Flows
- S03 -> S04 -> S05 -> S06 -> S07
- S03 -> S08 (history branch)
- S09 provides deterministic scenario toggles (latency/error mode) for prototype testing.

## Fixture Usage
- UI-level fixtures for loading/empty/error skeleton states.
- API-level fixtures for list/detail/update contracts.
- Shared IDs and status enums must remain aligned across frontend and backend fixtures.
- No random fixture generation; all data remains deterministic and reproducible.
