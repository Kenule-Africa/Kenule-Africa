-- TOMORROW waitlist and administrator identity tables.
-- Apply with psql and DATABASE_URL, or run in the Supabase SQL Editor.
begin;

create extension if not exists pgcrypto;

create table public.waitlist_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  event text not null default 'tomorrow',
  created_at timestamptz not null default now(),
  constraint waitlist_subscribers_email_normalized check (email = lower(btrim(email))),
  constraint waitlist_subscribers_email_unique unique (email),
  constraint waitlist_subscribers_event_nonempty check (length(btrim(event)) > 0)
);

create index waitlist_subscribers_created_at_idx
  on public.waitlist_subscribers (created_at desc);
create index waitlist_subscribers_event_created_at_idx
  on public.waitlist_subscribers (event, created_at desc);

create table public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  password_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint admin_users_email_normalized check (email = lower(btrim(email))),
  constraint admin_users_email_unique unique (email)
);

create index admin_users_created_at_idx on public.admin_users (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists admin_users_set_updated_at on public.admin_users;
create trigger admin_users_set_updated_at
  before update on public.admin_users
  for each row execute function public.set_updated_at();

alter table public.waitlist_subscribers enable row level security;
alter table public.admin_users enable row level security;

-- No anon/authenticated policies are created. Server-side service-role access
-- bypasses RLS; public roles cannot read or modify these records.
revoke all on table public.waitlist_subscribers from anon, authenticated;
revoke all on table public.admin_users from anon, authenticated;
grant all on table public.waitlist_subscribers to service_role;
grant all on table public.admin_users to service_role;

commit;
