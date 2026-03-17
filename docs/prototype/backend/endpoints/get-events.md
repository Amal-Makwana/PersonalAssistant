# GET /events

## Purpose
Return DB-backed event list payload for Events List.

## Request schema
- Method: `GET`
- Path: `/events`
- Query:
  - `delay=true|1` (optional deterministic delay simulation)

## Response schema (`200`)
```json
{
  "events": [
    {
      "id": "uuid",
      "title": "string",
      "date": "ISO-8601 string",
      "location": "string?",
      "status": "scheduled | needs-review | failed",
      "duplicate": "boolean",
      "syncStatus": "synced | pending | failed",
      "reminderPlan": [{ "offset": "Nh | Nm" }]
    }
  ]
}
```

## Error responses
- `500` internal errors.

## Runtime behavior
- Source of truth: DB (`events`, `reminders`, `calendar_sync_records`).
- No fixture-based runtime responses.
