# Prompt: Full Documentation Generation (Repository-Wide Consolidated View)

Follow `.github/copilot-instructions.md` and the repository documentation workflow.

Repository Command:
Create full docs

## Purpose
Generate a single governed, rich HTML artifact consolidating ALL markdown documentation across all documentation sections.

## Primary Output Artifact
- `docs/full-docs.html`
- if a file exists already delete it and replace with newly generated one

If `docs/full-docs.html` exists:
- delete it
- regenerate from scratch

Markdown files remain the canonical source of truth.

Do not generate application code.

---

## SECTION 1 — CANONICAL DOCUMENTATION TREE

Read markdown files from the canonical documentation structure in this order:

1. `docs/00-product/`
2. `docs/01-ui-ux/`
3. `docs/02-design/`
4. `docs/03-execution-planning/`

Only read `.md` files.

Ignore:
- HTML files
- prompt files
- images
- assets

---

## SECTION 2 — STEP 1: SOURCE MANIFEST (MANDATORY)

Before generating HTML, enumerate every markdown file.

Create a **Source Manifest** containing:

- Section Name
- File Path

Example:

Product
- `docs/00-product/product-overview.md`
- `docs/00-product/requirements.md`

UI/UX
- `docs/01-ui-ux/screens.md`
- `docs/01-ui-ux/states.md`

Design
- `docs/02-design/architecture.md`
- `docs/02-design/runtime-flow.md`

Execution Planning
- `docs/03-execution-planning/build-plan.md`
- `docs/03-execution-planning/backlog-and-dependencies.md`

This manifest must be used to ensure no file is skipped.

---

## SECTION 3 — STEP 2: HEADING MANIFEST (MANDATORY)

For every markdown file, extract all headings:

- H1
- H2
- H3

Example:

File: `docs/02-design/runtime-flow.md`

Headings:
- Runtime Flow Overview
- Ingestion Pipeline
- Event Extraction
- Deduplication Logic
- Reminder Scheduling
- Calendar Sync

This heading manifest will be used to enforce coverage.

---

## SECTION 4 — CORE GENERATION RULES

The final HTML must:

- include ALL content from ALL markdown files
- preserve ALL headings
- preserve ALL tables
- preserve ALL lists
- preserve traceability matrices
- preserve assumptions, risks, gaps, open questions
- preserve requirement tables
- preserve diagrams references

No material content may be removed for brevity.

Large output is expected.

Completeness is prioritized over brevity.

Reordering is allowed for readability.

---

## SECTION 5 — DETERMINISTIC DOCUMENT STRUCTURE

Always generate the exact structure below.

1. Full Documentation Title / Hero
2. Overall Executive Summary
3. Repository Documentation Overview
4. Table of Contents
5. Section-by-section full output

For each section:

```text
## <Section Name>

### Section Summary
Concise executive overview.

### Consolidated Documentation

Then process each markdown file individually.

Use the following pattern for EVERY file:

-------------------------------------------------

### Source File
docs/<section>/<file>.md

#### Source Summary
Short description of the file's purpose.

#### Full Consolidated Details

Include all content from the markdown file including:

- headings
- paragraphs
- tables
- lists
- traceability matrices
- risks
- assumptions
- open questions
- decisions

Maintain heading hierarchy.

-------------------------------------------------

After all files in the section:

### Section Coverage
List files included.
```

---

## SECTION 6 — CROSS SECTION ANALYSIS

After all sections include:

- Cross-Section Traceability Summary
- Key Repository Risks
- Repository Open Questions
- Cross-Section Dependencies

---

## SECTION 7 — SOURCE COVERAGE MANIFEST (MANDATORY)

At the end of the HTML document include:

Source Coverage Manifest

For each file include:

- File Path
- Headings Found
- Headings Represented
- Coverage Status

Example:

`docs/02-design/runtime-flow.md`
- Headings Found: 6
- Headings Represented: 6
- Coverage Status: Complete

---

## SECTION 8 — HTML GENERATION RULES

Generate output as:

`docs/full-docs.html`

Styling must follow:

`docs/00-product/product-summary.html`

Use the same CSS style baseline.

Allowed enhancements:

- hero header
- section cards
- chips/tags
- stats blocks
- callouts
- tables
- source badges
- coverage blocks

Structure must remain deterministic.

---

## SECTION 9 — FULL DOCS COVERAGE CHECK (MANDATORY)

Before finalizing output perform validation.

Verify:

- Every markdown file appears in Source Manifest
- Every markdown file appears in HTML
- Every heading appears in HTML
- Tables are preserved
- Traceability matrices are preserved
- Risks/assumptions/open questions preserved

If any item fails:

- Coverage Status: Partial
- List missing files/headings.

---

## SECTION 10 — TASK RESPONSE ADDENDUM (MANDATORY)

When command `Create full docs` runs, output this validation summary:

```text
Full Docs Coverage Check:

Sections reviewed:
Product, UI/UX, Design, Execution Planning

Source files reviewed: <count>

Coverage status: Complete / Partial

Missing topics: <list> or None

Style baseline used: Product summary HTML

Output artifact: docs/full-docs.html
```
