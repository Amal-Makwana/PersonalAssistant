# Vertical Slice – Events Persistence Prompt

Use this reusable prompt when implementing or extending the Events persistence slice in `reminder-app/apps/api`.

## Prompt

Implement a minimal backend vertical slice in `apps/api` using the existing layering (`routes -> controllers -> services -> repositories`) with no large refactors.

Goal:
Create Event -> Save to DB -> Return Event -> Display in UI.

Requirements:
1. Load local env vars from `apps/api/.env.local`.
2. Use a shared Postgres utility (`apps/api/lib/db.ts`).
3. Keep existing GET `/events` route and make repository read from Postgres.
4. Preserve the GET `/events` response contract expected by frontend.
5. Add POST `/events` in existing boundaries (route/controller/service/repository).
6. POST body: `title`, `description`, `event_date`.
7. Minimal validation only for required fields and basic date validity.
8. Insert into `events` table and return created row.
9. Avoid temporary endpoints; avoid broad refactors.
10. Update docs to reflect shift from mock-only to real persistence for events.

Database context:
- Supabase/Postgres
- `events` table columns: `id`, `title`, `description`, `event_date`, `created_at`

Definition of done:
- API starts locally
- GET `/events` reads from DB
- POST `/events` inserts to DB
- GET `/events` returns inserted event
- docs updated
