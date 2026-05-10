import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Send, Compass, RefreshCw, Wallet, Zap,
  MapPin, Users, Calendar, TrendingDown, Crown,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { MessageBubble } from '../components/ai/MessageBubble';
import { ItineraryWidget } from '../components/ai/ItineraryWidget';
import { BudgetWidget } from '../components/ai/BudgetWidget';
import { aiApi } from '../lib/api';

// ─── Suggestion Chips ─────────────────────────────────────────
const SUGGESTIONS = [
  { text: 'Plan a 5-day Goa trip under ₹15,000', icon: MapPin },
  { text: 'Luxury weekend in Udaipur for a couple', icon: Crown },
  { text: 'Backpacking itinerary for Spiti Valley', icon: Compass },
  { text: 'Family trip to Kerala for 7 days', icon: Users },
  { text: '3-day Rishikesh adventure trip', icon: Zap },
  { text: 'Budget solo trip to Varanasi', icon: TrendingDown },
];

// ─── Follow-up Chips (appear after AI responds) ───────────────
const FOLLOWUP_CHIPS = (city, days, style) => [
  { text: `Make it more ${style === 'budget' ? 'luxury' : 'budget-friendly'}`, icon: Wallet },
  { text: `Add 2 more days to the ${city} trip`, icon: Calendar },
  { text: `More adventure activities in ${city}`, icon: Zap },
  { text: `Plan a different destination`, icon: RefreshCw },
];

export default function AiPlanner() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [latestAIIndex, setLatestAIIndex] = useState(-1);
  const [followUpChips, setFollowUpChips] = useState([]);
  const [lastIntent, setLastIntent] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Auto-resize textarea
  const handleTextareaChange = (e) => {
    setInputValue(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 128) + 'px';
  };

  const buildHistory = (msgs) =>
    msgs
      .filter(m => m.role === 'user' || (m.role === 'ai' && m.content))
      .map(m => ({ role: m.role, content: m.content }))
      .slice(-10); // keep last 10 for context

  const handleSend = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    // Clear follow-up chips
    setFollowUpChips([]);

    // Add user message
    const userMsg = { role: 'user', content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setIsLoading(true);

    try {
      const history = buildHistory(messages);
      const response = await aiApi.plan(trimmed, history);
      const result = response.data;

      let aiContent = result.text || "Here's what I found for you!";
      let components = [];

      if (result.type === 'plan') {
        // Build dynamic widget components from server data
        const itineraryData = result.itinerary;
        const budgetData = result.budget;

        // We store the intent so we can build follow-up chips
        setLastIntent(result.intent);

        const handleRegenerate = () => {
          handleSend(`Regenerate a different ${result.intent?.days}-day ${result.intent?.destination} trip`);
        };

        components = [
          <ItineraryWidget
            key={`itin-${Date.now()}`}
            data={itineraryData}
            onRegenerate={handleRegenerate}
          />,
          <BudgetWidget
            key={`budg-${Date.now()}`}
            data={budgetData}
          />,
        ];

        // Generate follow-up chips
        if (result.intent?.destination) {
          setFollowUpChips(
            FOLLOWUP_CHIPS(
              result.intent.destination,
              result.intent.days,
              result.intent.style,
            )
          );
        }
      }

      const aiMsg = { role: 'ai', content: aiContent, components };
      const finalMessages = [...newMessages, aiMsg];
      setMessages(finalMessages);
      setLatestAIIndex(finalMessages.length - 1);
    } catch (err) {
      console.error('[AiPlanner] Error:', err);
      const errorMsg = {
        role: 'ai',
        content: err.message?.includes('401')
          ? "You need to be logged in to use the AI planner. Please sign in first!"
          : err.message?.includes('Failed to fetch')
            ? "I can't reach the server right now. Please make sure the backend is running (`npm run dev` in `/server`)."
            : `Something went wrong: ${err.message || 'Unknown error'}. Please try again!`,
        components: [],
      };
      const finalMessages = [...newMessages, errorMsg];
      setMessages(finalMessages);
      setLatestAIIndex(finalMessages.length - 1);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-64px)] md:h-screen flex flex-col pt-16 md:pt-0 max-w-4xl mx-auto relative">

        {/* ── Empty State ─────────────────────────────────────── */}
        <AnimatePresence>
          {isEmpty && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center text-center px-4 pb-40 space-y-8"
            >
              {/* Animated icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="relative"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 shadow-2xl shadow-indigo-900/50 flex items-center justify-center">
                  <Sparkles size={36} className="text-white" />
                </div>
                {/* Ping animation */}
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 rounded-2xl bg-indigo-500/30"
                />
              </motion.div>

              <div>
                <motion.h1
                  initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                  className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight"
                >
                  What's your next adventure?
                </motion.h1>
                <motion.p
                  initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                  className="text-white/50 text-base max-w-md mx-auto"
                >
                  Tell me where you want to go, how long, and your budget — I'll craft a personalized itinerary instantly.
                </motion.p>
              </div>

              {/* Suggestion grid */}
              <motion.div
                initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-2xl"
              >
                {SUGGESTIONS.map(({ text, icon: Icon }, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSend(text)}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] text-white/70 hover:text-white hover:bg-white/[0.07] hover:border-white/20 transition-all text-sm text-left flex items-center gap-3 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/15 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/25 transition-colors">
                      <Icon size={14} className="text-indigo-400" />
                    </div>
                    {text}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Chat Messages ───────────────────────────────────── */}
        {!isEmpty && (
          <div className="flex-1 overflow-y-auto scrollbar-none px-4 md:px-6 pt-6 pb-56">
            <div className="space-y-6">
              {messages.map((msg, idx) => (
                <MessageBubble
                  key={idx}
                  message={msg}
                  isLatestAI={msg.role === 'ai' && idx === latestAIIndex}
                />
              ))}

              {/* Loading state */}
              {isLoading && (
                <MessageBubble
                  message={{ role: 'ai', content: '' }}
                  isTyping={true}
                />
              )}

              {/* Follow-up chips */}
              {followUpChips.length > 0 && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 pl-12"
                >
                  {followUpChips.map(({ text, icon: Icon }, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSend(text)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/10 text-white/60 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all"
                    >
                      <Icon size={11} className="text-indigo-400" />
                      {text}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* ── Input Bar (fixed at bottom) ─────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#080f1c] via-[#080f1c]/95 to-transparent pt-8 pb-5 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              {/* Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-indigo-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition duration-500" />
              <div className="relative bg-[#111827] border border-white/[0.08] group-focus-within:border-indigo-500/40 rounded-2xl flex items-end gap-2 px-3 py-2 transition-colors shadow-2xl">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me to plan a trip, adjust budget, add activities..."
                  rows={1}
                  className="flex-1 bg-transparent text-white placeholder-white/25 resize-none outline-none py-2.5 px-2 max-h-32 scrollbar-none text-sm leading-relaxed"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-lg shadow-indigo-900/40 transition-opacity"
                >
                  {isLoading
                    ? <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      >
                        <RefreshCw size={15} />
                      </motion.div>
                    : <Send size={15} className="ml-0.5" />
                  }
                </motion.button>
              </div>
            </div>
            <p className="text-center text-white/20 text-[11px] mt-2.5">
              Traveloop AI plans are estimates. Always verify details before booking.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
