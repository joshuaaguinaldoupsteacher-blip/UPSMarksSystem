# UPS Phase 4.02 — official-schema-aligned provisioning

Main workspace: typed email lookup against fictional local records, not verified authentication and not connected to real staff directory.

New masterlist_provisioner.html: offline CSV validation and SQL generation for school_student_id, full_name and existing class codes; SQL is reviewed and executed manually by administrator, never by the public page. It does not load staff roles, teaching assignments, Arabic/Islamic groups or marks. No student data is packaged.

The database schema uses public.students, public.student_enrollments, public.classes and public.academic_years. Use the reference schema in the implementation package only in the correct project and after review.

Never upload student CSVs or generated SQL to GitHub. Live student data requires independently tested permissions; email entry alone does not establish identity or confidentiality. Grading certification remains pending.
