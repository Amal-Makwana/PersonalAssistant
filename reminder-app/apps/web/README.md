# Frontend-Only Mock Prototype (apps/web)

## Implemented slice
This prototype currently implements the first vertical slice:
- **S03 Dashboard**
- **S04 Events List**
- **S05 Event Detail** with reminder plan preview, editable reminder plan, reminder channels, mock scheduling confirmation, and notification history preview

## Folder structure
- `src/features/dashboard` — Dashboard screen + tests
- `src/features/events` — Events List/Event Detail + tests
- `src/services/mock` — mock service contracts + tests
- `src/mocks` — local fixture data
- `src/contexts` — shared app state (scenario toggle)
- `src/types` — model/DTO contracts

## Install & run locally
```bash
npm install
npm run dev
```
Open `http://localhost:5173`.

## Mock data and state handling
- All data comes from local fixtures (`src/mocks`).
- `MockEventService` simulates async behavior, errors, permission, empty, and validation states.
- Mock save/edit is in-memory only (no backend/database).

## S05 reminder workflow (mock)
- **Reminder Plan Preview** derives deterministic reminder timestamps from event date/time using editable `offsetMinutes`.
- **Editable Reminder Plan** supports preset add/remove and custom offsets with validation.
- **Reminder Channels** shows/toggles local mock delivery channel status (push/email/sms).
- **Mock Scheduling Confirmation** shows deterministic success/failure outcomes when saving.
- **Notification History Preview** renders deterministic fixture entries (`Scheduled`, `Sent`, `Failed`, `Cancelled`).

## Where mock logic lives
- Reminder plan utilities: `src/features/events/utils/reminderPlanCalculator.ts`
- Reminder fixtures/history: `src/mocks/reminders.mock.ts`
- Event detail feature orchestration: `src/features/events/EventDetailScreen.tsx`
- Async mock service contracts: `src/services/mock/mockEventService.ts`

## Scenario triggering
Use the in-app **Mock Scenario** selector in the left panel:
- `success`
- `empty`
- `error`
- `permission`
- `validation`

## Deferred intentionally
- Backend, DB, APIs
- OAuth/provider integrations
- External service calls
- Production persistence

## Tests
```bash
npm run test
npm run lint
npm run build
```

## Vercel deployment notes
- Frontend deploy is a dedicated Vercel project with root `apps/web`
- Build command: `npm run build`
- Output: `dist`
- SPA fallback handled via `vercel.json` rewrite to `/index.html`
- Set `VITE_API_BASE_URL` to the separate backend Vercel project URL
- Do not combine frontend and backend into one Vercel project
