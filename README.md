# UPS Marks System — Phase 3.21

This package extends Phase 3.20 and retains the professional purple demo.

## New
- `term_isolation_tests.html`: tests the **actual `calculate()` grading function** using independent fictional term records and a nine-component MAPE aggregation example. The source of this page's calculation functions is `test_engine.js`, copied directly from `grading.js` for independent execution without the main dashboard.
- Term 2 and Term 3 must use their own scores, never Term 1 records.
- The MAPE nine-part average is **provisional**; final whole-number rounding remains unverified against the original Excel output.
- The `TERM GRADE` presentation stays provisional and is not certified for official reports.

## Important
This is a local prototype, not connected to Supabase. The suite checks internal consistency, not exact Excel formula parity. Actual workbook-to-JavaScript matching remains required, particularly Islamic aggregation, Arabic/Islamic intermediate rounding and MAPE final rounding.

## GitHub
Upload all extracted files in one commit to your existing Pages site.
