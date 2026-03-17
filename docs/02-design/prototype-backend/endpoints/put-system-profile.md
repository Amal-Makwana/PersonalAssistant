# PUT /system/profile

## Purpose
Update system/profile preferences used across settings and reminder defaults.

## Request
- Method: `PUT`
- Path: `/system/profile`
- Body:
```json
{
  "displayName": "Alex",
  "timezone": "UTC",
  "defaultReminderOffsets": [1440, 180, 60]
}
```

## Response (`200`)
```json
{
  "success": true,
  "updatedAt": "2026-03-15T10:00:00.000Z"
}
```

## Errors
- `400` validation error
- `500` internal server error
