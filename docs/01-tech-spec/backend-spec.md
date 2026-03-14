# Backend Technical Specification

## 1. Purpose
Define backend responsibilities and runtime behavior for the MVP workflow: Gmail ingestion through event persistence, scheduling, and Google Calendar sync.

## 2. Scope
### MVP
- Auth/session orchestration for Google OAuth
- Gmail ingestion and event extraction pipeline
- Event persistence + duplicate prevention
- Reminder schedule generation (4h / 1h / 15m)
- Google Calendar sync after persistence
- Observability, retry controls, and failure-state handling

### Post-MVP
- WhatsApp dispatch (FR-07)
- SMS dispatch (FR-08)

## 3. Service Responsibilities
- **API service:** endpoint handling, validation, orchestration entrypoints
- **Worker service:** async jobs for ingest, normalize, schedule, calendar sync
- **Scheduler service:** periodic due-job scans and repair operations

## 4. Workflow Ownership and Trigger Points
1. `gmail.ingest` identifies candidate event emails.
2. `event.normalize` extracts title/date/time and computes dedupe key.
3. Persist event + dedupe record transactionally.
4. `reminder.schedule` generates 4h/1h/15m reminder records.
5. `calendar.sync` is enqueued only after successful persistence and dedupe pass.

This ordering enforces FR-10/US-07 duplicate prevention before FR-09 side effects.

## 5. Reliability Model
- **Idempotency keys:**
  - ingest/event stage: `user_id + source_message_id`
  - calendar sync stage: `event_id + provider='google_calendar'`
- **Retry policy (calendar sync):** exponential backoff (5s, 10s, 30s, 60s, 120s), max 5 attempts.
- **Timeout policy:** 10s provider call timeout per attempt.
- **Terminal handling:** on final retry failure, record `FAILED_TERMINAL` with reason code and retain for operator reconciliation.

## 6. Error Taxonomy
- **Transient:** timeout, 429, recoverable 5xx, network interruption → retry.
- **Terminal:** invalid credentials, revoked consent, malformed payload, permanent 4xx → no retry.
- **Operational actionability:** every terminal status must include `error_code`, `provider_status`, and `last_attempt_at`.

## 7. Observability and Validation Hooks
- **Extraction hooks (US-05):** confidence score histogram, low-confidence counter, parse-failure reasons.
- **Scheduling hooks:** number of reminders generated per event and generation latency.
- **Calendar hooks (US-09):** enqueue timestamp, provider call duration, sync-success latency, retry count, terminal-failure count.
- **Duplicate hooks (US-07):** duplicate suppression count and duplicate-source signatures.

## 8. Technical Constraints
- Modular monolith deployment in V1.
- Gmail/Calendar quotas and OAuth constraints apply.
- Messaging channel delivery is explicitly out of MVP runtime critical path.

## 9. Traceability
| Requirement / Story / AC | Backend Mechanism |
| --- | --- |
| FR-04, US-05 | extraction pipeline with confidence metrics and low-confidence logging |
| FR-10, US-07 | dedupe key, unique constraints, suppression-before-sync |
| FR-09, US-09 | post-persistence sync enqueue, 10s latency target, bounded retry, terminal status |

## 10. Open Questions (Non-blocking)
1. Should low-confidence extraction remain auto-persist with flag, or gate through review queue in a future increment?
2. What reconciliation UX is required for terminal calendar sync failures?

**Cross references:** `integration-spec.md`, `db-schema.md`, `diagrams/system-context.md`.
