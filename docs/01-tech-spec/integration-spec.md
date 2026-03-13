# Integration Specification

## 1. Purpose
Define internal and external integration contracts, failure expectations, and observability requirements.

## 2. Integration Overview
Core integrations:
- Google OAuth + Gmail + optional Calendar
- WhatsApp provider
- Optional SMS provider
- Internal queue and webhook pipelines

## 3. Internal Integrations
- API service -> worker queue (job enqueue/dequeue)
- Worker -> database repositories
- Scheduler -> ingestion/dispatch jobs
- Webhook ingress -> delivery status update service

## 4. External Integrations

### Google OAuth
- **system name:** Google OAuth
- **purpose:** user authentication and delegated consent
- **direction of data flow:** bidirectional
- **auth method:** OAuth 2.0 authorization code flow
- **data exchanged:** auth code, access/refresh tokens, profile claims
- **failure handling:** fail login, show recoverable retry state
- **retry expectations:** not auto-retried on invalid grant; user re-consent required
- **timeout considerations:** 5-10s API timeout
- **rate limiting considerations:** honor Google quota and backoff headers
- **monitoring expectations:** auth success rate and callback error code distribution

### Gmail API
- **system name:** Gmail API
- **purpose:** fetch and process event-bearing emails
- **direction of data flow:** inbound to platform
- **auth method:** delegated OAuth bearer token
- **data exchanged:** message metadata/body snippets/thread references
- **failure handling:** classify transient vs permanent; queue retries for transient
- **retry expectations:** exponential backoff with jitter; max-attempt threshold then dead-letter
- **timeout considerations:** 10s request timeout with circuit-breaker policy
- **rate limiting considerations:** per-user and global quota handling
- **monitoring expectations:** fetch throughput, parse success, quota rejection rate

### WhatsApp Provider
- **system name:** WhatsApp Messaging Provider
- **purpose:** primary reminder delivery channel
- **direction of data flow:** outbound messages + inbound delivery callbacks
- **auth method:** API key/token + provider webhook signature
- **data exchanged:** destination, reminder text/template, provider message ID, delivery states
- **failure handling:** retry transient send failures, mark terminal failures with reason code
- **retry expectations:** bounded retries with escalating delay
- **timeout considerations:** 5s call timeout, asynchronous callback for final status
- **rate limiting considerations:** provider throughput quotas and burst controls
- **monitoring expectations:** accepted/sent/delivered/failed ratios by cohort

### SMS Provider (Optional)
- **system name:** SMS Gateway Provider
- **purpose:** optional secondary reminder channel
- **direction of data flow:** outbound + callback inbound
- **auth method:** API credentials + signed callbacks
- **data exchanged:** phone destination, message body, status receipts
- **failure handling:** channel-specific error mapping
- **retry expectations:** similar bounded retry policy as WhatsApp
- **timeout considerations:** 5s request timeout
- **rate limiting considerations:** sender/region throughput caps
- **monitoring expectations:** per-region delivery and error rates

### Google Calendar API (Optional)
- **system name:** Google Calendar API
- **purpose:** sync normalized events to calendar
- **direction of data flow:** outbound upsert + optional reconciliation reads
- **auth method:** delegated OAuth token
- **data exchanged:** event title/time/location and provider event IDs
- **failure handling:** mark sync pending/failed, retry async
- **retry expectations:** transient retries + manual reconcile tooling
- **timeout considerations:** 10s timeout
- **rate limiting considerations:** quota/backoff compliance
- **monitoring expectations:** sync success/failure counts and lag

## 5. Webhooks / Event Triggers
- Delivery status webhook endpoint with signature verification and replay protection
- Internal scheduler triggers ingestion windows and due-reminder dispatch scans
- Provider callback events mapped to normalized delivery states

## 6. Dependency Risks
- Provider outages or SLA degradation can delay reminders
- API contract changes from third parties may break adapters
- Quota exhaustion can create backlog spikes

## 7. Fallback Behaviour
- On provider transient failure: enqueue retry with backoff
- On repeated failure: dead-letter + alert + user-visible status failure
- Channel fallback (WhatsApp -> SMS) is currently an open decision (not guaranteed in V1)

## 8. Testing Considerations
- Sandbox credentials for each provider
- Contract tests with recorded provider payload fixtures
- Chaos tests for timeouts/rate limits/webhook retries

## 9. Open Questions / Gaps
1. Which provider(s) are final for WhatsApp and SMS in V1 contract freeze?
2. Is automated channel fallback required for MVP or deferred?
3. What is acceptable maximum dispatch lag during provider incident windows?
