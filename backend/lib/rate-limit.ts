import { createHmac } from "node:crypto";
import { getSupabaseAdminClient } from "./supabase";

export type RateLimitResult = { allowed: boolean; unavailable: boolean };

/** Uses a database RPC so limits are shared across server instances. */
export async function consumeRateLimit(key: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || Buffer.byteLength(secret) < 32) return { allowed: false, unavailable: true };

  const keyHash = createHmac("sha256", secret).update(key).digest("hex");
  try {
    const { data, error } = await getSupabaseAdminClient().rpc("consume_rate_limit", {
      p_key_hash: keyHash,
      p_max_hits: limit,
      p_window_seconds: windowSeconds,
    });
    if (error || typeof data !== "boolean") return { allowed: false, unavailable: true };
    return { allowed: data, unavailable: false };
  } catch {
    return { allowed: false, unavailable: true };
  }
}
