# GET /events/{id}/notification-history

## Purpose
Return derived notification history from reminders and delivery attempts.

## Validation
- `id` must be UUID.

## Response (`200`)
```json
{
  "eventId": "uuid",
  "history": [
    {
      "id": "string",
      "status": "Scheduled | Sent | Failed | Cancelled",
      "remindAt": "ISO-8601 string",
      "channels": ["push | email | sms"],
      "direction": "past | upcoming"
    }
  ]
}
```

## Error responses
- `400` invalid UUID.
- `404` event not found.
- `500` internal error.
