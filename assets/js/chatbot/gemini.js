import { readEnv } from "../utils/env.js";
import { APP_CONFIG } from "../../../config/app.config.js";

function normalizeModelName(model) {
  if (!model) return "";
  return model.startsWith("models/") ? model.slice("models/".length) : model;
}

async function listAvailableModels(baseUrl, apiKey) {
  const response = await fetch(`${baseUrl}?key=${encodeURIComponent(apiKey)}`);
  if (!response.ok) return [];
  const payload = await response.json().catch(() => ({}));
  return (payload.models || [])
    .map((model) => normalizeModelName(model.name))
    .filter(Boolean);
}

async function requestGemini(baseUrl, model, apiKey, promptText) {
  const url = `${baseUrl}/${normalizeModelName(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: promptText }] }],
      generationConfig: {
        maxOutputTokens: APP_CONFIG.maxTokens,
        temperature: APP_CONFIG.temperature
      }
    })
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const apiMessage = payload?.error?.message || `Error Gemini: ${response.status}`;
    const error = new Error(apiMessage);
    error.status = response.status;
    throw error;
  }

  return payload?.candidates?.[0]?.content?.parts?.[0]?.text || "No fue posible generar respuesta.";
}

export async function askGemini(promptText) {
  const env = await readEnv();
  if (!env.GEMINI_API_KEY) throw new Error("Falta GEMINI_API_KEY en config/env.js");

  const explicitOrder = [
    env.GEMINI_MODEL || "gemini-2.5-flash",
    "gemini-flash-latest",
    "gemini-2.5-flash-lite",
    "gemini-2.0-flash"
  ];
  const listedModels = await listAvailableModels(env.GEMINI_API_URL, env.GEMINI_API_KEY);
  const listedSet = new Set(listedModels);
  const modelCandidates = explicitOrder.filter((model) => listedSet.size === 0 || listedSet.has(model));
  const tried = new Set();
  let lastError = "Error desconocido";

  for (const model of modelCandidates) {
    if (tried.has(model)) continue;
    tried.add(model);

    try {
      return await requestGemini(env.GEMINI_API_URL, model, env.GEMINI_API_KEY, promptText);
    } catch (error) {
      lastError = error instanceof Error ? error.message : "Error desconocido";
      const status = typeof error === "object" && error && "status" in error ? error.status : undefined;
      if (status !== 404) break;
    }
  }

  // Auto-select best candidate from ListModels when explicit fallbacks are unavailable.
  for (const listedModel of listedModels) {
    if (tried.has(listedModel)) continue;
    if (!listedModel.includes("flash")) continue;
    tried.add(listedModel);
    try {
      return await requestGemini(env.GEMINI_API_URL, listedModel, env.GEMINI_API_KEY, promptText);
    } catch (error) {
      lastError = error instanceof Error ? error.message : "Error desconocido";
      const status = typeof error === "object" && error && "status" in error ? error.status : undefined;
      if (status !== 404) break;
    }
  }

  throw new Error(lastError);
}
