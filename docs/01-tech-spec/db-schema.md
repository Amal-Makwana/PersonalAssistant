# Database Schema Specification

## 1. Purpose
Define V1 relational data model, entity constraints, and migration/integrity strategy for reminder automation workloads.

## 2. Database Choice and Rationale
PostgreSQL selected for transactional guarantees, mature indexing, JSON support for provider payloads, and operational familiarity.

## 3. Data Model Overview
Primary domains:
- identity/auth
- mailbox ingestion and extracted events
- reminder scheduling and dispatch attempts
- preferences and integration settings
- audit/observability lineage

## 4. Core Entities
`users`, `auth_accounts`, `oauth_tokens`, `user_preferences`, `source_messages`, `events`, `event_dedupe_keys`, `reminders`, `delivery_attempts`, `calendar_sync_records`, `audit_logs`, `job_runs`.

## 5. Entity Definitions

### users
- **purpose:** canonical user identity
- **fields:** `id UUID`, `email CITEXT`, `name TEXT`, `created_at TIMESTAMPTZ`, `updated_at TIMESTAMPTZ`, `deleted_at TIMESTAMPTZ NULL`
- **required/optional:** `deleted_at` optional
- **keys:** PK `id`, unique `email`
- **relationships:** 1:N to `auth_accounts`, `events`, `reminders`, `user_preferences`
- **constraints:** email lowercase normalized
- **lifecycle notes:** soft delete supported

### auth_accounts
- **purpose:** external identity linkage (Google)
- **fields:** `id UUID`, `user_id UUID`, `provider TEXT`, `provider_subject TEXT`, `created_at`, `updated_at`
- **required/optional:** all required
- **keys:** PK `id`, unique `(provider, provider_subject)`
- **relationships:** N:1 `users`
- **constraints:** provider enum currently only `google`
- **lifecycle notes:** retained for audit even if disconnected

### oauth_tokens
- **purpose:** encrypted delegated token storage
- **fields:** `id UUID`, `user_id UUID`, `provider TEXT`, `scope TEXT[]`, `access_token_ciphertext BYTEA`, `refresh_token_ciphertext BYTEA`, `expires_at TIMESTAMPTZ`, `created_at`, `updated_at`
- **required/optional:** refresh token may be null depending provider behavior
- **keys:** PK `id`, unique `(user_id, provider)`
- **relationships:** N:1 `users`
- **constraints:** encryption required at rest
- **lifecycle notes:** rotate on refresh

### user_preferences
- **purpose:** channel and sync configuration
- **fields:** `user_id UUID`, `whatsapp_enabled BOOLEAN`, `sms_enabled BOOLEAN`, `calendar_sync_enabled BOOLEAN`, `timezone TEXT`, `updated_at`
- **required/optional:** all required except timezone default `UTC`
- **keys:** PK/FK `user_id`
- **relationships:** 1:1 `users`
- **constraints:** `calendar_sync_enabled` defaults true for MVP continuity; future channel flags default false
- **lifecycle notes:** updates audited

### source_messages
- **purpose:** imported email metadata and parse status
- **fields:** `id UUID`, `user_id UUID`, `provider_message_id TEXT`, `thread_id TEXT`, `subject TEXT`, `sender TEXT`, `received_at TIMESTAMPTZ`, `classification_status TEXT`, `parse_confidence NUMERIC(5,4)`, `raw_payload JSONB`, `created_at`
- **required/optional:** `raw_payload` optional depending retention policy
- **keys:** PK `id`, unique `(user_id, provider_message_id)`
- **relationships:** N:1 `users`, 1:N `events`
- **constraints:** confidence between 0 and 1
- **lifecycle notes:** payload redaction policy applies

### events
- **purpose:** normalized event records
- **fields:** `id UUID`, `user_id UUID`, `source_message_id UUID`, `title TEXT`, `start_at TIMESTAMPTZ`, `end_at TIMESTAMPTZ NULL`, `location TEXT NULL`, `timezone TEXT`, `status TEXT`, `created_at`, `updated_at`, `deleted_at TIMESTAMPTZ NULL`
- **required/optional:** `end_at`, `location`, `deleted_at` optional
- **keys:** PK `id`
- **relationships:** N:1 `users`, N:1 `source_messages`, 1:N `reminders`
- **constraints:** `start_at < end_at` when `end_at` present
- **lifecycle notes:** dedupe may map multiple messages to same logical event

### event_dedupe_keys
- **purpose:** enforce duplicate prevention
- **fields:** `id UUID`, `user_id UUID`, `fingerprint TEXT`, `event_id UUID`, `created_at`
- **required/optional:** all required
- **keys:** unique `(user_id, fingerprint)`
- **relationships:** N:1 `events`
- **constraints:** fingerprint derived from normalized title+datetime+source features
- **lifecycle notes:** persists across event updates to block duplicate re-creation

### reminders
- **purpose:** scheduled reminder instances
- **fields:** `id UUID`, `user_id UUID`, `event_id UUID`, `channel TEXT`, `scheduled_for TIMESTAMPTZ`, `status TEXT`, `attempt_count INT`, `last_attempt_at TIMESTAMPTZ NULL`, `created_at`, `updated_at`
- **required/optional:** `last_attempt_at` optional
- **keys:** PK `id`, unique `(event_id, channel, scheduled_for)`
- **relationships:** N:1 `events`, 1:N `delivery_attempts`
- **constraints:** channel enum supports MVP `calendar` and reserves `whatsapp|sms` for post-MVP expansion
- **lifecycle notes:** immutable schedule window in V1

