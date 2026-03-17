# Prompt Library Index

## Purpose
This folder stores canonical prompts used to generate and maintain repository documentation.

These are documentation-only prompts (not for application code generation).

## Original Scope
Prompt coverage supports canonical documentation phases:
1. Product (`docs/00-product`)
2. UI/UX (`docs/01-ui-ux`)
3. Design (`docs/02-design`) — merged technical + architecture docs
4. Execution Planning (`docs/03-execution-planning`) — canonical pre-development execution planning

## Prototype Baseline
- During prototype execution, prompts enforced a mock-first workflow and deterministic fixture behavior.
- Prototype prompts were temporarily split into a parallel structure.

## Incremental Build Progress
- Prototype prompt guidance has been consolidated into canonical prompts in `docs/05-prompts`.
- DB-backed migration guidance for event/system slices is preserved in:
  - `prototype-backend-development.md`
  - `vertical-slice-events-persistence.md`
  - `vertical-slice-completion-event-apis-persistence.md`
  - `canonical-schema-alignment-event-apis-persistence.md`

## Current State
- `docs/05-prompts` is the only active prompt library.
- No separate prototype prompt tree is active.

## Prompt Categories
- `product-prompts.md`
- `ui-ux-prompts.md`
- `design-prompts.md`
- `execution-planning-prompts.md`
- `html-summary-generation.md`
- `full-docs-generation.md`
- `critical-persona-review.md`
- `repository-documentation-audit.md`
- `prototype-backend-development.md`
- `vertical-slice-events-persistence.md`
- `route-level-db-consistency-fix.md`
- `vertical-slice-completion-event-apis-persistence.md`
- `canonical-schema-alignment-event-apis-persistence.md`

## Prompt-to-Section Mapping
| Documentation Section | Prompt Source | Primary Outputs |
| --- | --- | --- |
| `docs/00-product` | `product-prompts.md` | Product markdown + `product-summary.html` |
| `docs/01-ui-ux` | `ui-ux-prompts.md` | UI/UX markdown + `ui-ux-summary.html` |
| `docs/02-design` | `design-prompts.md` | Merged design markdown + `design-summary.html` |
| `docs/03-execution-planning` | `execution-planning-prompts.md` | Execution planning markdown + `execution-planning-summary.html` |
| Section HTML summaries | `html-summary-generation.md` | Section summary HTML files |
| Full repository consolidated docs | `full-docs-generation.md` | Rich consolidated HTML artifact: `docs/full-docs.html` |
| Phase review/audit | `critical-persona-review.md`, `repository-documentation-audit.md` | Score-based phase or full-repo governance audits |

## Repository Command Language
| Command | Prompt | Behavior |
| --- | --- | --- |
| `Create full docs` | `full-docs-generation.md` | Reads all canonical markdown sections, generates/updates `docs/full-docs.html`, and returns section list + coverage status + output path. |
| `Run full audit` | `repository-documentation-audit.md` | Runs full governance audit across Product, UI/UX, Design, and Execution Planning with scored output. |
| `Run audit - <phase>` | `critical-persona-review.md` | Runs phase-specific persona audit for one supported phase. |

## Full-Docs Output Requirements (Governed)
`Create full docs` must produce deterministic output with:
- overall summary
- per-section summaries
- complete section details from all markdown files
- full source coverage manifest

## Execution Planning Prompt Usage
- Use `execution-planning-prompts.md` to generate or improve canonical execution planning artifacts:
  - `build-plan.md`
  - `backlog-and-dependencies.md`
  - `test-and-quality-gates.md`
  - `rollout-and-rollback.md`
- Keep one canonical owner per planning concept; do not create duplicate planning files for the same concern.
