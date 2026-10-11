# Phase 3.37 — Evidence Replay CSV Safety

Retains the clean daily-use UPS Marks dashboard. This release **does not change** grading formulas, weights or transmutation.

- Exported CSV values are protected against spreadsheet formula interpretation.
- Case identifiers are validated before replay.
- Added `evidence_safety_tests.js` (run with `node evidence_safety_tests.js`).
- Replay still requires independent Excel outputs for genuine formula comparison.

Do not use real student data. This GitHub Pages prototype has no verified login or access controls, and grades remain provisional.
