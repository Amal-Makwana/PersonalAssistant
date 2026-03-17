# GET /events/{id}/reminder-channels

## Purpose
Return enabled reminder channels for an event.

## Response (`200`)
```json
{
  "push": true,
  "email": true,
  "sms": false
}
```

## Error responses
- `400` invalid UUID.
- `404` event not found.
