# Task Breakdown

## Purpose
Break Design contracts into grouped, execution-ready tasks with clear dependencies, validation responsibilities, and documentation sync expectations.

## Workstream Task Catalog

## WS1 — Gmail Intake Pipeline
| Task ID | Task | Dependencies | Validation | Traceability |
| --- | --- | --- | --- | --- |
| TP-WS1-01 | Configure Gmail ingestion/auth flow for MVP test environments | OAuth setup, runtime-flow intake stage | Integration tests for authorized ingestion | Trace: FR-02, US-01 |
| TP-WS1-02 | Implement intake eligibility classification for event-bearing emails | TP-WS1-01, extraction contract draft | Fixture-based classification checks | Trace: FR-03, US-02 |
| TP-WS1-03 | Add ingestion observability events/log fields for pipeline state tracking | TP-WS1-01 | Telemetry schema review and log validation | Depends on: `docs/02-design/runtime-flow.md` |

## WS2 — Detection/Extraction Intelligence
| Task ID | Task | Dependencies | Validation | Traceability |
| --- | --- | --- | --- | --- |
| TP-WS2-01 | Build extraction parser pipeline for title/date/time normalization | WS1 stable intake payload | Parser accuracy test corpus | Trace: FR-04, US-05 |
| TP-WS2-02 | Implement confidence scoring + low-confidence gating behavior | TP-WS2-01, reliability policy | Confidence threshold scenario tests | Depends on: `docs/02-design/reliability-policy.md` |
| TP-WS2-03 | Define extraction failure metadata capture for downstream remediation | TP-WS2-01 | Failure-path assertions in integration tests | Trace: FR-11 reliability policy linkage |

## WS3 — Persistence and Duplicate Prevention
| Task ID | Task | Dependencies | Validation | Traceability |
| --- | --- | --- | --- | --- |
| TP-WS3-01 | Persist canonical event model from normalized extraction output | WS2 normalized output contract | Persistence integration tests | Trace: FR-05, US-06 |
| TP-WS3-02 | Implement deterministic dedupe key generation and duplicate suppression | TP-WS3-01 | Repeat-input dedupe tests | Trace: FR-10, US-07 |
| TP-WS3-03 | Add persistence anomaly handling and retry-safe state updates | TP-WS3-01, reliability policy | Fault-injection checks on state transitions | Depends on: `docs/02-design/reliability-policy.md` |

## WS4 — Reminder Scheduling
| Task ID | Task | Dependencies | Validation | Traceability |
| --- | --- | --- | --- | --- |
| TP-WS4-01 | Generate default reminder schedule (4h/1h/15m) from persisted events | WS3 stable persisted event lifecycle | Unit + integration tests for schedule times | Trace: FR-06, US-08 |
| TP-WS4-02 | Handle event updates/cancellations and reminder recomputation | TP-WS4-01 | Update/cancel lifecycle tests | Depends on runtime state transitions |
| TP-WS4-03 | Emit schedule generation telemetry and failure alerts | TP-WS4-01 | Observability assertions and dashboard checks | Depends on reliability policy |

## WS5 — Google Calendar Sync
| Task ID | Task | Dependencies | Validation | Traceability |
| --- | --- | --- | --- | --- |
| TP-WS5-01 | Implement Google Calendar create/update mapping for canonical events | WS3 persisted model, WS4 schedule context | Provider sandbox sync tests | Trace: FR-09, US-09 |
| TP-WS5-02 | Implement retry + terminal failure handling for provider errors | TP-WS5-01, reliability policy | Retry policy simulation tests | Depends on: `docs/02-design/reliability-policy.md` |
| TP-WS5-03 | Surface sync statuses and remediation metadata for operators | TP-WS5-02 | Status lifecycle and operator-view checks | Trace: FR-09 + reliability/remediation expectations |

## WS6 — Validation, Reliability, and Documentation Sync
| Task ID | Task | Dependencies | Validation | Traceability |
| --- | --- | --- | --- | --- |
| TP-WS6-01 | Build end-to-end critical path scenarios (happy + failure paths) | WS1-WS5 integration | E2E scenario pass criteria | Trace: FR-02/03/04/05/06/09/10 |
| TP-WS6-02 | Execute reliability checks (retry behavior, failure recording, recovery) | WS5 retry + failure metadata | Reliability policy conformance report | Depends on: `docs/02-design/reliability-policy.md` |
| TP-WS6-03 | Synchronize Task Planning + Delivery docs and regenerate section HTML summary | WS6-01/02 evidence | Documentation coverage check | Depends on markdown-first workflow |

## Design / UX Dependency Notes
- UI/UX flow expectations for extraction review and status feedback must align with `docs/01-ui-ux/user-flows.md` and `docs/01-ui-ux/screen-inventory.md`.
- Design runtime transitions and error-state semantics must align with `docs/02-design/runtime-flow.md` and `docs/02-design/sequence-flows.md`.
- Data and integration constraints derive from `docs/02-design/db-schema.md` and `docs/02-design/integration-spec.md`.

## Sequencing Quality Rules
- Do not schedule downstream tasks before upstream contract stabilization.
- Any task that changes a runtime state transition must include reliability validation tasks in the same execution window.
- No milestone may exit with unresolved duplicate prevention defects or unclassified terminal sync failures.

## Constraints and Open Questions
- Constraint: MVP excludes WhatsApp/SMS implementation tasks from WS1–WS6.
- Open question: Which failure classes require immediate operator escalation versus queued remediation in MVP?
- Open question: Should extraction low-confidence gating require human confirmation before schedule creation in all cases?
