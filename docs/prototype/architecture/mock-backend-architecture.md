# Mock Backend Architecture

## Backend Stack
Recommended stack: **Node.js + Express** (or Fastify equivalent if preferred by implementation team).

## Layered Structure
`routes -> controllers -> services -> mock repository`

### Route Layer
- Declares endpoint paths and HTTP methods.
- Applies request validation middleware.
- Forwards validated requests to controllers.

### Controller Layer
- Parses request params/query/body into typed input DTOs.
- Invokes service methods.
- Maps service outputs/errors to HTTP responses.

### Service Layer
- Implements use-case logic (`listEvents`, `getEventById`, `saveReminderPlan`).
- Applies deterministic business rules for validation and state transitions.
- Delegates fixture read/write simulation to repository.

### Mock Repository
- Uses in-memory fixture sets loaded at startup.
- Provides deterministic reads by ID/list filter.
- Supports in-memory update for reminder plans in runtime only.

## Fixture Strategy
- Single source fixture files with stable IDs and timestamps.
- Explicit scenario fixtures for success and controlled errors.
- No random data generation.

## DTO Shapes
- `EventListItemDto`: summary card/list fields.
- `EventDetailDto`: full event details including reminder plan.
- `ReminderPlanUpsertRequestDto`: update payload for reminder plan.
- `ReminderPlanUpsertResponseDto`: confirmation + updated plan metadata.

## Deterministic Response Behavior
- Identical request input produces identical response payload.
- Any variant behavior must be keyed by deterministic scenario flag.
- No non-deterministic timing/data mutations.

## Error Simulation
- Deterministic error paths:
  - `400` validation failure
  - `404` event not found
  - `409` invalid reminder plan transition
  - `500` forced mock failure mode
- Error simulation triggered by explicit fixture/scenario key, not randomness.

## Latency Simulation
- Optional fixed latency window (for example 150ms, 300ms).
- Optional deterministic endpoint-specific delays for UI loading-state verification.

## Hard Rules
- **NO DATABASE**
- **NO EXTERNAL APIs**
- **NO OAUTH**
- **NO STORAGE**
