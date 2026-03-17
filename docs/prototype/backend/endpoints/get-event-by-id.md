# GET /events/{id}

## Purpose
Return DB-backed event detail payload.

## Validation
- `id` must be a valid UUID.

## Responses
- `200` event payload (same shape as list item).
- `400` invalid UUID.
- `404` event not found.
- `500` internal error.
