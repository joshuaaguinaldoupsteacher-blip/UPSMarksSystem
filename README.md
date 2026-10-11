# UPS Marks System — Phase 3.33: Source Workbook Output Readiness

Retains the full Phase 3.32 purple demo and independent mathematical regression fixtures.

## Real source workbook inspection

`workbook_cache_coverage.csv` and `.json` quantify cached numeric formula outputs in all four original Excel templates, directly using XLSX XML. The `workbook_output_readiness.html` page explains the result. A cached value is not independently executed Excel and may be stale.

Most original formula cells do not contain usable saved numeric results. Consequently **there are no newly certified Excel-to-JavaScript grade matches** in this release. Prior test passes remain internal mathematical checks only.

## Follow-up required

Recalculate *corrected copies* of the original workbooks with fictional input rows in desktop Excel; capture Initial and transmuted Term Grades and compare with `raw_score_parity_lab.html`. Resolve/approve the remaining Arabic/Islamic category rounding, zero-group differences, and MAPE final rounding before any official use. Do not upload real student data to GitHub Pages.

## Deployment

Extract the ZIP and upload its `index.html` and other website files together at the repository root in one commit.

Phase 3.41: See PHASE_3_41_README.md for evidence consistency checks.
