# Reliability Policy Contract (Canonical)

For critical documentation review, use `docs/05-prompts/critical-persona-review.md`.

## 1. Purpose
This document is the canonical reliability policy for MVP runtime processing and Google Calendar synchronization.

All retry, failure-classification, state-transition, and operator-remediation semantics must be defined here and referenced by other docs.

## 2. Canonical Sync State Set
- `PENDING`
- `IN_PROGRESS`
- `SYNCED`
- `FAILED_RETRYABLE`
- `FAILED_TERMINAL`

## 3. Retry Behavior
- Retry target: Google Calendar upsert calls.
- Retry budget: 5 attempts.
- Backoff sequence: 5s, 10s, 30s, 60s, 120s.
- Per-attempt timeout: 10 seconds.
- Retries are attempted only for failures classified as transient.

## 4. Failure Classification
### 4.1 Retryable (Transient)
- network timeout
- provider 5xx
- temporary quota/backpressure responses

Transition rule: mark `FAILED_RETRYABLE`, persist attempt metadata, and schedule next retry if budget remains.

### 4.2 Terminal (Non-Retryable)
- invalid/expired authorization that cannot be auto-refreshed
- invalid payload semantics rejected by provider contract
- exhausted retry budget

Transition rule: mark `FAILED_TERMINAL`, persist failure metadata, stop automatic retries, and emit operator alert.

## 5. Required Persisted Reliability Fields
Persist reliability metadata to support diagnostics and replay:
- `attempt_count`
- `last_error_code`
- `last_error_at`
- `last_attempt_at`
- `failure_reason`
- `provider_status`
- terminal state marker (`FAILED_TERMINAL`)

## 6. Terminal Failure and Operator Remediation
When terminal failure is reached:
1. Persist terminal state and failure metadata.
2. Emit alert signal for operator workflow.
3. Support remediation actions: inspect context, replay-safe retry, and close-loop update.

## 7. Idempotency and Duplicate-Prevention Interaction
- Dedupe/idempotency checks occur before schedule/sync fan-out.
- Replays must use deterministic keys to avoid duplicate calendar artifacts.
- Already-synced replays should remain `SYNCED` with replay-safe metadata.

## 8. Contract Consumption Rules
- `api-spec.md` references this contract for state vocabulary and status exposure.
- `backend-spec.md` references this contract for worker behavior.
- `integration-spec.md` references this contract for provider interactions.
- `docs/02-design/*` references this contract for reliability viewpoints.
