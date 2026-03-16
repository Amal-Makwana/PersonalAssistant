# PUT /events/{id}/reminder-plan

## Purpose
Persist reminder plan changes in deterministic in-memory fixtures for prototype runtime behavior.

## Request Structure
- Method: `PUT`
- Path: `/events/{id}/reminder-plan`
- Body:
```json
{
  "enabled": true,
  "offsetMinutes": [1440, 60, 15],
  "channels": ["in_app", "email"]
}
```

## Response Example
```json
{
  "eventId": "evt_1001",
  "saved": true,
  "reminderPlan": {
    "enabled": true,
    "offsetMinutes": [1440, 60, 15],
    "channels": ["in_app", "email"]
  },
  "updatedAt": "2026-04-01T12:00:00Z"
}
```

## Mock Logic Description
- Validates reminder plan payload.
- Updates in-memory fixture state for target event.
- Returns deterministic confirmation DTO.
- Subsequent detail read reflects updated runtime state.

## Error Scenarios
- `400` invalid payload values.
- `404` event ID not found.
- `409` unsupported reminder transition.
- `500` forced mock failure mode.
