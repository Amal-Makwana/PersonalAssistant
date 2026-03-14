# Prompt Library Index

## Purpose of Prompt Library

This folder stores the canonical, reusable prompts used to generate and improve this repository's documentation set. The prompts are written so future AI agents can reliably reproduce the current documentation quality and structure across Product, Tech Spec, UI/UX, Design, Delivery, and HTML summary outputs.

These prompts are documentation prompts only. They are not for generating application features or production code.

## Prompt Categories

- `product-prompts.md`
  - Prompts used to generate and improve `docs/00-product` markdown and product summary HTML.
- `tech-spec-prompts.md`
  - Prompts used to generate and improve `docs/01-tech-spec` markdown and technical summary HTML.
- `ui-ux-prompts.md`
  - Prompts used to generate and improve `docs/02-ui-ux` markdown and UI/UX summary HTML.
- `design-prompts.md`
  - Prompts used to generate and improve `docs/03-design` architecture/system-design documentation and summary HTML.
- `html-generation-prompts.md`
  - Section-specific prompts used to regenerate premium HTML presentation layers from markdown source-of-truth files.

## Governance & Review Prompts

### Critical Persona Review by Documentation Phase

- **Purpose:** Run deterministic, documentation-only critical reviews using a phase-appropriate expert persona to improve clarity, completeness, traceability, and readiness.
- **Supported phases:** Product, Tech Spec, UI/UX, Design, Delivery.
- **Output structure:** Persona justification, mandatory phase score (`X/5`), executive critique, findings table, priority fixes, rewrite suggestions, traceability validation, risk analysis, and score improvement path.
- **Governance notes:** Markdown-first workflow; no application code generation; regenerate the corresponding HTML summary whenever markdown sources are changed.
- **Location:** `docs/05-prompts/critical-persona-review.md`

### Repository Documentation Audit

- **Purpose:** Run a full repository documentation governance audit across Product, Tech Spec, UI/UX, Design, and Delivery.
- **Output:** Mandatory per-phase repository health scores (`X/5`) plus mandatory overall repository score (`X/5`), phase critiques, cross-phase inconsistencies, risk analysis, and implementation readiness.
- **Location:** `docs/05-prompts/repository-documentation-audit.md`


## Audit Scoring Rules (Mandatory)

- All audits must return explicit numeric scores in `X/5` format.
- Allowed values are whole-step or 0.5-step increments only: `0/5`, `0.5/5`, `1/5`, `1.5/5`, `2/5`, `2.5/5`, `3/5`, `3.5/5`, `4/5`, `4.5/5`, `5/5`.
- Full repository audits must return all five phase scores plus one overall repository score.
- Phase audits must return one phase score and a required score improvement path section.
- Scoring is never optional, even for incomplete or placeholder documentation.

## Recommended Usage for Phase Updates

When updating only Tech Spec and/or Design documentation:
- Start with `critical-persona-review.md` for the target phase (`tech-spec` or `design`) to drive focused quality and traceability edits.
- Use `repository-documentation-audit.md` when you need a full cross-phase governance validation across Product -> Tech Spec -> UI/UX -> Design -> Delivery.
- Keep markdown as source of truth and refresh the corresponding section HTML summary in the same change set.

## Repository Commands

Run full audit
Runs repository-wide documentation governance audit and saves output to `docs/06-governance`.

Run audit - <phase>
Runs documentation review for a specific phase (`product`, `tech-spec`, `ui-ux`, `design`, `delivery`).

Examples:

Run audit - product  
Run audit - tech-spec  
Run audit - ui-ux  
Run audit - design  
Run audit - delivery

## Mapping Between Prompts and Documentation Sections

| Documentation Section | Prompt Source | Primary Outputs |
| --- | --- | --- |
| `docs/00-product` | `product-prompts.md` | `vision.md`, `scope-v1.md`, `user-personas.md`, `requirements.md`, `user-stories.md`, `acceptance-criteria.md`, `product-summary.html` |
| `docs/01-tech-spec` | `tech-spec-prompts.md` | `tech-overview.md`, `backend-spec.md`, `frontend-spec.md`, `api-spec.md`, `db-schema.md`, `integration-spec.md`, `security-nfr.md`, `diagrams/*`, `tech-spec-summary.html` |
| `docs/02-ui-ux` | `ui-ux-prompts.md` | `ui-overview.md`, `information-architecture.md`, `user-flows.md`, `screen-inventory.md`, `wireframes.md`, `components.md`, `design-principles.md`, `ui-mockups.md`, `ui-ux-summary.html` |
| `docs/03-design` | `design-prompts.md` | architecture/system-design markdown, ADR documentation, design diagrams, `design-summary.html` |
| Repository-wide documentation audit | `repository-documentation-audit.md` | consolidated repository health scoring, cross-phase findings, critical risks, readiness rating, and top-priority fix list |
| HTML summaries | `html-generation-prompts.md` | `product-summary.html`, `tech-spec-summary.html`, `ui-ux-summary.html`, `design-summary.html` |

## Prompt Usage Workflow

1. Read and follow:
   - `.github/copilot-instructions.md`
   - `docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md`
2. Select the prompt file matching the documentation section you are updating.
3. Run the markdown-generation prompt first and update markdown source-of-truth artifacts.
4. Run the corresponding HTML-generation prompt to refresh the section summary page.
5. Validate consistency across linked files (requirements ↔ stories ↔ acceptance criteria; specs ↔ diagrams; flows ↔ screens ↔ components).
6. Keep only documentation changes in the resulting update.

## Prompt Governance

- Prompts must remain reproducible and deterministic for equivalent inputs.
- Prompts must not generate application code.
- Prompts must follow repository workflow rules in `.github/copilot-instructions.md` and `docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md`.
- Prompts must generate markdown documentation first.
- HTML files are presentation layers generated from markdown source-of-truth documentation.
- Prompts should preserve enterprise-grade structure, traceability, and editorial consistency.
