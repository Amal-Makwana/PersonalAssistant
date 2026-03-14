# Full Repository Audit

- **Date:** 2026-03-14
- **Audited by:** Codex (GPT-5.2-Codex)
- **Scope:** Whole repository (`/workspace/PersonalAssistant`) including root docs and `reminder-app`
- **Method:** Static repository audit (structure, consistency, documentation governance, CI alignment)

## Executive Summary

The repository is **documentation-heavy and implementation-light**, with strong coverage in product/tech/UI materials but significant governance drift between the **root documentation set** and the **`reminder-app` documentation set**.

### Overall Score: **3.2 / 5 (Needs Alignment Before Build Start)**

| Area | Score | Rationale |
|---|---:|---|
| Documentation Completeness | 4/5 | `docs` has all sections and summary HTML files. |
| Documentation Consistency | 2/5 | Root `docs` and `docs` conflict in maturity and structure. |
| Workflow/CI Reliability | 2/5 | CI path checks reference directories that do not exist in expected naming convention. |
| Delivery Readiness | 3/5 | Plans exist in `docs/05-delivery`, but no implementation skeleton exists yet. |
| Governance Traceability | 5/5 | Previous and current audit artifacts exist, enabling controlled remediation. |

## What Was Checked

1. Folder and file inventory (root + app subtree).
2. Existence of required phase summary HTML files.
3. Internal markdown link validity.
4. Placeholder/TODO markers indicating unfinished content.
5. CI workflow path checks and alignment with actual repository structure.

## Findings

### 1) Duplicate documentation trees are diverging (**High**)

- Root docs (`docs/...`) and app docs (`docs/...`) both exist.
- `docs` includes complete Design and Delivery artifacts with HTML summaries.
- Root docs still show Design/Delivery as minimal placeholders and have no summary HTML for those phases.

**Impact:** Contributors can follow different “sources of truth,” causing planning and execution drift.

### 2) Root governance audit is stale relative to current repository reality (**High**)

- Existing audit in root reports Design/Delivery as missing.
- That is now true for root `docs`, but not true for `docs` where those artifacts exist.

**Impact:** Leadership/readiness decisions based on a partial or stale view may be incorrect.

### 3) CI documentation path checks are incorrect (**High**)

In `reminder-app/.github/workflows/ci.yml`, the docs check validates:
- `docs/02-design`
- `docs/03-delivery`

But actual naming in repository is:
- `docs/02-ui-ux`
- `docs/03-design`
- `docs/05-delivery`

**Impact:** CI can fail or pass incorrectly, reducing trust in automation gates.

### 4) Repository structure promises exceed current scaffold (**Medium**)

`reminder-app/README.md` defines target locations (`apps/web`, `apps/api`, `packages`, `infra`) but these directories are not yet present.

**Impact:** New contributors may assume code scaffolds exist and lose setup time.

### 5) Link integrity is strong (**Low / Positive**)

No broken markdown links were detected in repository markdown files during this audit.

**Impact:** Current navigation quality is good despite structure drift.

## Specific Improvement Suggestions

### P0 (Immediate - same day)

1. **Declare one canonical docs root**
   - Choose either root `docs/` or `docs/` as authoritative.
   - Add a short banner in the non-canonical set pointing to canonical location.
   - If root docs are deprecated, archive or remove them after migration.

2. **Fix CI doc path checks in `reminder-app/.github/workflows/ci.yml`**
   - Replace incorrect checks with:
     - `docs/00-product`
     - `docs/01-tech-spec`
     - `docs/02-ui-ux`
     - `docs/03-design`
     - `docs/05-delivery`

3. **Create a single readiness dashboard doc**
   - Add `docs/06-governance/readiness-dashboard.md` (or in canonical tree) with:
     - phase completeness
     - last refresh date
     - owner per phase
     - open blocker count

### P1 (This sprint)

4. **Make stale-audit protection automatic**
   - Add a CI step checking governance audit freshness (e.g., updated within last 14–30 days) or requiring update when docs folders change.

5. **Align README language with current state**
   - In `reminder-app/README.md`, explicitly call out that app directories are planned and not scaffolded yet.
   - Add “Current Implementation Status” with checkboxes per major folder.

6. **Add traceability index across documentation phases**
   - Create one matrix mapping `FR/US/AC` → API endpoints → UI screens → delivery milestones.
   - Keep this in Delivery or Governance so it supports planning and audits.

### P2 (Next sprint)

7. **Strengthen quality gates beyond placeholders**
   - Replace placeholder lint/test workflow step with minimal checks now:
     - markdown link check
     - required-file check
     - optional spelling/style checks for docs

8. **Define a deprecation policy for duplicated docs**
   - Add a short governance note for how old docs are marked deprecated, archived, and removed.

## Suggested Acceptance Criteria for Remediation

- [ ] Exactly one canonical documentation tree is declared and referenced by both READMEs.
- [ ] `ci.yml` docs checks match actual directory names.
- [ ] Governance dashboard exists with owner/date/status.
- [ ] Workflow contains at least one non-placeholder quality gate.
- [ ] Contributor can identify current implementation status in <30 seconds from README.

## Audit Evidence (Commands Executed)

```bash
find . -maxdepth 3 -type f | sed 's#^./##' | head -n 200
find reminder-app -maxdepth 4 -type f | sed 's#^./##' | head -n 300
find docs -maxdepth 3 -type f | sort
python - <<'PY'
from pathlib import Path
for base in ['docs','docs']:
    p=Path(base)
    print('\n',base)
    for phase,file in [('00-product','product-summary.html'),('01-tech-spec','tech-spec-summary.html'),('02-ui-ux','ui-ux-summary.html'),('03-design','design-summary.html'),('04-delivery','delivery-summary.html')]:
        d=p/phase
        print(phase,'exists',d.exists(),'md',len(list(d.glob('*.md'))) if d.exists() else 0,'html', (d/file).exists())
PY
python - <<'PY'
from pathlib import Path
import re
root=Path('.')
md=list(root.rglob('*.md'))
link_re=re.compile(r'\[[^\]]+\]\(([^)]+)\)')
missing=[]
for f in md:
    txt=f.read_text(encoding='utf-8',errors='ignore')
    for m in link_re.finditer(txt):
        link=m.group(1).strip()
        if not link or '://' in link or link.startswith('mailto:') or link.startswith('#'):continue
        link=link.split('#')[0]
        p=(f.parent/link).resolve() if not link.startswith('/') else (root/link[1:]).resolve()
        try:
            p.relative_to(root.resolve())
        except Exception:
            continue
        if not p.exists():
            missing.append((str(f),link))
print('markdown files',len(md))
print('missing links',len(missing))
PY
sed -n '1,220p' reminder-app/.github/workflows/ci.yml
sed -n '1,240p' README.md
sed -n '1,240p' reminder-app/README.md
```
