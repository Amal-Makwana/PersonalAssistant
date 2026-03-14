# Backend Technical Specification

## 1. Purpose
Canonical reliability policy and sync-state vocabulary are defined in `reliability-policy.md`. This file implements those contracts for its scope.

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

Trace: FR-09, FR-10, US-07, US-09

## 5. Reliability Model
- **Idempotency keys:**
  - ingest/event stage: `user_id + source_message_id`
  - calendar sync stage: `event_id + provider='google_calendar'`
- **Retry policy (calendar sync):** exponential backoff (5s, 10s, 30s, 60s, 120s), max 5 attempts.
- **Timeout policy:** 10s provider call timeout per attempt.
- **Canonical sync states:** `PENDING`, `IN_PROGRESS`, `SYNCED`, `FAILED_RETRYABLE`, `FAILED_TERMINAL`.
- **Terminal handling:** on transition to `FAILED_TERMINAL`, persist `failure_reason`, `provider_status`, and `last_attempt_at`; retain record for operator reconciliation.

Trace: FR-09, US-09

## 6. Error Taxonomy
- **Transient:** timeout, 429, recoverable 5xx, network interruption → `FAILED_RETRYABLE`.
- **Terminal:** invalid credentials, revoked consent, malformed payload, permanent 4xx → `FAILED_TERMINAL`.
- **Operational actionability:** every terminal transition must include `failure_reason`, `provider_status`, and `last_attempt_at`.

## 7. Idempotency and Conflict Resolution Outcomes (Normative)
| Scenario | Detection Rule | Persisted Status | API-visible Outcome | Operator Action |
| --- | --- | --- | --- | --- |
| Duplicate enqueue attempt | Existing queued/running `job_runs` row with same `(job_type, logical_key)` and active state | Keep existing `IN_PROGRESS` (or `PENDING` if not started), no new job row | `202 Accepted` with existing job reference and `deduplicated=true` | None |
| Repeated sync attempt for same normalized event | Existing `calendar_sync_records` for `event_id` with matching idempotency key and non-terminal in-flight state | Keep `IN_PROGRESS`; increment attempt metadata only if retry execution actually occurs | `202 Accepted` for replay-safe trigger, no duplicate provider create | Monitor if retries exceed threshold |
| Retry exhaustion | Retry count reaches configured max attempts | Set `FAILED_TERMINAL`; persist `failure_reason`, `provider_status`, `last_attempt_at` | Event detail/list shows terminal status and failure metadata | Execute remediation runbook (credential fix/requeue decision) |
| Already-synced event replay | `calendar_sync_records.sync_status = SYNCED` with stable provider mapping | Keep `SYNCED`; update `last_attempt_at` only if explicit re-verify call is made | `200 OK` or `202 Accepted` with `alreadySynced=true` | None |
| Conflicting persistence state | Invalid state transition detected (e.g., DB says `SYNCED` but worker context says terminal write) | Preserve last valid persisted state; append audit anomaly record; block destructive overwrite | `409 Conflict` for manual trigger paths; internal flow logs conflict event | Investigate inconsistency; reconcile via operator tool |

Trace: FR-09, FR-10, US-07, US-09

## 8. Observability and Validation Hooks
- **Extraction hooks (US-05):** confidence score histogram, low-confidence counter, parse-failure reasons.
- **Scheduling hooks:** number of reminders generated per event and generation latency.
- **Calendar hooks (US-09):** enqueue timestamp, provider call duration, sync-success latency, retry count, terminal-failure count.
- **Duplicate hooks (US-07):** duplicate suppression count and duplicate-source signatures.

Trace: FR-04, FR-10, US-05, US-07, US-09

## 9. Technical Constraints
- Modular monolith deployment in V1.
- Gmail/Calendar quotas and OAuth constraints apply.
- Messaging channel delivery is explicitly out of MVP runtime critical path.

## 10. Traceability
| Requirement / Story / AC | Backend Mechanism |
| --- | --- |
| FR-04, US-05 | extraction pipeline with confidence metrics and low-confidence logging |
| FR-10, US-07 | dedupe key, unique constraints, suppression-before-sync |
| FR-09, US-09 | post-persistence sync enqueue and reliability behavior per `reliability-policy.md` |

## 11. Open Questions (Non-blocking)
1. Should low-confidence extraction remain auto-persist with flag, or gate through review queue in a future increment?
2. What reconciliation UX is required for terminal calendar sync failures?

**Cross references:** `integration-spec.md`, `db-schema.md`, `diagrams/system-context.md`.
