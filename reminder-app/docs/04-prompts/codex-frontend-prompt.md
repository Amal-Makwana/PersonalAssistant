# Codex Frontend Prompt Template

## Purpose
Implement frontend changes strictly from approved docs.

## Inputs Required
- Product requirements and user stories (`docs/00-product`)
- Frontend technical constraints (`docs/01-tech-spec/frontend-spec.md`, `docs/01-tech-spec/api-spec.md`)
- UI/UX definitions (`docs/02-ui-ux`)
- Relevant architecture and sequence details (`docs/03-design`)
- Delivery tasks and acceptance gating (`docs/04-delivery`)

## Rules
- Use feature-based folders under `apps/web/features`.
- Keep UI components reusable and colocated by domain.
- UI generation must prioritize `docs/02-ui-ux` as the source of screens, flows, wireframes, and components.
- Map each UI behavior to requirements + acceptance criteria.
- Add/update tests for user-critical flows.

## Output Format
- Plan
- Files changed
- Traceability mapping
- Test evidence
