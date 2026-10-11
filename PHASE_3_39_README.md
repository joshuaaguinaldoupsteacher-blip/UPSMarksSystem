# Phase 3.39 — Evidence Validation

The production grading engine and clean dashboard are unchanged. A shared CSV parser and fictional raw-score input validator now reject malformed replay evidence before comparison.

- `replay_input_rules.js` is reused by the replay page and its new tests.
- `replay_input_tests.html` runs 17 browser checks.
- Deploy only the website ZIP to GitHub Pages; the private package retains the fictional XLSX fixture.

**Not certified:** direct Excel grade parity, school-approved Arabic/Islamic rounding and MAPE final rounding all remain pending. No real student data or insecure email-only login should be activated.
