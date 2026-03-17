# PUT /events/{id}/reminder-plan

## Purpose
Persist reminder plan edits and channel selection for an event.

## Validation
- `id` must be UUID.
- `reminderPlan` required and non-empty.
- Each `offset` must match `Nh` or `Nm`.
- `channels` object required; values must be booleans.

## Response (`200`)
```json
{
  "success": true,
  "eventId": "uuid",
  "message": "Reminder plan saved",
  "reminderCount": 2,
  "channels": ["push", "email"],
  "savedAt": "ISO-8601 string",
  "totalReminders": 2,
  "enabledChannels": ["push", "email"]
}
```

## Error responses
- `400` validation failure.
- `404` event not found.
- `500` internal error.
