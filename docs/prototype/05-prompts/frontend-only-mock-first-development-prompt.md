# Backend-Connected Prototype Development Prompt

Implement features for the prototype phase using the backend-connected architecture.

Rules:
1. Do not introduce new runtime fixture-only behavior for non-auth flows.
2. Keep auth in S01 mocked unless explicitly asked to implement real auth.
3. Route all S02-S09 (except auth) data operations through API endpoints.
4. Enforce validation and explicit error contracts (400/404/500) on backend changes.
5. Add/update tests whenever contracts, query logic, or UI states change.
6. Update `docs/prototype` endpoint docs and architecture docs with every contract shift.
7. Preserve UUID-based IDs and canonical reminder offset contract (`Nh|Nm`).
8. Maintain documentation-first discipline for architecture or workflow changes.

Current baseline:
- Event flows are API-backed.
- System flows (`profile`, `integrations`, `diagnostics`) are API-backed.
- Auth remains mocked.
