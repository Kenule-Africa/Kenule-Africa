-- Shared, atomic API throttling for registration and administrator login.
begin;

create table public.api_rate_limits (
  key_hash text primary key check (key_hash ~ '^[a-f0-9]{64}$'),
  window_started_at timestamptz not null default now(),
  hit_count integer not null check (hit_count > 0),
  updated_at timestamptz not null default now()
);

alter table public.api_rate_limits enable row level security;
revoke all on table public.api_rate_limits from anon, authenticated;
grant all on table public.api_rate_limits to service_role;

create or replace function public.consume_rate_limit(
  p_key_hash text,
  p_max_hits integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  resulting_hits integer;
begin
  if p_key_hash !~ '^[a-f0-9]{64}$' or p_max_hits < 1 or p_window_seconds < 1 then
    raise exception 'Invalid rate limit parameters';
  end if;

  insert into public.api_rate_limits as buckets (key_hash, window_started_at, hit_count, updated_at)
  values (p_key_hash, now(), 1, now())
  on conflict (key_hash) do update set
    window_started_at = case
      when buckets.window_started_at + make_interval(secs => p_window_seconds) <= now() then now()
      else buckets.window_started_at
    end,
    hit_count = case
      when buckets.window_started_at + make_interval(secs => p_window_seconds) <= now() then 1
      else buckets.hit_count + 1
    end,
    updated_at = now()
  returning hit_count into resulting_hits;

  return resulting_hits <= p_max_hits;
end;
$$;

revoke all on function public.consume_rate_limit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.consume_rate_limit(text, integer, integer) to service_role;

commit;
