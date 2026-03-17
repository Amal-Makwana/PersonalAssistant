# GET /system/diagnostics/activity

## Purpose
Return recent diagnostics activity entries.

## Response (`200`)
```json
{
  "activity": [
    {
      "id": "string",
      "message": "string",
      "level": "info | warning | error",
      "createdAt": "ISO-8601 string"
    }
  ]
}
```
