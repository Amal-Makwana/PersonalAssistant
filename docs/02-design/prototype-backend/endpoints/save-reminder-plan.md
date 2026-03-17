# PUT /events/{id}/reminder-plan

## Purpose
Accept reminder-plan edits from Event Detail and return deterministic mock save confirmation.

## Request schema
- Method: `PUT`
- Path: `/events/{id}/reminder-plan`
- Path params:
  - `id` (required string)
- Query:
  - `runtime-errors-only` (optional): force `500`
- Body:
```json
{
  "reminderPlan": [{ "offset": "2h" }, { "offset": "45m" }],
  "channels": { "push": true, "email": true, "sms": false }
}
```

Validation:
- `reminderPlan` must be present and non-empty.
- `offset` values must be `Nh` or `Nm`.
- `channels` object is required; channel values must be boolean.

## Response schema (`200`)
```json
{
  "success": true,
  "eventId": "string",
  "message": "string",
  "reminderCount": "number",
  "channels": ["push | email | sms"],
  "savedAt": "ISO-8601 string",
  "totalReminders": "number",
  "enabledChannels": ["push | email | sms"]
}
```

## Example payload
```json
{
  "success": true,
  "eventId": "22222222-2222-4222-8222-222222222222",
  "message": "Reminder plan saved",
  "reminderCount": 2,
  "channels": ["push", "email"],
  "savedAt": "2026-03-15T10:00:00.000Z",
  "totalReminders": 2,
  "enabledChannels": ["push", "email"]
}
```

## Error responses
- `400` invalid payload.
- `404` unknown event ID.
- `500` with `?runtime-errors-only`.
