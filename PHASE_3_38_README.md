# UPS Marks System — Phase 3.38: Validation Hardening

- Corrected a bug in `evidence_replay.js`: blank Excel/website evidence values no longer coerce to numerical zero. Missing independent evidence is rejected.
- The **website-only deploy ZIP** excludes XLSX workbooks, development source archives, local Node test scripts, and JSON containing test fixtures. The complete private validation package may be retained locally.
- Preserves Phase 3.35 clean dashboard and all existing grading calculations.
- All report-card results remain provisional, pending confirmed workbook parity and academic approval.
- Public GitHub Pages is not a protected storage environment; no real student records or sensitive materials.
