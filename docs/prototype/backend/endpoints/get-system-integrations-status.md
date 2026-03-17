# GET /system/integrations/status

## Purpose
Return integration status summary for Integrations screen.

## Response (`200`)
```json
{
  "googleAuth": "connected | disconnected",
  "gmailIngestion": "healthy | degraded",
  "calendarSync": "enabled | disabled"
}
```
