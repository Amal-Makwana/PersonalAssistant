# Technical Specification Prompts

## Prompt Name
Generate / Improve Full Technical Specification Documentation

### Purpose
Generate or improve the complete technical documentation baseline in `docs/01-tech-spec` with strong traceability to product requirements.

### When To Use
Use when creating a new tech-spec baseline, performing major architecture refinement, or aligning docs after requirement changes.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Generate or improve the technical documentation in docs/01-tech-spec for the Email-Driven Reminder Assistant.

Required markdown outputs:
- docs/01-tech-spec/tech-overview.md
- docs/01-tech-spec/backend-spec.md
- docs/01-tech-spec/frontend-spec.md
- docs/01-tech-spec/api-spec.md
- docs/01-tech-spec/db-schema.md
- docs/01-tech-spec/integration-spec.md
- docs/01-tech-spec/security-nfr.md

Also maintain diagram markdown set:
- docs/01-tech-spec/diagrams/system-context.md
- docs/01-tech-spec/diagrams/container-diagram.md
- docs/01-tech-spec/diagrams/component-diagram.md
- docs/01-tech-spec/diagrams/deployment-diagram.md
- docs/01-tech-spec/diagrams/data-model-diagram.md
- docs/01-tech-spec/diagrams/sequence-diagram-placeholders.md
- docs/01-tech-spec/diagrams/diagram-index.md

Quality and structure requirements:
- Enterprise-grade technical writing with implementation-ready clarity.
- Strong mapping to product requirements and UX flows.
- Explicit assumptions, constraints, and known risks.
- Consistent naming for services, domains, entities, and APIs.
- Non-functional requirements included (security, reliability, observability, performance).

Constraints:
- Markdown documentation only.
- Do NOT generate application code.

After markdown updates, regenerate docs/01-tech-spec/tech-spec-summary.html as a rich consolidated executive view with full section coverage, source mappings, traceability tables, and Product-summary-aligned visual style.
```

---

## Prompt Name
Generate / Improve Backend, API, and Data Specs

### Purpose
Refine backend service boundaries, API contracts, and database schema docs to implementation-ready quality.

### When To Use
Use when backend design, integration behavior, or data model details need expansion or correction.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Improve these technical docs with consistent cross-references:
- docs/01-tech-spec/backend-spec.md
- docs/01-tech-spec/api-spec.md
- docs/01-tech-spec/db-schema.md
- docs/01-tech-spec/integration-spec.md

Required depth:
- Backend: domain responsibilities, processing pipeline, jobs/workers, error handling, retries, idempotency.
- API: endpoint catalog, auth rules, request/response patterns, validation, error model, compatibility notes.
- DB schema: entities, relationships, constraints, indexes, lifecycle considerations.
- Integrations: Gmail/WhatsApp/SMS/Calendar interaction assumptions, fallback behavior, failure handling.

Rules:
- Keep language implementation-guiding but documentation-only.
- Keep terms and IDs consistent across all specs.
- Document assumptions and unresolved decisions explicitly.
- Do NOT generate application code.

After changes, regenerate docs/01-tech-spec/tech-spec-summary.html with complete content coverage, explicit source mapping, and Product-summary-aligned visual style.
```

---

## Prompt Name
Generate / Improve Technical Diagram Documentation

### Purpose
Ensure architecture diagram markdown files clearly represent system topology, flow, and deployment concerns.

### When To Use
Use when architecture evolves or diagram narratives are incomplete/inconsistent.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Update docs/01-tech-spec/diagrams/*.md to produce a coherent diagram set.

Requirements:
- System context, container, component, deployment, and data model viewpoints must be aligned.
- Add concise diagram intent, element definitions, and interpretation notes.
- Include sequence flow placeholders where detailed sequence diagrams are expected.
- Keep references synchronized with backend/API/db documentation.

Constraints:
- Documentation only.
- Do NOT generate application code.

After updates, regenerate docs/01-tech-spec/tech-spec-summary.html with complete content coverage, explicit source mapping, and Product-summary-aligned visual style.
```

---

## Prompt Name
Regenerate Tech Spec HTML Summary from Markdown

### Purpose
Refresh `docs/01-tech-spec/tech-spec-summary.html` as a premium technical stakeholder summary.

### When To Use
Use after any markdown change in `docs/01-tech-spec`.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Regenerate docs/01-tech-spec/tech-spec-summary.html from docs/01-tech-spec markdown files.

Presentation goals:
- Executive summary + table of contents with strong narrative continuity.
- Comprehensive, condensed coverage of all docs/01-tech-spec markdown files (including diagrams).
- Scannable sections/cards for backend, frontend, API, data model, integrations, security/NFR, and diagrams.
- Explicit source mapping labels and traceability/coverage tables.
- Highlight assumptions, constraints, risks, and open questions.
- Match the visual system used in docs/00-product/product-summary.html.

Rules:
- Markdown remains source of truth.
- HTML is presentation layer only.
- Do NOT generate application code.
```
