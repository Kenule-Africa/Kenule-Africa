import { NextResponse } from "next/server";
import { getClientAddress, jsonError, jsonSuccess } from "@backend/lib/http";
import { consumeRateLimit } from "@backend/lib/rate-limit";
import { registerWaitlistEmail } from "@backend/services/waitlist.service";
import { parseWaitlistBody } from "@backend/validations/waitlist";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return jsonError("Send the registration as JSON.", 415);
  }
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 4096) return jsonError("Request is too large.", 413);

  const ipLimit = await consumeRateLimit(`waitlist:ip:${getClientAddress(request)}`, 8, 60 * 60);
  if (ipLimit.unavailable) return jsonError("Registration is temporarily unavailable. Please try again shortly.", 503);
  if (!ipLimit.allowed) return NextResponse.json(
    { success: false, error: "Too many attempts. Please try again later." },
    { status: 429, headers: { "Cache-Control": "no-store", "Retry-After": "3600" } },
  );

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Enter a valid email address.", 400);
  }
  const parsed = parseWaitlistBody(body);
  if (!parsed) return jsonError("Enter a valid email address.", 400);

  const emailLimit = await consumeRateLimit(`waitlist:email:${parsed.email}`, 3, 60 * 60);
  if (emailLimit.unavailable) return jsonError("Registration is temporarily unavailable. Please try again shortly.", 503);
  if (!emailLimit.allowed) return jsonError("Too many attempts for this email. Please try again later.", 429);

  try {
    const result = await registerWaitlistEmail(parsed.email);
    if (result.kind === "duplicate") return jsonError("This email is already on the waitlist.", 409, { code: "DUPLICATE_EMAIL" });
    return jsonSuccess({ message: "You're on the list! We'll be in touch when TOMORROW goes live." }, 201);
  } catch (error) {
    console.error("Waitlist registration failed", error);
    return jsonError("We could not complete your registration. Please try again.", 500);
  }
}
