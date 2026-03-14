# Technical Overview

For critical documentation review, use docs/05-prompts/critical-persona-review.md

## 1. Document Purpose
This document defines the implementation-ready technical baseline for Email-Driven Reminder Assistant V1, aligned to the current Product scope.

## 2. Scope Alignment (Product → Tech)
### MVP (Committed)
- Gmail ingestion and event candidate detection (FR-02, FR-03)
- Event extraction and confidence policy (FR-04, US-05)
- Event persistence and duplicate prevention (FR-05, FR-10, US-07)
- Default reminder schedule generation at 4h / 1h / 15m (FR-06)
- Google Calendar synchronization as a committed MVP integration (FR-09, US-09)

### Post-MVP (Not implementation-critical for V1)
- WhatsApp reminder delivery (FR-07)
- SMS reminder delivery (FR-08)

## 3. Core Lifecycle
`gmail ingest -> extract -> dedupe/persist -> schedule reminders -> calendar sync`

Calendar sync is triggered only after successful persistence of normalized event records and dedupe confirmation.

## 4. Architectural Approach
- **Style:** Modular monolith with asynchronous workers and queue-based boundaries.
- **Pattern:** `routes -> controllers -> services -> repositories -> models`.
- **Consistency model:** Transactional consistency for event/reminder writes; eventual consistency for Google Calendar API writes.
- **Resilience model:** bounded retries, idempotency keys, dead-letter handling, and terminal failure status.

## 5. Reliability and Operational Targets
- **Calendar sync latency target:** event visible in Google Calendar within 10 seconds after successful persistence for normal operating conditions (US-09).
- **Calendar retry policy:** exponential backoff (5 attempts: 5s, 10s, 30s, 60s, 120s), then terminal failure.
- **Timeout expectations:** 10s per Google Calendar upsert attempt; classify timeout as retryable transient error.
- **Terminal failure handling:** set sync status to `FAILED_TERMINAL`, persist reason code, emit alert/event for operational review.
- **Duplicate prevention interaction:** dedupe key is resolved before enqueueing calendar sync; duplicate suppression prevents repeated calendar creates.

## 6. Observability Requirements
Mandatory instrumentation for V1:
- **Extraction:** confidence distribution, low-confidence count, parse failure reason codes (US-05).
- **Scheduling:** schedule generation count, scheduler latency, failed schedule creation.
- **Calendar sync:** enqueue-to-success latency, retry count, transient vs terminal failures, duplicate-suppressed sync attempts (US-09).
- **Traceability:** correlation IDs across API, worker, DB, and Google provider adapter.

## 7. System Boundaries
Inside boundary:
- API service, worker service, scheduler role, Postgres, Redis

Outside boundary:
- Google OAuth + Gmail API + Google Calendar API
- Future-phase messaging providers (WhatsApp/SMS)

## 8. Constraints
- Gmail-only source in V1.
- Fixed reminder policy (4h / 1h / 15m).
- Calendar sync included in MVP.
- WhatsApp/SMS channel delivery deferred to post-MVP scope.

## 9. Traceability Matrix
| Product Item | Tech Realization |
| --- | --- |
| FR-04 + US-05 extraction confidence policy | Confidence thresholds, low-confidence logging, extraction metrics |
| FR-10 + US-07 duplicate prevention | Dedupe key before persistence and before sync enqueue |
| FR-09 + US-09 calendar sync reliability | Post-persistence sync trigger, retry/timeout policy, terminal failure state, 10s sync latency target |

## 10. Cross References
- Product source of truth: `docs/00-product/requirements.md`, `docs/00-product/user-stories.md`, `docs/00-product/acceptance-criteria.md`, `docs/00-product/scope-v1.md`
- Backend runtime details: `backend-spec.md`
- Integration contracts: `integration-spec.md`
- Data constraints: `db-schema.md`
- Diagrams: `diagrams/*`
