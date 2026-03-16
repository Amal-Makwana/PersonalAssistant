# Mock Backend Architecture

## Backend Location
The prototype mock backend lives in `reminder-app/apps/api`.

## Layered Structure
The backend follows:
- `routes` -> HTTP route registration
- `controllers` -> request parsing + status-code mapping
- `services` -> scenario logic + validation + deterministic behavior
- `repositories` -> fixture-backed reads and in-memory mock updates
- `types` -> API DTO contracts
- `fixtures` -> deterministic payloads

## Implemented Routes
- `GET /events`
- `GET /events/:id`
- `PUT /events/:id/reminder-plan`
- `GET /dashboard/summary`
- `GET /events/:id/notification-history`

## Fixture Strategy
- JSON fixtures define stable IDs/timestamps and deterministic payload content.
- `PUT /events/:id/reminder-plan` applies in-memory runtime updates only.
- No persistence beyond process memory.

## Local-only Backend Rules
- Local express runtime on `http://localhost:3000`.
- No DB.
- No external services.
- Mock responses only.
- `?scenario=error` provides deterministic `500` responses for supported endpoints.
