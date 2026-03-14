# Delivery Increments

## Purpose
Define thin-slice MVP-first increments that can be demoed and validated while reducing execution risk along the critical path.

## Increment Strategy
- Sequence by dependency depth and risk concentration: ingestion -> extraction -> persistence/dedupe -> scheduling -> calendar sync -> hardening.
- Keep each increment demonstrable with explicit validation outcomes.
- Use each increment to retire the highest remaining uncertainty before proceeding.

## Increment Plan

### Increment 1 — Ingestion Visibility Slice
**Goal**
Stand up Gmail ingestion and event-email eligibility classification with telemetry.

**What can be demoed**
- Incoming eligible event emails are received and marked for extraction.
- Intake telemetry shows success/failure path.

**Scope**
- Intake connectivity and classification only.
- No persistence guarantees yet.

**Risk reduction rationale**
Retires integration and auth uncertainty first, preventing downstream false negatives.

**Traceability**
- Trace: FR-02, FR-03; US-01, US-02

### Increment 2 — Extraction Confidence Slice
**Goal**
Produce normalized event candidates with confidence scoring and low-confidence handling.

**What can be demoed**
- Title/date/time extraction output for supported templates.
- Confidence-based routing behavior for ambiguous content.

**Scope**
- Detection/extraction pipeline and failure tagging.
- No production-ready dedupe/scheduling yet.

**Risk reduction rationale**
Retires semantic parsing uncertainty before persistence and scheduling are layered on top.

**Traceability**
- Trace: FR-04; US-05
- Depends on: `docs/02-design/reliability-policy.md`

### Increment 3 — Persistence + Dedupe Slice
**Goal**
Persist canonical events and prevent duplicate active records/schedules.

**What can be demoed**
- Event record creation and retrieval.
- Duplicate source handling does not create duplicate reminders/events.

**Scope**
- Persistence lifecycle and dedupe-key controls.

**Risk reduction rationale**
Removes data integrity risk before reminders and sync behaviors depend on stored state.

**Traceability**
- Trace: FR-05, FR-10; US-06, US-07

### Increment 4 — Scheduling Slice
**Goal**
Generate and maintain default reminder schedules (4h/1h/15m).

**What can be demoed**
- Reminder triggers created at expected offsets.
- Event updates/cancellations adjust schedule accordingly.

**Scope**
- Schedule generation/re-computation.

**Risk reduction rationale**
Proves user-visible reminder value before external calendar dependency is added.

**Traceability**
- Trace: FR-06; US-08

### Increment 5 — Calendar Continuity Slice
**Goal**
Synchronize persisted events into Google Calendar with retry + failure-state reliability compliance.

**What can be demoed**
- Event appears/updates in Google Calendar.
- Transient failures retry; terminal failures are recorded and visible.

**Scope**
- Calendar create/update mapping.
- Sync status lifecycle and remediation metadata.

**Risk reduction rationale**
Retires highest external dependency risk late enough to leverage stable core pipeline, but before release gates.

**Traceability**
- Trace: FR-09; US-09
- Depends on: `docs/02-design/runtime-flow.md`, `docs/02-design/reliability-policy.md`

### Increment 6 — Hardening and Delivery Readiness Slice
**Goal**
Finalize end-to-end reliability evidence and handoff readiness to Delivery execution.

**What can be demoed**
- Full critical path passes with clear observability and documented remediation process.
- Delivery artifacts are synchronized and release-gate ready.

**Scope**
- Integrated validation, reliability evidence, and documentation synchronization.

**Risk reduction rationale**
Ensures launch risk is governed by evidence, not assumptions.

**Traceability**
- Trace: FR-02/03/04/05/06/09/10 + mapped US

## Dependencies and Critical Path Summary
- Critical path increments: 1 -> 2 -> 3 -> 4 -> 5.
- Increment 6 validates and hardens the full path for Delivery handoff.
- If Increment 3 dedupe controls or Increment 5 terminal-failure handling are incomplete, release readiness is blocked.

## Assumptions / Constraints / Gaps
- Assumption: extraction fixture diversity is sufficient to represent MVP email patterns.
- Constraint: WhatsApp/SMS remain post-MVP and are not represented in increment critical path.
- Gap to monitor: operator remediation UX depth may require additional Delivery backlog items if failure volume exceeds expectations.
