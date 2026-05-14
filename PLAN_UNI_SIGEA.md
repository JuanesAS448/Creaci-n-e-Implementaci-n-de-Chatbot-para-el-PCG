# 📋 PLAN DE DESARROLLO — UNI SIGEA
> **Sistema de Gestión Inteligente para Educación y Administración Universitaria**  
> Stack: HTML · CSS · JavaScript Vanilla | IA: Gemini Flash 1.5 (Google AI Studio)

---

## 1. VISIÓN GENERAL DEL PROYECTO

**UNI SIGEA** es una plataforma universitaria orientada a la gestión inteligente de convocatorias, talento humano y procesos académicos dentro de instituciones de educación superior. Su landing page pública comunica innovación, organización y transformación digital, integrando un chatbot con IA basado en una base de conocimiento propia del sistema.

---

## 2. ARQUITECTURA DEL PROYECTO

```
uni-sigea/
│
├── index.html                  # Punto de entrada principal (Landing Page)
│
├── .env.example                # Variables de entorno requeridas
│
├── assets/
│   ├── css/
│   │   ├── variables.css       # Tokens de diseño: colores LED, tipografías, espaciado
│   │   ├── reset.css           # Normalización cross-browser
│   │   ├── layout.css          # Grid, flex, contenedores responsivos
│   │   ├── components.css      # Botones, cards, badges, inputs reutilizables
│   │   ├── animations.css      # Keyframes, transiciones LED/glow
│   │   └── sections/
│   │       ├── hero.css
│   │       ├── about.css
│   │       ├── modules.css
│   │       ├── benefits.css
│   │       ├── stats.css
│   │       ├── testimonials.css
│   │       ├── faq.css
│   │       ├── chatbot.css
│   │       └── footer.css
│   │
│   ├── js/
│   │   ├── main.js             # Inicializador: importa y orquesta todos los módulos JS
│   │   ├── router.js           # Navegación SPA sin recarga (hash routing)
│   │   ├── ui/
│   │   │   ├── menu.js         # Menú lateral izquierdo, highlight activo, toggle mobile
│   │   │   ├── animations.js   # Intersection Observer para reveals on scroll
│   │   │   ├── accordion.js    # FAQ expandible reutilizable
│   │   │   ├── stats.js        # Contador animado de métricas
│   │   │   └── carousel.js     # Slider de testimonios
│   │   │
│   │   ├── chatbot/
│   │   │   ├── chatbot.js      # Lógica principal del chatbot (UI + orquestación)
│   │   │   ├── gemini.js       # Cliente HTTP para Gemini Flash 1.5 API
│   │   │   ├── knowledge.js    # Base de conocimiento UNI SIGEA (exporta KB_CONTEXT)
│   │   │   └── prompt.js       # Constructor del system prompt con KB + guardrails
│   │   │
│   │   └── utils/
│   │       ├── env.js          # Lector seguro de variables de entorno (.env vía config)
│   │       ├── sanitize.js     # Sanitización de inputs de usuario
│   │       └── debounce.js     # Utilidad debounce reutilizable
│   │
│   └── img/
│       ├── logo.svg
│       ├── hero-bg.svg         # Fondo geométrico LED generado en SVG
│       └── icons/              # Íconos SVG de módulos (inline-able)
│
├── config/
│   └── app.config.js          # Configuración global (modelo IA, max_tokens, etc.)
│
└── docs/
    └── PLAN_UNI_SIGEA.md      # Este archivo
```

---

## 3. VARIABLES DE ENTORNO

### `.env.example`
```env
# ─────────────────────────────────────────────
#  UNI SIGEA — Variables de entorno
#  Copia este archivo como: config/env.js
#  y completa los valores reales (NUNCA subir .env con valores reales al repositorio)
# ─────────────────────────────────────────────

# Google AI Studio — Gemini Flash 1.5
GEMINI_API_KEY=TU_API_KEY_AQUI

# Modelo de IA a utilizar
GEMINI_MODEL=gemini-1.5-flash-latest

# URL base de la API de Gemini
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models
```

