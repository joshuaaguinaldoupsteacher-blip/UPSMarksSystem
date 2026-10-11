# UPS Marks Phase 3.12 — Grading Boundary Validation

# UPS Marks Phase 3.11 — Calculation Integrity Testing

- Extract all files into the same folder and upload them together in **one GitHub commit**.
- Gradebook uses complete active assessments only; invalid scores, missing enabled scores, and invalid perfect scores never produce a provisional Term Grade.
- Open `grade_integrity_tests.html` for 12 automated demo-only calculation and completeness checks.
- Original Phase 3.10 diagnostics are retained.
- Purple TERM GRADE / REPORT CARD highlighting is unchanged and remains starred **provisional**.
- This is not certified Excel formula parity. Original workbook formula checks, corrected Arabic/Islamic AK references and MAPE annual rounding still need independent confirmation.
- Fictional data only, no Supabase connection; do not use as a production grading system.


Phase 3.12 additions:
- `transmutation.js` normalizes initial percentages to 2 decimals before interval lookup, addressing gaps for fractional cent values. This rule is **provisional** until Excel workbook parity is verified.
- `boundary_tests.html` runs dynamic regression checks across all four HELPER tables, including each interval endpoint and raw initial grades with >2 decimal places.
- The TERM GRADE output remains provisional (asterisk) and must not be posted as official report-card data.
- No Supabase integration or real identity verification.
