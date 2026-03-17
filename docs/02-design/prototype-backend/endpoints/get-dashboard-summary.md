# GET /dashboard/summary

## Purpose
Return deterministic summary data for S03 Dashboard.

## Request schema
- Method: `GET`
- Path: `/dashboard/summary`
- Query:
  - `scenario=empty` (optional): returns zero counts.
  - `runtime-errors-only` (optional): forces `500`.

## Response schema (`200`)
```json
{
  "upcomingCount": "number",
  "needsReviewCount": "number",
  "failedCount": "number",
  "nextEventId": "string?"
}
```

## Example payload
```json
{
  "upcomingCount": 2,
  "needsReviewCount": 1,
  "failedCount": 0,
  "nextEventId": "22222222-2222-4222-8222-222222222222"
}
```

## Error responses
- `500` with `?runtime-errors-only`.
