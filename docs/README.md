# Documentation README

## Canonical Documentation Structure
This repository uses a single canonical documentation set under `docs/`:
- `docs/00-product`
- `docs/01-ui-ux`
- `docs/02-design`
- `docs/03-execution-planning`
- `docs/05-prompts`

## Consolidation Status
Prototype-era documentation has been folded into the canonical docs above. The prior `docs/prototype` tree is no longer an active parallel source of truth.

## Scope and Delivery Model
### Original Scope
The MVP scope remains stable: Google auth, Gmail ingestion, event extraction/persistence, duplicate prevention, reminder scheduling, and Google Calendar sync.

### Prototype Baseline
Early delivery used mock-first slices to validate UX, contracts, and sequencing.

### Incremental Build Progress
Implementation is now progressively backend-connected in key vertical slices while preserving compatibility with earlier prototype flows.

### Current State
Use canonical docs only for planning, design, prompt guidance, and implementation traceability.
