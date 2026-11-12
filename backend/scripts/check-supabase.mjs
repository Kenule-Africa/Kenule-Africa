import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL?.trim();
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
if (!url || !serviceRoleKey) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.");
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, detectSessionInUrl: false, persistSession: false },
});
for (const [table, columns] of [
  ["waitlist_subscribers", "id, email, event, created_at"],
  ["admin_users", "id, email, password_hash, created_at, updated_at"],
]) {
  const { error } = await supabase.from(table).select(columns).limit(0);
  if (error) {
    console.error(`Supabase schema check failed for ${table}: ${error.message}`);
    process.exit(1);
  }
}
console.log("Supabase connection succeeded; expected waitlist and administrator columns are available to the server role.");
