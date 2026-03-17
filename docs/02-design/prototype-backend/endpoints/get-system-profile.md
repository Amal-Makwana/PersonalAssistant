# GET /system/profile

## Purpose
Return current profile/settings snapshot used by settings and account screens.

## Request
- Method: `GET`
- Path: `/system/profile`

## Response (`200`)
```json
{
  "profile": {
    "displayName": "Alex",
    "timezone": "UTC",
    "defaultReminderOffsets": [1440, 180, 60]
  }
}
```

## Errors
- `500` internal server error
