# Backend Technical Specification

## 1. Purpose
Define backend implementation model, responsibilities, and runtime behaviors for the V1 reminder automation platform.

## 2. Backend Scope
- Auth/session orchestration
- Gmail ingest orchestration and parsing pipeline
- Event persistence and deduplication
- Reminder scheduling/dispatch
- Provider callback processing and audit trail

## 3. Service Responsibilities
- **API service:** request handling, validation, business orchestration entrypoints
- **Worker service:** asynchronous jobs (ingestion, scheduling, dispatch, sync)
- **Scheduler service (can be worker role):** periodic due-reminder scanning and repair jobs

## 4. Layered Architecture
### routes
Declare versioned endpoints, apply auth middleware, enforce rate limits.

### controllers
Translate HTTP payloads to service calls; no business logic.

### services
Contain domain workflows (event extraction, dedupe policy, schedule generation, dispatch orchestration).

### repositories
Database interaction only; no domain branching logic.

### models
Persistence entities and mappers between DB and domain DTOs.

## 5. Request Lifecycle
1. Request arrives with trace/correlation ID.
2. Auth/session verification.
3. Input validation and normalization.
4. Controller delegates to service.
5. Service executes transactional work and queues async side effects.
6. Response returned with stable envelope and error taxonomy.

## 6. Validation Strategy
- Schema validation at API boundary (Zod/Joi)
- Domain invariant checks in service layer
- Database constraints as final guardrail

## 7. Business Logic Placement
- Duplicate detection, extraction confidence decisions, reminder policy generation in services
- Keep controllers and repositories free of business decisions

## 8. Persistence Strategy
- PostgreSQL for canonical domain state
- Redis for queues, distributed locks, idempotency short-lived state
- Append-only audit tables for key lifecycle actions

## 9. Transaction Handling
- Use DB transactions for coupled writes: event + reminders + audit record
- Outbox pattern recommended for reliable external side effects
- Retry-safe operations by idempotency keys (`source_message_id`, `dispatch_attempt_key`)

## 10. Error Handling and Exception Strategy
- Domain-specific error classes with stable codes
- Public API maps internal failures to sanitized responses
- Retries only for classified transient errors; terminal errors dead-lettered

## 11. Authentication
- Google OAuth token exchange server-side
- Session creation with secure cookie; token refresh rotation
- Encrypted token storage for Gmail/Calendar delegated access

## 12. Authorization
- User can access only own resources (`user_id` row-level filtering)
- Feature flags/capabilities for optional channels
- Sensitive operations logged with actor and reason

## 13. Background Jobs / Scheduled Processing
- `gmail.ingest`: parse and classify candidate emails
- `event.normalize`: extraction + dedupe + persist
- `reminder.schedule`: compute reminder instances
- `reminder.dispatch`: call channel providers and capture outcomes
- `calendar.sync`: optional calendar upsert
- `maintenance.repair`: retry stuck jobs / consistency checks

## 14. Logging and Monitoring
- Structured logs: timestamp, level, service, trace_id, user_id_hash, event_id
- Metrics: ingest throughput, extraction confidence distribution, queue lag, dispatch success ratio
- Traces across API->worker->provider callbacks

## 15. Configuration and Environment Variables
- Required: DB URL, Redis URL, OAuth client credentials, provider API keys, encryption key references
- Optional: feature flags, queue concurrency controls, rate limits
- Centralized config module with startup validation

## 16. Performance and Scalability Considerations
- Horizontal scaling for workers by queue depth
- Connection pooling for Postgres
- Batch processing for ingestion where API limits allow
- SLO candidates: P95 event persistence under 60s from message detection

## 17. Testing Strategy
- Unit tests for domain services and policy generation
- Contract tests for provider adapters
- Integration tests for route->DB behaviors
- Job pipeline tests with ephemeral Redis/Postgres

## 18. Technical Constraints
- Modular monolith initial deployment to reduce operational overhead
- Gmail API quota and provider throughput limits
- Fixed reminder policies in V1

## 19. Open Questions / Gaps
1. Will low-confidence extraction require human review queue or best-effort auto-create?
2. Should outbox be mandatory in V1 or staged into V1.1?
3. What callback authenticity mechanism is available from each messaging provider?

**Cross references:** `api-spec.md`, `db-schema.md`, `integration-spec.md`, `security-nfr.md`, and diagrams in `diagrams/`.
