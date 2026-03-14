# Security and Non-Functional Requirements

## 1. Purpose
Define security controls and non-functional quality targets required for production readiness of V1.

## 2. Security Objectives
- Protect user mailbox-linked data and tokens
- Prevent unauthorized account and reminder actions
- Provide forensic-grade auditability

## 3. Authentication Requirements
- OAuth 2.0 with state/nonce validation
- Session hardening: secure, httpOnly, sameSite cookies
- Token rotation and revocation support

## 4. Authorization Requirements
- Strict per-user data isolation
- Internal endpoint scopes for service accounts
- Deny-by-default authorization middleware
- Quarterly access review evidence required for production roles

## 5. Data Protection Requirements
- TLS 1.2+ in transit
- Encryption at rest for database and object storage
- Column-level encryption for delegated OAuth tokens
- Secrets stored in managed secret manager, never in repo

## 6. Privacy Considerations
- Data minimization for email payload retention
- User disclosure of permissions and usage purpose
- Support for delete/export workflows (scope to be finalized)

## 7. Secure Coding Expectations
- Input validation on all external interfaces
- Parameterized queries only
- Dependency vulnerability scanning in CI
- No sensitive data in logs/exceptions

Release gating vs monitoring:
- **Release-gating:** dependency scan gate blocks release on unresolved high/critical vulnerabilities.
- **Monitoring-only (MVP):** medium/low vulnerabilities tracked with remediation SLA.
- **Post-launch hardening:** expanded SAST/DAST policy tuning and threat-model refresh.

## 8. Audit and Logging Expectations
- Immutable audit records for auth, preference updates, extraction, scheduling, and calendar sync
- Structured logs with trace IDs
- Time synchronization (NTP) required across services
- Defined audit cadence: monthly control log review + quarterly policy conformance review

Trace: FR-04, FR-09, FR-10, US-05, US-07, US-09

## 9. Availability and Reliability SLOs
Availability SLO verification uses a monthly rolling window, excluding planned maintenance, measured from API ingress success ratio and sync pipeline completion ratio.

MVP SLO targets:
- API ingress success ratio: `>= 99.9%` per monthly rolling window
- Calendar sync pipeline completion ratio: `>= 99.5%` per monthly rolling window
- Calendar sync latency (normal load): 95% completed within 10 seconds from persistence

Control classification:
- **Release-gating:** SLO instrumentation and dashboards must exist before MVP release.
- **Monitoring-only:** ongoing SLO breach alerting and burn-rate alert tuning.

## 10. Performance Requirements
- P95 API read latency: <300ms (excluding third-party calls)
- P95 preference update latency: <500ms
- Calendar sync enqueue delay after persistence: <10s under normal load

## 11. Reliability Requirements
- At-least-once processing for jobs with idempotent handlers
- Canonical sync states required: `PENDING`, `IN_PROGRESS`, `SYNCED`, `FAILED_RETRYABLE`, `FAILED_TERMINAL`
- Any transition to `FAILED_TERMINAL` must persist `failure_reason`, `provider_status`, and `last_attempt_at`
- Dead-letter queues for terminal failures
- Replay tooling for failed integration operations

Trace: FR-09, FR-10, US-07, US-09

## 12. Scalability Expectations
- Horizontal worker scaling by queue depth
- Sustained handling growth target: 10x V1 baseline without redesign

## 13. Maintainability Requirements
- Layered architecture and clear module boundaries
- Backward-compatible API changes in minor releases
- Runbooks for incidents and common ops tasks

## 14. Observability Requirements
- Metrics: throughput, failure rates, queue lag, retry counts
- Distributed tracing across API, workers, and provider calls
- Alerting on SLO breaches and queue backlog thresholds

## 15. Backup / Recovery Expectations
- Daily full backups + point-in-time recovery for Postgres
- Recovery objective targets: RPO <= 15 min, RTO <= 2 hours
- Annual restore drill evidence required; runbook and drill artifacts stored in ops evidence repository

## 16. Compliance / Regulatory Considerations
- Align with applicable privacy regulations for target launch region(s)
- Provider policy compliance (Google API in MVP; WhatsApp/SMS policy for post-MVP readiness)
- Data retention and deletion policy approved by legal/security stakeholders

Security control verification includes quarterly access review, dependency scan gate on high/critical vulnerabilities, and annual restore drill evidence.

## 17. Open Questions / Gaps
1. Which specific regulatory frameworks apply at launch geography (GDPR/CCPA/others)?
2. Is customer-managed encryption key support required for enterprise roadmap?
3. What retention period should apply to audit and message metadata in each region?
