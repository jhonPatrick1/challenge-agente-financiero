# 🤖 Z-Index Studio AI - Motor de Inteligencia Financiera

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

## 📖 Descripción

Este proyecto es un **agente inteligente** desarrollado como entrega oficial para el **Challenge Alura del programa Oracle Next Education (ONE) - AI for Tech**.

El sistema actúa como el motor conversacional de **Z-Index Studio**, capaz de procesar documentos técnicos y responder preguntas complejas sobre estructuración de préstamos, liquidez y políticas de capital. El agente utiliza la capacidad multimodal nativa de **Gemini 3 Flash Preview** para analizar directamente la documentación oficial en formato PDF.

### ✨ Características principales

*   🧠 **Agente conversacional** con generación estructurada en formato JSON.
*   📄 **Base de conocimiento integrada** mediante lectura directa de PDF (Manual Operativo Z-Index).
*   💡 **Sugerencias dinámicas (Chips)** generadas en tiempo real para guiar al usuario.
*   🎨 **Interfaz intuitiva y moderna (Dark Mode)** construida con Next.js y Tailwind CSS.
*   📝 **Renderizado avanzado de Markdown** para tablas financieras y listas legibles.

---

## 🏗️ Arquitectura

El flujo del sistema se basa en una arquitectura Serverless Full-Stack que separa la interfaz de la lógica de procesamiento LLM:

```text
       ┌─────────────────────────────────────────────────────────┐
       │                 Frontend (Next.js UI)                   │
       │    Interfaz de Chat, Renderizado Markdown y Estado      │
       └───────────────────────────┬─────────────────────────────┘
                                   │ Request (JSON: question)
                                   ▼
       ┌─────────────────────────────────────────────────────────┐
       │             Backend (Next.js API Route)                 │
       │     Lógica de Agente, Ingesta de PDF a Base64 y         │
       │     Estructuración del Prompt (JSON Enforcement)        │
       └───────────────────────────┬─────────────────────────────┘
                                   │ Payload (Contexto + Prompt)
                                   ▼
       ┌─────────────────────────────────────────────────────────┐
       │         Motor LLM (Google Gemini 3 Flash Preview)       │
       │    Procesamiento Multimodal (Documento + Texto)         │
       └─────────────────────────────────────────────────────────┘
📁 Estructura del Proyecto
Plaintext
challenge-agente-financiero/
├── app/
│   ├── api/chat/route.ts      # Lógica del backend y conexión con Gemini
│   ├── layout.tsx             # Layout principal de la aplicación
│   └── page.tsx               # Interfaz principal de usuario (Frontend)
├── docs/
│   └── Manual_Operativo_ZIndex.pdf # Base de conocimiento del agente
├── public/                    # Assets y recursos estáticos
├── .env.local                 # Variables de entorno (Ignorado en Git)
├── tailwind.config.ts         # Configuración de estilos de Tailwind
├── package.json               # Dependencias y scripts del proyecto
└── README.md                  # Documentación principal
🚀 Instalación
Prerrequisitos
Node.js (Versión 18 o superior).

API Key de Google Gemini (Gratuita en Google AI Studio).

Paso 1: Clonar el repositorio
Bash
git clone [https://github.com/TU_USUARIO/challenge-agente-financiero.git](https://github.com/TU_USUARIO/challenge-agente-financiero.git)
cd challenge-agente-financiero
Paso 2: Instalar dependencias
Bash
npm install
Paso 3: Configurar variables de entorno
Crea un archivo llamado .env.local en la raíz del proyecto y agrega tu clave API:

Fragmento de código
GEMINI_API_KEY=tu_api_key_aqui
Paso 4: Ejecutar la aplicación
Bash
npm run dev
La aplicación estará disponible de forma local en http://localhost:3000.

📖 Uso
Cargar documentos: El PDF de conocimiento (Manual_Operativo_ZIndex.pdf) ya se encuentra pre-cargado en la carpeta /docs.

Interacción Rápida: Haz clic en cualquiera de los chips de sugerencia en la pantalla de inicio para enviar una consulta predefinida.

Consultas Específicas: Utiliza la barra inferior para escribir preguntas detalladas sobre la aplicación del método de amortización alemán o las políticas de desembolso.

Explorar: El agente responderá basándose estrictamente en el PDF oficial y generará nuevas preguntas de seguimiento (sugerencias dinámicas) para continuar la conversación.

Limpiar: Usa el botón "Limpiar sesión" en la barra lateral para reiniciar la conversación.

💡 Ejemplos de Preguntas y Respuestas
El agente es capaz de responder consultas complejas sobre el sistema financiero apoyándose en la base de conocimiento:

❓ Ejemplo 1: Estructuración de Préstamos
Pregunta: ¿Por qué mis cuotas disminuyen cada mes con el método alemán?
Respuesta del Agente:

Bajo el método de amortización alemán, la porción del capital que devuelves en cada período es una cuota fija. Los intereses se calculan únicamente sobre el saldo deudor restante en ese mes específico. Al ir reduciéndose tu deuda constante, el interés generado es menor, resultando en una cuota total decreciente.

❓ Ejemplo 2: Gestión de Liquidez
Pregunta: ¿Cómo funciona el protocolo de respaldo de capital si no hay liquidez inmediata?
Respuesta del Agente:

De acuerdo con el manual operativo, para asegurar un flujo ininterrumpido en la atención de solicitudes, aplicamos el siguiente proceso:

Activación del Fondo: Se coordina la inyección de fondos mediante socios financieros externos (Fondo Edwin).

Tiempos de SLA: El desembolso bajo este protocolo se completa generalmente en un plazo de 24 a 48 horas hábiles, a diferencia del plazo de 2 horas para fondos propios.

☁️ Evidencia del Despliegue en la Nube (OCI)
La aplicación está completamente desplegada y funcionando públicamente en Oracle Cloud Infrastructure (OCI).

🌐 Enlace público: [REEMPLAZAR_CON_TU_LINK_DE_OCI]

💻 Plataforma: Oracle Cloud Infrastructure (Compute Instance)

📸 Evidencias de Despliegue
(Reemplaza las siguientes rutas de imagen con las capturas de pantalla de tu instancia en OCI y la app corriendo en producción)

👨‍💻 Autor
Jhon Patrick Cali - Desarrollador Backend & Estudiante de Ingeniería de Sistemas (Universidad César Vallejo)

Challenge Alura - Oracle Next Education (ONE) - AI for Tech

📄 Licencia
Este proyecto fue desarrollado con fines educativos como parte del programa Oracle Next Education.
