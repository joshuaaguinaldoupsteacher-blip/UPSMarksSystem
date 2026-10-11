# UPS Marks System — Phase 3.23

**New:** The actual Islamic Education gradebook now provides three separate WQA (Worksheets / Quizzes / Activities) raw-score columns. Each column has an independently editable perfect score and an enable/disable switch. The first is enabled initially and the other two can be activated as needed.

**Category arithmetic:** The WQA percentage uses (sum of student earned scores / sum of active maximum scores) × 100, then rounds to the nearest whole percent prior to applying the 30% WQA category weight, consistent with the previously established provisional Islamic calculation method. The exact workbook intermediate formulas still require comparison.

`islamic_activity_tests.html` exercises nine fictional-data cases against an exact extracted copy of the production calculation functions in `islamic_test_engine.js`.

**MAPE:** The nine independently transmuted Music, Arts and PE term grades continue to be averaged as approved. No final whole-number rounding rule was silently selected; that decision still requires source validation.

**Safety:** Demonstration data only. The highlighted TERM GRADE is provisional, not approved for official report cards. No Supabase data or original Excel files have been edited.

**Deploy:** Extract and upload all site files in one commit to the GitHub Pages repository.
