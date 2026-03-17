# Prototype Documentation

This folder tracks prototype implementation details, contracts, governance rules, and prompts.

## Current Prototype State (authoritative)
- Frontend: `reminder-app/apps/web`
- Backend: `reminder-app/apps/api`
- Runtime model: **backend-connected prototype** (DB-backed API routes) for S02-S09, with one explicit exception:
  - **S01 authentication remains intentionally mocked**.

## Backend-connected scope
The prototype now uses route/controller/service/repository layers and persistence for:
- Dashboard summary (`/dashboard/summary`)
- Events list/detail/reminder plan/history
- Event reminder channels and retry-sync
- System profile/preferences
- Integrations status
- Diagnostics activity

## Governance expectations
- Keep endpoint contracts documented under `docs/prototype/backend/endpoints`.
- Any behavior change requires:
  1) code change,
  2) tests,
  3) prototype docs update,
  4) prompt update (if guidance changed).
- Preserve UUID-based IDs and canonical response shapes.
- Avoid reintroducing fixture-driven runtime behavior (except auth mock flow).

## Quality gates
- API: route-level integration tests with DB module mocked.
- Web: service/component tests and production build validation.
- Required local checks before merge:
  - `cd reminder-app/apps/api && npm test && npx tsc --noEmit`
  - `cd reminder-app/apps/web && npm test && npm run build`
