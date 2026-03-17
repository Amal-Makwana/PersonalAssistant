# POST /system/retry-sync

## Purpose
Trigger retry of a failed sync operation and return queued status.

## Request
- Method: `POST`
- Path: `/system/retry-sync`
- Body:
```json
{
  "eventId": "22222222-2222-4222-8222-222222222222"
}
```

## Response (`202`)
```json
{
  "accepted": true,
  "eventId": "22222222-2222-4222-8222-222222222222",
  "status": "queued"
}
```

## Errors
- `400` invalid request
- `404` event not found
- `500` internal server error
