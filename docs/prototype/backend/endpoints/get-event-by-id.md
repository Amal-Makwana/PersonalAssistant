# GET /events/{id}

## Purpose
Return deterministic details for one event, including reminder plan data.

## Request Structure
- Method: `GET`
- Path: `/events/{id}`
- Path param:
  - `id` (required)

## Response Example
```json
{
  "id": "evt_1001",
  "title": "Quarterly Finance Review",
  "description": "Review quarterly targets and risk register.",
  "status": "active",
  "startAt": "2026-04-15T09:00:00Z",
  "endAt": "2026-04-15T10:00:00Z",
  "location": "HQ Room A",
  "participants": ["alex@example.com", "kim@example.com"],
  "reminderPlan": {
    "enabled": true,
    "offsetMinutes": [1440, 60, 15],
    "channels": ["in_app", "email"]
  }
}
```

## Mock Logic Description
- Looks up event fixture by ID.
- Returns immutable deterministic event detail fields.
- Returns runtime reminder plan state (in-memory fixture update aware).

## Error Scenarios
- `404` event ID not found.
- `500` forced mock failure mode.
