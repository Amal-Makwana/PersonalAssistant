# PersonalAssistant

A personal AI powered assistant which will help with everyday tasks.

## Documentation Reading Order

For implementation work in `reminder-app`, follow documentation in this order:

1. `docs/00-product`
2. `docs/01-tech-spec`
3. `docs/02-ui-ux`
4. `docs/03-design`
5. `docs/04-delivery`

## Documentation Output Standard (Markdown + HTML)

Inside `reminder-app/docs`, each major documentation section must maintain both:

- Detailed markdown files (source of truth)
- One premium consolidated HTML summary page (stakeholder presentation layer)

Required summary files:

- `docs/00-product/product-summary.html`
- `docs/01-tech-spec/tech-spec-summary.html`
- `docs/02-ui-ux/ui-ux-summary.html`
- `docs/03-design/design-summary.html`
- `docs/04-delivery/delivery-summary.html`

Whenever markdown files in a section are created or updated, refresh that section's HTML summary in the same change set.

## Canonical Prompt Library

The canonical prompt library for generating and maintaining repository documentation is located in:

- `docs/05-prompts`

Use these prompt files to reproduce or update documentation for Product, Tech Spec, UI/UX, Design, and HTML summary outputs in a consistent, workflow-compliant way.
