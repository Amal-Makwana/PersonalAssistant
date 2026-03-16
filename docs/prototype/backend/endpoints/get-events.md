# GET /events

## Request
- Method: `GET`
- URL: `/events`
- Optional query params:
  - `delay=true` (adds deterministic mock delay)
  - `scenario=error` (forces HTTP 500)

## Response
- Status `200`

```json
{
  "events": [
    {
      "id": "evt-1",
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

## Mock behaviour
- Data source: `reminder-app/apps/api/fixtures/events.fixture.json`
- Deterministic payload
- No database
- No external integrations
- No persistence

## Error simulation
- `GET /events?scenario=error`
- Response: status `500` + error payload
