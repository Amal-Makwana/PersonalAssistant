# Prototype Slice Extension Prompt (Backend-Connected)

Extend the current slice while preserving backend-connected behavior and governance quality gates.

Checklist:
1. Start from existing route contracts and frontend service adapters.
2. For each changed endpoint, update endpoint markdown docs.
3. Add route/service tests for API behavior (success + validation + error paths).
4. Add/update frontend tests for API client usage and user-visible states.
5. Run full checks:
   - `apps/api`: tests + TypeScript check
   - `apps/web`: tests + production build
6. Keep event detail structure and flows intact:
   - Event Information
   - Reminder Plan Preview
   - Editable Reminder Plan
   - Reminder Channels
   - Actions
   - Scheduling Confirmation
   - Notification History Preview
7. Do not reintroduce scenario-toggle runtime behavior.
8. Authentication remains mocked unless explicitly in scope.
