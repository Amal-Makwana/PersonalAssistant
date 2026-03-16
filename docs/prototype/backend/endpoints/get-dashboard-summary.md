# GET /dashboard/summary

## Purpose
Return deterministic summary data for S03 Dashboard.

## Request schema
- Method: `GET`
- Path: `/dashboard/summary`
- Query:
  - `scenario=empty` (optional): returns zero counts.
  - `scenario=error` (optional): forces `500`.

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
  "nextEventId": "evt-001"
}
```

## Error responses
- `500` with `?scenario=error`.
