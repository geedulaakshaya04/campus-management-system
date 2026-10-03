import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  HelpCircle, 
  Loader2, 
  FileText,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { askAiAssistant } from '../../services/api';

function AiAssistantWidget() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am your Campus AI Assistant powered by RAG (Retrieval-Augmented Generation).\n\nAsk me anything about attendance cutoff policies, Mid-Term exam timetables, course syllabus, or eligible placement drives.',
      source: 'Academic Regulations & Campus Index'
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
        { 
          sender: 'ai', 
          text: "Unable to reach the Campus AI service. Please verify your Spring Boot backend connection.", 
          source: 'System Notice' 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col h-[620px] overflow-hidden">
      {/* AI Assistant Header with Teal Accent */}
      <div className="bg-[#F0FDFA] border-b border-[#CCFBF1] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#14B8A6] text-white flex items-center justify-center shadow-md shadow-[#14B8A6]/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#0F172A]">Campus AI Assistant</h3>
              <span className="text-[11px] font-semibold bg-[#14B8A6]/10 text-[#0F766E] border border-[#14B8A6]/30 px-2 py-0.5 rounded-full">
                RAG Engine
              </span>
            </div>
            <p className="text-xs text-[#64748B]">Context-aware responses from indexed college regulations</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-[#0F766E] bg-white px-3 py-1.5 rounded-lg border border-[#CCFBF1] shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse"></span>
          Vector Store Active
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F8FAFC]">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.sender === 'ai' && (
              <div className="w-8 h-8 rounded-lg bg-[#14B8A6] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
              m.sender === 'user'
                ? 'bg-[#2563EB] text-white font-medium rounded-tr-none shadow-sm'
                : 'bg-white text-[#1E293B] border border-[#E2E8F0] rounded-tl-none shadow-xs'
            }`}>
              <div className="whitespace-pre-line">{m.text}</div>
              {m.source && (
                <div className="mt-2.5 pt-2 border-t border-[#F1F5F9] text-[11px] text-[#64748B] flex items-center gap-1 font-mono">
                  <FileText className="w-3 h-3 text-[#14B8A6]" />
                  <span>Verified Source: {m.source}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs font-medium text-[#64748B] bg-white border border-[#E2E8F0] p-3 rounded-xl max-w-sm">
            <Loader2 className="w-4 h-4 animate-spin text-[#14B8A6]" />
            Retrieving relevant campus documents & generating answer...
          </div>
        )}
      </div>

      {/* Quick Prompts Bar */}
      <div className="bg-white border-t border-[#E2E8F0] px-4 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-semibold text-[#64748B] uppercase whitespace-nowrap">Suggested:</span>
        {samplePrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p)}
            className="text-xs whitespace-nowrap bg-[#F8FAFC] hover:bg-[#F0FDFA] hover:text-[#0F766E] border border-[#E2E8F0] hover:border-[#14B8A6]/40 text-[#475569] px-3 py-1 rounded-full transition cursor-pointer flex items-center gap-1.5"
          >
            <HelpCircle className="w-3 h-3 text-[#14B8A6]" />
            {p}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-4 bg-white border-t border-[#E2E8F0] flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question about regulations, courses, exams, or placement criteria..."
          className="flex-1 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-4 py-2.5 text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:bg-white transition"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-40 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <span>Ask AI</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

export default AiAssistantWidget;
