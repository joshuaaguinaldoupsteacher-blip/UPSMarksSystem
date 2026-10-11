# UPS Marks — Phase 3.13 Formula Reconciliation

This is a **fictional-data frontend** built on Phase 3.12.

## New
- `reconciliation_tests.html` invokes the same `calculate()` method used in the gradebook to run independent raw-score scenarios, including invalid input, multiple activities, and Arabic/Islamic whole-percent rounding.
- The prominent **Term Grade — Report Card** label stays in the UI. Its `*` marker remains because exact workbook parity has **not** been certified.
- No connection to Supabase, no live identity validation or production-grade editing.

## Still required
- Verify original Excel workbook recalculation (including Arabic/Islamic column AK references) with identical fictional inputs.
- Resolve the Islamic Activities multi-item configuration and exact rounding policy.
- Confirm MAPE final whole-number rounding from nine transmuted component Term Grades.

To update GitHub Pages, extract the ZIP and upload the files together in one commit at the same directory level as `index.html`.
