# Prototype Phase Note (Product)

This prototype phase is **mock-first with separate frontend and backend apps**, with one active persistence exception.

- Events vertical slice now includes real persistence for all event APIs: `GET /events`, `GET /events/:id`, `POST /events`, `PUT /events/:id/reminder-plan`, and `GET /events/:id/notification-history` using Supabase/Postgres.
- Production-grade auth providers and broader backend infrastructure are still intentionally deferred.
- Product requirements continue to be validated through UI-state contracts and interaction flows.
- Remaining non-event backend endpoints stay mock-driven until later vertical slices move them to persistence, while event flows are DB-backed end-to-end.
