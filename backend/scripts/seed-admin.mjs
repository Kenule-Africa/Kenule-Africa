import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL?.trim();
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;

if (!url || !serviceRoleKey || !email || !password) {
  console.error("Set SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_EMAIL and ADMIN_PASSWORD in .env.");
  process.exit(1);
}
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error("ADMIN_EMAIL must be a valid email address.");
  process.exit(1);
}
if (password.length < 12) {
  console.error("ADMIN_PASSWORD must contain at least 12 characters.");
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, detectSessionInUrl: false, persistSession: false },
});
const { data: existing, error: lookupError } = await supabase
  .from("admin_users")
  .select("id")
  .eq("email", email)
  .maybeSingle();

if (lookupError) {
  console.error(`Could not check for an existing administrator: ${lookupError.message}`);
  process.exit(1);
}
if (existing) {
  console.log("Administrator already exists. Existing password hash was left unchanged.");
  process.exit(0);
}

const passwordHash = await bcrypt.hash(password, 12);
const { error: insertError } = await supabase.from("admin_users").insert({ email, password_hash: passwordHash });
if (insertError) {
  console.error(`Could not create the administrator: ${insertError.message}`);
  process.exit(1);
}
console.log("Administrator created with a bcrypt password hash.");
