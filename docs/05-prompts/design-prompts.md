# Design Documentation Prompts

## Prompt Name
Generate / Improve Architecture Documentation (docs/03-design)

### Purpose
Generate or improve architecture documentation for `docs/03-design` with clear system boundaries, rationale, and quality attributes.

### When To Use
Use when creating the design section baseline or aligning architecture docs to updated product/tech specs.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Generate or improve architecture documentation in docs/03-design.

Expected documentation scope:
- Architecture overview and system boundaries.
- Major subsystems and responsibilities.
- External dependencies and integration boundaries.
- Reliability, scalability, and security design considerations.
- Explicit assumptions and constraints.

Quality requirements:
- Enterprise-grade architecture writing.
- Clear alignment to docs/00-product and docs/01-tech-spec.
- Decision rationale should be explicit, not implied.

Constraints:
- Documentation only.
- Do NOT generate application code.

After markdown updates, regenerate docs/03-design/design-summary.html.
```

---

## Prompt Name
Generate / Improve System Design Documentation

### Purpose
Document detailed system behavior and operational design decisions for implementation guidance.

### When To Use
Use when design-level details (flows, resiliency, scaling, fault handling) need to be added or refined.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Generate or improve system-design documentation in docs/03-design.

Required content:
- End-to-end system interaction narratives.
- Data flow and control flow boundaries.
- Failure modes, retries, and fallback design behavior.
- Operational concerns: observability, deployment assumptions, and supportability.
- Trade-offs and design constraints.

Rules:
- Keep structure explicit and traceable to tech specs.
- Keep language implementation-guiding but documentation-only.
- Do NOT generate application code.

After updates, regenerate docs/03-design/design-summary.html.
```

---

## Prompt Name
Generate / Improve Design Diagram Documentation

### Purpose
Create and maintain architecture/system design diagram documentation and explanation text.

### When To Use
Use when diagrams are added, changed, or require stronger explanatory context.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Generate or improve design diagram documentation under docs/03-design.

Include:
- Diagram purpose and viewpoint.
- Element glossary/legend.
- Assumptions and interpretation guidance.
- Cross-references to supporting technical specs.

Rules:
- Ensure all diagrams and narratives are mutually consistent.
- Keep markdown as source of truth.
- Do NOT generate application code.

After markdown updates, regenerate docs/03-design/design-summary.html.
```

---

## Prompt Name
Generate / Improve Architectural Decision Records (ADR)

### Purpose
Document durable architecture decisions and trade-offs using a consistent ADR format.

### When To Use
Use when new architecture decisions are made, revised, or deprecated.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Generate or improve ADR documentation in docs/03-design.

ADR format requirements:
- Title
- Status
- Context
- Decision
- Alternatives Considered
- Consequences
- Links to impacted docs (product/tech-spec/ui-ux/design)

Rules:
- Keep ADR statements concise, auditable, and decision-focused.
- Preserve consistency with architecture/system-design docs.
- Do NOT generate application code.

After ADR updates, regenerate docs/03-design/design-summary.html.
```
