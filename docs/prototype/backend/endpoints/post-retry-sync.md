# POST /events/{id}/retry-sync

## Purpose
Retry calendar sync for an event and update sync status.

## Response (`200`)
```json
{
  "eventId": "uuid",
  "status": "synced"
}
```

## Error responses
- `400` invalid UUID.
- `404` event not found.
