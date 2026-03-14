# Prompt Library Index

## Purpose
This folder stores canonical prompts used to generate and maintain repository documentation.

These are documentation-only prompts (not for application code generation).

## Documentation Phases
1. Product (`docs/00-product`)
2. UI/UX (`docs/01-ui-ux`)
3. Design (`docs/02-design`) — merged technical + architecture docs
4. Task Planning (`docs/03-task-planning`)
5. Delivery (`docs/04-delivery`)

## Prompt Categories
- `product-prompts.md`
- `ui-ux-prompts.md`
- `design-prompts.md`
- `task-planning-prompts.md`
- `html-summary-generation.md`
- `critical-persona-review.md`
- `delivery-prompts.md`
- `repository-documentation-audit.md`

## Canonical Contract References
Prompts must reference these canonical artifacts rather than redefining shared concepts:
- Runtime flow: `docs/02-design/runtime-flow.md`
- Reliability policy: `docs/02-design/reliability-policy.md`
- Traceability matrix: `docs/00-product/traceability-matrix.md`

## Prompt-to-Section Mapping
| Documentation Section | Prompt Source | Primary Outputs |
| --- | --- | --- |
| `docs/00-product` | `product-prompts.md` | Product markdown + `product-summary.html` |
| `docs/01-ui-ux` | `ui-ux-prompts.md` | UI/UX markdown + `ui-ux-summary.html` |
| `docs/02-design` | `design-prompts.md` | Merged design markdown + `design-summary.html` |
| `docs/03-task-planning` | `task-planning-prompts.md` | Planning markdown + `task-planning-summary.html` |
| `docs/04-delivery` | `delivery-prompts.md` | Delivery markdown + `delivery-summary.html` |
| HTML summaries | `html-summary-generation.md` | section summary HTML files |

## Governance Notes
- Always keep markdown as source of truth.
- Regenerate impacted section HTML in the same change set.
- Use phase order: Product -> UI/UX -> Design -> Task Planning -> Delivery.
