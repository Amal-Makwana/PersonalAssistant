# Prototype System Architecture

## Overview
The prototype system is a local, deterministic architecture composed of:
1. Mock frontend application
2. Mock backend API service
3. Shared fixture contracts (documented shape alignment)

The goal is to test product flow realism without production dependencies.

## High-Level Components
- **Frontend (mock UI):** screen rendering, user flows S01-S09, API invocation through service adapters.
- **Backend (mock APIs):** route/controller/service/repository layers with fixture-based responses.
- **Fixture layer:** deterministic JSON/TS objects used for list/detail/update flows.

## Data Flow
1. User interacts with screen.
2. Frontend service calls mock API endpoint.
3. Backend service returns deterministic DTO from fixtures.
4. Frontend maps DTO to view model and renders updated state.

## Scope Guardrails
- No database
- No external integrations
- No OAuth/auth provider
- No storage/persistence beyond in-memory fixture updates during runtime

## Determinism Rules
- Fixture IDs are stable and predictable.
- Responses for identical requests are identical unless deterministic simulation mode is toggled.
- Error modes are explicit and scenario-driven rather than random.
