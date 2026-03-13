# Codex Backend Prompt Template

## Purpose
Implement backend work from approved documentation with layered architecture.

## Inputs Required
- Technical overview, backend spec, API spec, DB schema, integration spec (`docs/01-tech-spec`)
- Architecture and flow design docs (`docs/03-design`)
- Acceptance criteria (`docs/00-product/acceptance-criteria.md`)
- Delivery constraints (`docs/04-delivery`)

## Rules
- Maintain layer order: routes → controllers → services → repositories → models.
- Keep business logic in services.
- Keep data access in repositories only.
- Add tests for core business flows and error paths.
- Validate request/response contracts against `api-spec.md`.
- When backend-related markdown sections are updated, refresh the corresponding section summary HTML (`tech-spec-summary.html`, `design-summary.html`, and/or `delivery-summary.html`).

## Output Format
- Plan
- Endpoint/layer impact summary
- Traceability mapping
- Test evidence
- Documentation sync note (markdown + section HTML summary)
