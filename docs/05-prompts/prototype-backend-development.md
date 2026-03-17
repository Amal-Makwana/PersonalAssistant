# Incremental Backend Development Prompt (Prototype-to-Canonical)

Use this prompt when extending prototype-era slices while preserving canonical documentation and contracts.

## Objective
Advance features from mock-first behavior to DB-backed behavior incrementally, while keeping canonical docs current.

## Original Scope
- Prototype work started as deterministic, fixture-backed behavior for rapid UI validation.
- Authentication remained intentionally mocked in early slices.

## Prototype Baseline Rules
1. Preserve deterministic behavior where slices are still mock-backed.
2. Keep UUID-based IDs and canonical reminder offset contract (`Nh|Nm`).
3. Enforce explicit validation/error contracts (`400/404/500`) on API changes.

## Incremental Build Progress Rules
1. Route migrated flows through API and persistence layers.
2. Do not reintroduce fixture-only runtime behavior for migrated non-auth flows.
3. For each changed endpoint, update canonical endpoint docs in `docs/02-design/api-spec.md`.
4. Keep route/controller/service/repository layering consistent.
5. Add/update tests whenever contracts or query logic change.

## Current State Guidance
- Event and system slices are expected to follow canonical schema and reliability contracts.
- Auth mock behavior can remain until explicitly migrated.
- Prompt and documentation updates must ship in the same change set as behavior changes.

## Consolidated Quality Checklist
1. Start from existing route contracts and frontend service adapters.
2. Update endpoint docs and examples for every contract change.
3. Add route/service tests (success + validation + error paths).
4. Add/update frontend tests for API client usage and visible states.
5. Keep event detail flow integrity:
   - Event Information
   - Reminder Plan Preview
   - Editable Reminder Plan
   - Reminder Channels
   - Actions
   - Scheduling Confirmation
   - Notification History Preview
