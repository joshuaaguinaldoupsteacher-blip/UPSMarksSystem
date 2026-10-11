# Phase 3.28 — Source Assessment Slot Alignment

Actual source workbook formulas have been inspected (XML extraction, no workbook modification). This package corrects a confirmed discrepancy in activity-slot configuration:

- Arabic Listening/Speaking, Writing, Reading: 5 activity cells **each** (`F:J`, `M:Q`, `T:X`). Previously 1.
- Islamic Recitation, Memorization and Values: 2 activity cells **each** (`F:G`, `K:L`, `P:Q`). Previously 1.
- Islamic Worksheets/Quizzes/Activities: 3 activity cells (`U:W`), already supported.
- The three required examinations and subject weights remain unchanged.

Updated production `grading.js` and supporting test engines to the matching slot counts. Added `source_category_slots.csv` containing exact source cells and extracted formula text, and `source_slot_parity_tests.html` with deterministic fictional tests.

Caveat: Source Excel formula `IF(SUM(...)=0,"",...)` treats all-zero activity groups as blank; this differs from current prototype zero-score behavior. The user-approved zero-after-submission workflow remains provisional until reconciled with the intended official rule. Intermediate Arabic/Islamic rounding, HELPER, category-specific gaps and MAPE annual rounding are **not certified**. Never process real student data using email-only access.

Upload all extracted files into the GitHub Pages folder in one commit.
