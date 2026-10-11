# Phase 3.45 — Review tracking for evidence replay

- Keeps the Phase 3.35 clean dashboard. No floating phase links.
- Adds per-case **Review status** and **Reviewer note** for imported fictional cases in `evidence_replay.html`.
- Adds `reviewStatus` and `reviewNote` to the replay CSV export, using the existing CSV formula-injection protection.
- Edits are transient and lost on page reload unless exported. No external server or Supabase operations.
- “Resolved externally” does NOT certify a grade, approve a formula, or change calculation logic.
- Source Excel grade parity, Arabic/Islamic intermediate rounding and MAPE final rounding are not certified.

Use **Website Only** zip for GitHub Pages; use **Private Validation** zip for internal testing.
