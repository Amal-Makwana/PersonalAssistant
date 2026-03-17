# Prototype Phase Note (Product)

The full product-document set for prototype delivery now lives in this folder:
`docs/prototype/00-product`.

- Events vertical slice now includes real persistence for `GET /events`, `GET /events/:id`, and `POST /events` using Supabase/Postgres.
- Production-grade auth providers and broader backend infrastructure are still intentionally deferred.
- Product requirements continue to be validated through UI-state contracts and interaction flows.
- Remaining backend endpoints stay mock-driven until later vertical slices move them to persistence, while event list/detail retrieval stays DB-backed.
