# Mock API Contracts

## API 1 — GET /events

### Request Schema
- Method: `GET`
- Path: `/events`
- Query params (optional):
  - `status`: `planned | active | completed`
  - `cursor`: string
  - `limit`: integer (default 20)

### Response Schema
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

### Example Payload
- Request: `GET /events?status=active&limit=20`
- Response: deterministic fixture subset filtered by status.

### Mock Behavior
- Returns deterministic list from fixture repository.
- Pagination cursor behavior is deterministic and stable.

### Possible Error Responses
- `400` invalid `limit` or unknown `status`
- `500` forced mock failure mode

---

## API 2 — GET /events/{id}

### Request Schema
- Method: `GET`
- Path: `/events/{id}`
- Path param:
  - `id`: string (`evt_*`)

### Response Schema
```json
{
  "id": "evt_1001",
  "title": "Quarterly Finance Review",
  "description": "Review quarterly targets and risk register.",
  "status": "active",
  "startAt": "2026-04-15T09:00:00Z",
  "endAt": "2026-04-15T10:00:00Z",
  "location": "HQ Room A",
  "participants": ["alex@example.com", "kim@example.com"],
  "reminderPlan": {
    "enabled": true,
    "offsetMinutes": [1440, 60, 15],
    "channels": ["in_app", "email"]
  }
}
```

### Example Payload
- Request: `GET /events/evt_1001`
- Response: deterministic detail fixture for `evt_1001`.

### Mock Behavior
- Fetches event detail by ID from fixtures.
- Returns `404` when ID is absent.

### Possible Error Responses
- `404` event not found
- `500` forced mock failure mode

---

## API 3 — PUT /events/{id}/reminder-plan

### Request Schema
- Method: `PUT`
- Path: `/events/{id}/reminder-plan`
- Body:
```json
{
  "enabled": true,
  "offsetMinutes": [1440, 60, 15],
  "channels": ["in_app", "email"]
}
```

### Response Schema
```json
{
  "eventId": "evt_1001",
  "saved": true,
  "reminderPlan": {
    "enabled": true,
    "offsetMinutes": [1440, 60, 15],
    "channels": ["in_app", "email"]
  },
  "updatedAt": "2026-04-01T12:00:00Z"
}
```

### Example Payload
- Request: `PUT /events/evt_1001/reminder-plan`
- Response: deterministic confirmation payload with updated in-memory fixture state.

### Mock Behavior
- Validates payload shape and allowed values.
- Updates in-memory fixture for current runtime only.
- Follow-up `GET /events/{id}` returns updated reminder plan deterministically.

### Possible Error Responses
- `400` invalid payload (`offsetMinutes` unsupported, invalid channel)
- `404` event not found
- `409` disallowed reminder plan transition
- `500` forced mock failure mode
