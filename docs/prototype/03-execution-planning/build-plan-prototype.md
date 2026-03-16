# Build Plan (Frontend-Only Prototype)

## Active Vertical Slice (Current)
1. S03 Dashboard
2. S04 Events List
3. S05 Event Detail (mock edit/save)

## Milestones
1. Scaffold frontend stack and routing shell. ✅
2. Implement first vertical slice (S03->S04->S05) with fixture-backed state. ✅
3. Extend S05 with reminder plan preview + reminder channel preview using deterministic mock contracts. ✅
4. Expand coverage to remaining screens after slice stabilization. ⏳
5. Keep mock service layer + deterministic scenario simulation across features. ⏳

## Constraints
- Local-only execution.
- No backend/API/DB/auth provider dependencies.
- No external integrations; all flows must remain mocked.
