# Canonical Schema Alignment – Event APIs Persistence

Use this prompt when prototype or incremental code paths diverge from the canonical Supabase/Postgres schema.

## Prompt

Align event runtime APIs to canonical schema without broad refactors.

Goal:
`GET /events`, `GET /events/:id`, `PUT /events/:id/reminder-plan`, `GET /events/:id/notification-history`, and `GET /dashboard/summary` use canonical tables and UUID IDs.

Requirements:
1. Preserve backend layering: routes -> controllers -> services -> repositories.
2. Use canonical tables only: `events`, `reminders`, `delivery_attempts` (+ `calendar_sync_records` where relevant).
3. Do not create/use ad-hoc tables like `event_reminder_plans` or `event_notification_history`.
4. Derive reminder-plan response shape from `reminders` by time-difference mapping to Nh/Nm offsets.
5. Derive notification history from `reminders` + `delivery_attempts`.
6. Validate event IDs as UUIDs and remove fixture-style IDs from runtime examples.
7. Keep frontend response contracts stable via deterministic mapping layer.
8. Update docs and prompts that still reference fixture IDs or custom reminder/history tables.

Definition of done:
- Runtime event APIs are canonical-schema aligned.
- Dashboard references real UUID event IDs.
- Tests pass with UUID-based examples.
