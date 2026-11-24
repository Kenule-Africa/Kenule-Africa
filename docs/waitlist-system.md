# KENULE AFRICA: TOMORROW WAITLIST SYSTEM AND ADMIN PANEL

## Objective

Implement a complete, custom waitlist management system for the existing Kenule Africa website, specifically for the TOMORROW experience.

The system must allow visitors to join the waitlist using only their email address. It must also provide a secure admin panel where authorised administrators can view, search, manage and export registered email addresses.

This must integrate seamlessly with the existing Next.js codebase, website design and TOMORROW landing page.

**Important:** The website, branding and TOMORROW landing page already exist. Do not rebuild, redesign or modify existing sections unnecessarily. Extend the current implementation.

## 1. Technology Stack

Use the following:

- Frontend: Existing Next.js application and its current styling system.
- Backend: Next.js API routes / Route Handlers.
- Database: Supabase PostgreSQL.
- Authentication: Secure, custom admin authentication.
- Password security: bcrypt or bcryptjs.
- Validation: Zod or an equivalent validation library.
- Email collection: Custom implementation, no third-party waitlist providers.

Create a dedicated `/backend` directory at the project root to organise backend-related code, database utilities, services, validation schemas and server-side logic.

Keep the implementation compatible with the existing Next.js architecture. Do not introduce a separate backend server.

## 2. Mandatory Development Workflow: Five Phases Maximum

Development MUST be divided into a maximum of five clearly defined, sequential and independently testable phases.

Do not attempt to implement everything at once. Complete each phase, test it, document its outcome and update `progress.md` before moving to the next phase.

### Phase 1: Repository Inspection and Database Foundation

Tasks:
- Inspect the existing repository and understand its Next.js architecture.
- Identify the existing TOMORROW landing page and Join the Waitlist button.
- Inspect existing components, styling conventions and dependencies.
- Establish the `/backend` directory structure.
- Configure Supabase connectivity through environment variables.
- Create the database migrations.
- Create the `waitlist_subscribers` and `admin_users` tables.
- Configure database indexes, constraints and Row Level Security.
- Create the initial admin seed script.

Testing requirements:
- Verify Supabase connectivity.
- Run the database migrations successfully.
- Confirm that the tables and constraints exist.
- Verify email uniqueness at database level.
- Confirm that public users cannot read subscriber records.
- Verify that the admin seed script securely hashes passwords.
- Verify that rerunning the seed script does not unintentionally reset an existing password.

**Phase completion condition:** Database infrastructure is functional, secure and ready for application integration.

### Phase 2: Backend API and Admin Authentication

Tasks:
- Implement the public waitlist registration endpoint.
- Implement email validation and normalisation.
- Implement duplicate registration handling.
- Implement secure admin login and logout.
- Implement session management using HTTP-only cookies.
- Implement protected admin API endpoints.
- Implement subscriber retrieval, pagination and search.
- Implement CSV export functionality.
- Add rate limiting, error handling and request validation.

Testing requirements:
- Test successful waitlist registration.
- Test duplicate email submissions.
- Test invalid email submissions.
- Verify email normalisation.
- Test admin login with correct and incorrect credentials.
- Test session creation and logout.
- Verify unauthenticated requests cannot access protected endpoints.
- Verify CSV export returns correctly formatted data.

**Phase completion condition:** All backend endpoints work correctly and authentication protects administrative operations.

### Phase 3: Admin Dashboard Development

Tasks:
- Create the `/admin` login page.
- Create the `/admin/dashboard` interface.
- Implement dashboard statistics.
- Implement the subscriber management table.
- Implement email search and pagination.
- Implement registration date sorting.
- Implement CSV export controls.
- Add loading, error and empty states.
- Ensure the dashboard uses real Supabase records rather than mock data.

Testing requirements:
- Test administrator login and logout through the interface.
- Verify dashboard statistics against actual database records.
- Test subscriber search and pagination.
- Test CSV downloads.
- Verify dashboard access is blocked without authentication.
- Test responsive layouts on mobile and desktop.