> **Nota de seguridad**: En producción, la API key nunca debe exponerse en el frontend. Se recomienda un proxy/backend (Node.js / Cloudflare Worker). Para prototipo/demo, se expone vía `config/env.js` que está en `.gitignore`.

---

## 4. PALETA DE COLORES Y TOKENS DE DISEÑO

```css
/* assets/css/variables.css */
:root {
  /* Fondos oscuros */
  --color-bg-primary:    #080c14;
  --color-bg-secondary:  #0d1421;
  --color-bg-card:       #111827;
  --color-bg-elevated:   #1a2235;

  /* Azul LED — color principal */
  --color-blue-glow:     #00aaff;
  --color-blue-mid:      #0077cc;
  --color-blue-dark:     #004a8f;
  --color-blue-shadow:   rgba(0, 170, 255, 0.25);
  --glow-blue:           0 0 8px #00aaff, 0 0 20px rgba(0,170,255,0.4);

  /* Amarillo LED — color secundario */
  --color-yellow-glow:   #ffd700;
  --color-yellow-mid:    #e6b800;
  --color-yellow-shadow: rgba(255, 215, 0, 0.25);
  --glow-yellow:         0 0 8px #ffd700, 0 0 20px rgba(255,215,0,0.4);

  /* Texto */
  --color-text-primary:  #e8f4ff;
  --color-text-secondary:#94a3b8;
  --color-text-muted:    #475569;

  /* Bordes */
  --color-border:        rgba(0, 170, 255, 0.15);
  --color-border-hover:  rgba(0, 170, 255, 0.5);

  /* Tipografía */
  --font-display:  'Orbitron', sans-serif;     /* Headers, logo */
  --font-body:     'Exo 2', sans-serif;        /* Cuerpo de texto */
  --font-mono:     'JetBrains Mono', monospace; /* Código, stats */

  /* Espaciado base 8px */
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  40px;
  --space-2xl: 64px;

  /* Radios */
  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg:  16px;
  --radius-pill: 999px;

  /* Transiciones */
  --transition-fast:   150ms ease;
  --transition-normal: 300ms ease;
  --transition-slow:   600ms ease;

  /* Menú lateral */
  --menu-width: 260px;
}
```

---

## 5. ESTRUCTURA DE LA LANDING PAGE

### 5.1 Layout general

```
┌────────────────────────────────────────────────────────────┐
│  [MENÚ LATERAL IZQUIERDO — STICKY]   │  CONTENIDO MAIN     │
│                                       │                     │
│  🔷 Logo UNI SIGEA                   │  Secciones scroll:  │
│                                       │  · Hero             │
│  Navegación:                          │  · Sobre UNI SIGEA  │
│  ──────────────                       │  · Módulos          │
│  ▸ Inicio                            │  · Beneficios       │
│  ▸ Plataforma                        │  · Estadísticas     │
│  ▸ Módulos                           │  · Testimonios      │
│  ▸ Beneficios                        │  · FAQ              │
│  ▸ Estadísticas                      │  · Footer           │
│  ▸ Testimonios                       │                     │
│  ▸ FAQ                               │                     │
│  ▸ Contacto                          │                     │
│                                       │                     │
│  [💬 Chatbot flotante — bottom right] │                     │
└────────────────────────────────────────────────────────────┘
```

---

### 5.2 Secciones del Home

#### SECCIÓN 1 — HERO
- **Headline**: `"Transforma la gestión universitaria con inteligencia artificial"`
- **Subheadline**: descripción breve de UNI SIGEA (2 líneas)
- **CTA Principal**: `"Solicitar Demo"` (botón azul LED con glow)
- **CTA Secundario**: `"Conocer Módulos"` (botón outline amarillo)
- **Fondo**: SVG animado con partículas/red neuronal y degradado oscuro
- **Badge flotante**: `"Powered by AI · Gemini 1.5"`

