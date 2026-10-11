# UPS Marks System — Phase 3.29: Zero-Score and Rounding Validation

- New `zero_rounding_tests.html` with 31 deterministic fictional-data checks for all five schemes, true zero, missing, whitespace, null, out-of-range, category aggregation and rounding.
- Hardens input validation for `null` and whitespace-only scores in both production grading logic and parity engines; these are **missing**, not valid zero.
- A deliberately entered numerical `0` is **valid**. Blank fields remain blank until teacher confirmation at submission, then become zeros. This follows the user-approved workflow, **not** the source Excel `IF(SUM(...)=0,"",...)` semantics. The discrepancy is explicitly documented.
- Arabic / Islamic non-exam percent is currently candidate Excel-style half-up integer rounding before category weighting; category rounding and MAPE final rounding are **not certified**.
- No live Supabase integration; email-only entry is not secure authentication. Demo data only.

All original workbooks remain untouched. Upload the ZIP contents in a single GitHub Pages commit, then visit `zero_rounding_tests.html`.
