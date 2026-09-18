# PrepKite — Product Upgrade Log

## Product direction
PrepKite is a personalized interview preparation workspace built around role, company, experience, skills, projects and real preparation activity.

## Major upgrade
- Renamed product from InterviewOS to PrepKite.
- One browser-local authentication/session approach; no GenMB and no second auth system.
- Added 30-company preparation catalog with company themes and careful evidence language.
- Added 22 target roles with role-specific skill maps.
- Added generated role/company question bank covering role knowledge, practical tasks, projects and behavioral preparation.
- Added candidate context for LinkedIn/Naukri URLs and resume filename, using only information the candidate provides.
- Connected profile → prepare → questions → practice → mock → progress → dashboard.
- Added activity-driven attendance, streak, XP, skill signals and readiness signal.
- Added daily practice action recording and weekly improvement recommendations.
- Improved mobile navigation behavior and Escape handling.
- Introduced a new dark interview-intelligence visual system, refreshed navigation hierarchy, updated PrepKite branding, and distinct workspace/interview/growth sections.

## Data model note
This release remains frontend/localStorage based. A public Vercel deployment hosts the application, but profile, activity and attendance data remain private to each browser. Real multi-user authentication, a shared database and live company-report ingestion require a backend/connector.
