import { getSupabaseAdminClient } from "../lib/supabase";

export async function registerWaitlistEmail(email: string) {
  const { data, error } = await getSupabaseAdminClient()
    .from("waitlist_subscribers")
    .insert({ email, event: "tomorrow" })
    .select("id, email, event, created_at")
    .single();

  if (error?.code === "23505") return { kind: "duplicate" as const };
  if (error) throw error;
  return { kind: "created" as const, subscriber: data };
}
