# Vertical Slice Completion – Event APIs Persistence

Use this prompt when event APIs are partially DB-backed and need full route-level persistence consistency.

## Prompt

Complete the Events API vertical slice in `apps/api` with minimal safe changes.

Goal:
Create Event -> Read Events -> Event Detail -> Update Reminder Plan -> Notification History all use Supabase/Postgres.

Requirements:
1. Preserve architecture: `routes -> controllers -> services -> repositories`.
2. Remove fixture/in-memory behavior from event repository paths.
3. Keep response contracts stable for the frontend.
4. Persist reminder plan updates in DB (minimal schema extension allowed).
5. Persist/read notification history in DB (minimal schema extension allowed).
6. Ensure all event endpoints use consistent DB event IDs.
7. Keep validation and error semantics compatible with existing clients.
8. Update integration tests for end-to-end DB-backed event route behavior.
9. Update Product + Design docs to mark event APIs as DB-backed system of record.
10. Record prompt-library guidance for reuse.

Definition of done:
- Event API endpoints are DB-backed end-to-end.
- No event endpoint requires fixtures/in-memory state.
- Frontend event flows continue to work with unchanged API shapes.
- Tests pass.
