# Mock API Contracts

## GET /events

### Purpose
Provide deterministic mock events for the prototype Dashboard → Events List → Event Detail flow.

### Response schema
```json
{
  "events": [
    {
      "id": "string",
      "title": "string",
      "date": "ISO-8601 string",
      "location": "string",
      "reminderPlan": [{ "offset": "string" }]
    }
  ]
}
```

### Example payload
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

### Error scenario
`GET /events?scenario=error` returns HTTP `500`:

```json
{
  "error": "Internal Server Error",
  "message": "Mock error scenario triggered."
}
```
