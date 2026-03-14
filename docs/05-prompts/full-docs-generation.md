# Prompt: Full Documentation Generation (Repository-Wide Consolidated View)

Repository Command:
Create full docs

## Purpose
Generate a single governed, rich HTML artifact that consolidates all markdown documentation into one deterministic, section-organized full-documentation view.

Primary output artifact:
- `docs/full-docs.html`
- if a file exists already delete it and replace with newly generated one

## Canonical Documentation Scope (Read Order)
Read all markdown files from the canonical documentation tree in this order:
1. `docs/00-product/*`
2. `docs/01-ui-ux/*`
3. `docs/02-design/*`
4. `docs/03-execution-planning/*`

## Core Generation Rules (Mandatory)
- Read **every markdown file** in each in-scope section before generating output.
- Include **all content** from all source markdown files.
- Do not omit any headings/topics, decisions, tables, matrices, traceability content, risks, assumptions, constraints, gaps, or open questions merely for brevity.
- Reorganization for readability is allowed, but completeness is mandatory.
- The overall summary must appear before all section content.
- A section summary must appear before each section's detailed content.
- The final artifact is a rich consolidated documentation view, not an abbreviated digest.
- Do not generate application code.

## Deterministic Output Structure (Use Exactly)
Always produce the same top-level structure and ordering:

1. Full Documentation Title / Hero
2. Overall Executive Summary
3. Repository / Documentation Scope Overview
4. Table of Contents
5. Section-by-section full output

For each section, always use this exact pattern:

```text
## <Section Name>

### Section Summary
- concise executive summary of the section

### Full Details
- include all the details from all markdown files in that section
- preserve source-to-content visibility
- include subsections, tables, traceability views, assumptions, constraints, risks, gaps, open questions, and decision points where present

After all sections, always include:
6. Cross-Section Traceability / Dependency Summary
7. Key Risks / Open Questions Across the Repository
8. Source Coverage Manifest for the full docs output

## Rich HTML Styling and Presentation Rules
- Generate output as rich HTML at `docs/full-docs.html`.
- Follow `docs/00-product/product-summary.html` as the visual/CSS baseline.
- Keep strong visual hierarchy and premium stakeholder readability.
- Include, where useful and supported by source content:
  - hero section
  - chips/tags
  - stats cards
  - card-based section layout
  - source labels
  - tables/matrices/callouts
  - visible source-coverage blocks
- Extend the Product HTML baseline consistently; do not redesign away from it.
- Keep deterministic structure while allowing tasteful presentation details within the baseline.

## Full Docs Coverage Check (Required Before Finalizing)
Before finalizing, run a Full Docs Coverage Check. Fail generation if any criterion is not met.

Verification requirements:
- Every markdown file across all canonical sections is represented.
- Every heading/topic is represented.
- All tables, matrices, traceability content, risks, assumptions, gaps, and open questions are represented where present.
- No markdown topic is missing from the final output.

## Required Task Response Addendum (Mandatory)
When command `Create full docs` runs, always include this validation note in the response:

```text
Full Docs Coverage Check:
- Sections reviewed: <list>
- Source files reviewed: <count/list>
- Coverage status: Complete / Partial
- Missing topics: <list> or None
- Style baseline used: Product summary HTML
- Output artifact: docs/full-docs.html
```

Also provide a short command response summary including:
- sections included
- coverage status
- output file path
