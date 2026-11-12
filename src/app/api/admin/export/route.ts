import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@backend/lib/supabase";
import { jsonError } from "@backend/lib/http";
import { readAdminSession } from "@backend/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csvCell(value: string) {
  const safe = /^[\s]*[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  if (!readAdminSession(request)) return jsonError("Authentication required.", 401);
  const url = new URL(request.url);
  const search = (url.searchParams.get("search") ?? "").trim();
  const sort = url.searchParams.get("sort") ?? "desc";
  if (search.length > 120) return jsonError("Search text is too long.", 400);
  if (sort !== "asc" && sort !== "desc") return jsonError("Sort must be asc or desc.", 400);

  try {
    const supabase = getSupabaseAdminClient();
    const rows: { email: string; created_at: string; event: string }[] = [];
    const batchSize = 1000;
    for (let from = 0; ; from += batchSize) {
      let query = supabase
        .from("waitlist_subscribers")
        .select("email, created_at, event")
        .order("created_at", { ascending: sort === "asc" })
        .range(from, from + batchSize - 1);
      if (search) query = query.ilike("email", `%${search.replace(/[\\%_]/g, "\\$&")}%`);
      const { data, error } = await query;
      if (error) throw error;
      rows.push(...(data ?? []));
      if (!data || data.length < batchSize) break;
    }

    const csv = [
      ["Email address", "Registration date", "Event/source"],
      ...rows.map((row) => [row.email, row.created_at, row.event]),
    ].map((line) => line.map(csvCell).join(",")).join("\r\n");
    const date = new Date().toISOString().slice(0, 10);
    return new NextResponse(`\uFEFF${csv}`, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        "Content-Disposition": `attachment; filename="tomorrow-waitlist-${date}.csv"`,
        "Content-Type": "text/csv; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Subscriber export failed", error);
    return jsonError("Could not export subscribers.", 500);
  }
}
