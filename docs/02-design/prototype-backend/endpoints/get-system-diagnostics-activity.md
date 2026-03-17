# GET /system/diagnostics/activity

## Purpose
Return recent diagnostics and operational activity rows for diagnostics UI.

## Request
- Method: `GET`
- Path: `/system/diagnostics/activity`

## Response (`200`)
```json
{
  "activity": [
    {
      "id": "diag-001",
      "type": "sync",
      "status": "failed",
      "message": "Calendar sync failed",
      "timestamp": "2026-03-15T10:00:00.000Z"
    }
  ]
}
```

## Errors
- `500` internal server error
