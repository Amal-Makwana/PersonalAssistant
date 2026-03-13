# HTML Summary Generation Prompts

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

Visual/structure expectations:
- Premium executive-friendly layout and typography.
- Sections for vision, scope, personas, requirements, stories, acceptance readiness.
- Scannable hierarchy, concise narrative, and traceability cues.

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

Visual/structure expectations:
- Professional technical layout with strong content density and readability.
- Sections for architecture overview, backend, API, DB schema, integrations, security/NFR, and diagrams.
- Explicit assumptions/risks highlights where present in markdown.

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

Visual/structure expectations:
- Design-led layout with high scannability.
- Sections for IA, flows, screen inventory, wireframes, component model, and design principles.
- Preserve cross-references and canonical screen/component IDs.

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

Visual/structure expectations:
- High-trust architecture presentation style.
- Sections for architecture overview, system design, key decisions, and ADR/diagram highlights.
- Strong hierarchy and concise trade-off framing.

Rules:
- Markdown remains source of truth.
- HTML is presentation layer only.
- Do NOT generate application code.
```
