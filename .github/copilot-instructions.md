# AI Development Workflow (Repository Rules)

All AI agents working in this repository must follow the documentation-first workflow.

## Mandatory Workflow

Before writing any code always read documentation in this order:

1. docs/00-product
2. docs/01-tech-spec
3. docs/02-ui-ux
4. docs/03-design
5. docs/04-delivery

## Canonical Prompt Library

The canonical prompt library for repository documentation generation is in:
- `docs/05-prompts`

When generating or updating documentation, use prompts from this library to ensure reproducibility, workflow compliance, and consistent markdown + HTML outputs.

## Documentation Format Rule (Required)

For every major documentation section, maintain two synchronized layers:

1. **Markdown files** = detailed source of truth.
2. **Single premium HTML summary** = consolidated stakeholder-facing executive view.

Required consolidated HTML files:
- `docs/00-product/product-summary.html`
- `docs/01-tech-spec/tech-spec-summary.html`
- `docs/02-ui-ux/ui-ux-summary.html`
- `docs/03-design/design-summary.html`
- `docs/04-delivery/delivery-summary.html`

Mandatory HTML summary standard for every section:
- HTML summaries are not lightweight overviews; they must consolidate all major concepts, decisions, requirements, constraints, traceability anchors, and open questions from the section markdown.
- Preserve logical flow: section purpose/overview, consolidated narrative, key subsection synthesis, source mapping, traceability/coverage view, and gaps/risks/open questions where relevant.
- Include explicit mapping back to source markdown files and maintain clear stakeholder readability.
- Do not omit important markdown content for brevity; condense and structure it for readability instead.
- Use the visual system of `docs/00-product/product-summary.html` as the canonical style baseline (hero/header, chips, stats cards, section cards, source labels, content grids, traceability tables, and callouts) unless a shared template is later introduced.

Whenever markdown docs in a section change, the section summary HTML must be regenerated in the same PR/commit.

Mandatory HTML completeness enforcement (required before finalizing any section HTML summary):
- Generator must read all markdown files in the section.
- HTML summary must represent all major headings/topics, decisions, requirements, tables/lists, traceability content, scope statements, assumptions, risks, gaps, and open questions where present in markdown.
- Important markdown content must never be omitted merely for brevity.
- Consolidation/restructure is allowed for readability, but completeness is mandatory.

HTML Coverage Check (required):
- Verify every markdown source file in the section is represented.
- Verify every major markdown heading/topic is represented in HTML narrative or structured components.
- Verify major tables/lists/traceability content are represented.
- Verify risks/gaps/assumptions/open questions are represented where present.
- Verify no major markdown topic is missing.
- If any check fails, treat as a documentation defect and revise before completion.

Source Coverage Manifest requirement (required in HTML):
- Include a visible “Source Coverage” (or equivalent) section in each section summary HTML.
- List all markdown source files consolidated for that section.
- Include optional subsection-to-source mapping where helpful.
- Include an explicit note that markdown remains the source of truth.

Mandatory HTML Completeness Checklist (apply on every HTML regeneration):
- [ ] All markdown files in the section were reviewed.
- [ ] All major headings/topics are represented.
- [ ] Requirements/stories/criteria/decisions are represented where applicable.
- [ ] Tables and traceability content are represented where applicable.
- [ ] Risks/assumptions/gaps/open questions are represented where applicable.
- [ ] HTML uses Product summary visual style baseline.
- [ ] HTML remains synchronized with markdown.


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
