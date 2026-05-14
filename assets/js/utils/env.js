let dotEnvCache = null;

function parseDotEnv(text) {
  const result = {};
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx <= 0) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    result[key] = value;
  }
  return result;
}

async function loadDotEnv() {
  if (dotEnvCache) return dotEnvCache;
  try {
    const response = await fetch("./.env", { cache: "no-store" });
    if (!response.ok) return null;
    dotEnvCache = parseDotEnv(await response.text());
    return dotEnvCache;
  } catch {
    return null;
  }
}

export async function readEnv() {
  const runtimeEnv = window.__ENV__ || {};
  const fileEnv = await loadDotEnv();
  return {
    GEMINI_API_KEY: runtimeEnv.GEMINI_API_KEY || fileEnv?.GEMINI_API_KEY || "",
    GEMINI_MODEL: runtimeEnv.GEMINI_MODEL || fileEnv?.GEMINI_MODEL || "gemini-2.5-flash",
    GEMINI_API_URL: runtimeEnv.GEMINI_API_URL || fileEnv?.GEMINI_API_URL || "https://generativelanguage.googleapis.com/v1beta/models"
  };
}
