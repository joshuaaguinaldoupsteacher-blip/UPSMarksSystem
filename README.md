# UPS Marks System — Phase 3.19 source formula parity audit

Preserves the Phase 3.18 purple site and fictional gradebook. New files:

- `source_lookup_audit.html`: audit of actual representative row-18 term transmutation formula references.
- `source_lookup_reference_audit.csv`: 18 references checked; 8 flagged for review.

**Source-reference findings**: General Terms 2 and 3 use TERM 1!AD18 in their example lookup formulas; six MAPE Term 2/3 component lookup formulas use their component's Term 1 sheet. Arabic and Islamic use their own term sheet AK18 as the lookup input, with output in AL18. These are observations from the original workbook formulas, not modifications or automatic corrections.

**Not yet certified:** Complete formula parity, correct rounding, Islamic aggregation and MAPE final averaging/rounding remain pending. Term Grades continue to carry a provisional asterisk.

The prototype uses fictional in-memory data only and is not connected to Supabase.
