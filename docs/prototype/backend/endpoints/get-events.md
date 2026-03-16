# GET /events

## Purpose
Return deterministic event list payload for Events List.

## Request schema
- Method: `GET`
- Path: `/events`
- Query:
  - `delay=true|1` (optional deterministic delay)
  - `scenario=error` (optional forced 500)

## Response schema (`200`)
```json
{
  "events": [
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
  ]
}
```

## Example payload
```json
{
  "events": [
    {
      "id": "evt-001",
      "title": "Dentist Appointment",
      "date": "2026-03-20T09:00:00Z",
      "location": "Smile Clinic",
      "status": "scheduled",
      "duplicate": false,
      "syncStatus": "synced",
      "reminderPlan": [{ "offset": "24h" }, { "offset": "3h" }, { "offset": "1h" }]
    }
  ]
}
```

## Error responses
- `500` with `?scenario=error`.

## Mock behavior
- Source fixture: `reminder-app/apps/api/fixtures/events.fixture.json`
- No database.
- No external integrations.
