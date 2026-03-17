# Scope Definition for V1 (MVP)

## Scope Intent
V1 focuses on delivering a reliable, trust-building automation loop for inbox-derived events. Scope prioritizes consistency and operational confidence over feature breadth.

## In Scope (MVP)
1. Google authentication.
2. Gmail event ingestion.
3. Event extraction.
4. Event persistence.
5. Duplicate prevention.
6. Default reminder scheduling.
7. Google Calendar synchronization.

## Out of Scope (MVP)
1. WhatsApp reminders.
2. SMS reminders.
3. Non-Gmail providers.
4. Recurring event rule engines.
5. Team collaboration, shared inbox, or enterprise admin workflows.
6. Voice assistant features.

## Boundary Decisions
- Preference depth is intentionally minimal in V1 to reduce complexity.
- Reminder timing is fixed to validate baseline behavior before introducing custom rules.
- Calendar sync is included in MVP to ensure continuity in users' existing scheduling workflows.

## Release Readiness Conditions
V1 is considered scope-complete when all mapped MVP requirements (FR-01, FR-02, FR-03, FR-04, FR-05, FR-06, FR-09, FR-10, FR-11) have corresponding implemented stories and accepted criteria validation.

## Prototype Implementation Status (Current)
- Prototype backend has started transition from mock-only behavior to real persistence for the Events vertical slice.
- `GET /events` and `POST /events` are now intended to run against Supabase/Postgres while preserving frontend response compatibility.
- Remaining prototype endpoints continue to be mock-driven until future slices move them to persistence.

## Traceability
- Requirements baseline: [requirements.md](./requirements.md), Sections 10 and 19.
- Story mapping: [user-stories.md](./user-stories.md).
- Validation mapping: [acceptance-criteria.md](./acceptance-criteria.md).
