# Route-Level DB Consistency Fix Prompt

Use this prompt when one backend route in a vertical slice has moved to real persistence but a sibling route is still fixture-backed.

## Prompt

Implement a **minimal safe consistency fix** in `apps/api` while preserving existing architecture and API contract.

Goal:
Align route-level data sources so list and detail endpoints in the same slice are both DB-backed.

Requirements:
1. Preserve layering: `routes -> controllers -> services -> repositories`.
2. Keep route contracts unchanged for frontend compatibility.
3. Update repository detail-read method to query Postgres/Supabase by id.
4. Update service/controller code only as needed for async flow.
5. Avoid broad refactors and avoid unrelated endpoint changes.
6. Update route integration tests to validate DB-backed list and DB-backed detail together.
7. Confirm frontend path that calls detail endpoint can load existing DB event IDs.
8. Update docs and prompt library entry to capture the consistency pattern for reuse.

Definition of done:
- API boots locally.
- GET list endpoint is DB-backed.
- GET detail endpoint is DB-backed.
- Existing frontend detail screen loads using list-provided IDs.
- Tests pass with updated DB-backed expectations.
