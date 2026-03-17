# Test and Quality Gates

## Purpose
Define execution-phase validation planning and release-blocking quality criteria before implementation begins.

This document is planning-owned and references Design contracts without redefining them.

## Test Coverage Strategy
### Unit Test Planning
- Parsing/normalization helpers for ingestion and extraction.
- Scheduling and dedupe rule logic.
- Sync retry decision logic.

### Integration Test Planning
- Gmail intake to canonical event persistence path.
- Schedule orchestration with persistence and dedupe dependencies.
- Google Calendar sync request/response and retry behavior.

### End-to-End Test Planning
- Representative inbox-to-reminder lifecycle.
- Failure-state remediation path from diagnostics to retry.
- Core MVP success and recoverable failure scenarios.

## Quality Gates (Release Blocking)
| Gate ID | Gate | Evidence Required | Blocking Severity |
| --- | --- | --- | --- |
| QG-01 | Lint and static analysis clean | CI artifacts with zero blocking issues | Block release |
| QG-02 | Core flow integration pass | Ingestion -> extraction -> persistence -> scheduling tests green | Block release |
| QG-03 | Sync reliability behavior pass | Retry/remediation tests align with reliability policy | Block release |
| QG-04 | Traceability synchronized | Product matrix and execution docs are cross-linked and current | Block release |
| QG-05 | Rollback rehearsal complete | Rollout rollback dry-run log and owner sign-off | Block release |

## Readiness Checklist
- Test plan covers all MVP requirements in `docs/00-product/traceability-matrix.md`.
- Failure-path assertions include observability signals and operator actions.
- No unresolved P0/P1 defects against milestone exit criteria.
- HTML summary synchronization check is complete.

## Risks and Mitigations
- Risk: flaky integration environments may mask reliability regressions.
  - Mitigation: require deterministic fixtures and replayable failure tests for gates QG-02 and QG-03.
- Risk: undocumented scope changes can invalidate quality gate scope.
  - Mitigation: backlog steward enforces traceability updates before gate sign-off.


## Incremental Slice Quality Coverage
Current incremental baseline validates state-complete behavior (loading, empty, error, success, permission, validation) for active slices.

Active slice quality requirements:
- S03 Dashboard: summary render + state handling
- S04 Events List: list rendering + filtering + navigation affordance
- S05 Event Detail: reminder plan preview, editable offsets, reminder channels, save confirmation success/failure, and notification history rendering

For mock-first slices, quality gate evidence must also confirm deterministic behavior by scenario and zero unintended external network dependencies.
