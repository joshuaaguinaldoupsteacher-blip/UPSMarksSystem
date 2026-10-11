# UPS Marks System — Phase 3.27: Parity Precision

This build inherits the complete Phase 3.26 fictional-data website and adds a distinction between **exact Initial Grade parity** and a match caused merely by rounding the displayed Excel grade to two decimals.

## Changes
- `raw_score_parity_lab.js` classifies results as `MATCH` (strict Initial Grade tolerance < 0.000001 plus identical Term Grade), `DISPLAY_ROUNDING_MATCH` (matches only after the website Initial Grade is rounded to 2 decimal places, with identical Term Grade), or `DIFFERENCE`.
- `DISPLAY_ROUNDING_MATCH` is **not** certification, and is shown as pending.
- New `parity_precision_tests.html` tests actual grading functions with fictional cases and precision boundaries.
- Fixed a real stale dependency: `test_engine.js`, used in the raw-score parity lab, previously modeled one Islamic WQA item while the production `grading.js` modeled three. The parity tool now models all three.
- All grades remain provisional; no original Excel workbooks or Supabase databases have been modified.

## Required remaining work
Obtain independently calculated matching outputs from corrected original workbooks at full stored precision; verify Arabic and Islamic intermediate rounding, all assessment aggregation, HELPER interval boundaries and proposed nine-component MAPE whole-number rounding; obtain formal approval before any official report-card use.

## GitHub Pages
Extract and upload all files in a single commit into the folder containing `index.html`.
