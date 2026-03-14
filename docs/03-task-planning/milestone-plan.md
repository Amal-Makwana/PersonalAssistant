# Milestone Plan

## Purpose
Define milestone-level execution boundaries and readiness gates for MVP delivery, from Design contracts to Delivery-ready increments.

## Milestone Sequence Overview
1. M1 — Intake + Extraction Foundation
2. M2 — Persistence + Duplicate Integrity
3. M3 — Scheduling + Calendar Reliability
4. M4 — Release Readiness + Hardening

## Milestone Details

### M1 — Intake + Extraction Foundation
**Outcome**
- Gmail ingestion pipeline and event extraction baseline are operational in non-production environments.

**Primary scope**
- Gmail connectivity and ingestion controls.
- Event detection/extraction with confidence classification.
- Intake and extraction observability basics.

**Entry criteria**
- Runtime flow and reliability policy baselines reviewed and accepted.
- OAuth/access prerequisites and fixture corpus available.

**Exit criteria**
- Eligible event emails are ingested and parsed into normalized candidates.
- Low-confidence extraction handling path is implemented and testable.
- Core ingestion/extraction traces available for validation.

**Scope boundary**
- No production-grade persistence guarantee yet.
- No reminder schedule finalization or calendar sync sign-off yet.

**Traceability**
- Trace: FR-02, FR-03, FR-04; US-01, US-02, US-05
- Depends on: `docs/02-design/runtime-flow.md`

### M2 — Persistence + Duplicate Integrity
**Outcome**
- Canonical event persistence and duplicate prevention controls are stable.

**Primary scope**
- Event persistence lifecycle.
- Duplicate-key derivation and suppression logic.
- State transition and recovery handling for persistence operations.

**Entry criteria**
- M1 exit achieved with stable normalized event schema.

**Exit criteria**
- Persisted event records are durable and queryable.
- Duplicate active events/reminders are prevented for repeated or semantically equivalent input.
- Failure metadata for persistence anomalies is captured.

**Scope boundary**
- Reminder schedule generation may begin integration, but milestone completion does not require calendar sync readiness.

**Traceability**
- Trace: FR-05, FR-10; US-03, US-06, US-07
- Depends on: `docs/02-design/db-schema.md`, `docs/02-design/reliability-policy.md`

### M3 — Scheduling + Calendar Reliability
**Outcome**
- Default reminder schedule and Google Calendar sync are integrated with reliability policy compliance.

**Primary scope**
- 4h/1h/15m reminder generation and update behavior.
- Calendar create/update synchronization with retry + terminal failure paths.
- End-to-end journey validation from ingestion to calendar continuity.

**Entry criteria**
- M2 persistence and dedupe controls pass validation gates.

**Exit criteria**
- Reminder schedules are consistently generated from persisted events.
- Calendar sync success and failure states are observable and policy-compliant.
- Critical-path E2E scenarios pass (including duplicate and retry cases).

**Scope boundary**
- WhatsApp/SMS remain future-phase placeholders only.

**Traceability**
- Trace: FR-06, FR-09; US-08, US-09
- Depends on: `docs/02-design/reliability-policy.md`, `docs/02-design/runtime-flow.md`

### M4 — Release Readiness + Hardening
**Outcome**
- MVP execution baseline is validated and transferable to Delivery controls.

**Primary scope**
- Reliability and observability gap closure.
- Documentation synchronization across planning + delivery.
- Rollout and rollback rehearsal inputs.

**Entry criteria**
- M3 exit completed with integrated E2E evidence.

**Exit criteria**
- MVP critical path shows stable execution evidence.
- Documentation + test strategy + rollout artifacts are synchronized.
- Known gaps, assumptions, and open questions are documented with owners.

**Scope boundary**
- No scope expansion into post-MVP channels.

**Traceability**
- Trace: FR-02/03/04/05/06/09/10 and corresponding US mapping
- Depends on: `docs/04-delivery/test-strategy.md`, `docs/04-delivery/rollout-plan.md`

## Milestone Governance Notes
- Milestone progression is sequential; no milestone should be marked complete without explicit exit-criteria evidence.
- Critical path defects (extraction confidence, duplicate suppression, calendar sync reliability) are release blockers.
- Any scope drift into WhatsApp/SMS must be rejected during MVP milestone reviews.
