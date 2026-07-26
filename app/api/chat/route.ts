import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json({ error: "La pregunta es requerida" }, { status: 400 });
    }

    const pdfPath = path.join(process.cwd(), "docs", "Manual_Operativo_ZIndex.pdf");
    const pdfBuffer = fs.readFileSync(pdfPath);
    
    const pdfPart = {
      inlineData: {
        data: pdfBuffer.toString("base64"),
        mimeType: "application/pdf",
      },
    };

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    // Modificamos el prompt para forzar un formato JSON estricto
    const prompt = `
    Eres un asistente virtual corporativo experto en sistemas financieros y estructuración de préstamos.
    Usa ÚNICAMENTE la información del documento PDF adjunto para responder la pregunta del usuario.
    
    REGLA DE FORMATO: Escribe párrafos cortos. Usa listas con viñetas obligatoriamente si mencionas varios puntos. Agrega SIEMPRE un doble salto de línea entre cada párrafo y cada título para que sea visualmente limpio.
    
    IMPORTANTE: Tu respuesta DEBE ser EXCLUSIVAMENTE un objeto JSON válido con la siguiente estructura. No incluyas ningún texto fuera del JSON.
    {
      "answer": "Tu respuesta detallada y formal formateada en Markdown.",
      "suggestions": [
        "Escribe aquí una pregunta de seguimiento relacionada a lo que acabas de responder",
        "Escribe otra duda técnica o financiera derivada de tu respuesta",
        "Escribe una tercera pregunta exploratoria sobre el manual"
      ]
    }
    
    PREGUNTA DEL USUARIO: ${question}
    `;

    const result = await model.generateContent([prompt, pdfPart]);
    const responseText = result.response.text();
    
    // Limpiamos la respuesta de Gemini por si incluye las etiquetas markdown de código
    const cleanJsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanJsonString);

    // Retornamos el JSON parseado al frontend
    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("Error en la API de chat:", error);
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
  }
}