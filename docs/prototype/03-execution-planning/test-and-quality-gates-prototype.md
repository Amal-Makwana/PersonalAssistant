# Test and Quality Gates (Frontend-Only Prototype)

## Coverage
- Loading states
- Empty states
- Error states
- Success flows
- Permission/validation states

## Required slice coverage (current baseline)
- S03 Dashboard: summary render + state handling
- S04 Events List: rendering + filtering + navigation affordance
- S05 Event Detail:
  - rendering + section order
  - reminder plan preview
  - editable reminder plan interactions (add/remove)
  - validation behavior for invalid offsets
  - reminder channel preview/toggle behavior
  - mock save confirmation success state
  - mock save failure state + retry affordance
  - notification history preview rendering
  - combined integration flow across the above
- Reminder preview calculator utilities:
  - deterministic offset/date derivation
  - offset formatting and validation
- Mock event service contracts:
  - deterministic behavior by scenario
  - mock save outcomes and history fixtures

## Gates
- Lint passes
- Unit/component tests pass
- Production build passes
- No runtime network calls to external services in prototype flows
