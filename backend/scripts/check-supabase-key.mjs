const urlValue = process.env.SUPABASE_URL?.trim();
const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

if (!urlValue || !key) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.");
  process.exit(1);
}

let keyType = "unrecognized";
let keyProject = null;
if (key.startsWith("sb_secret_")) {
  keyType = "Supabase secret key";
} else if (key.startsWith("sb_publishable_")) {
  keyType = "Supabase publishable key";
} else {
  try {
    const payload = JSON.parse(Buffer.from(key.split(".")[1], "base64url").toString("utf8"));
    keyType = typeof payload.role === "string" ? `JWT role: ${payload.role}` : "JWT without role claim";
    keyProject = typeof payload.ref === "string" ? payload.ref : null;
  } catch {
    // Report only a generic classification. Never print the configured credential.
  }
}

const urlProject = new URL(urlValue).hostname.split(".")[0];
console.log(`Configured server key: ${keyType}`);
if (keyProject) console.log(`Key project matches SUPABASE_URL: ${keyProject === urlProject ? "yes" : "no"}`);
if (keyType === "Supabase publishable key" || keyType === "JWT role: anon") process.exitCode = 1;
