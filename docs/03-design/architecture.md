# Architecture Design (MVP)

For critical documentation review, use docs/05-prompts/critical-persona-review.md

## 1. Purpose and Scope
This document defines the implementation-guiding architecture for the MVP Email-Driven Reminder Assistant and explicitly aligns Design to Product, Tech Spec, and UI/UX decisions.

**Scope boundary (MVP runtime):** Gmail ingestion, event extraction, persistence, duplicate prevention, reminder scheduling, and Google Calendar synchronization.

**Out of scope for MVP runtime:** WhatsApp and SMS delivery channels. These remain post-MVP extension points only and are not part of active MVP architecture commitments.

## 2. System Context and Boundaries
### 2.1 Active MVP actors and dependencies
- **User mailbox source:** Gmail API for inbound event-bearing email signals.
- **Core platform services:** ingestion, extraction, event management, scheduling, calendar sync, observability, and operator tooling.
- **External continuity target:** Google Calendar API.

### 2.2 MVP system boundary statement
The MVP system boundary ends at a successfully persisted event plus synchronization outcome state to Google Calendar. Notification-channel execution outside Gmail and Calendar continuity is intentionally deferred.

Trace: FR-01, FR-02, FR-03, FR-09, FR-10; US-01, US-02, US-07, US-09.

## 3. Container and Component Architecture
### 3.1 Core components
- **Ingestion Adapter**
  - Reads Gmail messages (poll or push integration mode).
  - Normalizes message metadata/body into candidate-event envelopes.
  - Emits ingestion telemetry and correlation IDs.
- **Extraction Service**
  - Parses title/date/time/location/notes candidates.
  - Assigns confidence and parse quality metadata.
  - Emits extraction decisions for downstream routing and observability.
- **Event Service**
  - Applies duplicate prevention and idempotency checks.
  - Persists canonical event records and state transitions.
  - Owns durable linkage between source email and canonical event.
- **Scheduling Service**
  - Creates policy-default reminder schedule records (4h/1h/15m).
  - Stores schedule artifacts in a deterministic, idempotent manner.
- **Calendar Sync Service**
  - Enqueues and executes Google Calendar upsert operations.
  - Maintains sync attempt history, retry counters, and terminal failure state.
- **Observability + Operator Support Plane**
  - Consolidates logs, metrics, traces, and failure queues.
  - Supports operator remediation and replay workflows.

### 3.2 Ownership matrix
| Component | Owns | Does Not Own |
| --- | --- | --- |
| Ingestion Adapter | Gmail message retrieval and envelope normalization | Event business semantics |
| Extraction Service | Parsing, confidence classification, extraction metadata | Persistence and duplicate lock semantics |
| Event Service | Canonical event persistence, dedupe/idempotency boundaries | External provider side effects |
| Scheduling Service | Reminder schedule artifact generation and persistence | Message-channel delivery |
| Calendar Sync Service | Google Calendar write orchestration and outcome states | Source email parsing |
| Observability + Operator Support Plane | Monitoring, alerting, runbook-linked remediation | Business rule decisions |

Trace: FR-04, FR-05, FR-06, FR-09, FR-10; US-05, US-06, US-07, US-09.

## 4. Data and Event Flow Architecture
### 4.1 Canonical flow (MVP)
1. Gmail message arrives and is normalized by Ingestion Adapter.
2. Extraction Service emits structured event candidate with confidence metadata.
3. Event Service performs duplicate/idempotency guard checks.
4. Event Service persists canonical event and lifecycle state.
5. Scheduling Service generates default reminder schedule records.
6. Calendar Sync Service enqueues and executes Google Calendar upsert.
7. Sync outcomes are persisted and emitted to observability/alerts.

Trace: FR-01 through FR-06, FR-09, FR-10; US-01 through US-07, US-09.

### 4.2 Data boundaries and persistence expectations
- Canonical event records must be durable before external sync is attempted.
- Duplicate prevention keys are evaluated before schedule/sync fan-out.
- Sync-state persistence includes `attempt_count`, `last_error_code`, `last_error_at`, and terminal status marker.
- Correlation identifiers (`user_id`, `event_id`, `source_message_id`) must be propagated across all components.

Trace: FR-09, FR-10; US-07, US-09.

## 5. Reliability and Resilience Design
### 5.1 Retry and timeout behavior
- Calendar sync attempts are bounded (max-attempt policy) with exponential backoff.
- Each outbound sync call enforces timeout controls.
- Retryability is determined by categorized failure classes (transient vs terminal).

### 5.2 Terminal failure behavior
- When max attempts are exhausted or terminal failures are detected, event sync status is persisted as terminal failure.
- Persisted failure metadata is retained for operator triage and replay.
- Terminal failures emit alert hooks for remediation.

