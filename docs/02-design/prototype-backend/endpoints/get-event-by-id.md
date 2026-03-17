# GET /events/{id}

## Purpose
Return deterministic full details for a single event (S05 Event Detail).

## Request schema
- Method: `GET`
- Path: `/events/{id}`
- Path params:
  - `id` (required string): stable fixture ID such as `22222222-2222-4222-8222-222222222222`.
- Query:
  - `runtime-errors-only` (optional): force `500`.

## Response schema (`200`)
```json
{
  "id": "string",
  "title": "string",
  "date": "ISO-8601 string",
  "location": "string?",
  "status": "scheduled | needs-review | failed",
  "duplicate": "boolean",
  "syncStatus": "synced | pending | failed",
  "reminderPlan": [{ "offset": "Nh | Nm" }]
}
```

## Example payload
```json
{
  "id": "22222222-2222-4222-8222-222222222222",
  "title": "Dentist Appointment",
  "date": "2026-03-20T09:00:00Z",
  "location": "Smile Clinic",
  "status": "scheduled",
  "duplicate": false,
  "syncStatus": "synced",
  "reminderPlan": [{ "offset": "24h" }, { "offset": "3h" }, { "offset": "1h" }]
}
```

## Error responses
- `404` unknown event ID.
- `500` with `?runtime-errors-only`.
