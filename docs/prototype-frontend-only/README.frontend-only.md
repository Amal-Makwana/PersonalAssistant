# Frontend-Only Prototype Documentation Hub

This folder contains a **parallel documentation track** for the frontend-only mock-first prototype phase.

## Current implementation focus (incremental vertical slice)
Implemented slice:
- **S03 Dashboard** -> summary/overview + CTA navigation
- **S04 Events List** -> list rendering + filter handling + detail navigation
- **S05 Event Detail** -> detail rendering + mock reminder edit/save flow

This slice is the active implementation baseline for future frontend-only prototype work.

## Scope constraints (strict)
- Frontend-only
- Local-run only
- Mock fixtures and mock service layer only
- No backend, DB, API, auth provider, or external integration calls

## Deferred areas (for later increments)
- Additional depth for S01/S02/S06/S07/S08/S09
- Any real persistence or backend integrations
- Any OAuth/provider implementation details beyond mocked state surfaces

## Visual System Direction
- Primary type: Inter for core UI.
- Secondary technical type: JetBrains Mono for logs/diagnostics/status fragments.
- Palette: light slate background, white cards, sky/teal accents, soft blue borders.
- Pattern language: rounded editorial cards, subtle hover elevation, section-based layout rhythm.

## Stack
- React + TypeScript
- Vite
- React Router
- Tailwind CSS
- Vitest + React Testing Library
- ESLint + Prettier

## Architecture
UI Components
↓
Feature Modules
↓
Mock Service Layer
↓
Local Fixtures

## Local Run (from `reminder-app/apps/web`)
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:5173`

## Quality Checks
- `npm run lint`
- `npm run test`
- `npm run build`

## Prototype Documentation Index
- `00-product/prototype-phase-note.md`
- `01-ui-ux/prototype-phase-note.md`
- `02-design/frontend-spec-prototype.md`
- `03-execution-planning/build-plan-prototype.md`
- `03-execution-planning/test-and-quality-gates-prototype.md`
- `05-prompts/frontend-only-mock-first-development-prompt.md`
- `99-ai-rules/AI_DEVELOPMENT_WORKFLOW_FRONTEND_ONLY.md`
