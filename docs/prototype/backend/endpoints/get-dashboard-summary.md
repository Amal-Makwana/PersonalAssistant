# GET /dashboard/summary

## Purpose
Return DB-backed dashboard aggregate counts and next event ID.

## Response (`200`)
```json
{
  "upcomingCount": 1,
  "needsReviewCount": 0,
  "failedCount": 0,
  "nextEventId": "uuid"
}
```

## Runtime behavior
- Aggregates and next event are calculated from `events` table.