#### SECCIÓN 2 — HISTORIA DE LA IA (minimalista)
> *"Un home minimalista — la historia de la IA"*

Línea de tiempo horizontal/vertical con hitos clave:
| Año | Hito |
|-----|------|
| 1950 | Alan Turing propone la "Máquina que piensa" |
| 1956 | Nace el término "Inteligencia Artificial" — Dartmouth |
| 1986 | Redes neuronales y backpropagation |
| 2012 | Deep Learning — AlexNet revoluciona la visión |
| 2017 | Transformers — "Attention is All You Need" |
| 2022 | LLMs masivos: ChatGPT llega al mundo |
| 2024 | IA generativa en educación superior — UNI SIGEA |

Estilo: minimalista, línea vertical LED azul, dots amarillos, texto corto.

#### SECCIÓN 3 — SOBRE UNI SIGEA
- Párrafo de descripción general (qué es, para quién, qué resuelve)
- 3 íconos/pilares: Innovación · Organización · Transformación Digital
- Imagen/ilustración SVG de dashboard universitario

#### SECCIÓN 4 — MÓDULOS PRINCIPALES (5 cards)
Cada card incluye: ícono SVG, título, descripción, lista de características clave.

| # | Módulo | Ícono sugerido |
|---|--------|----------------|
| 1 | Gestión de Convocatorias Académicas y Laborales | 📢 megáfono |
| 2 | Administración de Usuarios y Roles Institucionales | 👥 usuarios |
| 3 | Carga y Validación Inteligente de Documentos | 📄 documento IA |
| 4 | Seguimiento de Postulaciones y Procesos de Selección | 🔍 tracking |
| 5 | Panel Administrativo con Analítica e Informes | 📊 dashboard |

#### SECCIÓN 5 — BENEFICIOS
Grid de 6 beneficios con ícono + título + descripción corta:
1. Reducción de tiempos administrativos hasta un 70%
2. Centralización de procesos en una sola plataforma
3. Toma de decisiones basada en datos reales
4. Seguridad y trazabilidad documental
5. Experiencia intuitiva para docentes, estudiantes y admin
6. Integración con sistemas universitarios existentes

#### SECCIÓN 6 — ESTADÍSTICAS SIMULADAS
Contadores animados al hacer scroll:

| Métrica | Valor |
|---------|-------|
| Convocatorias gestionadas | +2.400 |
| Instituciones activas | 38 |
| Documentos validados por IA | +120.000 |
| Tiempo promedio ahorrado por proceso | 65% |
| Usuarios registrados | +15.000 |

#### SECCIÓN 7 — TESTIMONIOS FICTICIOS
Carousel/slider con 4 testimonios:
1. **Dra. Patricia Moreno** — Vicerrectora Académica, Universidad del Norte · *"UNI SIGEA transformó nuestros procesos de convocatoria docente..."*
2. **Ing. Carlos Fuentes** — Jefe de TI, Universidad Nacional Regional · *"La validación automática de documentos nos ahorró semanas..."*
3. **Lic. Andrea Soto** — Coordinadora de RRHH, Institución Tecnológica Central · *"El panel analítico nos da visibilidad total sobre cada proceso..."*
4. **Prof. Miguel Ángel Torres** — Docente investigador · *"Postularme a una convocatoria ahora toma minutos, no días..."*

#### SECCIÓN 8 — PREGUNTAS FRECUENTES (FAQ)
Accordion con 6 preguntas:
1. ¿Qué es UNI SIGEA y para qué tipo de instituciones está diseñado?
2. ¿Cómo funciona la validación inteligente de documentos?
3. ¿Se puede integrar con el sistema actual de nuestra universidad?
4. ¿Qué tan segura es la información almacenada en la plataforma?
5. ¿Cuánto tiempo toma implementar UNI SIGEA?
6. ¿El sistema tiene soporte técnico y actualizaciones?

#### SECCIÓN 9 — INSTRUCTORES
Card del instructor principal con datos del perfil:

