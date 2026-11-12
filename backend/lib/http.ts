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
    const normalizeOrigin = (value: string) => {
      const parsed = new URL(value);
      // Treat the site's www and apex domains as the same canonical origin.
      parsed.hostname = parsed.hostname.replace(/^www\./i, "");
      return parsed.origin;
    };
    const requestOrigin = new URL(request.url).origin;
    const configuredOrigins = (process.env.APP_ORIGIN ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    const allowedOrigins = [requestOrigin, ...configuredOrigins].map(normalizeOrigin);
    return allowedOrigins.includes(normalizeOrigin(origin));
  } catch {
    return false;
  }
}

export function getClientAddress(request: Request) {
  return request.headers.get("x-real-ip")?.trim()
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
}
