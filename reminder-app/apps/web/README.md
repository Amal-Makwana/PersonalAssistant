# Frontend-Only Mock Prototype (apps/web)

## Implemented slice
This prototype currently implements the first vertical slice:
- **S03 Dashboard**
- **S04 Events List**
- **S05 Event Detail** with mock reminder plan preview, reminder channels preview, and reminder edit/save flow

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


## S05 Reminder previews (mock)
- **Reminder Plan Preview** derives deterministic reminder timestamps from event date/time using local offset fixtures.
- **Reminder Channels** shows local mock delivery channel status (push/email/sms) with frontend-only toggles.
- All behavior is in-memory and scenario-driven (loading/success/empty/error).

## Where mock logic lives
- Reminder plan calculation: `src/features/events/utils/reminderPlanCalculator.ts`
- Reminder fixtures: `src/mocks/reminders.mock.ts`
- Preview data contracts + async simulation: `src/services/mock/mockEventService.ts`

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
- Deploy root as `apps/web`
- Build command: `npm run build`
- Output: `dist`
- SPA fallback handled via `vercel.json` rewrite to `/index.html`
- No secrets are required for this frontend-only prototype