**Phase completion condition:** The admin can securely access and manage actual waitlist registrations.

### Phase 4: Public Waitlist Integration

Tasks:
- Integrate the waitlist functionality into the existing TOMORROW landing page.
- Connect the existing Join the Waitlist button to a modal.
- Implement an email-only registration form.
- Connect the form to the public registration API.
- Implement loading, success, duplicate and error states.
- Add appropriate spam protection.
- Ensure the modal follows the existing Kenule Africa branding.
- Ensure accessibility and responsive behaviour.

Testing requirements:
- Open and close the modal.
- Submit valid email addresses.
- Verify registrations appear in Supabase.
- Verify new registrations appear in the admin dashboard.
- Test duplicate submissions.
- Test invalid email submissions.
- Test mobile and desktop experiences.
- Confirm existing TOMORROW page functionality remains unaffected.

**Phase completion condition:** A visitor can join the waitlist from the existing landing page, and the administrator can immediately see the registration.

### Phase 5: Final Integration, Security Audit and Documentation

Tasks:
- Conduct an end-to-end test of the complete system.
- Review authentication and database security.
- Verify environment variable handling.
- Review API error handling.
- Check for exposed secrets or credentials.
- Test all existing website routes for regressions.
- Verify the production build.
- Complete setup and deployment documentation.
- Update `progress.md` with final implementation status.

Testing requirements:
- Complete an end-to-end registration and administration workflow.
- Verify all five phases have passed their acceptance tests.
- Verify the application builds successfully.
- Verify database permissions and API protections.
- Confirm CSV export works with real subscriber records.
- Confirm no existing website functionality has been broken.

**Phase completion condition:** The entire waitlist system is functional, tested, documented and ready for deployment.

## 3. Progress Tracking: Mandatory `progress.md`

Create a `progress.md` file at the project root before starting implementation.

This file is the official development progress tracker for this task.

It must contain:

- Project overview.
- All five development phases.
- Tasks under each phase.
- Completion status of individual tasks.
- Testing status and results.
- Current development phase.
- Outstanding issues and blockers.
- Important implementation decisions.

Use the following status labels:

- `[ ]` Not started.
- `[~]` In progress.
- `[x]` Completed.
- `[!]` Blocked or requires attention.

Example structure:

```markdown
# Kenule Africa Waitlist Development Progress

## Overall Status
Current Phase: Phase 1
Overall Completion: 0%

## Phase 1: Repository Inspection and Database Foundation
- [ ] Inspect existing repository.
- [ ] Establish backend directory.
- [ ] Configure Supabase.
- [ ] Create database migrations.
- [ ] Create admin seed script.
- [ ] Test database connectivity.

Testing:
- Status: Not started
- Results: Pending

## Phase 2: Backend API and Admin Authentication
- [ ] Implement waitlist API.
- [ ] Implement admin authentication.
- [ ] Implement subscriber retrieval.
- [ ] Implement CSV export.

Testing:
- Status: Not started
- Results: Pending

## Phase 3: Admin Dashboard Development
- [ ] Implement admin login interface.
- [ ] Build dashboard.
- [ ] Implement subscriber table.
- [ ] Implement statistics and search.
- [ ] Implement CSV download.

Testing:
- Status: Not started
- Results: Pending

## Phase 4: Public Waitlist Integration
- [ ] Implement waitlist modal.
- [ ] Connect registration API.
- [ ] Implement form states.
- [ ] Test mobile responsiveness.

Testing:
- Status: Not started
- Results: Pending

## Phase 5: Final Integration and Security Audit
- [ ] End-to-end testing.
- [ ] Security review.
- [ ] Production build verification.
- [ ] Documentation.
- [ ] Final acceptance testing.

Testing:
- Status: Not started
- Results: Pending

## Outstanding Issues
None.

## Implementation Decisions
Document important technical decisions here.
```

### Progress Tracking Rules

