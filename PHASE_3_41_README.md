# Phase 3.41: Saved grade-pair consistency

- The evidence replay now checks whether the *saved website* Term Grade agrees with the HELPER lookup of the saved Initial Grade. An inconsistent pair is flagged for investigation rather than reported as a match.
- A separate flag shows when an independently supplied Excel Term Grade differs from the website HELPER lookup. This is diagnostic only; it does not assume that the Excel reference is wrong.
- Adds `grade_pair_tests.html`, `grade_pair_check.js`, and `grade_pair_tests.js`.
- No changes to the production grading algorithms, clean dashboard, or source Excel workbooks.
- Full Excel recalculation, academic approval, and verified-identity authentication are still pending. No real student data.
