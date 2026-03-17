# GET /events/{id}/notification-history

## Purpose
Return deterministic notification history for Event Detail.

## Request schema
- Method: `GET`
- Path: `/events/{id}/notification-history`
- Path params:
  - `id` (required string)
- Query:
  - `runtime-errors-only` (optional): forces `500`.

## Response schema (`200`)
```json
{
  "eventId": "string",
  "history": [
    {
      "id": "string",
      "status": "Scheduled | Sent | Failed | Cancelled",
      "remindAt": "ISO-8601 string",
      "channels": ["push | email | sms"],
      "direction": "past | upcoming"
    }
  ]
}
```

## Example payload
```json
{
  "eventId": "22222222-2222-4222-8222-222222222222",
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

## Error responses
- `404` unknown event ID.
- `500` with `?runtime-errors-only`.