1. Update `progress.md` immediately after completing each significant task.
2. Update task statuses honestly. Never mark incomplete work as completed.
3. Record actual test results, not assumed results.
4. Do not move to the next phase until the current phase has passed its acceptance tests.
5. If a test fails, document the failure, investigate and resolve it before proceeding.
6. If blocked by missing credentials, configuration or external dependencies, document the blocker clearly.
7. Maintain the progress file throughout development. Never recreate it from scratch or discard previous progress.
8. At the end of every phase, update the overall completion percentage and current phase.
9. If development is interrupted, use `progress.md` to resume from the exact point where work stopped.
10. At project completion, ensure every phase has documented test results.

**Important:** `progress.md` is not optional documentation. It is a mandatory part of the implementation workflow.

## 4. Database Design (Supabase)

Create the following tables.

### `waitlist_subscribers`

| Column | Type | Description |
|---|---|---|
| id | UUID | Primary key |
| email | TEXT | Subscriber email, unique |
| event | TEXT | Registration source, default `tomorrow` |
| created_at | TIMESTAMPTZ | Registration timestamp |

Requirements:
- Generate UUIDs automatically.
- Enforce a unique constraint on email.
- Set `created_at` automatically.
- Add appropriate database indexes.
- Enable Row Level Security.
- Prevent public users from reading, updating or deleting subscriber records.
- Allow registration only through the secure backend API.

### `admin_users`

Store administrator identity and securely hashed credentials.

Include:
- UUID primary key.
- Email address with a unique constraint.
- Password hash.
- Created timestamp.
- Updated timestamp.

Create and include the SQL migrations in the project.

## 5. Admin Authentication

Create an admin login accessible through:

`/admin`

The administrator must authenticate using:
- Admin email address.
- Admin password.

Seed the initial administrator credentials into the database using a secure seed script.

Security requirements:
- Never store plaintext passwords.
- Hash passwords using bcrypt with an appropriate work factor.
- Store credentials in the dedicated `admin_users` table.
- Use environment variables for initial admin credentials.
- Use secure, HTTP-only, SameSite cookies.
- Use secure session management with appropriate expiration.
- Protect all admin API endpoints and dashboard routes.
- Implement logout.
- Never expose password hashes, Supabase service-role keys or secrets to the client.
- Do not hardcode credentials into the source code.

Provide a `.env.example` file documenting required environment variables.

## 6. Admin Dashboard

Build the dashboard at `/admin/dashboard`.

It must follow Kenule Africa's existing visual identity, typography, colours, spacing and general design language.

### Overview
Display:
- Total waitlist registrations.
- Registrations received today.
- Registrations received in the last seven days.
- Most recent registration date.

### Subscriber Management

Display subscribers in a clean, responsive table.

Include:
- Email address.
- Registration date and time.
- Registration source/event.

Provide:
- Search by email.
- Pagination.
- Sorting by registration date.
- Empty states.
- Loading and error states.

### Export Functionality

Allow administrators to export subscriber records as CSV.

The exported file should contain:
- Email address.
- Registration date.
- Event/source.

Ensure proper CSV formatting compatible with Excel and Google Sheets.

Exports should respect active search/filter selections where applicable.

## 7. Public Waitlist Registration

Integrate the registration functionality into the existing TOMORROW landing page.

When someone clicks **Join the Waitlist**:

1. Open a branded modal.
2. Display ONLY an email input.
3. Allow the visitor to submit their email.
4. Validate the email.
5. Submit it to the backend API.
6. Store it in Supabase.
7. Display a success confirmation.

Suggested confirmation:

"You're on the list! We'll be in touch when TOMORROW goes live."

Do not collect names, phone numbers or any additional personal information.

Prevent duplicate registrations and implement appropriate loading, error and success states.

Keep event registration identifiable using the `tomorrow` event value.

## 8. Backend Architecture

Create a dedicated `/backend` directory at the project root.

Suggested structure:

