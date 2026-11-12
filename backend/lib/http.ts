import { NextResponse } from "next/server";

export function jsonError(message: string, status: number, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ success: false, error: message, ...extra }, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export function jsonSuccess(data: Record<string, unknown>, status = 200) {
  return NextResponse.json({ success: true, ...data }, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export function hasSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const expectedOrigin = process.env.APP_ORIGIN?.trim() || new URL(request.url).origin;
    return new URL(origin).origin === new URL(expectedOrigin).origin;
  } catch {
    return false;
  }
}

export function getClientAddress(request: Request) {
  return request.headers.get("x-real-ip")?.trim()
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
}
