# Codex Backend Prompt Template

## Purpose
Implement backend work from approved documentation with layered architecture.

## Inputs Required
- API spec
- Backend spec
- DB schema
- Acceptance criteria

## Rules
- Maintain layer order: routes → controllers → services → repositories → models.
- Keep business logic in services.
- Keep data access in repositories only.
- Add tests for core business flows and error paths.
- Validate request/response contracts against `api-spec.md`.

## Output Format
- Plan
- Endpoint/layer impact summary
- Traceability mapping
- Test evidence
