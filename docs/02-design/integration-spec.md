# Integration Specification

## 1. Purpose
Canonical reliability policy and sync-state vocabulary are defined in `reliability-policy.md`. This file implements those contracts for its scope.

Define integration contracts, trigger points, retry/timeout behavior, and observability requirements aligned to the revised MVP.

## 2. Integration Scope
### MVP Integrations
- Google OAuth
- Gmail API
- Google Calendar API
- Internal queue/scheduler pipeline

### Post-MVP Integrations
- WhatsApp provider (FR-07)
- SMS provider (FR-08)

## 3. Internal Integration Contracts
- API service -> queue: enqueue `gmail.ingest`, `event.normalize`, `reminder.schedule`, `calendar.sync`
- Worker -> Postgres: persistence, dedupe checks, sync state updates
- Scheduler -> worker: retry processing and stuck-job repair

## 4. External Integrations
### Google OAuth
- **Purpose:** authentication + delegated consent
- **Failure handling:** invalid grant requires re-consent (no automated retry)
- **Timeout:** 10s

### Gmail API
- **Purpose:** source ingestion of candidate event messages
- **Failure handling:** transient API failures retried with bounded backoff
- **Retry:** up to 3 attempts (2s, 5s, 10s)
- **Timeout:** 10s

### Google Calendar API (MVP-critical)
- **Purpose:** synchronize persisted event records into Google Calendar (FR-09)
- **Trigger point:** async `calendar.sync` job is created after successful `event.normalize` persistence and dedupe validation
- **Data flow:** outbound upsert (create/update); optional read during reconcile
- **Idempotency contract:** one logical sync target per `event_id + user_id`, provider event ID persisted for future upserts
- **Retry policy:** 5 attempts (5s, 10s, 30s, 60s, 120s)
- **Timeout:** 10s per call
- **Canonical sync states:** `PENDING`, `IN_PROGRESS`, `SYNCED`, `FAILED_RETRYABLE`, `FAILED_TERMINAL`
- **Terminal status rule:** if max retries exceeded or non-retryable 4xx occurs, set `FAILED_TERMINAL` and persist `failure_reason`, `provider_status`, and `last_attempt_at`
- **Latency expectation:** target calendar visibility within 10 seconds from event persistence under normal conditions (US-09)

Trace: FR-09, FR-10, US-07, US-09

### WhatsApp Provider (Post-MVP)
- Documented only for extensibility; not required for MVP implementation readiness.

### SMS Provider (Post-MVP)
- Documented only for extensibility; not required for MVP implementation readiness.

## 5. Failure Modes and Handling
| Integration | Failure Class | Handling | Persisted State | Observability |
| --- | --- | --- | --- | --- |
| Gmail API | transient timeout / 5xx | retry with backoff | `FAILED_RETRYABLE` job context | retry_count, ingest_lag |
| Calendar API | transient timeout / 429 / 5xx | retry with backoff | `FAILED_RETRYABLE` | sync_retry_count, sync_latency |
| Calendar API | terminal 4xx / consent revoked | stop retries + persist terminal metadata | `FAILED_TERMINAL` + `failure_reason` + `provider_status` + `last_attempt_at` | terminal_failure_count, failure_reason |
| Calendar API | successful upsert | complete sync | `SYNCED` | sync_success_total |

## 6. Observability Requirements
- Correlation ID propagated from ingest through calendar sync attempts
- Metrics: `calendar_sync_success_total`, `calendar_sync_failed_terminal_total`, `calendar_sync_retry_total`, `calendar_sync_latency_ms`
- Structured logs include `event_id`, `user_id_hash`, `attempt_no`, `provider_status`, `failure_reason`

## 7. MVP Execution Boundary
- Google integrations used for Gmail ingestion and Calendar sync are active in MVP.
- WhatsApp and SMS adapters are disabled in MVP.
- Post-MVP provider placeholders are not part of MVP runbooks.
- Post-MVP providers are excluded from MVP SLOs and operational support scope.

Trace: FR-09, FR-10, US-09

## 8. Traceability
| Product Source | Integration Behavior |
| --- | --- |
| FR-09 + US-09 | mandatory Google Calendar sync with reliability semantics from `reliability-policy.md` |
| FR-10 + US-07 | dedupe before sync enqueue, idempotent upsert semantics |
| US-05 | extraction confidence output feeds normalized event eligibility and logs |
| FR-07 / FR-08 | explicitly post-MVP integration placeholders only |

## 9. Open Questions
1. Should calendar reconcile runs be periodic in MVP or operator-triggered only?
2. What alert thresholds should page on-call for rising terminal sync failures?

## 10. Canonical Event API Persistence Alignment
- Source of truth is Supabase/Postgres canonical schema.
- Event list/detail contract is derived from `events` with reminder-plan projection derived from `reminders` relative to event base time (`event_date` fallback `start_at`).
- Reminder save writes to `reminders` only (no ad-hoc reminder tables).
- Notification history is derived from `reminders` joined with `delivery_attempts`.
- Runtime IDs in API flows are UUIDs from canonical tables.

