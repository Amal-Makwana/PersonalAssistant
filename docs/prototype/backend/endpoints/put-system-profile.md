# PUT /system/profile

## Purpose
Update profile preferences.

## Request body
```json
{
  "timezone": "string",
  "calendarSyncEnabled": false
}
```

## Responses
- `200` updated profile payload.
- `400` when `timezone` is missing.
