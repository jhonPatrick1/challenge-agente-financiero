# 🤖 Z-Index Studio AI - Agente Inteligente Financiero

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

Este proyecto es la entrega oficial para el **Challenge Alura Agente | Oracle ONE**. Es un asistente conversacional avanzado diseñado para estructurar préstamos, gestionar liquidez y explicar el método de amortización alemán basado en la base de conocimiento interna de Z-Index Studio.

## 🏗️ Arquitectura de la Solución
El proyecto está construido bajo una arquitectura Full-Stack Serverless:
1. **Frontend (Next.js & Tailwind CSS):** Interfaz de usuario en Dark Mode, renderizado de Markdown (tablas, listas, negritas) y sugerencias dinámicas de prompts (Chips).
2. **Backend (API Routes):** Un endpoint seguro (`/api/chat`) que procesa las peticiones del cliente.
3. **Procesamiento Documental:** El sistema lee un archivo PDF local (`Manual_Operativo_ZIndex.pdf`) y lo convierte a Base64.
4. **Motor de IA (Gemini 3 Flash Preview):** Se envía el documento adjunto junto con un prompt de sistema estricto (formato JSON) para garantizar respuestas contextuales y precisas.

## 🚀 Instrucciones de Ejecución (Local)

1. Clona este repositorio:
   ```bash
   git clone [https://github.com/TU_USUARIO/challenge-agente-financiero.git](https://github.com/TU_USUARIO/challenge-agente-financiero.git)
