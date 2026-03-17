# Build Plan

## Purpose
Define the implementation strategy, milestone sequence, and increment logic required to execute approved Product, UI/UX, and Design artifacts.

Execution Planning is the canonical owner of build decomposition and sequencing. Design remains the canonical owner of runtime contracts, architecture, and reliability semantics.

## Canonical Upstream Inputs
- Product traceability: `docs/00-product/traceability-matrix.md`
- Runtime lifecycle authority: `docs/02-design/runtime-flow.md`
- Reliability authority: `docs/02-design/reliability-policy.md`
- Technical architecture/contracts: `docs/02-design/*`

## Planning Preconditions
- Product, UI/UX, and Design markdown artifacts are reviewed and approved.
- Scope boundary is explicit: MVP includes Gmail ingestion, extraction, persistence, dedupe, reminder scheduling, and Google Calendar sync continuity.
- WhatsApp/SMS references are marked post-MVP and non-executable.

## Milestone Strategy
### Milestone 1 — Intake and Canonical Event Baseline
- Goal: establish deterministic ingestion and canonical event persistence path.
- Build focus: ingestion parsing pipeline, canonical event creation, baseline dedupe checks.
- Exit criteria:
  - Event intake pipeline passes core integration tests.
  - Persistence contracts and data integrity checks are green.
  - Traceability links are updated for delivered slices.

### Milestone 2 — Reminder Orchestration and Operator Visibility
- Goal: deliver reminder scheduling pipeline with operational state visibility.
- Build focus: default reminder schedule, schedule editing path, confidence handling, diagnostics surfacing.
- Exit criteria:
  - Reminder generation flows pass acceptance-aligned tests.
  - Failure states are observable and remediation paths are documented.
  - Quality gates in `test-and-quality-gates.md` pass for included changes.

### Milestone 3 — Calendar Sync Reliability and Release Readiness
- Goal: complete Google Calendar sync, remediation handling, and release hardening.
- Build focus: sync contracts, retry behavior, rollback readiness, release checklists.
- Exit criteria:
  - Sync reliability policy behavior validated against Design contracts.
  - Rollout/rollback checklist passes dry-run review.
  - Final readiness gate approved.

## Increment Model (Thin Vertical Slices)
1. Increment A: Gmail intake to canonical event persistence.
2. Increment B: Reminder schedule generation and user-facing schedule controls.
3. Increment C: Google Calendar sync with failure remediation and diagnostics.

Each increment must be demoable, test-gated, traceable to Product requirements, and dependency-ordered in the canonical backlog.

## Assumptions, Constraints, and Open Questions
- Assumption: upstream Design contracts are stable during milestone execution windows.
- Constraint: Execution Planning must not redefine canonical runtime/reliability semantics.
- Open question: final ownership cadence for traceability updates at milestone close (engineering manager vs program manager).


## Incremental Build Overlay
To preserve full product scope while shipping iteratively, execute each milestone in vertical slices:
1. Deliver slice behavior with deterministic coverage (mocked where required by dependency readiness).
2. Stabilize contracts (API/schema/UI states) against canonical design docs.
3. Replace mock implementations with production integrations behind the same interfaces.
4. Close each slice by updating traceability and section HTML summaries in this canonical plan set.

Current active sequence:
- S03 Dashboard
- S04 Events List
- S05 Event Detail
- Expand across S01/S02/S06/S07/S08/S09 once the active slice is stable
