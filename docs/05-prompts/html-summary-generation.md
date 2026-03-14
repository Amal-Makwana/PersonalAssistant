# Prompt: HTML Summary Generation (All Documentation Sections)

## Required Summary Targets
- `docs/00-product/product-summary.html`
- `docs/01-ui-ux/ui-ux-summary.html`
- `docs/02-design/design-summary.html`
- `docs/03-execution-planning/execution-planning-summary.html`

## Canonical phase order
Product -> UI/UX -> Design -> Execution Planning

## Purpose
Generate premium consolidated stakeholder-facing HTML summaries from markdown source files while preserving markdown as source of truth.

## Global Rules
- Read all markdown files in the target section before generation.
- Include all major headings/topics from source markdown files.
- Include source labels and a visible source coverage section.
- Maintain style consistency using `docs/00-product/product-summary.html` as baseline.
- Preserve phase order and traceability chain: Product -> UI/UX -> Design -> Execution Planning.
- Do not generate application code.

## Execution Planning-Specific Enforcement (When target is `docs/03-execution-planning`)
- Cover build planning, backlog/dependencies, quality gates, and rollout/rollback planning comprehensively.
- Include milestone sequence, increment logic, critical path, readiness gates, and risk/assumption/open question coverage.
- Ensure references to runtime and reliability point to Design canonical artifacts instead of redefining them.

## HTML Coverage Check (Required Before Finalizing)
Run this check and fail generation if any item is not satisfied:
- Every markdown source file in the section is represented in HTML.
- Every markdown heading/topic is represented.
- Important tables/lists/traceability content are represented.
- Risks/gaps/assumptions/open questions are represented where present.
- No markdown topic is missing from the summary.

## Required Task Response Addendum
After generation, always output:
- Source files reviewed: `<list>`
- Coverage status: `Complete` or `Partial`
- Missing topics: `<list>` or `None`
- Style baseline used: `docs/00-product/product-summary.html`
