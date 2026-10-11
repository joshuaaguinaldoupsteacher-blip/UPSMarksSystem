# UPS Marks System — Phase 3.31: Reproducible Grade QA

This is the full prototype website, including Phase 3.30 features. New files:
- `grade_release_checks.js` — Node.js test runner against the actual production `grading.js` calculate function.
- `grade_release_results.json` — captured local output, with calculation source SHA-256.
- `grade_release_report.html` — transparent human-readable results.

To rerun: `node grade_release_checks.js` in the extracted folder; exit code 1 indicates failures.

**LIMITATION:** These are internal regression tests using fictional marks, not independent corrected-Excel parity cases or school grading approval. Arabic/Islamic rounding remains candidate behavior. MAPE final rounding is unapproved. Term Grade is provisional, Supabase and authentication are not connected, and real student records must not be entered.

**GitHub Pages:** upload the full extracted website contents to repo root as one commit; do not upload the enclosing directory unless your site is configured for it.
