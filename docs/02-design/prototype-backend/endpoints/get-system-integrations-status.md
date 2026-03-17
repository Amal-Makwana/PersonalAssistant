# GET /system/integrations/status

## Purpose
Return integration health/status summary for connected providers.

## Request
- Method: `GET`
- Path: `/system/integrations/status`

## Response (`200`)
```json
{
  "integrations": [
    {
      "provider": "google-calendar",
      "status": "connected",
      "lastCheckedAt": "2026-03-15T10:00:00.000Z"
    }
  ]
}
```

## Errors
- `500` internal server error
