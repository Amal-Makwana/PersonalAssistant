# Integration Specification

## 1. Purpose
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
- **Terminal status rule:** if max retries exceeded or non-retryable 4xx occurs, set `FAILED_TERMINAL` and record `failure_reason`
- **Latency expectation:** target calendar visibility within 10 seconds from event persistence under normal conditions (US-09)

### WhatsApp Provider (Post-MVP)
- Documented only for extensibility; not required for MVP implementation readiness.

### SMS Provider (Post-MVP)
- Documented only for extensibility; not required for MVP implementation readiness.

## 5. Failure Modes and Handling
| Integration | Failure Class | Handling | Observability |
| --- | --- | --- | --- |
| Gmail API | transient timeout / 5xx | retry with backoff | retry_count, ingest_lag |
| Calendar API | transient timeout / 429 / 5xx | retry with backoff | sync_retry_count, sync_latency |
| Calendar API | terminal 4xx / consent revoked | mark `FAILED_TERMINAL` | terminal_failure_count, failure_reason |

## 6. Observability Requirements
- Correlation ID propagated from ingest through calendar sync attempts
- Metrics: `calendar_sync_success_total`, `calendar_sync_failed_terminal_total`, `calendar_sync_retry_total`, `calendar_sync_latency_ms`
- Structured logs include `event_id`, `user_id_hash`, `attempt_no`, `provider_status`, `failure_reason`

## 7. Traceability
| Product Source | Integration Behavior |
| --- | --- |
| FR-09 + US-09 | mandatory Google Calendar sync with 10s target, retries, terminal failure state |
| FR-10 + US-07 | dedupe before sync enqueue, idempotent upsert semantics |
| US-05 | extraction confidence output feeds normalized event eligibility and logs |
| FR-07 / FR-08 | explicitly post-MVP integration placeholders only |

## 8. Open Questions
1. Should calendar reconcile runs be periodic in MVP or operator-triggered only?
2. What alert thresholds should page on-call for rising terminal sync failures?
