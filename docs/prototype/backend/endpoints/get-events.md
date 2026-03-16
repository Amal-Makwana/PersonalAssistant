# GET /events

## Purpose
Return a deterministic list of events for dashboard and event list screens.

## Request Structure
- Method: `GET`
- Path: `/events`
- Query:
  - `status` (optional)
  - `cursor` (optional)
  - `limit` (optional)

## Response Example
```json
{
  "items": [
    {
      "id": "evt_1001",
      "title": "Quarterly Finance Review",
      "status": "active",
      "startAt": "2026-04-15T09:00:00Z",
      "location": "HQ Room A"
    }
  ],
  "page": {
    "nextCursor": "evt_1001",
    "limit": 20,
    "total": 1
  }
}
```

## Mock Logic Description
- Reads event summaries from deterministic fixtures.
- Applies deterministic filtering and pagination.
- Returns stable ordering (for example by `startAt` then `id`).

## Error Scenarios
- `400` invalid query parameter values.
- `500` forced mock failure mode.
