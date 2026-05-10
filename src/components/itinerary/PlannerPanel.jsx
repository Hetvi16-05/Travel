import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Send, X, Bot, User, Loader2, 
  Trash2, Maximize2, Minimize2, Lightbulb, AlertTriangle 
} from 'lucide-react';
import api from '../../lib/api';

export default function PlannerPanel({ tripId, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen, tripId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchHistory = async () => {
    try {
      const res = await api.ai.getHistory(tripId);
      setMessages(res.data);
    } catch (err) {
      console.error('Failed to fetch AI history', err);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.ai.chat(tripId, input);
      setMessages(prev => [...prev, { role: 'ai', content: res.data.reply, timestamp: new Date() }]);
      setScores(res.data);
      if (onUpdate) onUpdate(); // Refresh trip data in parent
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I encountered an error. Please try again.", isError: true }]);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = async () => {
    if (!window.confirm('Clear chat history?')) return;
    try {
      await api.ai.clearHistory(tripId);
      setMessages([]);
    } catch (err) {
      console.error('Failed to clear history', err);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-white shadow-glow flex items-center justify-center group"
      >
        <Sparkles className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-primary-500 border-2 border-slate-900"></span>
        </span>
      </motion.button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed top-0 right-0 h-full z-[60] bg-slate-900/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col transition-all duration-300 ${isExpanded ? 'w-full md:w-[600px]' : 'w-full md:w-[400px]'}`}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary-400">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white">AI Copilot</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">In-house Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <button onClick={clearHistory} className="p-2 text-white/40 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-colors">
                  <Trash2 size={18} />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors ml-1">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Scores/Tips (if any) */}
            <AnimatePresence>
              {scores && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="p-4 bg-primary/5 border-b border-white/5 space-y-3"
                >
                  <div className="flex gap-2">
                    {scores.warnings?.map((w, i) => (
                      <div key={i} className="flex-1 p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-start gap-2">
                        <AlertTriangle size={14} className="text-rose-400 flex-shrink-0 mt-0.5" />
                        <p className="text-[10px] text-rose-200 leading-tight">{w.message}</p>
                      </div>
                    ))}
                    {scores.tips?.slice(0, 1).map((t, i) => (
                      <div key={i} className="flex-1 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-2">
                        <Lightbulb size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                        <p className="text-[10px] text-emerald-200 leading-tight">{t.message}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-white/40 px-1">
                    <span>OVERALL SCORE: {scores.scores?.overallScore}/10</span>
                    <div className="flex gap-2">
                      <span className={scores.scores?.budgetScore < 5 ? 'text-rose-400' : 'text-emerald-400'}>Budget: {scores.scores?.budgetScore}</span>
                      <span className={scores.scores?.paceScore < 5 ? 'text-rose-400' : 'text-emerald-400'}>Pace: {scores.scores?.paceScore}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 px-8">
                  <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary-400">
                    <Bot size={32} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-white font-bold">How can I help with your trip?</h4>
                    <p className="text-sm text-white/40">You can ask me to add stops, suggest activities, or optimize your budget.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-2 w-full pt-4">
                    {["Add a stop in Mumbai for 2 days", "Suggest activities in Jaipur", "Is my budget enough?"].map((hint, i) => (
                      <button 
                        key={i} 
                        onClick={() => setInput(hint)}
                        className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-xs text-white/60 text-left transition-colors"
                      >
                        "{hint}"
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`h-8 w-8 rounded-lg flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-violet-500/20 text-violet-400' : 'bg-primary/20 text-primary-400'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-violet-500/20 text-white rounded-tr-none' 
                      : 'bg-white/5 text-white/90 border border-white/5 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/20 text-primary-400 flex items-center justify-center">
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white/[0.02] border-t border-white/10">
              <form onSubmit={handleSend} className="relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Traveloop AI..."
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="absolute right-2 top-2 h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center disabled:opacity-50 disabled:grayscale transition-all"
                >
                  <Send size={16} />
                </button>
              </form>
              <p className="text-[9px] text-center text-white/20 mt-3 uppercase tracking-widest">
                Our custom AI never uses external APIs.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
