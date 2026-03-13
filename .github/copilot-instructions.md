# AI Development Workflow (Repository Rules)

All AI agents working in this repository must follow the documentation-first workflow.

## Mandatory Workflow

Before writing any code always read documentation in this order:

1. docs/00-product
2. docs/01-tech-spec
3. docs/02-ui-ux
4. docs/03-design
5. docs/04-delivery

## Documentation Format Rule (Required)

For every major documentation section, maintain two synchronized layers:

1. **Markdown files** = detailed source of truth.
2. **Single premium HTML summary** = consolidated stakeholder-facing presentation.

Required consolidated HTML files:
- `docs/00-product/product-summary.html`
- `docs/01-tech-spec/tech-spec-summary.html`
- `docs/02-ui-ux/ui-ux-summary.html`
- `docs/03-design/design-summary.html`
- `docs/04-delivery/delivery-summary.html`

Whenever markdown docs in a section change, the section summary HTML must be refreshed in the same PR/commit.

## Required Process

Before generating code the agent must:

1. Review documentation
2. Produce gap analysis
3. List assumptions
4. Produce implementation plan
5. Produce file-by-file plan
6. Then generate code

## Code Location Rules

Frontend:
apps/web

Backend:
apps/api

Shared packages:
packages/

Infrastructure:
infra/

## Backend Architecture

routes
controllers
services
repositories
models

## Frontend Structure

feature-based modules
shared UI components must go in packages/ui

## Testing

Tests must exist for core business flows.

## Scope Control

Do not invent features outside documented requirements.

If documentation is missing or unclear:
list gaps and assumptions before coding.
