import { clearAdminSessionCookie } from "@backend/lib/session";
import { hasSameOrigin, jsonError, jsonSuccess } from "@backend/lib/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) return jsonError("Request origin could not be verified.", 403);
  const response = jsonSuccess({ message: "Signed out." });
  clearAdminSessionCookie(response);
  return response;
}
