# PersonalAssistant

A personal AI powered assistant which will help with everyday tasks.

## Incremental Build + Product Scope Quick Start

The active local prototype implementation lives at:
- `reminder-app/apps/web`

Current build contract:
- The product follows the original V1 scope while being delivered in incremental vertical slices.
- Early slices may use deterministic mocks where dependencies are not yet live, but interfaces must stay aligned with canonical design contracts.
- Styling direction follows the personal brand language with Inter + JetBrains Mono, light slate/sky/teal palette, rounded editorial cards, and clean section-based layouts.

Execution guide:
- `reminder-app/README.md`
- `docs/README.md`

## Documentation Reading Order

For implementation work in `reminder-app`, follow documentation in this order:

1. `docs/00-product`
2. `docs/01-ui-ux`
3. `docs/02-design`
4. `docs/03-execution-planning`

## Documentation Output Standard (Markdown + HTML)

For each major documentation section in `docs/`, maintain both:

- Detailed markdown files (source of truth)
- One premium consolidated HTML summary page (stakeholder presentation layer)

Required summary files:

- `docs/00-product/product-summary.html`
- `docs/01-ui-ux/ui-ux-summary.html`
- `docs/02-design/design-summary.html`
- `docs/03-execution-planning/execution-planning-summary.html`

Whenever markdown files in a section are created or updated, refresh that section's HTML summary in the same change set.

## Full Documentation Hub

- `docs/full-docs.html`

Use this as the single-entry rich HTML artifact for complete repository documentation coverage, section summaries, and source manifest visibility.

## Comprehensive Markdown Documentation

- `docs/full-documentation.md`

Use this as the complete markdown handbook for repository structure, documentation governance, section-by-section coverage, and contributor workflow.

## Canonical Prompt Library

The canonical prompt library for generating and maintaining repository documentation is located in:

- `docs/05-prompts`

Use these prompt files to reproduce or update documentation for Product, UI/UX, Design, and Execution Planning in a consistent, workflow-compliant way.
