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
