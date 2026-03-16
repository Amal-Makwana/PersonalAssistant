# Prototype System Documentation

## Purpose
This prototype validates end-to-end product behavior using a **mock frontend + mock backend API** system. It is intentionally constrained for rapid iteration, deterministic testing, and clear UI/API contracts.

## Separation from Canonical Product Documentation
- Canonical product/design/execution docs remain in:
  - `docs/00-product`
  - `docs/01-ui-ux`
  - `docs/02-design`
  - `docs/03-execution-planning`
- Prototype-specific assumptions and implementation rules live only under `docs/prototype`.
- Prototype documentation must not rewrite or replace canonical requirements.

## What Is Mocked
- Frontend data access layer and scenario switches
- Backend API routes and controller/service logic
- Repository reads/writes backed by in-memory deterministic fixtures
- Simulated latency and deterministic error modes

## What Is Deferred
- Real persistence/database schema migration work
- External API integrations
- OAuth/auth provider integrations
- Production infrastructure, queues, and observability stack hardening

## How to Run Locally
1. Start mock backend server from `apps/api` prototype entrypoint (to be implemented under prototype rules).
2. Start frontend app from `apps/web` with prototype mode enabled.
3. Frontend points to local mock backend base URL (for example `http://localhost:3001`).
4. Use deterministic fixtures and scenario toggles to validate stable behavior across runs.

## How Prototype APIs Work
- API contracts are defined in `backend/mock-api-contracts.md`.
- Endpoints are documented in `backend/endpoints/`.
- Responses are deterministic and fixture-derived.
- Error/latency simulation is controlled, explicit, and reproducible.

## Frontend ↔ Mock Backend Interaction
- UI screens call a frontend mock service layer that maps 1:1 to backend API contracts.
- Service adapters normalize DTOs for screen view models.
- No direct external service calls are allowed from UI in prototype scope.
- State refresh behavior after write operations (`PUT /events/{id}/reminder-plan`) is deterministic and fixture-driven.
