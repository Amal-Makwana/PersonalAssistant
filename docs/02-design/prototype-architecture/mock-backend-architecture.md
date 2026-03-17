# Mock Backend Architecture

## Backend Location
The prototype mock backend lives in `reminder-app/apps/api`.

## Vercel Project Boundary
- Backend should be deployed as its own Vercel project with Root Directory `reminder-app/apps/api`.
- The backend project uses `apps/api/vercel.json` and serverless entrypoint `apps/api/api/index.ts`.
- This backend deployment is intentionally separate from the frontend Vercel project.

## Layered Structure
The backend follows:
- `routes`: endpoint declarations and URL registration.
- `controllers`: request parsing and HTTP status-code mapping.
- `services`: scenario handling, minimal validation, and business rules.
- `repositories`: deterministic fixture-backed read/write behavior (runtime in-memory only).
- `types`: DTO-like request/response shape definitions.
- `fixtures`: static deterministic payload sources.
- `tests`: endpoint contract and scenario validation.

## Implemented Routes
- `GET /events`
- `GET /events/:id`
- `PUT /events/:id/reminder-plan`
- `GET /dashboard/summary`
- `GET /events/:id/notification-history`

## Responsibility Mapping
- Events route/controller delegates to `EventsService` for scenario and validation logic.
- `EventsRepository` reads from `events.fixture.json` and `notification-history.fixture.json`.
- Reminder plan save uses in-memory overrides per event ID, with deterministic response fields and timestamps.
- Dashboard route/controller delegates to `DashboardService`, backed by `dashboard.fixture.json`.

## Fixture Strategy
- Stable IDs (`evt-001`, `evt-002`) and static timestamps are defined in JSON fixtures.
- `PUT /events/:id/reminder-plan` mutates only process memory and is reset between tests.
- No random generation is used in API payloads.

## Deterministic Mock Behavior
- `scenario=error` returns deterministic HTTP 500 behavior for supported endpoints.
- `scenario=empty` is supported for dashboard summary.
- Unknown event IDs return deterministic `404` for event detail and notification history endpoints.

## Local-only Backend Rules
- Local Express runtime on `http://localhost:3000`.
- No DB.
- No external services.
- Mock responses only.

## Integration Testing and Contract Consistency
- Route integration tests validate deterministic responses and scenario paths (`success`, `error`, endpoint-specific `empty`).
- Frontend integration tests assert UI behavior against backend payload shapes, reducing silent contract drift.
- API contract changes must be reflected in both backend route tests and frontend integration tests in the same change.
