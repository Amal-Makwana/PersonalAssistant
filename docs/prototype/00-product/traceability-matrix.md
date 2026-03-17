# Product Traceability Matrix (Canonical)

## 1. Purpose
This matrix is the canonical cross-phase traceability map:
`requirements -> user stories -> acceptance criteria -> UI/UX -> design -> execution planning -> quality gates`.

Use this matrix for end-to-end traceability. Other documents should keep inline trace tags minimal and reference this matrix for the full mapping.

## 2. Matrix
| Requirement | User Story | Acceptance Criteria | UI/UX Artifact | Design Artifact | Execution Planning Artifact | Test / Quality Gate References |
| --- | --- | --- | --- | --- | --- | --- |
| FR-02 / FR-03 Gmail ingestion and event detection | US-01, US-02 | AC ingestion and extraction correctness | `docs/01-ui-ux/user-flows.md`, `docs/01-ui-ux/screen-inventory.md` | `docs/02-design/runtime-flow.md`, `docs/02-design/backend-spec.md`, `docs/02-design/integration-spec.md` | `docs/03-execution-planning/build-plan.md`, `docs/03-execution-planning/backlog-and-dependencies.md` | `docs/03-execution-planning/test-and-quality-gates.md` (QG-02) |
| FR-04 extraction confidence policy | US-05 | AC confidence handling + parsing quality | `docs/01-ui-ux/user-flows.md`, `docs/01-ui-ux/components.md` | `docs/02-design/backend-spec.md`, `docs/02-design/tech-overview.md` | `docs/03-execution-planning/backlog-and-dependencies.md` | `docs/03-execution-planning/test-and-quality-gates.md` (QG-02) |
| FR-05 canonical event persistence | US-03, US-06 | AC durable event creation | `docs/01-ui-ux/screen-inventory.md` | `docs/02-design/db-schema.md`, `docs/02-design/backend-spec.md` | `docs/03-execution-planning/build-plan.md`, `docs/03-execution-planning/backlog-and-dependencies.md` | `docs/03-execution-planning/test-and-quality-gates.md` (QG-02) |
| FR-06 default reminder schedule (4h/1h/15m) | US-04, US-06 | AC reminder schedule visibility | `docs/01-ui-ux/user-flows.md`, `docs/01-ui-ux/wireframes.md` | `docs/02-design/runtime-flow.md`, `docs/02-design/backend-spec.md` | `docs/03-execution-planning/build-plan.md`, `docs/03-execution-planning/backlog-and-dependencies.md` | `docs/03-execution-planning/test-and-quality-gates.md` (QG-02) |
| FR-09 Google Calendar sync | US-09 | AC sync success/failure visibility and continuity | `docs/01-ui-ux/ui-overview.md`, `docs/01-ui-ux/user-flows.md` | `docs/02-design/runtime-flow.md`, `docs/02-design/reliability-policy.md`, `docs/02-design/api-spec.md` | `docs/03-execution-planning/build-plan.md`, `docs/03-execution-planning/rollout-and-rollback.md` | `docs/03-execution-planning/test-and-quality-gates.md` (QG-03, QG-05) |
| FR-10 duplicate prevention | US-07 | AC no duplicate reminders/events | `docs/01-ui-ux/user-flows.md` | `docs/02-design/runtime-flow.md`, `docs/02-design/backend-spec.md`, `docs/02-design/db-schema.md` | `docs/03-execution-planning/backlog-and-dependencies.md` | `docs/03-execution-planning/test-and-quality-gates.md` (QG-02) |
| FR-11 reliability/remediation behaviors | US-11 | AC operational failure handling | `docs/01-ui-ux/ui-overview.md` | `docs/02-design/reliability-policy.md`, `docs/02-design/integration-spec.md` | `docs/03-execution-planning/test-and-quality-gates.md`, `docs/03-execution-planning/rollout-and-rollback.md` | `docs/03-execution-planning/test-and-quality-gates.md` (QG-03, QG-05) |

## 3. Usage Rules
- Treat this file as the primary traceability source.
- Update this matrix whenever requirements or phase artifacts change.
- Keep section-level trace notes concise and link back here.
