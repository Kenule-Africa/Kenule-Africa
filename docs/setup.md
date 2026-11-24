# Development Setup

How to run, configure and deploy the Kenule Africa website.

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS v4, plus CSS modules for page-specific styling
- GSAP with ScrollTrigger for motion on the TOMORROW and ShoutOut pages, Lenis smooth scrolling on TOMORROW, Three.js for the homepage 3D background
- Supabase (PostgreSQL) for the TOMORROW waitlist and admin, with bcrypt-hashed admin credentials
- Deployed on Vercel

## Prerequisites

- Node.js 20.6 or later (the database scripts use `--env-file`)
- npm

## Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Do not run `npm run build` while `npm run dev` is running: both write to the same `.next` directory and the dev server will start serving missing assets. Stop the dev server first, or delete `.next` and restart it afterwards.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build (includes type checking and linting) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run db:check` | Confirm the server key can reach the waitlist and admin tables |
| `npm run db:key-check` | Report which kind of Supabase key is configured, without printing it |
| `npm run db:inspect` | Inspect tables and constraints over a direct PostgreSQL connection |
| `npm run admin:seed` | Create the first administrator from `ADMIN_EMAIL` and `ADMIN_PASSWORD` |

## Environment variables

Copy `.env.example` to `.env` and fill in the values. `.env` is git-ignored; never commit real credentials.

| Variable | Purpose |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only service-role (secret) key. Must not be the `anon` or publishable key, or every query is denied. Check with `npm run db:key-check`. |
| `DATABASE_URL` | Direct PostgreSQL connection, used to apply migrations and by `db:inspect` |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | The first administrator, created by `admin:seed` |
| `ADMIN_SESSION_SECRET` | At least 32 random bytes; signs admin session cookies |
| `APP_ORIGIN` | Optional. The site's exact origin when deployed behind a proxy |

None of these may use the `NEXT_PUBLIC_` prefix: they are server-side secrets.

## Database

The waitlist and admin system live in Supabase. Apply the migrations in order, either in the Supabase SQL Editor or with `psql`:

```bash
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f backend/migrations/001_initial_schema.sql -f backend/migrations/002_api_rate_limits.sql
```

Then verify and seed:

```bash
npm run db:check
npm run admin:seed
```

The seed script hashes the password with bcrypt (cost 12) and never overwrites an existing administrator. See [`backend/README.md`](../backend/README.md) for the full access model, and [`waitlist-system.md`](waitlist-system.md) and [`progress.md`](progress.md) for the waitlist design and its status.

## Project structure

```text
src/app/                 Routes: /, /legitlab-academy, /tomorrow, /shoutout, /admin, /api
src/components/          Shared and page-specific components (shoutout/, legitlab/, sections/, nav/, 3d/)
src/data/                Page content kept out of components (legitlab.ts, shoutout.ts)
backend/                 Server-only code: Supabase client, sessions, rate limiting, services, migrations, scripts
public/assets/           Images and logos
docs/                    Project documentation
```

## Content configuration

- **ShoutOut calls to action:** set `creatorApplicationUrl` and `campaignRequestUrl` in `src/data/shoutout.ts`. While empty, the buttons show an honest "Soon" state instead of a dead link. Contact details and social links for ShoutOut are in the same file.
- **LegitLab Academy:** tracks, FAQs and the application link are in `src/data/legitlab.ts`.

## Conventions

- No em dashes or en dashes anywhere in site copy (see `.agents/rules/no-em-dashes.md`).
- Keep page-specific styles scoped to the page (CSS modules or route-scoped tokens) rather than adding to `globals.css`.
- Respect `prefers-reduced-motion` in all animation.

## Deployment

The site deploys to Vercel. The API routes under `src/app/api` deploy with it; no separate backend host is needed. Add the environment variables above as server-side Vercel environment variables and redeploy.
