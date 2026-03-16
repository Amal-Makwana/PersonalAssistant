# Frontend Spec (Prototype Profile)

## Profile
Frontend-only, mock-first architecture for local UX validation.

## Stack
- React + TypeScript
- Vite
- React Router
- Tailwind CSS
- Vitest + React Testing Library
- ESLint + Prettier

## Requirements Translation Layer
- Reminder plan preview -> deterministic local offset calculation against event time
- Reminder channel preview -> local fixture-backed delivery-channel status indicators
- Authentication -> mocked session state
- Ingestion -> mocked event feed state
- Persistence -> in-memory updates
- Deduplication -> simulated duplicate UX handling
- Calendar sync -> mocked status indicators
- Retry behavior -> simulated retry interactions
- Provider failures -> fixture-driven error scenarios

## Architecture
UI Components -> Feature Modules -> Mock Service Layer -> Local Fixtures

## Reminder preview implementation note
Reminder plan/channel previews intentionally simulate future scheduling behavior in the frontend only.

## Non-Goals
No backend, DB, real API integration, cloud infra, or external auth providers.
