# Prototype Roadmap

## Build Order
1. `GET /events`
2. `GET /events/{id}`
3. `PUT /events/{id}/reminder-plan`
4. Dashboard summary endpoint
5. Notification history endpoint

## Delivery Notes
- Implement in this sequence to unblock core list -> detail -> edit flow first.
- Maintain deterministic fixtures at each stage.
- Keep all prototype work isolated from canonical product implementation scope.

## Quality Plan Update
- Integration testing is now an explicit prototype quality gate for frontend↔mock-backend behavior.
- Contract-shape assertions must be updated when fixture schema or endpoint payloads change.
- Keep all integration execution local-only and deterministic.
