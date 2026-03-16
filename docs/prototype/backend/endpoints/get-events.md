# GET /events

## Request
- Method: `GET`
- URL: `/events`
- Optional query params:
  - `delay=true` (enables 300ms–800ms mock latency)
  - `scenario=error` (forces HTTP 500)

## Response
- Status `200`

```json
{
  "events": [
    {
      "id": "evt-001",
      "title": "Parent Teacher Meeting",
      "date": "2026-05-14T10:00:00Z",
      "location": "School Hall",
      "reminderPlan": [{ "offset": "24h" }, { "offset": "1h" }]
    }
  ]
}
```

## Mock behaviour
- Data source: `apps/api/fixtures/events.fixture.json`
- Deterministic payload
- No database
- No external integrations
- No persistence

## Error simulation
- `GET /events?scenario=error`
- Response: status `500` + error payload
