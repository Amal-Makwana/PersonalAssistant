# GET /events/{id}

## Purpose
Return deterministic details for one event, including reminder plan data.

## Request Structure
- Method: `GET`
- Path: `/events/{id}`
- Path param:
  - `id` (required)
- Query:
  - `scenario=error` (optional, forces 500)

## Response Example
```json
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
```

## Mock Logic Description
- Looks up fixture event by ID.
- Returns immutable deterministic fields.
- Returns reminder plan updates applied in-memory through reminder-plan save endpoint.

## Error Scenarios
- `404` event ID not found.
- `500` forced mock failure mode via `?scenario=error`.
