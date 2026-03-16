# GET /dashboard/summary

## Purpose
Return deterministic dashboard summary for S03 Dashboard.

## Request
- Method: `GET`
- URL: `/dashboard/summary`
- Optional query params:
  - `scenario=empty` (returns zero counts)
  - `scenario=error` (forces HTTP 500)

## Response Example
```json
{
  "upcomingCount": 2,
  "needsReviewCount": 1,
  "failedCount": 0,
  "nextEventId": "evt-1"
}
```

## Notes
- Fixture-backed and deterministic.
- No DB and no external integrations.
