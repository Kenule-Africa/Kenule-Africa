import { getSupabaseAdminClient } from "@backend/lib/supabase";
import { jsonError, jsonSuccess } from "@backend/lib/http";
import { readAdminSession } from "@backend/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!readAdminSession(request)) return jsonError("Authentication required.", 401);
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? 1);
  const pageSize = Number(url.searchParams.get("pageSize") ?? 25);
  const sort = url.searchParams.get("sort") ?? "desc";
  const search = (url.searchParams.get("search") ?? "").trim();

  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100) {
    return jsonError("Invalid pagination values.", 400);
  }
  if (sort !== "asc" && sort !== "desc") return jsonError("Sort must be asc or desc.", 400);
  if (search.length > 120) return jsonError("Search text is too long.", 400);

  const from = (page - 1) * pageSize;
  let query = getSupabaseAdminClient()
    .from("waitlist_subscribers")
    .select("id, email, event, created_at", { count: "exact" })
    .order("created_at", { ascending: sort === "asc" })
    .range(from, from + pageSize - 1);
  if (search) query = query.ilike("email", `%${search.replace(/[\\%_]/g, "\\$&")}%`);

  const { data, count, error } = await query;
  if (error) {
    console.error("Subscriber retrieval failed", error);
    return jsonError("Could not load subscribers.", 500);
  }
  return jsonSuccess({
    subscribers: data ?? [],
    pagination: { page, pageSize, total: count ?? 0, totalPages: Math.ceil((count ?? 0) / pageSize) },
    filters: { search, sort },
  });
}
