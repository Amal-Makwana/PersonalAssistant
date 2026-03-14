# Deprecated Legacy Prompt (Reference Only)

This prompt is preserved for historical context and is not part of the canonical prompt workflow.

# Codex Database Prompt Template

## Purpose
Design and evolve persistence schema based on documented requirements.

## Inputs Required
- Product requirements and acceptance criteria (`docs/00-product`)
- API contracts and DB schema doc (`docs/01-tech-spec`)
- Integration and deployment considerations (`docs/01-tech-spec`, `docs/03-design`)
- Security/NFR requirements (`docs/01-tech-spec/security-nfr.md`)

## Rules
- Every schema change must map to a requirement and acceptance criterion.
- Include migration and rollback strategy.
- Document indexes, constraints, and data retention implications.
- Consider privacy, PII handling, and least privilege access.
- If DB-related docs change, refresh section summaries (typically `docs/01-tech-spec/tech-spec-summary.html` and `docs/03-design/design-summary.html`) in the same update.

## Output Format
- Schema proposal
- Migration plan
- Risk assessment
- Traceability mapping
- Documentation sync note (markdown + section HTML summary)
