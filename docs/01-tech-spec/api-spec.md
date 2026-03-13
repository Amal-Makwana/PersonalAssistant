# API Specification

## 1. API Overview
RESTful JSON API for authentication handoff, preference management, event visibility, and internal processing triggers. Base path: `/api/v1`.

## 2. API Style and Standards
- JSON over HTTPS only
- Resource-oriented URIs, nouns not verbs
- UTC timestamps in ISO-8601
- Versioning in path (`/v1`)

## 3. Authentication Model
- Browser session via secure httpOnly cookie established after OAuth callback
- Service-to-service/internal callbacks use signed bearer tokens or HMAC signatures

## 4. Authorization Rules
- End-users may access only own resources
- Internal endpoints require service principal scopes
- Admin scopes (future) explicitly out of V1

## 5. Request/Response Conventions
- `Content-Type: application/json`
- Success envelope:
```json
{ "data": { }, "meta": { "traceId": "..." } }
```
- Error envelope:
```json
{ "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [] }, "meta": { "traceId": "..." } }
```

## 6. Error Response Standards
- `400` validation/parsing issues
- `401` unauthenticated
- `403` unauthorized
- `404` resource not found
- `409` idempotency/duplicate conflicts
- `429` rate limited
- `5xx` transient or unknown server failures

## 7. Pagination / Filtering / Sorting Standards
- Cursor pagination default for timeline endpoints
- Query conventions:
  - `limit` (max 100)
  - `cursor`
  - `sort` (e.g., `-createdAt`)
  - filters by status/date/channel as documented

## 8. Validation Rules
- Input schema validation at boundary
- Unknown fields rejected in strict mode
- Canonical enums for status/channel values
- Date-time inputs normalized to UTC

## 9. Endpoint Catalogue

### 9.1 Start Google Auth
- **endpoint name:** Start Google Auth
- **purpose:** Begin OAuth consent flow
- **method:** `GET`
- **route:** `/api/v1/auth/google/start`
- **auth requirement:** none
- **request payload:** none
- **query/path params:** optional `redirectUri`
- **response examples:** `302` redirect to Google consent URL
- **validation rules:** allow-listed redirect URI only
- **error cases:** invalid redirect URI (`400`)
- **business notes:** entrypoint for FR-01/FR-02

### 9.2 Auth Callback
- **endpoint name:** Google Auth Callback
- **purpose:** Exchange auth code, create session
- **method:** `GET`
- **route:** `/api/v1/auth/google/callback`
- **auth requirement:** none
- **request payload:** none
- **query/path params:** `code`, `state`
- **response examples:** `302` to app dashboard; session cookie set
- **validation rules:** state must match server nonce
- **error cases:** expired code (`401`), invalid state (`400`)
- **business notes:** stores delegated token for Gmail/Calendar scopes

### 9.3 Get Current User Profile
- **endpoint name:** Get Me
- **purpose:** Return authenticated account and capability flags
- **method:** `GET`
- **route:** `/api/v1/me`
- **auth requirement:** session required
- **request payload:** none
- **query/path params:** none
- **response examples:**
```json
{ "data": { "userId": "u_123", "email": "user@example.com", "capabilities": { "sms": true, "calendarSync": true } }, "meta": { "traceId": "tr_1" } }
```
- **validation rules:** n/a
- **error cases:** not authenticated (`401`)
- **business notes:** used for UI bootstrapping

### 9.4 Get Preferences
- **endpoint name:** Get Preferences
- **purpose:** Read channel preferences and sync flags
- **method:** `GET`
- **route:** `/api/v1/preferences`
- **auth requirement:** session required
- **request payload:** none
- **query/path params:** none
- **response examples:** `{"data":{"whatsappEnabled":true,"smsEnabled":false,"calendarSyncEnabled":true},"meta":{"traceId":"tr_2"}}`
- **validation rules:** n/a
- **error cases:** unauthorized (`401`)
- **business notes:** FR-11

### 9.5 Update Preferences
- **endpoint name:** Update Preferences
- **purpose:** Update channel toggles
- **method:** `PATCH`
- **route:** `/api/v1/preferences`
- **auth requirement:** session required
- **request payload:** `{ "smsEnabled": true, "calendarSyncEnabled": false }`
- **query/path params:** none
- **response examples:** updated preference object
- **validation rules:** booleans only; immutable required channels rejected
- **error cases:** validation error (`400`), policy conflict (`409`)
- **business notes:** audit log entry required

### 9.6 List Events
- **endpoint name:** List Events
- **purpose:** Retrieve extracted events for current user
- **method:** `GET`
- **route:** `/api/v1/events`
- **auth requirement:** session required
- **request payload:** none
- **query/path params:** `status`, `from`, `to`, `limit`, `cursor`, `sort`
- **response examples:** paginated event list with next cursor
- **validation rules:** date range <= 365 days
- **error cases:** invalid cursor (`400`)
- **business notes:** read model for transparency

### 9.7 Get Event Detail
- **endpoint name:** Get Event
- **purpose:** Retrieve event and reminders
- **method:** `GET`
- **route:** `/api/v1/events/{eventId}`
- **auth requirement:** session required
- **request payload:** none
- **query/path params:** `eventId` UUID
- **response examples:** event object with reminder instances and statuses
- **validation rules:** valid UUID
- **error cases:** not found (`404`), forbidden (`403`)
- **business notes:** used for incident triage UI

### 9.8 Internal Ingestion Trigger
- **endpoint name:** Ingestion Trigger
- **purpose:** enqueue fetch/process for a specific mailbox window
- **method:** `POST`
- **route:** `/api/v1/internal/ingestion/run`
- **auth requirement:** internal token required
- **request payload:** `{ "userId": "u_123", "since": "2026-01-01T00:00:00Z" }`
- **query/path params:** none
- **response examples:** `202 Accepted` with job id
- **validation rules:** internal scope + ISO timestamp
- **error cases:** unauthorized (`401`), rate limited (`429`)
- **business notes:** used by scheduler/maintenance

### 9.9 Provider Delivery Webhook
- **endpoint name:** Delivery Status Webhook
- **purpose:** receive provider status updates
- **method:** `POST`
- **route:** `/api/v1/webhooks/delivery-status`
- **auth requirement:** provider signature/HMAC
- **request payload:** provider-specific status payload mapped to normalized schema
- **query/path params:** optional provider account identifiers
- **response examples:** `200 {"data":{"accepted":true}}`
- **validation rules:** signature freshness and replay protection
- **error cases:** invalid signature (`401`), malformed payload (`400`)
- **business notes:** updates reminder attempt status and audit trail

## 10. Idempotency / Retry Considerations
- Mutation endpoints support `Idempotency-Key` header where replays are possible.
- Worker-triggered internal endpoints must dedupe on `(jobType, logicalKey, windowStart)`.
- Webhook handling must be replay-safe using provider message IDs.

## 11. Rate Limiting / Abuse Considerations
- Public session endpoints: per-IP and per-account limits.
- Internal endpoints: token scope + tighter burst limits.
- Webhooks: provider IP allow-list (when possible) + signature validation.

## 12. Audit / Traceability Considerations
- Every write endpoint logs actor, action, before/after snapshot hash, and trace ID.
- Correlation IDs propagated to worker jobs and provider calls.
- Audit record retention aligned with `db-schema.md` and `security-nfr.md`.

## 13. Open Questions / Gaps
1. Should a dedicated endpoint exist for manual event confirmation for low-confidence extraction?
2. Do we expose reminder delivery attempts directly in V1 API or aggregate status only?
3. Which fields must be exportable for compliance requests?
