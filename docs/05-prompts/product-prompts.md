# Product Documentation Prompts

## Prompt Name
Generate / Improve Product Documentation (Enterprise PRD Set)

### Purpose
Generate or improve the complete `docs/00-product` documentation set so it is internally consistent, enterprise-grade, and traceable.

### When To Use
Use when creating or upgrading the product documentation baseline, or when business requirements materially change.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Generate or improve the full Product documentation section in docs/00-product for an Email-Driven Reminder Assistant.

Output scope (markdown source of truth):
- docs/00-product/vision.md
- docs/00-product/scope-v1.md
- docs/00-product/user-personas.md
- docs/00-product/requirements.md
- docs/00-product/user-stories.md
- docs/00-product/acceptance-criteria.md

Quality bar:
- Enterprise-grade structure and language.
- Clear business context, goals, constraints, and assumptions.
- Traceability: requirements -> user stories -> acceptance criteria.
- Stable IDs for requirements and stories (for example FR-xx / US-xx).
- Consistent terminology across all product files.
- Explicit non-goals and out-of-scope boundaries.

Formatting rules:
- Markdown only for source documents.
- Use headings, bullet lists, and tables where useful.
- Keep sections concise but complete; avoid vague statements.

Important constraints:
- Do NOT generate application code.
- Do NOT modify technical implementation code.
- Only documentation outputs.

After markdown is complete, regenerate docs/00-product/product-summary.html as a rich consolidated executive view with complete section coverage, source mappings, traceability cues, and canonical Product visual style.
```

---

## Prompt Name
Merge Business Requirements Into Canonical requirements.md

### Purpose
Consolidate fragmented business requirements into `docs/00-product/requirements.md` while preserving intent and removing duplication.

### When To Use
Use when requirements exist in multiple drafts/notes and need one canonical baseline.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Merge business requirements into docs/00-product/requirements.md.

Instructions:
1. Consolidate overlapping or duplicated requirement statements.
2. Preserve the strongest wording and full business intent.
3. Resolve conflicts explicitly; if conflict cannot be resolved, log an assumption/open question.
4. Normalize requirement IDs and keep ordering stable.
5. Ensure each requirement is testable and maps to one or more user stories.
6. Ensure terminology matches other product files.

Output rules:
- Markdown only.
- Keep enterprise PRD tone.
- Do NOT generate application code.

After merge/update, regenerate docs/00-product/product-summary.html from markdown as a complete executive synthesis with source mappings and traceability coverage.
```

---

## Prompt Name
Generate / Improve Product User Stories and Acceptance Criteria

### Purpose
Ensure `user-stories.md` and `acceptance-criteria.md` are complete, testable, and mapped to product requirements.

### When To Use
Use when product flows evolve or when acceptance quality is insufficient for delivery readiness.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Generate or improve docs/00-product/user-stories.md and docs/00-product/acceptance-criteria.md.

Requirements:
- Every user story must map to one or more FR IDs from requirements.md.
- Every acceptance criteria block must map to a US ID and remain measurable/verifiable.
- Include happy path, failure path, and edge behavior where relevant.
- Keep naming, IDs, and wording consistent with all product docs.
- Preserve a traceability section/table.

Constraints:
- Documentation only.
- Do NOT generate application code.

After updates, regenerate docs/00-product/product-summary.html from final markdown as a complete executive synthesis with source mappings and traceability coverage.
```

---

## Prompt Name
Regenerate Product HTML Summary from Markdown

### Purpose
Create/refresh `docs/00-product/product-summary.html` as a premium stakeholder view sourced from markdown product files.

### When To Use
Use after any markdown change in `docs/00-product`.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Regenerate docs/00-product/product-summary.html using docs/00-product markdown as the only source of truth.

Presentation goals:
- Executive-friendly narrative and visual hierarchy with table of contents.
- Comprehensive condensed coverage of all product markdown files (not a shallow overview).
- Clear source mapping labels and traceability cues (FR/US/AC references).
- Include assumptions/constraints, summary stats, and open questions where present in markdown.
- Maintain canonical Product visual language (this file is the style baseline).

Rules:
- Do not invent net-new product behavior not present in markdown.
- Keep markdown as canonical; HTML is presentation layer only.
- Do NOT generate application code.
```
