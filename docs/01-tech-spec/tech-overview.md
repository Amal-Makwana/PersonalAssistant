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

Trace: FR-09, FR-10, US-05, US-07, US-09

### Post-MVP (Not implementation-critical for V1)
- WhatsApp reminder delivery (FR-07)
- SMS reminder delivery (FR-08)

## 3. Core Lifecycle
`ingest -> extract -> dedupe -> schedule -> calendar sync`

Calendar sync is triggered only after successful persistence of normalized event records and dedupe confirmation.

Canonical lifecycle/state contracts:
- API status/state contract: `api-spec.md` (canonical sync states and API-visible outcomes)
- Persistence/status contract: `db-schema.md` (`calendar_sync_records`, `reminders`, and failure metadata persistence)
- Runtime semantics: `backend-spec.md` + `integration-spec.md` (retry, idempotency, terminal handling)

Trace: FR-04, FR-09, FR-10, US-05, US-07, US-09

## 4. Architectural Approach
- **Style:** Modular monolith with asynchronous workers and queue-based boundaries.
- **Pattern:** `routes -> controllers -> services -> repositories -> models`.
- **Consistency model:** Transactional consistency for event/reminder writes; eventual consistency for Google Calendar API writes.
- **Resilience model:** bounded retries, idempotency keys, dead-letter handling, and terminal failure status.

## 5. Reliability and Operational Targets
- **Calendar sync latency target:** event visible in Google Calendar within 10 seconds after successful persistence for normal operating conditions (US-09).
- **Calendar retry policy:** exponential backoff (5 attempts: 5s, 10s, 30s, 60s, 120s), then terminal failure.
- **Timeout expectations:** 10s per Google Calendar upsert attempt; classify timeout as retryable transient error.
- **Canonical sync states:** `PENDING`, `IN_PROGRESS`, `SYNCED`, `FAILED_RETRYABLE`, `FAILED_TERMINAL`.
- **Terminal failure handling:** on transition to `FAILED_TERMINAL`, persist `failure_reason`, `provider_status`, and `last_attempt_at`, then emit alert/event for operational review.
- **Duplicate prevention interaction:** dedupe key is resolved before enqueueing calendar sync; duplicate suppression prevents repeated calendar creates.

Trace: FR-09, FR-10, US-07, US-09

## 6. Observability Requirements
Mandatory instrumentation for V1:
- **Extraction:** confidence distribution, low-confidence count, parse failure reason codes (US-05).
- **Scheduling:** schedule generation count, scheduler latency, failed schedule creation.
- **Calendar sync:** enqueue-to-success latency, retry count, transient vs terminal failures, duplicate-suppressed sync attempts (US-09).
- **Traceability:** correlation IDs across API, worker, DB, and Google provider adapter.

Trace: FR-04, FR-09, US-05, US-09

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
- WhatsApp/SMS channel delivery deferred to post-MVP scope and excluded from MVP runtime controls.

## 9. Traceability Matrix
| Product Item | Tech Realization |
| --- | --- |
| FR-04 + US-05 extraction confidence policy | Confidence thresholds, low-confidence logging, extraction metrics |
| FR-10 + US-07 duplicate prevention | Dedupe key before persistence and before sync enqueue |
| FR-09 + US-09 calendar sync reliability | Post-persistence sync trigger, retry/timeout policy, canonical sync states, terminal failure persistence fields, 10s sync latency target |

## 10. Cross References
- Product source of truth: `docs/00-product/requirements.md`, `docs/00-product/user-stories.md`, `docs/00-product/acceptance-criteria.md`, `docs/00-product/scope-v1.md`
- Backend runtime details: `backend-spec.md`
- API contract details: `api-spec.md`
- Integration contracts: `integration-spec.md`
- Data constraints and status persistence: `db-schema.md`
- Diagrams: `diagrams/*`
