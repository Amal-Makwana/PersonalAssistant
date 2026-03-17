# Scope Definition for V1 (MVP)

## Original Scope
V1 focuses on delivering a reliable, trust-building automation loop for inbox-derived events. Scope prioritizes consistency and operational confidence over feature breadth.

### In Scope (MVP)
1. Google authentication.
2. Gmail event ingestion.
3. Event extraction.
4. Event persistence.
5. Duplicate prevention.
6. Default reminder scheduling.
7. Google Calendar synchronization.

### Out of Scope (MVP)
1. WhatsApp reminders.
2. SMS reminders.
3. Non-Gmail providers.
4. Recurring event rule engines.
5. Team collaboration, shared inbox, or enterprise admin workflows.
6. Voice assistant features.

## Prototype Baseline
The early prototype validated UX and workflow sequencing with mock-first behavior, especially for authentication and integration-dependent states. Prototype artifacts also introduced endpoint-level contracts and vertical-slice delivery sequencing used to de-risk implementation.

## Incremental Build Progress
- Event vertical slice moved from fixture-only behavior to backend-connected Supabase/Postgres persistence.
- Runtime tables used for event flows now align with canonical schema (`events`, `reminders`, `delivery_attempts`, `calendar_sync_records`).
- Runtime event identifiers are UUID-based; fixture-style IDs remain non-runtime examples only.

## Current State
- Product scope remains unchanged from the original MVP boundary.
- Implementation is incremental: selected slices are backend-connected while auth UX in S01 remains intentionally mocked pending full auth integration prioritization.
- Canonical product scope and traceability continue to be governed from `docs/00-product`.

## Boundary Decisions
- Preference depth is intentionally minimal in V1 to reduce complexity.
- Reminder timing is fixed to validate baseline behavior before introducing custom rules.
- Calendar sync is included in MVP to ensure continuity in users' existing scheduling workflows.

## Release Readiness Conditions
V1 is considered scope-complete when all mapped MVP requirements (FR-01, FR-02, FR-03, FR-04, FR-05, FR-06, FR-09, FR-10, FR-11) have corresponding implemented stories and accepted criteria validation.

## Traceability
- Requirements baseline: [requirements.md](./requirements.md), Sections 10 and 19.
- Story mapping: [user-stories.md](./user-stories.md).
- Validation mapping: [acceptance-criteria.md](./acceptance-criteria.md).
