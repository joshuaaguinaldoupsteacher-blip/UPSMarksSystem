# UPS Marks System — Phase 3.16: Evidence Import

Includes the latest purple demo and all Phase 3.15 diagnostic pages. The **Excel Parity Workbench** now accepts CSV files previously exported from the workbench, validates their headers, case identifiers, numeric ranges, and uniqueness, and merges the fictional cases into the current in-memory review. A blank `PARITY_TEST_CASE_TEMPLATE.csv` is included.

**Certification is not complete.** No comprehensive workbook-calculated test outputs are yet matched against the website. The official transmutation lookup and boundary tests alone do not establish full formula parity. The highlighted Term Grade must remain provisional.

To use, extract the ZIP, open `excel_parity_workbench.html`, add fictional comparisons or import a prior CSV, inspect differences, and export the updated results. All data stays in the browser unless exported; no Supabase access.
