# Architecture Design (MVP)

For critical documentation review, use docs/05-prompts/critical-persona-review.md

## 1. Scope Alignment
### MVP architecture responsibilities
- Gmail ingestion boundary
- Event extraction and normalization boundary
- Persistence and duplicate prevention boundary
- Reminder schedule generation boundary
- Google Calendar sync boundary

### Post-MVP extensibility (not MVP-critical)
- WhatsApp reminder delivery channel
- SMS reminder delivery channel

## 2. Component Boundaries
- **Ingestion Adapter:** reads Gmail API messages and emits candidate events.
- **Extraction Service:** parses title/date/time (+ optional location), computes confidence score.
- **Event Service:** performs dedupe check and persistence transaction.
- **Scheduling Service:** creates default reminder schedule records (4h/1h/15m).
- **Calendar Sync Service:** upserts persisted events to Google Calendar and tracks status.
- **Observability Layer:** metrics/logs/traces across all phases.

## 3. Ownership and Responsibilities
| Component | Owns | Does Not Own |
| --- | --- | --- |
| Ingestion Adapter | Gmail polling/webhook processing | Event business rules |
| Extraction Service | Parse + confidence decisions | Provider write side effects |
| Event Service | Persistence, dedupe, idempotency guards | External provider calls |
| Scheduling Service | Reminder schedule generation | Channel delivery execution |
| Calendar Sync Service | Google Calendar retries/timeouts/status | Event parsing logic |

## 4. Reliability Model
- Calendar sync is queued after persistence only.
- Sync attempts are idempotent by `event_id` + `user_id`.
- Retries are bounded with exponential backoff.
- Final failed attempts move to terminal status with reason code.

## 5. Traceability
| Product Reference | Design Realization |
| --- | --- |
| FR-09 / US-09 | Calendar Sync Service in MVP critical path with latency + retry handling |
| FR-10 / US-07 | Dedupe boundary before any sync enqueue |
| FR-04 / US-05 | Extraction confidence scoring with low-confidence observability |
| FR-07 / FR-08 | Explicitly outside MVP runtime, documented as extensibility only |