### 5.3 Idempotency and duplicate prevention boundaries
- Idempotency applies at event persistence and calendar upsert boundaries.
- Duplicate suppression occurs before schedule and sync work is produced.
- Reprocessing uses deterministic keys to avoid duplicate calendar artifacts.

Trace: FR-09, FR-10; US-07, US-09.

## 6. Observability and Operational Architecture
### 6.1 Required signals
- **Metrics:** ingestion volume, extraction success/failure, dedupe hit-rate, sync success-rate, retry counts, terminal failure count, end-to-end latency.
- **Logs:** structured logs with correlation IDs and reason codes.
- **Traces:** end-to-end trace from ingestion to calendar sync outcome.

### 6.2 Alerting and operator workflows
- Alert triggers on terminal sync failure threshold and sustained retry spikes.
- Operator remediation includes inspect-failure-context, replay-safe retry, and close-loop status update.
- Runbook guidance references reason-code classes and recommended actions.

Trace: FR-11, FR-09, FR-10; US-11, US-09, US-07.

## 7. Failure Modes and Remediation Paths
| Failure mode | Detection signal | Containment behavior | Remediation path |
| --- | --- | --- | --- |
| Gmail fetch/transient API error | Ingestion error metric spike, provider error logs | Retry ingestion without creating event artifacts | Automatic backoff and provider health check |
| Low-confidence extraction | Confidence threshold metric + tagged extraction log | Persist candidate with review-required/low-confidence tag | Operator/user correction flow in later UX iteration |
| Duplicate event candidate | Dedupe hit metric + idempotency log event | Drop duplicate fan-out (no extra schedule/sync) | No-op with audit trail |
| Calendar API timeout/transient failure | Sync retry counter + latency timeout alert | Retry with bounded exponential backoff | Auto-retry then escalate if threshold exceeded |
| Calendar sync terminal failure | Terminal failure metric + alert webhook | Mark event sync terminal_failed; halt further retries | Operator triage and replay after issue resolution |

Trace: FR-04, FR-09, FR-10, FR-11; US-05, US-07, US-09, US-11.

## 8. Deployment and Environment Notes
- Separate runtime environments (dev/staging/prod) with isolated credentials and observability scopes.
- Secrets for Gmail and Google Calendar integrations are environment-scoped and rotated per security policy.
- Queue/retry configuration values are environment-configurable but policy-governed.
- Production runbooks must include sync retry and terminal-failure remediation procedures.

Trace: NFR reliability/security constraints in Tech Spec (`security-nfr.md`, `integration-spec.md`).

## 9. Extensibility and Post-MVP Channels
- Messaging channels (WhatsApp/SMS) are represented only as future extension interfaces.
- No MVP component requires active WhatsApp/SMS runtime dependency.
- Future channel adapters must reuse Event Service idempotency and observability contracts.

Trace: FR-07, FR-08 (post-MVP); scope-v1 boundary.

## 10. Assumptions, Constraints, and Trade-offs
### Assumptions
- Gmail remains the only ingestion source in MVP.
- Google Calendar is the only external continuity target in MVP.
- Operators have access to observability tooling and remediation runbooks.

### Constraints
- Markdown documentation remains source of truth; HTML summary is a consolidated secondary artifact.
- MVP reliability depth is prioritized over multi-channel breadth.

### Trade-offs
- Deferring WhatsApp/SMS in MVP reduces integration complexity and supports stronger reliability on calendar continuity.
- Bounded retry strategy favors predictable operations over unbounded eventual success attempts.

## 11. Design Traceability Matrix (Product → Tech Spec → UI/UX → Design)
| Design concern | Product refs | Tech Spec refs | UI/UX refs | Design realization |
| --- | --- | --- | --- | --- |
| Calendar sync architecture | FR-09, US-09 | `integration-spec.md`, `backend-spec.md` | `user-flows.md` (email-to-reminder continuity) | Dedicated Calendar Sync Service with retries, timeout, and persisted outcome states |
| Duplicate prevention and idempotency | FR-10, US-07 | `backend-spec.md`, `db-schema.md` | `user-flows.md` (avoid duplicate reminders) | Event Service dedupe guard before schedule/sync fan-out |
| Retry and terminal failure handling | FR-09, FR-11, US-09, US-11 | `integration-spec.md`, `security-nfr.md` | `ui-overview.md` (trust/reliability expectations) | Bounded retries, terminal failure status, alert hooks, operator remediation |
| MVP boundary enforcement | Scope V1, FR-07/FR-08 | `tech-overview.md` | `ui-overview.md` | WhatsApp/SMS labeled post-MVP extension only |

## 12. Open Questions
1. Should low-confidence extraction immediately create an operator task in MVP, or remain metric-first with deferred tooling depth?
2. What retry-attempt threshold best balances API quota usage and user trust expectations across environments?
3. Which terminal failure reasons should auto-trigger high-priority paging versus dashboard-only alerts?
