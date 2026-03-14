# HTML Summary Generation Prompts

Use these prompts whenever regenerating section-level summary HTML.

Global requirements for all section HTML summaries:
- Read all markdown files in the target section before generating HTML.
- Produce a rich consolidated executive view (not a lightweight overview).
- Include comprehensive section coverage: major concepts, decisions, requirements, constraints, traceability anchors, and open questions from markdown.
- Preserve logical flow: overview/purpose, narrative synthesis, source-mapped subsections, traceability/coverage view, and risk/gap callouts where relevant.
- Include a table of contents and explicit source labels/mappings.
- Do not omit important markdown content for brevity; condense and structure it for readability.
- Use `docs/00-product/product-summary.html` as the canonical visual baseline for CSS/layout quality unless a shared template is introduced.
- Markdown remains source of truth; HTML is a secondary presentation artifact.

## Prompt Name
Regenerate docs/00-product/product-summary.html

### Purpose
Generate a premium stakeholder-facing product summary page from markdown source-of-truth files in `docs/00-product`.

### When To Use
Use after any markdown update in `docs/00-product`.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Regenerate docs/00-product/product-summary.html from docs/00-product markdown files.

Requirements:
- Read all markdown files in docs/00-product.
- Produce a complete executive summary with table of contents and source-mapped sections.
- Consolidate vision, requirements, personas, stories, acceptance coverage, scope boundaries, assumptions/constraints, and open questions.
- Include traceability and coverage views (FR/US/AC mappings and key counts).
- Preserve Product HTML visual system and premium readability.

Rules:
- Markdown remains source of truth.
- HTML is presentation layer only.
- Do NOT generate application code.
```

---

## Prompt Name
Regenerate docs/01-tech-spec/tech-spec-summary.html

### Purpose
Generate a premium engineering-facing technical summary page from markdown source-of-truth files in `docs/01-tech-spec`.

### When To Use
Use after any markdown update in `docs/01-tech-spec`.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Regenerate docs/01-tech-spec/tech-spec-summary.html from docs/01-tech-spec markdown files.

Requirements:
- Read all markdown files in docs/01-tech-spec (including diagrams/*.md).
- Produce a complete executive technical synthesis with table of contents and source labels.
- Cover architecture, backend, frontend, API, DB schema, integrations, security/NFR, diagrams, traceability, and open gaps/risks.
- Include traceability/coverage matrices and useful summary statistics where available.
- Follow the Product HTML visual language and layout quality bar.

Rules:
- Markdown remains source of truth.
- HTML is presentation layer only.
- Do NOT generate application code.
```

---

## Prompt Name
Regenerate docs/02-ui-ux/ui-ux-summary.html

### Purpose
Generate a premium design-facing UI/UX summary page from markdown source-of-truth files in `docs/02-ui-ux`.

### When To Use
Use after any markdown update in `docs/02-ui-ux`.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Regenerate docs/02-ui-ux/ui-ux-summary.html from docs/02-ui-ux markdown files.

Requirements:
- Read all markdown files in docs/02-ui-ux.
- Produce a complete executive UX synthesis with table of contents and source mappings.
- Cover IA, flows, screen inventory, wireframes, components, principles, mockups, constraints, and open questions.
- Preserve canonical screen/component IDs and include traceability views.
- Follow Product HTML visual language and readability standards.

Rules:
- Markdown remains source of truth.
- HTML is presentation layer only.
- Do NOT generate application code.
```

---

## Prompt Name
Regenerate docs/03-design/design-summary.html

### Purpose
Generate a premium architecture/design summary page from markdown source-of-truth files in `docs/03-design`.

### When To Use
Use after any markdown update in `docs/03-design`.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Regenerate docs/03-design/design-summary.html from docs/03-design markdown files.

Requirements:
- Read all markdown files in docs/03-design.
- Produce a complete executive architecture synthesis with table of contents and source labels.
- Cover architecture overview, system behavior, ADR decisions, diagrams, constraints, trade-offs, and open risks/questions.
- Include traceability and coverage views where relevant.
- Follow Product HTML visual language and readability standards.

Rules:
- Markdown remains source of truth.
- HTML is presentation layer only.
- Do NOT generate application code.
```
