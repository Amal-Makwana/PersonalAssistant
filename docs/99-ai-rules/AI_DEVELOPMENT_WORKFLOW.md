# AI Development Workflow

All AI contributors must follow a documentation-first workflow.

## Mandatory Documentation Reading Order
1. `docs/00-product`
2. `docs/01-tech-spec`
3. `docs/02-ui-ux`
4. `docs/03-design`
5. `docs/04-delivery`

## Canonical Prompt Library

The canonical prompt library for repository documentation generation is located at:

- `docs/05-prompts`

AI agents must use this prompt library when generating or updating documentation artifacts.

## Dual-Layer Documentation Rule (Mandatory)
For every major documentation section, maintain both:

- **Markdown files** as the source of truth for detailed working documentation.
- **One premium consolidated HTML summary** as the stakeholder-facing presentation layer.

Required HTML summaries:
- `docs/00-product/product-summary.html`
- `docs/01-tech-spec/tech-spec-summary.html`
- `docs/02-ui-ux/ui-ux-summary.html`
- `docs/03-design/design-summary.html`
- `docs/04-delivery/delivery-summary.html`

When markdown files in a section are created, changed, or reorganized, the corresponding HTML summary must be created or refreshed in the same change set.

## Required Process Before Code
1. Review all required documentation layers in order.
2. Produce a gap analysis for ambiguities and missing details.
3. List assumptions and required clarifications.
4. Produce an implementation plan with phased work.
5. Produce a file-by-file plan with traceability.
6. Then generate implementation changes.

## Scope and Location Rules
- Frontend code location: `apps/web`
- Backend code location: `apps/api`
- Shared code location: `packages/`
- Infrastructure code location: `infra/`

## Architecture Constraints
- Backend layers: `routes → controllers → services → repositories → models`
- Frontend structure: feature-based modules
- Shared UI components: `packages/ui`

## Quality and Traceability
- Tests must exist for core business flows.
- Do not invent behavior outside documented requirements.
- If documentation is missing or conflicting, report gaps and assumptions before coding.
