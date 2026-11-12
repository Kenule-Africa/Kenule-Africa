import { getSupabaseAdminClient } from "@backend/lib/supabase";
import { jsonError, jsonSuccess } from "@backend/lib/http";
import { readAdminSession } from "@backend/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!readAdminSession(request)) return jsonError("Authentication required.", 401);

  const now = new Date();
  // Lagos uses UTC+1 year-round. Convert local midnight back to UTC for the DB query.
  const lagosNow = new Date(now.getTime() + 60 * 60 * 1000);
  lagosNow.setUTCHours(0, 0, 0, 0);
  const today = new Date(lagosNow.getTime() - 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const supabase = getSupabaseAdminClient();

  const [totalResult, todayResult, weekResult, latestResult] = await Promise.all([
    supabase.from("waitlist_subscribers").select("id", { count: "exact", head: true }),
    supabase.from("waitlist_subscribers").select("id", { count: "exact", head: true }).gte("created_at", today.toISOString()),
    supabase.from("waitlist_subscribers").select("id", { count: "exact", head: true }).gte("created_at", sevenDaysAgo.toISOString()),
    supabase.from("waitlist_subscribers").select("created_at").order("created_at", { ascending: false }).limit(1).maybeSingle(),
  ]);

  const error = totalResult.error ?? todayResult.error ?? weekResult.error ?? latestResult.error;
  if (error) {
    console.error("Waitlist statistics query failed", error);
    return jsonError("Could not load dashboard statistics.", 500);
  }

  return jsonSuccess({
    stats: {
      total: totalResult.count ?? 0,
      today: todayResult.count ?? 0,
      lastSevenDays: weekResult.count ?? 0,
      mostRecentAt: latestResult.data?.created_at ?? null,
      timezone: "Africa/Lagos",
    },
  });
}
