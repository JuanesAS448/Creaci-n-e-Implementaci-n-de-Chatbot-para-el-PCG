# UNI SIGEA

Landing web y chatbot integrado para **Gestión del Conocimiento** del proyecto UNI SIGEA (Universidad / convocatorias / administración académica). El asistente conversa con **Google Gemini** desde el navegador y admite respuestas en **español** e **inglés**.

## Tecnologías utilizadas

- HTML5, CSS3 (variables, layout responsive)
- JavaScript (ES modules, sin framework)
- **Google Gemini API** (`generateContent`, REST `v1beta`)
- Google Fonts (Oxanium, Rajdhani, JetBrains Mono)

## Arquitectura general

```
index.html
  ├── Estáticos: CSS en assets/css/ (+ sections/)
  ├── config/env.js        → window.__ENV__ (API key en runtime; no versionar valores reales)
  └── assets/js/main.js    → importa módulos UI + chatbot

Chatbot
  ├── chatbot.js     → UI, idioma ES|EN, envío del formulario
  ├── prompt.js      → system prompt + KB + historial (texto)
  ├── gemini.js      → POST …/models/{model}:generateContent?key=…
  ├── knowledge.js   → KB_CONTEXT (incluye declaración institucional)
  └── utils/env.js   → lectura de __ENV__ y opcionalmente .env vía fetch
```

**Frontend / “backend”:** no hay servidor propio; el cliente llama directamente a la API de Gemini (adecuado para prototipo; en producción conviene un proxy para ocultar la clave).

**Idiomas:** el usuario elige **Español** o **English** en el panel del chat; el prompt obliga al modelo a responder solo en ese idioma.

**Declaración Persona Transhumana:** visible en la página (`#persona-transhumana`), en el panel del chat y en `knowledge.js` para respuestas contextuales del modelo.

## Instrucciones de ejecución

1. Clona o descarga el repositorio.
2. Crea `config/env.js` a partir de `.env.example` (o copia valores en `window.__ENV__` en `config/env.js`). Debes definir al menos `GEMINI_API_KEY`.
3. Sirve la carpeta con un servidor HTTP local (necesario para `fetch` de módulos ES y, si aplica, de `.env`):

```bash
cd "PLAN UNI SIGEA"
python -m http.server 8080
```

4. Abre en el navegador: `http://localhost:8080`

5. Abre el chat (botón flotante), elige idioma, escribe un mensaje y comprueba la respuesta de Gemini.

## Variables de entorno necesarias

| Variable | Descripción |
|----------|-------------|
| `GEMINI_API_KEY` | Clave de Google AI Studio / Cloud para la API Generative Language |
| `GEMINI_MODEL` | Por defecto `gemini-2.5-flash` (el cliente puede alternar modelos si hay 404/cuota según lógica en `gemini.js`) |
| `GEMINI_API_URL` | Base `https://generativelanguage.googleapis.com/v1beta/models` |

Puedes definirlas en:

- **`config/env.js`** (objeto `window.__ENV__`) — recomendado para pruebas locales; el archivo con secretos debe estar en `.gitignore`.
- **`/.env`** — si el servidor sirve el archivo, `env.js` puede leerlo con `fetch("./.env")` (no subas la clave a GitHub).

## Cumplimiento de la actividad (resumen)

| Requisito | Cómo se cumple |
|-----------|----------------|
| Chatbot integrado en el proyecto | Panel flotante + scripts en la misma web |
| Interacción básica | Formulario de mensajes y respuestas |
| Español e inglés | Selector **Idioma / Language** y prompt condicionado |
| Interfaz web | HTML/CSS/JS |
| API / modelo IA | Llamadas REST a Gemini en `gemini.js` |
| Declaración institucional | Sección `#persona-transhumana`, bloque en el chat y `knowledge.js` |

## Video en inglés (guía de contenido)

Para la entrega en video (máx. 10 min), en inglés cubre: introducción personal y proyecto; arquitectura; flujo del chatbot; consumo de Gemini; manejo de idiomas; fragmento de código clave (`gemini.js`, `prompt.js`, `chatbot.js`); demo en español y en inglés con el selector.

## Licencia / uso académico

Proyecto académico UNI SIGEA. Revisa políticas de uso de datos y claves API antes de publicar capturas o repositorios públicos.
