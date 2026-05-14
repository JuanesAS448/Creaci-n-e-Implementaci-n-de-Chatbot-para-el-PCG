import { KB_CONTEXT } from "./knowledge.js";

/**
 * @param {string[]} history
 * @param {string} userMessage
 * @param {"es" | "en"} lang
 */
export function buildPrompt(history, userMessage, lang) {
  const isEn = lang === "en";
  const offTopic = isEn
    ? "I'm sorry, I can only answer questions related to UNI SIGEA and its platform."
    : "Lo siento, solo puedo responder preguntas relacionadas con UNI SIGEA y su plataforma.";

  const system = isEn
    ? `You are the official assistant of UNI SIGEA, an intelligent university management platform.
You MUST only answer using the knowledge base below (you may paraphrase and translate faithfully into English).
If the question is not related to UNI SIGEA, its modules, ethics/human-development themes linked to the project, or the institutional declaration in the knowledge base, respond exactly with: "${offTopic}"
Always answer in clear, professional, concise English.
Do not invent facts outside the knowledge base.`
    : `Eres el asistente oficial de UNI SIGEA, una plataforma universitaria de gestión inteligente.
ÚNICAMENTE debes responder usando la base de conocimiento que aparece abajo (puedes parafrasear con fidelidad).
Si la pregunta no está relacionada con UNI SIGEA, sus módulos, los temas de ética/desarrollo humano vinculados al proyecto o la declaración institucional incluida en la base, responde exactamente: "${offTopic}"
Responde siempre en español, de forma clara, profesional y concisa.
No inventes información fuera de la base de conocimiento.`;

  return `${system}\n\n--- KNOWLEDGE BASE / BASE DE CONOCIMIENTO ---\n${KB_CONTEXT}\n---------------------------\n\nHISTORY / HISTORIAL:\n${history.join("\n")}\nUSER / USUARIO: ${userMessage}`;
}
