# Backlog and Dependencies (Canonical)

## Purpose
This is the single canonical backlog artifact for execution planning.

It owns:
- work-item decomposition
- task IDs
- dependency mapping
- estimates
- requirement and acceptance links
- sequencing notes and critical-path visibility

No other phase document should duplicate the backlog as a competing source of truth.

## Prioritization and Sequencing Rules
- Prioritize dependency-unblocking work aligned to `docs/02-design/runtime-flow.md` stages.
- Preserve order across ingestion, extraction, persistence, dedupe, scheduling, and sync.
- Couple reliability-sensitive tasks with `docs/02-design/reliability-policy.md` controls.
- Keep backlog traceability normalized through `docs/00-product/traceability-matrix.md`.

## Canonical Backlog Table
| Task ID | Workstream | Description | Estimate | Dependencies | Requirement / Story Links | Acceptance / Quality Link | Sequence Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| EP-BL-001 | Intake | Implement Gmail ingestion polling and message normalization pipeline. | M | OAuth setup, mailbox access contracts | FR-02, FR-03 / US-01, US-02 | AC ingestion correctness | Start of critical path |
| EP-BL-002 | Extraction | Implement event extraction parsing and confidence tagging. | M | EP-BL-001 | FR-04 / US-05 | AC confidence handling | Parallelizable with persistence scaffolding after interfaces freeze |
| EP-BL-003 | Persistence | Persist canonical events and idempotency metadata. | M | EP-BL-001 | FR-05 / US-03, US-06 | AC durable event creation | Enables dedupe and schedule layers |
| EP-BL-004 | Dedupe | Enforce duplicate prevention rules and conflict flags. | S | EP-BL-003 | FR-10 / US-07 | AC no duplicate reminders/events | Must complete before sync rollout |
| EP-BL-005 | Scheduling | Build default 4h/1h/15m reminder schedule orchestration. | M | EP-BL-002, EP-BL-003 | FR-06 / US-04, US-06 | AC reminder schedule visibility | Demo target for increment B |
| EP-BL-006 | Sync | Implement Google Calendar sync and retry/remediation hooks. | M | EP-BL-004, EP-BL-005 | FR-09, FR-11 / US-09, US-11 | AC sync continuity + failure handling | Final critical-path item for MVP readiness |

## Dependency Register
- Critical path: `EP-BL-001 -> EP-BL-003 -> EP-BL-004 -> EP-BL-006`
- High-risk dependency: extraction confidence quality (`EP-BL-002`) impacts reminder trustworthiness and can block release gates.
- External dependency: Google API quota and auth behavior validation before production rollout.

## Readiness Ownership
- Backlog steward: Engineering Manager / TPM.
- Update trigger: any requirement, acceptance criteria, or scope change.
- Sync rule: backlog changes must be reflected in `execution-planning-summary.html` in the same change set.