**Juan Esteban Acosta Santana**
- 🎓 Estudiante de Ingeniería de Sistemas y Computación — Universidad de Cundinamarca (8° semestre)
- 💼 +3 años de experiencia en servicio al cliente, administración y procesos
- 🏆 Participación en eventos académicos nacionales
- 📧 acostasantanajuanesteban@gmail.com | 📍 Ubaté, Cundinamarca
- **Habilidades relevantes**: Trabajo en equipo, comunicación efectiva, responsabilidad, organización, aprendizaje rápido

#### FOOTER
Columnas:
- Logo + tagline + redes sociales
- Módulos del sistema (links ancla)
- Recursos (Docs, Blog, Soporte)
- Contacto (email, teléfono, ubicación)
- Derechos reservados + política de privacidad

---

## 6. MÓDULO CHATBOT — UNI SIGEA IA

### 6.1 Interfaz
- Botón flotante (`bottom-right`) con ícono de chat + glow LED azul
- Ventana de chat expandible: historial de mensajes, input, botón enviar
- Indicador de "escribiendo..." con dots animados
- Diseño oscuro consistente con la paleta del sistema

### 6.2 Integración Gemini Flash 1.5

```
Endpoint: POST https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent
Header: X-goog-api-key: {GEMINI_API_KEY}
```

**Flujo de la llamada:**
```
Usuario escribe → sanitize.js limpia input
→ prompt.js construye { system_prompt + KB_CONTEXT + historial + mensaje }
→ gemini.js hace fetch a la API
→ Se extrae candidates[0].content.parts[0].text
→ Se renderiza en el chat UI
```

### 6.3 Base de Conocimiento (knowledge.js)

La base de conocimiento es un string constante `KB_CONTEXT` que incluye:

```
SECCIÓN 1 — QUÉ ES UNI SIGEA
  · Descripción general de la plataforma
  · Misión y visión del sistema
  · Tipos de instituciones objetivo

SECCIÓN 2 — MÓDULOS DEL SISTEMA
  · Gestión de Convocatorias: publicación, fechas, requisitos, categorías
  · Administración de Usuarios: roles (admin, docente, estudiante, RRHH), permisos
  · Carga de Documentos: tipos aceptados, validación automática, estados
  · Seguimiento de Postulaciones: etapas del proceso, notificaciones, historial
  · Panel Administrativo: reportes, filtros, exportación, métricas en tiempo real

SECCIÓN 3 — BENEFICIOS Y CARACTERÍSTICAS
  · Lista completa de beneficios del sistema
  · Integraciones disponibles
  · Seguridad y cumplimiento normativo

SECCIÓN 4 — CONTENIDO DE LOS CURSOS / FORMACIÓN
  · Historia de la IA (hitos de la línea de tiempo)
  · Conceptos de gestión universitaria inteligente
  · Buenas prácticas documentales en educación superior

SECCIÓN 5 — PERFIL DEL INSTRUCTOR
  · Juan Esteban Acosta Santana
  · Formación: Ingeniería de Sistemas y Computación — Unicundinamarca, 8° semestre
  · Experiencia: cajero/admin y mesero en Hostal San Nicolás (2022–actualidad)
  · Habilidades: atención al cliente, trabajo en equipo, manejo de dinero, organización
  · Logros: participación en eventos académicos nacionales, reconocimiento por responsabilidad
  · Contacto: acostasantanajuanesteban@gmail.com | 312 530 2537 | Ubaté, Cundinamarca

SECCIÓN 6 — FAQ
  · Respuestas completas a las 6 preguntas frecuentes del sistema
```

### 6.4 System Prompt (prompt.js)

```
Eres el asistente oficial de UNI SIGEA, una plataforma universitaria de gestión inteligente.
ÚNICAMENTE debes responder preguntas relacionadas con la información contenida en la base de conocimiento que se te proporciona a continuación.
Si una pregunta no está relacionada con UNI SIGEA, sus módulos, sus instructores o los cursos de IA disponibles, responde: "Lo siento, solo puedo responder preguntas relacionadas con UNI SIGEA y su plataforma."
Responde siempre en español, de forma clara, profesional y concisa.
No inventes información que no esté en la base de conocimiento.

--- BASE DE CONOCIMIENTO ---
{KB_CONTEXT}
---------------------------
```

