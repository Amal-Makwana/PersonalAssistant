# AI Development Workflow (Frontend-Only Governance Profile)

## Profile Intent
This profile applies when backend layers are intentionally deferred.

## Rules
- Build UI flows/components/pages only.
- Replace backend dependencies with mock service contracts.
- Keep all data in local fixtures.
- Simulate loading/error/retry/permission states.
- Keep implementation local-only and offline-compatible.
- Keep docs clear that API/DB/auth/integrations are deferred by design.
