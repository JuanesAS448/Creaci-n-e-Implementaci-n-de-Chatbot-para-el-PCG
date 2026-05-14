import { sanitizeInput } from "../utils/sanitize.js";
import { buildPrompt } from "./prompt.js";
import { askGemini } from "./gemini.js";

const STRINGS = {
  es: {
    typing: "Escribiendo…",
    placeholder: "Escribe tu pregunta sobre UNI SIGEA…",
    errorPrefix: "Error al consultar Gemini:"
  },
  en: {
    typing: "Typing…",
    placeholder: "Ask a question about UNI SIGEA…",
    errorPrefix: "Error calling Gemini:"
  }
};

function getLang() {
  const select = document.getElementById("chatbot-lang");
  const value = select?.value;
  return value === "en" ? "en" : "es";
}

function applyChatbotUiStrings() {
  const lang = getLang();
  const t = STRINGS[lang];
  const typing = document.getElementById("chatbot-typing");
  const input = document.getElementById("chatbot-input");
  if (typing) typing.textContent = t.typing;
  if (input) input.placeholder = t.placeholder;
}

export function initChatbot() {
  const toggle = document.getElementById("chatbot-toggle");
  const panel = document.getElementById("chatbot-panel");
  const form = document.getElementById("chatbot-form");
  const input = document.getElementById("chatbot-input");
  const messages = document.getElementById("chatbot-messages");
  const typing = document.getElementById("chatbot-typing");
  const langSelect = document.getElementById("chatbot-lang");
  const history = [];

  const append = (text, type) => {
    const row = document.createElement("p");
    row.className = `chat-msg ${type}`;
    row.textContent = text;
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
  };

  langSelect?.addEventListener("change", applyChatbotUiStrings);
  applyChatbotUiStrings();

  toggle?.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
  });

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const userInput = sanitizeInput(input.value);
    if (!userInput) return;

    const lang = getLang();
    append(userInput, "user");
    history.push(`${lang === "en" ? "User" : "Usuario"}: ${userInput}`);
    input.value = "";
    typing.hidden = false;

    try {
      const prompt = buildPrompt(history, userInput, lang);
      const answer = await askGemini(prompt);
      append(answer, "bot");
      history.push(`${lang === "en" ? "Assistant" : "Asistente"}: ${answer}`);
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown error";
      const t = STRINGS[lang];
      append(`${t.errorPrefix} ${reason}`, "bot");
    } finally {
      typing.hidden = true;
    }
  });
}