---

## 7. COMPONENTES REUTILIZABLES

| Componente | Archivo | Descripción |
|------------|---------|-------------|
| `Button` | `components.css` + `ui.js` | Variantes: primary (azul), secondary (amarillo), outline, ghost |
| `Card` | `components.css` | Cards de módulos, beneficios e instructores con glow en hover |
| `Badge` | `components.css` | Etiquetas pequeñas con color LED |
| `Accordion` | `accordion.js` | FAQ expandible, reutilizable con data-attributes |
| `Counter` | `stats.js` | Contador animado, configurable por `data-target` |
| `Carousel` | `carousel.js` | Slider de testimonios con prev/next y dots |
| `GlowLine` | `animations.css` | Línea decorativa LED azul/amarilla |
| `Chatbot` | `chatbot.js` | Widget flotante de chat con IA |
| `Navbar` | `menu.js` | Menú lateral sticky con highlight de sección activa |
| `Timeline` | `components.css` | Línea de tiempo para historia de la IA |

---

## 8. BUENAS PRÁCTICAS APLICADAS

- **Separación de responsabilidades**: cada módulo JS tiene una única responsabilidad
- **CSS con variables**: tokens centralizados en `variables.css`, sin valores hardcodeados
- **DRY (Don't Repeat Yourself)**: componentes visuales y funciones de utilería reutilizables
- **Lazy loading**: imágenes con `loading="lazy"`, secciones con Intersection Observer
- **Accesibilidad**: atributos `aria-label`, `role`, contraste de colores WCAG AA mínimo
- **Seguridad**: sanitización de inputs del chatbot antes de enviar a la API
- **Rendimiento**: fuentes cargadas con `font-display: swap`, CSS crítico inline
- **Escalabilidad**: arquitectura de carpetas preparada para agregar nuevas secciones o módulos sin refactoring mayor
- **Gestión de estado del chat**: historial de conversación mantenido en memoria (array) y enviado completo en cada llamada
- **Sin frameworks externos**: HTML + CSS + JS Vanilla puro para máxima portabilidad

---

## 9. ORDEN DE IMPLEMENTACIÓN SUGERIDO

```
Fase 1 — Estructura base
  [x] Crear estructura de carpetas
  [x] variables.css + reset.css + layout.css
  [x] index.html con todas las secciones skeleton
  [x] menu.js — navegación lateral funcional

Fase 2 — Secciones estáticas
  [x] Hero section con animación SVG
  [x] Timeline historia IA (minimalista)
  [x] Sobre UNI SIGEA
  [x] Cards de módulos con hover glow
  [x] Beneficios grid
  [x] Footer

Fase 3 — Secciones dinámicas
  [x] Contadores animados (stats.js)
  [x] Carousel de testimonios
  [x] Accordion FAQ
  [x] Perfil instructor

Fase 4 — Chatbot IA
  [x] UI del chatbot flotante
  [x] knowledge.js — base de conocimiento completa
  [x] prompt.js — system prompt con guardrails
  [x] gemini.js — cliente API Gemini Flash 1.5
  [x] chatbot.js — orquestación completa

Fase 5 — Pulido y optimización
  [x] Animaciones on-scroll (animations.js)
  [x] Responsividad mobile
  [x] Revisión de accesibilidad
  [x] .env.example y config/app.config.js
  [x] Documentación inline de funciones clave
```

---

## 10. FUENTES EXTERNAS REQUERIDAS

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Sin dependencias NPM. Todo el proyecto corre directamente en el navegador.

---

*Plan generado para UNI SIGEA — Sistema de Gestión Inteligente Universitaria*  
*Instructor: Juan Esteban Acosta Santana — Ingeniería de Sistemas, Unicundinamarca*
