import { NextResponse } from "next/server";
import { authenticateAdmin } from "@backend/services/admin.service";
import { hasSameOrigin, getClientAddress, jsonError, jsonSuccess } from "@backend/lib/http";
import { consumeRateLimit } from "@backend/lib/rate-limit";
import { createAdminSession, setAdminSessionCookie } from "@backend/lib/session";
import { parseLoginBody } from "@backend/validations/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) return jsonError("Request origin could not be verified.", 403);
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return jsonError("Send login credentials as JSON.", 415);
  }
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 8192) return jsonError("Request is too large.", 413);

  const ipLimit = await consumeRateLimit(`admin-login:ip:${getClientAddress(request)}`, 10, 15 * 60);
  if (ipLimit.unavailable) return jsonError("Login is temporarily unavailable.", 503);
  if (!ipLimit.allowed) return NextResponse.json(
    { success: false, error: "Too many login attempts. Try again in 15 minutes." },
    { status: 429, headers: { "Cache-Control": "no-store", "Retry-After": "900" } },
  );

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Enter a valid email and password.", 400);
  }
  const credentials = parseLoginBody(body);
  if (!credentials) return jsonError("Enter a valid email and password.", 400);

  const emailLimit = await consumeRateLimit(`admin-login:email:${credentials.email}`, 8, 15 * 60);
  if (emailLimit.unavailable) return jsonError("Login is temporarily unavailable.", 503);
  if (!emailLimit.allowed) return jsonError("Too many login attempts. Try again in 15 minutes.", 429);

  try {
    const admin = await authenticateAdmin(credentials.email, credentials.password);
    if (!admin) return jsonError("Email or password is incorrect.", 401);
    const response = jsonSuccess({ admin });
    setAdminSessionCookie(response, createAdminSession(admin.id));
    return response;
  } catch (error) {
    console.error("Admin login failed", error);
    return jsonError("Login is temporarily unavailable.", 503);
  }
}
