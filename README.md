# UPS Marks System — Phase 3.30: Zero-Score & Rounding Decision Gate

Extends Phase 3.29 with `decision_gate.html`, runnable production-function tests (`decision_regression_runner.js`) and `decision_regression_results.json`.

## Verified outcomes
- Existing `grading.js` calculation implements true zeros, missing/whitespace blank handling, category-specific activity totals, candidate half-up Arabic/Islamic category rounding and out-of-range validation.
- The runner executes production calculation functions extracted directly from `grading.js`, not a separately re-implemented algorithm. Run `node decision_regression_runner.js` to regenerate results.

## Not yet certified
- Corrected Excel output parity; Arabic/Islamic rounding at category boundaries; approved MAPE whole-number rounding. Neither this report nor passing tests means official grade certification.
- No Supabase live database, verified identity sign-in or real records.

## GitHub Pages
Extract the ZIP preserving the directory contents and upload the contained website files to the repository root in a single commit. Access `decision_gate.html`.