### delivery_attempts
- **purpose:** outbound provider attempt history
- **fields:** `id UUID`, `reminder_id UUID`, `provider TEXT`, `provider_message_id TEXT NULL`, `attempt_no INT`, `status TEXT`, `error_code TEXT NULL`, `error_message TEXT NULL`, `requested_at TIMESTAMPTZ`, `completed_at TIMESTAMPTZ NULL`, `provider_response JSONB NULL`
- **required/optional:** provider ids and errors optional
- **keys:** PK `id`, unique `(reminder_id, attempt_no)`
- **relationships:** N:1 `reminders`
- **constraints:** status enum uses canonical sync states where applicable: `PENDING`, `IN_PROGRESS`, `SYNCED`, `FAILED_RETRYABLE`, `FAILED_TERMINAL`
- **lifecycle notes:** drives support diagnostics

### calendar_sync_records
- **purpose:** Google Calendar linkage (MVP-critical)
- **fields:** `id UUID`, `event_id UUID`, `provider_event_id TEXT`, `sync_status TEXT`, `last_synced_at TIMESTAMPTZ NULL`, `failure_reason TEXT NULL`, `provider_status TEXT NULL`, `last_attempt_at TIMESTAMPTZ NULL`, `created_at`, `updated_at`
- **required/optional:** sync metadata optional when pending
- **keys:** PK `id`, unique `(event_id)`
- **relationships:** 1:1 `events`
- **constraints:** one record per event; `sync_status` must use canonical states `PENDING`, `IN_PROGRESS`, `SYNCED`, `FAILED_RETRYABLE`, `FAILED_TERMINAL`
- **lifecycle notes:** updated asynchronously

### audit_logs
- **purpose:** immutable audit trail
- **fields:** `id UUID`, `actor_type TEXT`, `actor_id UUID NULL`, `action TEXT`, `entity_type TEXT`, `entity_id UUID`, `trace_id TEXT`, `metadata JSONB`, `created_at`
- **required/optional:** `actor_id` optional for system actions
- **keys:** PK `id`
- **relationships:** polymorphic
- **constraints:** append-only
- **lifecycle notes:** long retention

### job_runs
- **purpose:** background execution lineage
- **fields:** `id UUID`, `job_type TEXT`, `logical_key TEXT`, `status TEXT`, `started_at TIMESTAMPTZ`, `finished_at TIMESTAMPTZ NULL`, `attempt_no INT`, `trace_id TEXT`, `error_message TEXT NULL`
- **required/optional:** finish/error optional while running
- **keys:** PK `id`, index on `(job_type, logical_key)`
- **relationships:** diagnostic only
- **constraints:** status enum
- **lifecycle notes:** supports replay and dead-letter analysis

## 6. Indexing Considerations
- High-cardinality indexes: `source_messages(user_id, received_at DESC)`, `events(user_id, start_at DESC)`, `reminders(status, scheduled_for)`
- Partial indexes for active records (`deleted_at IS NULL`)
- GIN index on selected JSONB fields used in provider reconciliation

## 7. Migration Approach
- Forward-only, versioned SQL migrations
- Backfill migrations split into online batches
- Rollback strategy: compensating migration + restore from snapshot when needed

## 8. Data Integrity Rules
- FK constraints enforce ownership lineage
- Unique constraints prevent duplicate event/reminder creation
- Check constraints for timestamps/enums/confidence range


## 8.1 MVP Channel Enforcement Guardrail
Although `whatsapp` and `sms` enum values may be pre-modeled for future migrations, MVP services must reject creation or scheduling of reminders for non-MVP channels at validation boundaries.

Enforcement requirement:
- Schema-level enum presence does not imply runtime enablement.
- Application service validation (API boundary + worker scheduling boundary) must reject non-MVP channel writes in MVP environments.
- Any rejected non-MVP channel request must return a validation/policy conflict response and emit an audit event.

Trace: FR-09, FR-10, US-07

## 9. Audit Fields
Standard fields: `created_at`, `updated_at`, optional `deleted_at`, plus actor/audit in `audit_logs` for state changes.

## 10. Soft Delete / Retention Strategy
- Soft delete for user-visible entities (`users`, `events`)
- Hard delete for transient artifacts based on retention windows (`job_runs` after policy period)
- Retention policy must align with legal/privacy requirements in `security-nfr.md`

## 11. Data Security Considerations
- Encrypt sensitive columns (`oauth_tokens`)
- PII minimization in logs and raw payload storage
- Principle of least privilege DB roles for app vs analytics access

## 12. Data Access Patterns
- User dashboard: read latest events/reminders by user + date
- Worker dispatch: scan due reminders by status/time window
- Support diagnostics: delivery attempts by reminder/event

## 13. Future Schema Considerations
- Add `event_confidence` review workflow tables if manual confirmation introduced
- Partition `delivery_attempts` for high volume scale
- Multi-provider mailbox abstraction for non-Gmail roadmap

## 14. Open Questions / Gaps
1. What exact retention period applies to `source_messages.raw_payload`?
2. Should reminder schedule templates become first-class schema in V1.1?
3. Do we need regional data residency partitioning in early phases?

See corresponding data relationship view in `diagrams/data-model-diagram.md`.
