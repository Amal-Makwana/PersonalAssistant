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

## 8. Audit and Logging Expectations
- Immutable audit records for auth, preference updates, channel dispatch
- Structured logs with trace IDs
- Time synchronization (NTP) required across services

## 9. Availability Requirements
- Target service availability: 99.9% monthly for core API and dispatch pipeline
- No single point of failure for production data stores

## 10. Performance Requirements
- P95 API read latency: <300ms (excluding third-party calls)
- P95 preference update latency: <500ms
- Reminder dispatch enqueue delay: <60s under normal load

## 11. Reliability Requirements
- At-least-once processing for jobs with idempotent handlers
- Dead-letter queues for terminal failures
- Replay tooling for failed integration operations

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
- Quarterly restore drills in non-production environment

## 16. Compliance / Regulatory Considerations
- Align with applicable privacy regulations for target launch region(s)
- Provider policy compliance (Google API, WhatsApp/SMS usage)
- Data retention and deletion policy approved by legal/security stakeholders

## 17. Open Questions / Gaps
1. Which specific regulatory frameworks apply at launch geography (GDPR/CCPA/others)?
2. Is customer-managed encryption key support required for enterprise roadmap?
3. What retention period should apply to audit and message metadata in each region?
