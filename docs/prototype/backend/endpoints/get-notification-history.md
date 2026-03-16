# GET /events/{id}/notification-history

## Purpose
Return deterministic notification activity for S05 Event Detail.

## Request
- Method: `GET`
- URL: `/events/{id}/notification-history`
- Optional query params:
  - `scenario=error` (forces HTTP 500)

## Response Example
```json
{
  "eventId": "evt-1",
  "history": [
    {
      "id": "n-1",
      "status": "Scheduled",
      "remindAt": "2026-03-19T09:00:00Z",
      "channels": ["push", "email"],
      "direction": "upcoming"
    },
    {
      "id": "n-3",
      "status": "Failed",
      "remindAt": "2026-03-19T08:30:00Z",
      "channels": ["email"],
      "direction": "past"
    }
  ]
}
```

## Error Scenarios
- `404` event ID not found.
- `500` forced mock failure mode.

## Status Coverage
Fixture statuses include: `Scheduled`, `Sent`, `Failed`, `Cancelled`.
