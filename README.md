# UPS Marks System — Phase 3.25: Certification Gate

## Changes
- New `grade_certification_gate.html` and `CERTIFICATION_CHECKLIST.csv`. The page lists explicit formula approval requirements and can export a handoff CSV, but it **does not** claim grading certification.
- A navigation link to the certification gate has been added to the purple dashboard.
- Existing fictional demonstration, Islamic triple activities, MAPE nine-part calculation and regression pages are preserved.

## Required before live use
1. Compare multiple identical fictional score cases from corrected Excel workbooks to the website for General, HELE/TLE, Arabic, Islamic and MAPE. Resolve mismatches.
2. Approve Arabic/Islamic intermediate rounding, WQA aggregation, and MAPE final whole-number rounding.
3. Obtain school sign-off and verify authorized identities with proper authentication and Supabase RLS. An email typed into a field is **not** authentication.

Term Grades and MAPE Finals remain provisional and must not be used for student report cards. Source Excel files are unchanged. No live database integration.

Upload all extracted site files to GitHub Pages in one commit.
