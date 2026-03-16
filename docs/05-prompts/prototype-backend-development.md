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
- Implement backend under `reminder-app/apps/api` (not root-level `apps/api`).

## Backend Implementation Pattern
- Layering: `routes -> controllers -> services -> mock repository`.
- Validate request DTOs at controller/service boundary.
- Use service methods for business rules and deterministic error handling.
- Use in-memory fixture repository for reads/writes during runtime only.

## API Contract Discipline
- Keep endpoint contracts documented in `docs/prototype/backend/mock-api-contracts.md`.
- Keep per-endpoint docs updated under `docs/prototype/backend/endpoints/`.
- Ensure examples and schemas match implemented behavior exactly.

## Deterministic Fixture Rules
- Use stable fixture IDs and timestamps.
- No random value generation in responses.
- If latency/error simulation exists, make it explicit and deterministic.

## Documentation Maintenance
When backend prototype behavior changes:
- Update `docs/prototype/architecture/mock-backend-architecture.md`.
- Update `docs/prototype/backend/mock-api-contracts.md`.
- Update impacted endpoint docs in `docs/prototype/backend/endpoints/`.
- Update `docs/prototype/execution/prototype-roadmap.md` when sequencing changes.

## Output Expectation
Return:
1. Files changed
2. API contracts updated
3. Fixture and deterministic behavior notes
4. Validation commands and results
