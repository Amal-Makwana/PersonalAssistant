# Frontend Spec (Prototype Profile)

## Profile
Frontend-only, mock-first architecture for local UX validation.

## Stack
- React + TypeScript
- Vite
- React Router
- Tailwind CSS
- Vitest + React Testing Library
- ESLint + Prettier

## Requirements Translation Layer
- Reminder plan preview -> deterministic local offset calculation against event time
- **Editable reminder plan** -> add/remove local `offsetMinutes` values with immediate preview recalculation
- Reminder channel preview -> local fixture-backed delivery-channel status indicators
- **Mock scheduling confirmation** -> frontend-only async save simulation with deterministic success/error by scenario
- **Notification history preview** -> deterministic fixture-based activity rows with readable timestamps and status labels
- Authentication -> mocked session state
- Ingestion -> mocked event feed state
- Persistence -> in-memory updates
- Deduplication -> simulated duplicate UX handling
- Calendar sync -> mocked status indicators
- Retry behavior -> simulated retry interactions
- Provider failures -> fixture-driven error scenarios

## Architecture
UI Components -> Feature Modules -> Mock Service Layer -> Local Fixtures

## S05 Event Detail contracts (current)
1. Event Information
2. Reminder Plan Preview (derived from editable offsets)
3. Editable Reminder Plan (preset + custom + remove)
4. Reminder Channels
5. Actions (edit/save/cancel)
6. Mock Scheduling Confirmation (success/error + retry)
7. Notification History Preview

## Reminder and scheduling implementation notes
- `offsetMinutes` is canonical reminder timing state.
- Reminder timestamps are derived in frontend utilities only (`eventTime - offsetMinutes`).
- Save confirmation is UI-only; no real scheduler is invoked.
- Notification activity rows are deterministic fixtures; no event log backend exists.

## Non-Goals
No backend, DB, real API integration, cloud infra, or external auth providers.
