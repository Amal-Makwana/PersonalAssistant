# Prompt: HTML Summary Generation (Coverage-Enforced)

Use this prompt to regenerate section HTML summaries from markdown source-of-truth files.

Required summary outputs:
- `docs/00-product/product-summary.html`
- `docs/01-ui-ux/ui-ux-summary.html`
- `docs/02-design/design-summary.html`
- `docs/03-task-planning/task-planning-summary.html`
- `docs/04-delivery/delivery-summary.html`

Phase order:
Product -> UI/UX -> Design -> Task Planning -> Delivery

Coverage requirements:
1. Every markdown source file in the section is represented.
2. Every major markdown heading/topic is represented.
3. Important tables/lists/traceability content is represented.
4. Risks/gaps/assumptions/open questions are represented where present.
5. Include visible Source Coverage section in HTML output.

Markdown remains source of truth.
