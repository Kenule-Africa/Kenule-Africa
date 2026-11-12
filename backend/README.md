# TOMORROW Waitlist Database Foundation

This directory contains the server-only Supabase client, database migration and initial administrator seed/check scripts. Keep the Supabase service-role key and administrator password on the server. Never prefix these values with `NEXT_PUBLIC_`.

## Configure local credentials

1. Copy the root `.env.example` file to `.env`.
2. Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL`, `ADMIN_EMAIL` and `ADMIN_PASSWORD` from the Supabase project.
3. Use a long, unique administrator password. `.env` is ignored by Git.

## Apply the migration

Apply the SQL migrations in numeric order. With PostgreSQL's `psql` client installed and `DATABASE_URL` configured, run:

```powershell
psql $env:DATABASE_URL -v ON_ERROR_STOP=1 -f backend/migrations/001_initial_schema.sql -f backend/migrations/002_api_rate_limits.sql
```

Alternatively, run both SQL files in order in the Supabase SQL Editor. They create `waitlist_subscribers`, `admin_users` and `api_rate_limits`, normalized unique email constraints, supporting indexes, the administrator timestamp trigger, atomic shared API rate limiting, and RLS with no public read/write policies.

## Check connectivity and seed the first administrator

Node.js 20.6 or later is required for `--env-file`.

```powershell
npm run db:check
npm run db:key-check
npm run db:inspect
npm run admin:seed
```

The seed script uses bcrypt with a cost factor of 12. It inserts only when the normalized administrator email does not exist, so rerunning it leaves an existing password hash unchanged. `ADMIN_SESSION_SECRET` must be at least 32 bytes and should be generated from a cryptographically secure random source. Set `APP_ORIGIN` to the site's exact origin in production if the app is behind a proxy.

## Database access model

RLS is enabled on both tables. No policies are granted to `anon` or `authenticated`, and table privileges are revoked from those roles. Trusted server code must use `SUPABASE_SERVICE_ROLE_KEY`; this key bypasses RLS and must never enter client bundles or API responses.

## Deployment

The current API is implemented as Next.js App Router route handlers under `src/app/api`. When the site is deployed on Vercel, those API routes deploy with it; a separate backend host is not required. Add `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_SESSION_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` as server-side Vercel environment variables, then redeploy. Do not add the service-role key to any `NEXT_PUBLIC_` variable.

Render can host a Node web service or a full Next.js application. For a separate Render API, first extract these route handlers into a standalone HTTP service, configure exact-origin CORS for the Vercel domain, and update the frontend API origin or proxy requests through a Vercel rewrite. The present API routes are not a standalone Render service by themselves.
