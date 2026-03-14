# Technical Overview

For critical documentation review, use `docs/05-prompts/critical-persona-review.md`.

## 1. Document Purpose
This document defines the implementation-ready technical baseline for Email-Driven Reminder Assistant V1, aligned to Product scope and canonical technical contracts.

## 2. Scope Alignment (Product -> Tech)
### MVP (Committed)
- Gmail ingestion and event candidate detection
- Event extraction and confidence policy
- Event persistence and duplicate prevention
- Default reminder schedule generation (4h / 1h / 15m)
- Google Calendar synchronization as a committed MVP integration

### Post-MVP (Not implementation-critical for V1)
- WhatsApp reminder delivery
- SMS reminder delivery

For full cross-phase mapping, see `docs/00-product/traceability-matrix.md`.

## 3. Canonical Contracts (Single Sources)
- MVP runtime lifecycle: `runtime-flow.md`
- Reliability semantics and sync states: `reliability-policy.md`
- API-visible contract: `api-spec.md`
- Persistence contract: `db-schema.md`
- Integration runtime details: `integration-spec.md`

## 4. Architectural Approach
- **Style:** Modular monolith with asynchronous workers and queue-based boundaries.
- **Pattern:** `routes -> controllers -> services -> repositories -> models`.
- **Consistency model:** transactional consistency for event/reminder writes; eventual consistency for Google Calendar API writes.

## 5. Observability Requirements
Mandatory instrumentation for V1:
- Extraction quality and confidence distribution
- Schedule generation outcomes and latency
- Calendar sync outcomes and latency
- Correlation IDs across API, worker, DB, and provider adapter

## 6. System Boundaries
Inside boundary: API service, worker service, scheduler role, Postgres, Redis.

Outside boundary: Google OAuth + Gmail API + Google Calendar API, plus post-MVP messaging providers.

## 7. Constraints
- Gmail-only source in V1.
- Fixed reminder policy (4h / 1h / 15m).
- Calendar sync included in MVP.
- WhatsApp/SMS delivery deferred to post-MVP runtime scope.

## 8. Cross References
- Product source of truth: `docs/00-product/*.md`
- Traceability source of truth: `docs/00-product/traceability-matrix.md`
- Design architecture: `docs/03-design/architecture.md`
- Design sequence viewpoints: `docs/03-design/sequence-flows.md`
