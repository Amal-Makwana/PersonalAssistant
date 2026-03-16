# PUT /events/{id}/reminder-plan

## Purpose
Accept reminder plan edits and return deterministic in-memory mock save confirmation.

## Request Structure
- Method: `PUT`
- Path: `/events/{id}/reminder-plan`
- Body:
```json
{
  "reminderPlan": [{ "offset": "2h" }, { "offset": "45m" }],
  "channels": { "push": true, "email": true, "sms": false }
}
```

## Response Example
```json
{
  "eventId": "evt-1",
  "savedAt": "2026-03-15T10:00:00.000Z",
  "totalReminders": 2,
  "enabledChannels": ["push", "email"]
}
```

## Mock Logic Description
- Validates `reminderPlan` offsets (`Nh` or `Nm` format) and non-empty plan.
- Applies runtime in-memory update for event reminder plan.
- Returns deterministic success DTO.

## Error Scenarios
- `400` invalid payload values.
- `404` event ID not found.
- `500` forced mock failure mode via `?scenario=error`.
