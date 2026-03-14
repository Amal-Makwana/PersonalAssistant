# Frontend Technical Specification

## 1. Purpose
Define frontend implementation architecture for onboarding, preferences, status visibility, and operational diagnostics in V1.

## 2. Frontend Scope
- Authentication initiation and session bootstrap
- Preference management UI for MVP-supported capabilities
- Event/reminder status visibility (read-only operational transparency)
- Error feedback, recoverability workflows, and account disconnect actions

## 3. Application Structure
- `apps/web` as Next.js application
- Feature-based modules: `auth`, `preferences`, `events`, `settings`, `observability`
- Shared primitives in `packages/ui` (buttons, forms, tables, feedback components)

## 4. Feature Module Strategy
Each feature module contains:
- route entrypoints
- api clients
- query keys + hooks
- zod schema validators
- view components
- feature-local tests

## 5. Routing Strategy
- App Router with route groups for authenticated vs unauthenticated sections
- Middleware guard to redirect anonymous users from protected routes
- Error and loading boundaries at route segment level

## 6. State Management Approach
- **Server state:** TanStack Query (cache, retries, stale time)
- **UI state:** React state/context scoped to feature where possible
- **Form state:** React Hook Form
- Avoid global client store unless state is cross-feature and non-server-backed

## 7. Data Fetching Strategy
- Typed API client abstraction with request interceptors for auth/session refresh
- Query invalidation after mutations (`preferences`, `connection-status`)
- Polling only for operational statuses that are eventually consistent (calendar sync status)

## 8. Form Handling and Validation
- Zod schemas mirrored from backend request contracts where practical
- Validation tiers:
  1. immediate client-side UX validation
  2. canonical server-side validation
- Display field-level and form-level errors with stable error codes

## 9. Error Handling
- Error normalization layer maps API errors -> user-safe frontend messages
- Retry affordances for transient failures (network/provider unavailable)
- Fatal errors routed to support/debug state with correlation ID display

## 10. Authentication and Session Handling
- OAuth flow initiated by backend auth endpoint
- Session maintained via secure httpOnly cookie
- Silent token refresh triggered by middleware/interceptor before session expiry
- Hard logout clears local query cache and invalidates session server-side

## 11. Authorization Behaviour in UI
- Role model for V1: single end-user role
- UI-level gating based on backend-provided capabilities
- Authorization decisions enforced server-side; UI gates are convenience only

## 12. MVP Capability Guardrails
- In MVP, only `calendarSync` is an active downstream capability.
- SMS and WhatsApp controls must not be visible as active controls in MVP UI surfaces.
- If capability placeholders are rendered for roadmap transparency, they must be non-interactive and explicitly labeled as post-MVP.
- Frontend must treat missing capability fields as disabled-by-default for non-MVP channels.

Feature-flag policy:
- `feature.messaging.sms` and `feature.messaging.whatsapp` default `false` in all MVP environments.
- Post-MVP channel controls can render only when both backend capability exposure and corresponding feature flag are enabled.
- Fallback safety: if API payload and flag disagree, UI follows stricter behavior (`disabled/hidden`).

Trace: FR-09, FR-10, US-07, US-09

## 13. Reusable Component Strategy
- Reuse from `packages/ui` for controls, cards, status chips, tables
- Feature components compose shared primitives, not vice versa
- Accessibility and telemetry wrappers live in shared layer

## 14. Accessibility Requirements
- WCAG 2.1 AA baseline for keyboard navigation, focus indicators, semantic structure
- ARIA labels for non-text controls
- Color contrast >= 4.5:1 for body text

## 15. Responsiveness Requirements
- Layout targets: mobile-first with breakpoints at 640/768/1024/1280
- Critical settings flows must be fully functional at 320px width

## 16. Performance Considerations
- Route-level code splitting with Next.js dynamic imports
- Keep initial authenticated payload minimal (preference + account summary)
- Set performance budget: LCP < 2.5s on staging reference profile

## 17. Frontend Logging and Diagnostics
- Structured client logs with event names + correlation IDs
- Error tracking integration (Sentry or equivalent) with PII scrubbing
- Key diagnostics events: auth failure, preference save failure, stale session refresh failure

## 18. Testing Strategy
- Unit tests: component logic, hooks, schema validation
- Integration tests: feature flows with mocked API
- E2E tests: sign-in redirect, preference updates, status page visibility
- Accessibility checks integrated into CI for critical routes
- Include a regression test that verifies unsupported channels remain hidden/disabled in MVP.

## 19. Dependencies and Libraries
- Next.js, React, TypeScript
- TanStack Query
- React Hook Form + Zod
- Testing: Vitest/Jest + Playwright + Testing Library

## 20. Interfaces with UI/UX docs
- UX structure and journey references should come from `docs/02-ui-ux` artifacts (wireframes, flows, IA).
- This file intentionally excludes visual styling decisions except where they affect technical implementation (accessibility, responsiveness, performance).

## 21. Open Questions / Gaps
1. Should users be able to manually confirm low-confidence extracted events from frontend in V1?
2. Is status history pagination required at launch or post-V1?
3. Which client analytics schema is required for product telemetry governance?
