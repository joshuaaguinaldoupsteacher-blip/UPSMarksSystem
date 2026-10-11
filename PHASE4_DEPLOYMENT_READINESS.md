# UPS Marks System — Phase 4.01 secure identity foundation

## Current status
This is a secure-authentication **pilot**, not a live student-data integration. Existing `index.html` remains the fictional Gradebook demo. `secure_auth_pilot.html` is separate and disabled by default. No DB queries are made from the pilot.

## Production requirements, in order
1. Ensure Phase 2 migration/schema and RLS remain installed and tested in a **nonproduction** Supabase environment. Verify policies cannot be bypassed using a publishable key.
2. Disable open signup in Supabase Auth. Invite/provision identities for preapproved whitelist entries only. Ensure a verified, linked `auth.users.id` is present for each staff profile, and do **not** treat an entered email as an authenticated identity.
3. Configure an **email OTP template** that emits `{{ .Token }}`; a magic-link-only template will not support entering a numeric code. Configure rate limits and approved redirect/domain policies in Supabase.
4. Test with a dedicated fictional teacher account. Set `enabled:true`, the project public URL and **anon/publishable** key in `secure_auth_config.js` (no secret keys). Test email code verification and logout via `secure_auth_pilot.html`.
5. Independently test denial for a non-whitelisted address; teacher unable to read another class; admin role assignment limits; disabled staff cannot access anything; anonymous access denied; audit RPC log integrity.
6. Integrate the dashboard ONLY after server-enforced permissions are proven. A client-side role dropdown is a preview and is not authorization.
7. Complete grade formula approvals/Excel parity and Grade 11–12 policies before enabling actual scores.

## Deployment hygiene
- Never upload the provided fictional .xlsx test workbook to public GitHub Pages.
- Do not put any service_role key, database passwords, or real students in browser JavaScript.
- Keep demo and pilot clearly distinct; no auto-login from the demo selector.
- This static pilot uses the Supabase JS v2 browser module from jsDelivr; the user needs internet access for the module. A later release can vendor/pin the verified dependency.

## Unresolved grading decisions
Arabic/Islamic intermediate category rounding; MAPE final whole-number rounding; exact workbook comparisons; SHS semester weights. **Report-card certification remains blocked.**
