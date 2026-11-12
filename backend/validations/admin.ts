import { normalizeEmail } from "./waitlist";

export function parseLoginBody(value: unknown): { email: string; password: string } | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const body = value as Record<string, unknown>;
  if (Object.keys(body).length !== 2 || !Object.hasOwn(body, "email") || !Object.hasOwn(body, "password")) return null;
  const email = normalizeEmail(body.email);
  if (!email || typeof body.password !== "string" || body.password.length < 1 || body.password.length > 256) return null;
  return { email, password: body.password };
}
