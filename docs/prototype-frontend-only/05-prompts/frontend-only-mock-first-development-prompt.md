# Frontend-Only Mock-First Development Prompt

Implement UI-only features for the prototype phase.

Rules:
1. Do not implement backend services, databases, APIs, auth providers, or external integrations.
2. Use local fixtures and a mock service layer.
3. Simulate async loading/error/validation/permission scenarios.
4. Keep UI contracts aligned with canonical screen inventory S01-S09.
5. Update prototype README/docs when architecture or scope changes.
6. Follow documentation-first workflow before code changes.
7. Keep reminder planning/channel previews frontend-only and fixture-driven (no scheduling API calls).

Current baseline to extend from:
- S03 Dashboard -> S04 Events List -> S05 Event Detail
- S05 supports mock reminder plan preview, reminder channel preview, and reminder edit/save flow

When extending this prototype:
- Preserve deterministic scenario toggles
- Avoid backend drift or hidden API dependencies
- Update docs/prototype-frontend-only and reminder-app README when scope changes
