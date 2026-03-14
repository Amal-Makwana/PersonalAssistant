# Implementation Plan

## Purpose
This plan is the execution bridge between Design and Delivery. It converts approved architecture/runtime contracts into implementation-ready workstreams with sequencing, dependency management, and readiness gates.

## Canonical Inputs and Non-Redefinition Rule
Task Planning consumes (does not redefine) canonical artifacts:
- Product traceability: `docs/00-product/traceability-matrix.md`
- Runtime lifecycle: `docs/02-design/runtime-flow.md`
- Reliability and sync states: `docs/02-design/reliability-policy.md`
- Delivery validation/rollout expectations: `docs/04-delivery/test-strategy.md`, `docs/04-delivery/rollout-plan.md`

## MVP Scope Guardrails
In-scope implementation streams for this phase:
- Gmail ingestion
- Event detection/extraction
- Event persistence
- Duplicate prevention
- Reminder scheduling
- Google Calendar sync

Out of MVP execution scope:
- WhatsApp and SMS delivery implementation (may appear only as future-phase placeholders with no MVP critical-path dependency).

## Traceability Anchors
- Trace: FR-02, FR-03, US-01, US-02 (ingestion and event detection)
- Trace: FR-04, US-05 (extraction confidence + review handling)
- Trace: FR-05, US-03, US-06 (event persistence integrity)
- Trace: FR-10, US-07 (duplicate prevention)
- Trace: FR-06, US-08 (default reminder schedule)
- Trace: FR-09, US-09 (calendar sync)
- Depends on: `docs/02-design/runtime-flow.md`, `docs/02-design/reliability-policy.md`

## Preconditions for Build/Test Readiness
- Local dev OAuth credentials and Gmail API permissions are available for controlled test users.
- Google Calendar sandbox account and token refresh workflow are configured.
- Data schema migration path exists for event, reminder, and sync/failure metadata.
- Deterministic test fixtures exist for extraction and duplicate-key generation.
- Baseline observability wiring exists for ingestion, extraction, schedule generation, and sync attempts.

## Workstreams and Sequencing Logic
### WS1 — Intake and Source Connectivity
Objective: establish trusted Gmail event intake path and intake observability.
- Primary outcomes: authenticated ingestion, message eligibility classification, canonical intake payload.
- Depends on: runtime intake states and idempotency boundaries.

### WS2 — Event Intelligence and Normalization
Objective: detect and extract event fields with confidence handling.
- Primary outcomes: normalized event candidate, confidence score, low-confidence gating signal.
- Depends on: WS1 payload contract; reliability policy failure tagging.

### WS3 — Persistence and Duplicate Controls
Objective: persist canonical events while preventing duplicate active records/schedules.
- Primary outcomes: durable event records, deterministic dedupe key handling, duplicate suppression behavior.
- Depends on: WS2 normalization outputs and schema constraints.

### WS4 — Scheduling and Reminder Materialization
Objective: produce default 4h/1h/15m reminder schedule from persisted event state.
- Primary outcomes: schedule generation, trigger records, re-computation logic for updates.
- Depends on: WS3 persistence lifecycle and canonical runtime state transitions.

### WS5 — Calendar Continuity and Sync Reliability
Objective: create/update Google Calendar entries with retry/remediation policy compliance.
- Primary outcomes: sync status lifecycle, retry handling, terminal-failure metadata, operator visibility.
- Depends on: WS3 persistence events; WS4 schedule context; reliability policy contract.

### WS6 — Operational Readiness and Release Hardening
Objective: close execution loop with test evidence, runbooks, and rollout-safe controls.
- Primary outcomes: end-to-end validation evidence, incident triage cues, rollback and rollout criteria alignment.
- Depends on: WS1–WS5 completion evidence.

## Dependency and Critical Path Notes
### Dependency Ordering
1. WS1 intake contract must stabilize before WS2 extraction tuning.
2. WS2 normalized output contract must stabilize before WS3 dedupe/persistence hardening.
3. WS3 persistence lifecycle must stabilize before WS4 schedule generation can be considered production-ready.
4. WS3 + WS4 are preconditions for WS5 calendar sync consistency testing.
5. WS6 is gated on integrated reliability evidence from WS1–WS5.

### Critical Path
WS1 → WS2 → WS3 → WS4 → WS5 is the MVP critical path.
- Any unresolved defect in extraction confidence handling, duplicate suppression, or sync terminal-state handling blocks release.
- WhatsApp/SMS placeholders must not appear as dependencies in this path.

## Assumptions, Constraints, Open Questions
### Assumptions
- Gmail parsing coverage can meet initial confidence thresholds with curated fixture diversity.
- Calendar provider quotas are sufficient for MVP test and early rollout volumes.

### Constraints
- MVP commits to Gmail + Google Calendar only.
- Reliability policy controls retry and terminal-state behavior; planning cannot bypass those controls.

### Open Questions
- What operational threshold should trigger manual review routing for low-confidence extraction in MVP?
- What is the first acceptable SLO target for calendar sync completion latency beyond the acceptance baseline?
