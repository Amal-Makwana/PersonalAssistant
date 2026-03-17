# Prototype System Architecture

## Overview
The prototype architecture is now **backend-connected**, not mock-first.

Primary components:
1. Web application (`apps/web`)
2. API service (`apps/api`)
3. PostgreSQL-backed repository layer

Auth remains intentionally mocked in `S01` until auth integration is prioritized.

## High-Level Components
- **Frontend:** screen rendering, state transitions, API invocation through typed service clients.
- **Backend API:** route/controller/service/repository layering with validation and contract responses.
- **Persistence layer:** canonical tables (`events`, `reminders`, `delivery_attempts`, `calendar_sync_records`, `user_preferences`, `source_messages`, `users`).

## Data Flow
1. User interaction triggers frontend service call.
2. API validates request and executes service logic.
3. Repository reads/writes DB.
4. API returns contract-aligned DTO.
5. Frontend maps DTO into view model and renders.

## Guardrails
- Do not introduce runtime fixture data for non-auth flows.
- Keep frontend API contracts aligned to backend DTOs.
- Keep UUID validation and explicit 400/404/500 behavior.
- Keep docs and prompts synchronized with architecture changes.
