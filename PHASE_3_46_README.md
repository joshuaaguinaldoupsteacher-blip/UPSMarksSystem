# Phase 3.46 — Review Log Restore

- Clean purple main dashboard, with technical links confined to developer_tests.html.
- The Evidence Replay tool accepts the original fictional parity CSV, and (optionally) a saved review log from the same case set.
- It restores **only review status and reviewer note**, never machine-computed grades, discrepancies or priorities.
- Invalid/duplicate case IDs, unmatched templates, invalid statuses, and overlong notes reject the entire import without partial updates.
- Review logs are handled in-browser and are not stored remotely; export the log to keep changes.
- Current calculations remain provisional; Excel formula parity, approved rounding and verified Supabase authentication remain pending.
