# Prompt Library Index

## Purpose
This folder stores canonical prompts used to generate and maintain repository documentation.

These are documentation-only prompts (not for application code generation).

## Canonical Documentation Phase Order
1. Product (`docs/00-product`)
2. UI/UX (`docs/01-ui-ux`)
3. Design (`docs/02-design`) — merged technical + architecture docs
4. Task Planning (`docs/03-task-planning`) — execution bridge between Design and Delivery
5. Delivery (`docs/04-delivery`)

## Prompt Categories
- `product-prompts.md`
- `ui-ux-prompts.md`
- `design-prompts.md`
- `task-planning-prompts.md`
- `delivery-prompts.md`
- `html-summary-generation.md`
- `critical-persona-review.md`
- `repository-documentation-audit.md`

## Prompt-to-Section Mapping
| Documentation Section | Prompt Source | Primary Outputs |
| --- | --- | --- |
| `docs/00-product` | `product-prompts.md` | Product markdown + `product-summary.html` |
| `docs/01-ui-ux` | `ui-ux-prompts.md` | UI/UX markdown + `ui-ux-summary.html` |
| `docs/02-design` | `design-prompts.md` | Merged design markdown + `design-summary.html` |
| `docs/03-task-planning` | `task-planning-prompts.md` | Planning markdown + `task-planning-summary.html` |
| `docs/04-delivery` | `delivery-prompts.md` | Delivery markdown + `delivery-summary.html` |
| HTML summaries | `html-summary-generation.md` | Section summary HTML files |
| Phase review/audit | `critical-persona-review.md`, `repository-documentation-audit.md` | Score-based phase or full-repo governance audits |

## Task Planning Prompt Usage
- Use `task-planning-prompts.md` to generate or improve implementation planning artifacts:
  - `implementation-plan.md`
  - `milestone-plan.md`
  - `task-breakdown.md`
  - `delivery-increments.md`
- Ensure planning output explicitly traces to Product/UI/UX/Design canonical sources and references runtime/reliability contracts instead of redefining them.
- Regenerate `docs/03-task-planning/task-planning-summary.html` in the same change set whenever Task Planning markdown changes.

## Canonical Contract References
Prompts must reference these canonical artifacts rather than redefining shared concepts:
- Runtime flow: `docs/02-design/runtime-flow.md`
- Reliability policy: `docs/02-design/reliability-policy.md`
- Traceability matrix: `docs/00-product/traceability-matrix.md`

## Governance Notes
- Always keep markdown as source of truth.
- Regenerate impacted section HTML in the same change set.
- All review/audit outputs must include explicit numeric scoring in `X/5` format.
- Use phase order: Product -> UI/UX -> Design -> Task Planning -> Delivery.
