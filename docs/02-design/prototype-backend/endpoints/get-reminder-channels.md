# GET /events/:id/reminder-channels

## Purpose
Return channel enablement state for an event reminder configuration flow.

## Request
- Method: `GET`
- Path: `/events/:id/reminder-channels`
- Path params:
  - `id` (required, UUID)

## Response (`200`)
```json
{
  "eventId": "22222222-2222-4222-8222-222222222222",
  "channels": {
    "push": true,
    "email": true,
    "sms": false
  }
}
```

## Errors
- `400` invalid UUID
- `404` event not found
- `500` internal server error
