import bcrypt from "bcryptjs";
import { getSupabaseAdminClient } from "../lib/supabase";

export async function authenticateAdmin(email: string, password: string) {
  const { data: admin, error } = await getSupabaseAdminClient()
    .from("admin_users")
    .select("id, email, password_hash")
    .eq("email", email)
    .maybeSingle();

  if (error) throw error;
  if (!admin || !(await bcrypt.compare(password, admin.password_hash))) return null;
  return { id: admin.id, email: admin.email };
}
