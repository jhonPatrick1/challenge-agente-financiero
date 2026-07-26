"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Bot, User, Trash2, Send, Landmark, FileText, CheckCircle2, ChevronRight } from "lucide-react";
import remarkGfm from "remark-gfm";


type Message = {
  role: string;
  text: string;
  suggestions?: string[];
};

export default function Home() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll hacia abajo cuando hay nuevos mensajes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendQuestion = async (textToSubmit: string) => {
    if (!textToSubmit.trim()) return;

    const userMsg = { role: "user", text: textToSubmit };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: textToSubmit }),
      });
      
      const data = await res.json();

      if (data.answer) {
        setMessages((prev) => [
          ...prev, 
          { role: "agent", text: data.answer, suggestions: data.suggestions }
        ]);
      } else {
        setMessages((prev) => [...prev, { role: "agent", text: "Error: No se pudo procesar la respuesta adecuadamente." }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "agent", text: "Error de conexión con el servidor." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuestion(question);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <main className="flex h-screen bg-[#0f172a] text-slate-200 font-sans">
      
      {/* BARRA LATERAL (SIDEBAR) */}
      <aside className="w-80 bg-[#1e293b] border-r border-slate-700/50 flex flex-col shadow-xl z-10">
        <div className="p-6 border-b border-slate-700/50">
          <h1 className="text-xl font-bold flex items-center gap-3 tracking-wide">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            Z-Index Studio AI
          </h1>
          <p className="text-xs text-slate-400 mt-2 font-medium">Challenge Alura | Oracle ONE</p>
        </div>
        
        <div className="flex-1 p-5 overflow-y-auto">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Base de conocimiento</h2>
            <span className="flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20 font-medium">
              <CheckCircle2 className="w-3 h-3" /> indexada
            </span>
          </div>
          
          <ul className="space-y-3">
            <li className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 transition-colors hover:bg-slate-800">
              <FileText className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-slate-300">Manual_Operativo_ZIndex.pdf</span>
            </li>
          </ul>
        </div>

        <div className="p-5 border-t border-slate-700/50">
          <button 
            onClick={clearChat}
            className="w-full py-2.5 bg-slate-800/50 hover:bg-slate-700/80 text-slate-300 text-sm rounded-lg transition-all border border-slate-600/50 flex justify-center items-center gap-2 font-medium"
          >
            <Trash2 className="w-4 h-4 text-slate-400" />
            Limpiar sesión
          </button>
        </div>
      </aside>

      {/* ÁREA DE CHAT PRINCIPAL */}
      <section className="flex-1 flex flex-col h-full bg-[#0b1121] relative">
        
        <header className="p-6 border-b border-slate-800/80 flex justify-between items-center bg-[#0f172a]/80 backdrop-blur-sm sticky top-0 z-10">
           <div>
             <h2 className="text-lg font-semibold text-slate-100">Motor de Inteligencia Financiera</h2>
             <p className="text-sm text-slate-400">Plataforma de consulta y estructuración de capital</p>
           </div>
           <div className="text-xs bg-slate-800 text-slate-300 px-4 py-1.5 rounded-full border border-slate-700 shadow-sm">
             1 documento activo
           </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto space-y-8 scroll-smooth">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center w-full max-w-2xl mx-auto opacity-90">
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 mb-6 shadow-lg">
                <Landmark className="w-12 h-12 text-emerald-500/80" />
              </div>
              <h3 className="text-xl font-medium text-slate-200 mb-2">Sistema Operativo</h3>
              <p className="text-slate-400 mb-10 text-center">Selecciona un comando rápido o ingresa tu consulta en la terminal.</p>
              
              <div className="grid grid-cols-1 gap-4 w-full">
                {[
                  "¿Qué puedes hacer y cómo funcionas como asistente de Inteligencia Artificial?",
                  "¿Por qué el método de amortización alemán genera cuotas decrecientes?",
                  "¿Cómo funciona la inyección de fondos mediante socios capitalistas?",
                  "¿El interés aplicado se calcula sobre el capital inicial o el saldo restante?"
                ].map((sug, idx) => (
                  <button 
                    key={idx}
                    onClick={() => sendQuestion(sug)}
                    className="p-4 bg-slate-800/30 border border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all rounded-xl text-left text-sm text-slate-300 group flex items-start gap-3 shadow-sm"
                  >
                    <ChevronRight className="w-5 h-5 text-emerald-500/70 mt-0.5 group-hover:translate-x-1 transition-transform" />
                    <span className="leading-relaxed">{sug}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                    msg.role === "user" ? "bg-emerald-600 text-white" : "bg-slate-700 text-emerald-400"
                  }`}>
                    {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-6 h-6" />}
                  </div>

                  <div className={`p-5 rounded-2xl shadow-sm ${
                    msg.role === "user" 
                      ? "bg-emerald-600 text-white rounded-tr-sm" 
                      : "bg-[#1e293b] text-slate-200 border border-slate-700/50 rounded-tl-sm prose prose-invert prose-emerald max-w-none"
                  }`}>
                    {msg.role === "agent" ? (
                      <ReactMarkdown 
  remarkPlugins={[remarkGfm]}
  components={{
    p: ({...props}) => <p className="mb-4 leading-relaxed text-slate-300" {...props} />,
    ul: ({...props}) => <ul className="list-disc pl-5 mb-4 space-y-2 text-slate-300" {...props} />,
    ol: ({...props}) => <ol className="list-decimal pl-5 mb-4 space-y-2 text-slate-300" {...props} />,
    li: ({...props}) => <li className="pl-1" {...props} />,
    strong: ({...props}) => <strong className="font-semibold text-emerald-400" {...props} />,
    h1: ({...props}) => <h1 className="text-xl font-bold mb-4 mt-6 text-slate-100" {...props} />,
    h2: ({...props}) => <h2 className="text-lg font-bold mb-3 mt-5 text-slate-100" {...props} />,
    h3: ({...props}) => <h3 className="text-base font-semibold mb-2 mt-4 text-slate-200" {...props} />,
    table: ({...props}) => <div className="overflow-x-auto mb-4 border border-slate-700/50 rounded-lg"><table className="w-full text-sm text-left" {...props} /></div>,
    th: ({...props}) => <th className="px-4 py-3 bg-slate-800/80 font-semibold text-slate-200 border-b border-slate-700" {...props} />,
    td: ({...props}) => <td className="px-4 py-3 border-b border-slate-800/50 text-slate-300" {...props} />,
  }}
>
  {msg.text}
</ReactMarkdown>
                    ) : (
                      <p className="m-0">{msg.text}</p>
                    )}
                  </div>
                </div>

                {/* Renderizado de Sugerencias Dinámicas */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 ml-14 max-w-[80%]">
                    {msg.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendQuestion(sug)}
                        className="text-xs bg-slate-800/50 hover:bg-emerald-900/40 text-slate-300 hover:text-emerald-400 border border-slate-700 hover:border-emerald-500/50 px-3 py-1.5 rounded-full transition-all text-left flex items-center gap-1.5"
                      >
                        <ChevronRight className="w-3 h-3" />
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
          {loading && (
            <div className="flex gap-4 justify-start items-center">
               <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-emerald-400/50 shadow-sm">
                 <Bot className="w-6 h-6 animate-pulse" />
               </div>
               <div className="p-4 rounded-2xl bg-[#1e293b] border border-slate-700/50 rounded-tl-sm text-slate-400 text-sm flex items-center gap-2">
                 <span className="w-2 h-2 bg-emerald-500/50 rounded-full animate-bounce"></span>
                 <span className="w-2 h-2 bg-emerald-500/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                 <span className="w-2 h-2 bg-emerald-500/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 bg-gradient-to-t from-[#0b1121] to-transparent">
          <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ejecutar consulta en la base de conocimiento..."
              disabled={loading}
              className="w-full bg-[#1e293b] border border-slate-700 rounded-xl pl-5 pr-14 py-4 text-slate-200 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-lg placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="absolute right-2 top-2 p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg disabled:opacity-50 disabled:hover:bg-emerald-600 transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </section>
    </main>
  );
}