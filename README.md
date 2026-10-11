# UPS Marks System — Phase 3.24

**New:** `mape_final.js` and `mape_final_validation.html` provide a nine-grade final-average and proposed Excel-style whole-number rounding preview. The dashboard now displays both the unrounded nine-grade average and the proposed whole-number final with a provisional asterisk.

The approved MAPE aggregation is the **mean of all nine independently transmuted** Music, Arts, and PE component-term grades. The original template's `ROUND(...,0)` suggests Excel-style .5 rounding; **however its formula mistakenly averages only three Term 3 cells**, so an identical comparison to a corrected official workbook has not yet been established.

Islamic triple-activity input, previously added in Phase 3.23, remains in the live demo. The existing 9 Islamic fictional test cases are preserved.

**Important:** Whole-number final rule is a candidate, not certified. No workbook modification, live authentication or Supabase integration is included. Do not use demo grades for actual report cards.

**Deploy:** Extract files and upload all of them together in one GitHub commit.
