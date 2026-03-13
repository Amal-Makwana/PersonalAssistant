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

## Output Format
- Schema proposal
- Migration plan
- Risk assessment
- Traceability mapping
