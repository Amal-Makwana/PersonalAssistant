# Technical Overview

For critical documentation review, use docs/05-prompts/critical-persona-review.md

## 1. Document Purpose
This document defines the target technical architecture and engineering constraints for the Email-Driven Reminder Assistant V1. It translates product requirements into implementation-ready guidance for backend, frontend, data, integrations, security, and operations.

## 2. Audience
- Engineering leadership (architecture decisions, risk acceptance)
- Backend/frontend engineers (implementation reference)
- QA/SRE (test and operational expectations)
- Security/compliance stakeholders (control requirements)

## 3. Technical Scope
In scope for V1:
- Google OAuth sign-in and delegated Gmail access
- Email ingestion, event extraction, duplicate prevention
- Reminder scheduling and multi-channel dispatch (WhatsApp default, optional SMS)
- Optional Google Calendar sync
- Preference management, observability, and operational controls

Out of scope:
- Non-Gmail ingestion providers
- Complex recurring rules engine
- Multi-tenant admin portal

## 4. Product Context
Product goals and FR mapping are defined in `docs/00-product/requirements.md` and `docs/00-product/scope-v1.md`. The technical architecture prioritizes dependable workflow completion for the core chain:
`email received -> event extracted -> event persisted -> reminders scheduled -> reminders dispatched`.

## 5. Architectural Approach
- **Style:** Modular monolith for V1 with asynchronous job processing boundaries that can be extracted into services later.
- **Pattern:** Layered backend (`routes -> controllers -> services -> repositories -> models`) with explicit domain services for extraction, dedupe, scheduling, and dispatch.
- **Consistency model:** Transactional consistency for write operations; eventual consistency for integrations (calendar, messaging provider callbacks).
- **Resilience:** Queue-backed jobs, bounded retries, idempotency keys, dead-letter handling.

## 6. Technology Stack
### frontend stack
- Next.js (App Router) + TypeScript
- TanStack Query for server-state caching
- React Hook Form + Zod for form/schema validation

### backend stack
- Node.js (LTS) + TypeScript + Express/Fastify-compatible HTTP layer
- Background jobs via BullMQ (Redis)
- Internal service contracts typed with shared DTO schemas

### database
- PostgreSQL 15+ as system of record
- Prisma or Knex for migrations and repository implementation

### auth
- Google OAuth 2.0 / OpenID Connect
- Session tokens (httpOnly cookie/JWT), short-lived access + rotating refresh
- Optional KMS-backed token encryption at rest

### hosting/deployment
- Containers on managed Kubernetes or managed container platform
- Managed Postgres + Redis
- CDN + WAF for frontend edge delivery

### background processing
- Queue workers for: ingestion parsing, scheduling, reminder dispatch, calendar sync
- Cron/scheduler service for due-reminder scan fallback

### observability
- OpenTelemetry traces
- Structured JSON logs + correlation IDs
- Metrics (Prometheus-compatible): queue lag, extraction success, delivery success, retry counts

## 7. System Boundaries
Inside system boundary:
- Web app (user configuration, status visibility)
- API service
- Worker service
- Postgres, Redis

Outside system boundary:
- Google OAuth/Gmail/Calendar APIs
- WhatsApp provider API
- SMS provider API

## 8. Key Technical Principles
1. Markdown documentation is source of truth; summary HTML is presentation layer.
2. Idempotent processing by default for all external side effects.
3. Least privilege and data minimization for mailbox data.
4. Observable-by-default flows with trace IDs and reason-coded failures.
5. Backward-compatible API evolution for V1.x.

## 9. Environments
- **Local:** Docker Compose (API, worker, Postgres, Redis); mocked provider adapters allowed.
- **Dev:** Shared cloud environment, relaxed quotas, synthetic datasets.
- **Staging:** Production-like infrastructure and secrets setup for release validation.
- **Production:** HA deployment, auto-scaling workers, managed backups, alerting.

## 10. Assumptions
- Gmail message bodies contain parsable event patterns at acceptable rates.
- Third-party messaging providers support delivery status callbacks.
- Initial load profile remains within modular-monolith scale envelope.

## 11. Constraints
- V1 reminder windows fixed at 4h, 1h, 15m.
- Gmail-only source integration.
- Optional channel toggles are preference-level, not per-event rule engine.

## 12. Dependencies
- Product baseline: `docs/00-product/*.md`
- API contract: `api-spec.md`
- Data contract: `db-schema.md`
- Integration contracts: `integration-spec.md`
- NFR/security controls: `security-nfr.md`
- Architecture diagrams: `diagrams/*.md`

## 13. Risks and Technical Considerations
- Ambiguous email content can create extraction uncertainty; confidence thresholds and review policy required.
- Provider outages/quota throttling can delay reminder dispatch; fallback and backlog processing needed.
- Clock skew/timezone mismatch may trigger late reminders; strict UTC normalization and locale-safe rendering required.

## 14. Cross References
- Product requirements: `docs/00-product/requirements.md`
- Frontend implementation details: `frontend-spec.md`
- Backend implementation details: `backend-spec.md`
- API contract: `api-spec.md`
- Data schema: `db-schema.md`
- Security + NFR: `security-nfr.md`
- Integrations: `integration-spec.md`
- Diagram index: `diagrams/diagram-index.md`
