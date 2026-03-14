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

## Generation Instructions (Mandatory)
1. Read **all** markdown files in the target section (including relevant subfolders where applicable).
2. Synthesize one rich HTML summary with executive readability and strong narrative continuity.
3. Include all the content from all md files, including where present:
   - major headings/topics
   - decisions/requirements
   - scope/constraints/assumptions
   - major tables/lists and traceability content
   - risks/gaps/open questions
4. Include structured navigation and readability components:
   - table of contents
   - section cards / content grids / tables / callouts where useful
   - source labels on major sections
5. Include a visible **Source Coverage** section that lists all markdown files consolidated and a markdown-source-of-truth note.
6. Include traceability views (tables/matrices) where relevant.
7. Keep narrative summary-first, but comprehensive (not shallow).

## UI/UX-Specific Enforcement (When target is `docs/01-ui-ux`)
- Preserve MVP scope language: Gmail ingestion + Google Calendar sync are active MVP capabilities.
- Ensure WhatsApp/SMS are described only as post-MVP/future-phase if mentioned.
- Include consolidated coverage for screen inventory, IA, flow catalog, wireframes, components, design principles, and mockup intent.
- Include at least one traceability matrix row for calendar sync (FR-09/US-09), duplicate prevention (FR-10/US-07), and extraction review (FR-04/US-05).
- Include a states/flows/screens coverage section plus assumptions/gaps/open questions if present in markdown.

## Design-Specific Enforcement (When target is `docs/02-design`)
- Preserve phase order and traceability chain: Product -> UI/UX -> Design -> Task Planning -> Delivery.
- Keep MVP architecture explicit: Gmail ingestion, extraction, persistence, duplicate prevention, schedule generation, and Google Calendar sync are in MVP.
- Ensure WhatsApp/SMS are represented only as post-MVP extensibility and never as active MVP runtime components.
- Require explicit reliability coverage: retry behavior, terminal failure handling, persisted failure metadata, operator remediation flows, and observability/alert hooks.
- Require a design traceability matrix with at least calendar sync (FR-09/US-09), duplicate prevention (FR-10/US-07), and reliability/remediation references.

## Task Planning-Specific Enforcement (When target is `docs/03-task-planning`)
- Treat Task Planning as the execution bridge between Design and Delivery.
- Preserve canonical phase order and explicit upstream traceability.
- Include implementation stream sequencing, milestone entry/exit criteria, task dependencies, critical path, and thin-slice increment rationale.
- Keep MVP execution scope explicit (Gmail ingestion, extraction, persistence, dedupe, scheduling, Google Calendar sync) and mark WhatsApp/SMS only as future-phase placeholders.
- Include coverage for assumptions, constraints, risks/gaps, and open questions when present.

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

## Reusable Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Regenerate <section-summary.html> from markdown files in <section-folder>.

Mandatory requirements:
- Read all markdown files in <section-folder> (and relevant subfolders).
- Generate one rich consolidated stakeholder-facing HTML summary (not a lightweight overview).
- Include all content from markdown: all headings/topics, decisions/requirements, scope/constraints/assumptions, tables/lists, traceability content, and risks/gaps/open questions where present.
- Include table of contents, source labels, and a visible Source Coverage section listing all source markdown files.
- Include traceability views where relevant.
- Use docs/00-product/product-summary.html as CSS/style baseline.
- Markdown remains source of truth; HTML is a secondary artifact.
- Omission of major markdown content is a defect.

Before finalizing, run HTML Coverage Check:
1) Every markdown file represented
2) Every heading/topic represented
3) All tables/lists/traceability represented
4) Risks/gaps/assumptions/open questions represented where present
5) No topic missing

Output in response:
- Source files reviewed
- Coverage status: Complete/Partial
- Missing topics: None or list
- Style baseline used
```
