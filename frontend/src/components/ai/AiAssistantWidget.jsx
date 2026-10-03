import React, { useState } from 'react';
import { Send, Bot, Sparkles, User, HelpCircle, Loader2 } from 'lucide-react';
import { askAiAssistant } from '../../services/api';

function AiAssistantWidget() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am your AI Campus Assistant. Ask me anything about academic rules, attendance criteria, mid-term examinations, or upcoming placement drives.',
      source: 'Campus Knowledge Base & Regulations'
    }
  ]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const samplePrompts = [
    "What is the attendance requirement for examinations?",
    "When is my Deep Learning assignment due?",
    "Tell me about TCS Digital placement drive eligibility",
    "Who is the HOD for Computer Science?"
  ];

  const handleSend = async (userQuery) => {
    const textToSend = userQuery || query;
    if (!textToSend.trim() || loading) return;

    const newMessages = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    setQuery('');
    setLoading(true);

    try {
      const res = await askAiAssistant(textToSend);
      setMessages([...newMessages, { sender: 'ai', text: res.reply, source: res.source }]);
    } catch {
      setMessages([
        ...newMessages,
        { sender: 'ai', text: "Sorry, I couldn't reach the AI RAG service. Please ensure the backend is active.", source: 'Error' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-indigo-950/60 rounded-2xl p-6 shadow-xl flex flex-col h-[580px]">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Campus AI Assistant
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                RAG Engine
              </span>
            </h3>
            <p className="text-xs text-slate-400">Context-Aware Academic & Placement Retrieval</p>
          </div>
        </div>
        <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-1">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.sender === 'ai' && (
              <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div className={`max-w-[85%] rounded-xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
              m.sender === 'user'
                ? 'bg-indigo-600 text-white font-medium rounded-br-none shadow-md'
                : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'
            }`}>
              <div className="whitespace-pre-line">{m.text}</div>
              {m.source && (
                <div className="mt-2 text-[10px] text-slate-400 font-mono border-t border-slate-800/80 pt-1 flex items-center gap-1">
                  <span>Indexed Source: {m.source}</span>
                </div>
              )}
            </div>
            {m.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 items-center text-slate-400 text-xs italic">
            <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
            AI searching campus documents & synthesizing response...
          </div>
        )}
      </div>

      {/* Sample Quick Questions */}
      <div className="py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-slate-800/60">
        {samplePrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p)}
            className="text-[11px] whitespace-nowrap bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-full transition flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle className="w-3 h-3 text-indigo-400" />
            {p}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="mt-2 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything about examinations, syllabus, policies..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white px-4 py-2.5 rounded-xl font-medium transition flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-600/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

export default AiAssistantWidget;
