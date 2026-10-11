# UPS Marks System — Phase 3.34

## New Excel artifact
`UPS_Phase3_34_Fictional_Recalculation_Fixtures.xlsx` is a **new** fictional reference workbook created with visible Excel formulas. The original four school templates are NOT modified.

The five assessment tabs separately calculate General, HELE/TLE, Arabic, Islamic and a MAPE component; the annual MAPE sheet computes a nine-component average and a **candidate** rounded result. The workbook uses explicit category-level aggregation; it does not yet model each individual activity column, missing-score submission, HELPER transmutation, or full original workbook formulas.

This workbook must be opened and calculated in Excel before values are recorded. Workbook creation alone does NOT constitute independently verified Excel-to-website parity. The rounding for Arabic/Islamic follows the website candidate (round each non-examination category percent before weighting); verify against original Excel.

## Grading policy status
All report-card grades and MAPE final rounding remain provisional. The website stays a fictional-data preview without secure student login or Supabase.

## Deployment
Unzip the package. Upload website HTML/CSS/JS assets in a single GitHub commit; the XLSX and this README are test resources and do not need public hosting.
