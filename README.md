# UPS Marks Phase 3.10 — Formula Comparison

## Changes
- Corrected Arabic and Islamic non-examination category percentages to Excel-style `ROUND(x,0)` (positive scores); weighting follows the rounded category percentage.
- Retains all Purple dashboard features and the prominent **TERM GRADE / REPORT CARD** display with the provisional asterisk.
- Added `formula_comparison.html` with a formula observation matrix and independent arithmetic test vectors.
- Existing `parity_report.html` provides separate HELPER lookup interval checks.

## Important limitations
- This build does **not** independently recalculate original Excel workbooks or guarantee exact official report-card grades. Some source worksheet aggregate references still need investigation.
- The 9-part MAPE consolidation is illustrative; final rounding pending.
- Score data are fictional and browser-memory only. No Supabase integration or real user access.
