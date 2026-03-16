# Prototype Backend Development Prompt

Use this prompt when implementing or extending mock backend APIs for the prototype system.

## Objective
Build backend endpoints that support prototype UI behavior with deterministic fixture-driven responses.

## Mandatory Constraints
1. Keep prototype scope isolated under `docs/prototype` for documentation artifacts.
2. Do not modify canonical product/design/execution documentation for prototype-only backend implementation tasks.
3. Use mock backend APIs only.
4. Do not use a database.
5. Do not use OAuth/auth providers or external APIs.
6. Do not add persistent storage.
7. All endpoint responses must be deterministic and fixture-backed.

## Backend Location (Required)
- Implement backend under `reminder-app/apps/api`.

## Backend Implementation Pattern
- Layering: `routes -> controllers -> services -> repositories -> fixtures/types`.
- Routes define endpoint registration.
- Controllers map request/response and HTTP status handling.
- Services contain scenario toggles (`error`, endpoint-specific `empty` where applicable), validations, and business logic.
- Repositories provide deterministic fixture reads and optional in-memory runtime updates.

## Implemented Prototype Endpoint Set
- `GET /events`
- `GET /events/:id`
- `PUT /events/:id/reminder-plan`
- `GET /dashboard/summary`
- `GET /events/:id/notification-history`

## API Contract Discipline
- Keep endpoint contracts documented in `docs/prototype/backend/mock-api-contracts.md`.
- Keep per-endpoint docs updated under `docs/prototype/backend/endpoints/`.
- Ensure examples/schemas match implementation exactly.

## Deterministic Fixture Rules
- Use stable IDs/timestamps (e.g., `evt-001`).
- No random value generation.
- No database or external integration dependencies.
- In-memory updates are allowed only for runtime mock behavior and are resettable in tests.

## Documentation Maintenance
When backend prototype behavior changes:
- Update `docs/prototype/README.md`.
- Update `docs/prototype/architecture/mock-backend-architecture.md`.
- Update `docs/prototype/backend/mock-api-contracts.md`.
- Update impacted docs in `docs/prototype/backend/endpoints/`.
- Update frontend mapping in `docs/prototype/frontend/mock-ui-implementation.md` when integration behavior changes.

## Output Expectation
Return:
1. Files changed.
2. APIs implemented/updated.
3. Fixture and deterministic behavior notes.
4. Validation commands and results.
