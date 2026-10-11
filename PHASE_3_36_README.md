# Phase 3.36 — Saved Excel Evidence Replay

This release adds `evidence_replay.html` and `evidence_replay.js`. In the separate `developer_tests.html` area, import an existing fictional CSV exported from `raw_score_parity_lab.html`; the tool recalculates its saved raw scores using the current production-derived grading function, detects historical engine changes, and separately reports exact initial+term match, two-decimal display-only match, or Excel difference. It validates CSV shape and category/score structure and exports a findings CSV. No changes to official grading formulas or the cleaned dashboard.

**Not certification:** Excel outputs have to be independently obtained from Excel after recalculation, and outstanding policy decisions remain unresolved. This is a static fictional-data testing site; do not upload real student data.

Deploy only website HTML/JS/CSS/JSON to GitHub Pages in one commit. The enclosed fictional XLSX is for private offline analysis, not public upload.
