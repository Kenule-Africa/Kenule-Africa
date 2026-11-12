import pg from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Set DATABASE_URL in .env before inspecting the database.");
  process.exit(1);
}

const client = new pg.Client({
  connectionString,
  connectionTimeoutMillis: 12000,
  query_timeout: 20000,
  ssl: { rejectUnauthorized: true },
});
try {
  await client.connect();
  const { rows: tables } = await client.query(`
    select table_name
    from information_schema.tables
    where table_schema = 'public'
      and table_name in ('waitlist_subscribers', 'admin_users', 'api_rate_limits', 'kenule_migrations')
    order by table_name
  `);
  const { rows: columns } = await client.query(`
    select table_name, column_name, data_type, is_nullable, column_default
    from information_schema.columns
    where table_schema = 'public'
      and table_name in ('waitlist_subscribers', 'admin_users', 'api_rate_limits')
    order by table_name, ordinal_position
  `);
  const { rows: rls } = await client.query(`
    select c.relname as table_name, c.relrowsecurity as rls_enabled,
           coalesce(json_agg(json_build_object('policy', p.policyname, 'roles', p.roles, 'commands', p.cmd))
             filter (where p.policyname is not null), '[]'::json) as policies
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    left join pg_policies p on p.schemaname = n.nspname and p.tablename = c.relname
    where n.nspname = 'public'
      and c.relname in ('waitlist_subscribers', 'admin_users', 'api_rate_limits')
    group by c.relname, c.relrowsecurity
    order by c.relname
  `);
  const { rows: constraints } = await client.query(`
    select conrelid::regclass::text as table_name, conname, contype
    from pg_constraint
    where connamespace = 'public'::regnamespace
      and conrelid::regclass::text in ('waitlist_subscribers', 'admin_users', 'api_rate_limits')
    order by table_name, conname
  `);

  console.log(JSON.stringify({ tables, columns, rls, constraints }, null, 2));
} catch (error) {
  console.error("Database inspection failed:", error instanceof Error ? error.message : "Unknown error");
  process.exitCode = 1;
} finally {
  await client.end().catch(() => undefined);
}