```text
backend/
├── lib/
│   ├── supabase.ts
│   ├── auth.ts
│   ├── session.ts
│   └── utils.ts
├── services/
│   ├── waitlist.service.ts
│   └── admin.service.ts
├── validations/
│   ├── waitlist.schema.ts
│   └── admin.schema.ts
├── scripts/
│   └── seed-admin.ts
├── migrations/
│   └── 001_initial_schema.sql
└── README.md

app/
├── api/
│   ├── waitlist/
│   │   └── route.ts
│   └── admin/
│       ├── login/
│       │   └── route.ts
│       ├── logout/
│       │   └── route.ts
│       ├── subscribers/
│       │   └── route.ts
│       └── export/
│           └── route.ts
└── admin/
    ├── page.tsx
    └── dashboard/
        └── page.tsx

progress.md
```

Adapt this structure to the existing project conventions. Do not create duplicate application directories or break existing routes.

### API Endpoints

**POST `/api/waitlist`**
- Accept email only.
- Validate and normalise email.
- Check for existing registrations.
- Insert into Supabase.
- Return appropriate success and duplicate-registration responses.

**POST `/api/admin/login`**
- Authenticate administrator credentials.
- Verify password hash.
- Establish secure session.

**POST `/api/admin/logout`**
- Destroy the current session.

**GET `/api/admin/subscribers`**
- Return paginated subscriber records.
- Support search and sorting.
- Require admin authentication.

**GET `/api/admin/export`**
- Export subscriber records as CSV.
- Require admin authentication.

Use consistent API response structures and appropriate HTTP status codes.

## 9. Branding and UI Requirements

- Inspect the existing Kenule Africa website before implementation.
- Inspect the existing TOMORROW landing page and its Join the Waitlist button.
- Reuse existing components, design tokens, typography, colours and styling conventions.
- Do not introduce a new visual identity.
- Do not redesign the existing landing page.
- Do not introduce unnecessary animations or visual elements.
- Make the modal feel like a natural extension of the existing website.
- Make the admin dashboard professional, minimal and consistent with the brand.
- Ensure complete mobile responsiveness.

## 10. Security and Reliability

Implement:
- Server-side validation.
- Rate limiting on public registration and admin login endpoints.
- Secure cookie configuration.
- Password hashing.
- Protected admin routes and APIs.
- Supabase Row Level Security.
- Environment-based secret management.
- Safe error handling.
- Database-level duplicate prevention.
- Brute-force login protection.
- Appropriate CSRF protection for authenticated state-changing requests.

Do not rely on frontend authentication checks alone.

## 11. Final Deliverables

At completion, provide:

- Fully functional email-only waitlist registration.
- Branded registration modal integrated into TOMORROW.
- Supabase database schema and migrations.
- Secure admin authentication.
- Admin credential seed script.
- Functional `/admin` dashboard.
- Subscriber search and pagination.
- CSV export.
- Backend source code organised under `/backend`.
- `.env.example` file.
- Backend setup and deployment instructions in `backend/README.md`.
- Complete and accurate `progress.md` documenting all five phases and their test results.

## FINAL DEVELOPMENT INSTRUCTIONS

1. Maximum of FIVE phases. Do not create additional development phases.
2. Work sequentially, one phase at a time.
3. Test each phase before proceeding.
4. Update `progress.md` continuously.
5. Do not skip acceptance tests.
6. Do not use mock data for completed functionality.
7. Do not rebuild existing Kenule Africa pages or alter the existing brand.
8. Do not implement features outside the defined scope.
9. Inspect existing code before introducing new dependencies or architectural decisions.
10. If an existing implementation conflicts with the proposed structure, preserve the existing architecture and document the adjustment.

**Start with Phase 1 only.** Inspect the repository, create `progress.md`, understand the existing architecture and establish the database foundation. Do not begin Phase 2 until Phase 1 has been completed, tested and documented.

The objective is to deliver a clean, secure and maintainable waitlist system that can later become part of Kenule Africa's larger administrative platform without requiring a complete rewrite.