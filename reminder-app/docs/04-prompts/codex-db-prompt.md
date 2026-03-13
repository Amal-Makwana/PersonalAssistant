# Codex Database Prompt Template

## Purpose
Design and evolve persistence schema based on documented requirements.

## Inputs Required
- Product requirements
- API contracts
- DB schema doc
- Security/NFR requirements

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
