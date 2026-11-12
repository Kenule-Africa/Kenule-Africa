import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextResponse } from "next/server";

export const ADMIN_SESSION_COOKIE = "kenule_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

type SessionPayload = { sub: string; exp: number };

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || Buffer.byteLength(secret) < 32) {
    throw new Error("ADMIN_SESSION_SECRET must contain at least 32 bytes.");
  }
  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

export function createAdminSession(adminId: string) {
  const payload: SessionPayload = {
    sub: adminId,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function verifyAdminSession(token?: string | null): SessionPayload | null {
  if (!token) return null;
  try {
    const [encoded, signature, extra] = token.split(".");
    if (!encoded || !signature || extra) return null;
    const expected = Buffer.from(sign(encoded));
    const received = Buffer.from(signature);
    if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as SessionPayload;
    if (typeof payload.sub !== "string" || !payload.sub || typeof payload.exp !== "number") return null;
    if (payload.exp <= Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function readAdminSession(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookie = cookieHeader.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${ADMIN_SESSION_COOKIE}=`));
  return verifyAdminSession(cookie?.slice(ADMIN_SESSION_COOKIE.length + 1));
}

export function setAdminSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    maxAge: SESSION_TTL_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}
