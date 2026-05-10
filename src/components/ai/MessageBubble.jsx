import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

/**
 * Typewriter hook — reveals text word-by-word for a smooth AI feel
 */
function useTypewriter(text, enabled = true, speed = 30) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled || !text) {
      setDisplayed(text || '');
      setDone(true);
      return;
    }
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, enabled, speed]);

  return { displayed, done };
}

export function MessageBubble({ message, isTyping, isLatestAI = false }) {
  const { user } = useApp();
  const isAI = message.role === 'ai';

  const { displayed, done } = useTypewriter(
    message.content || '',
    isAI && isLatestAI,
    18
  );

  const textToShow = (isAI && isLatestAI) ? displayed : (message.content || '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 w-full ${isAI ? '' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 relative ${
        isAI ? 'bg-indigo-600/20 border border-indigo-500/30' : 'bg-white/10'
      }`}>
        {isAI
          ? (
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
                alt="Guide" 
                className="w-full h-full rounded-xl object-cover opacity-80"
              />
              <div className="absolute -bottom-1 -right-1 bg-indigo-500 rounded-full p-0.5 border-2 border-[#080f1c]">
                <Sparkles size={8} className="text-white" />
              </div>
            </div>
          )
          : (user?.avatar
            ? <img src={user.avatar} alt="You" className="w-full h-full rounded-xl object-cover" />
            : <User size={16} className="text-white" />)
        }
      </div>

      {/* Bubble */}
      <div className={`flex flex-col gap-3 max-w-[88%] ${isAI ? 'items-start' : 'items-end'}`}>
        {/* Thinking shimmer */}
        {isTyping && (
          <div className="px-5 py-4 rounded-2xl rounded-tl-none bg-[#1E293B] border border-white/5">
            <div className="flex items-center gap-2">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-indigo-400"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Main text bubble */}
        {!isTyping && message.content && (
          <div className={`px-5 py-3.5 rounded-2xl text-[14.5px] leading-relaxed shadow-sm whitespace-pre-wrap ${
            isAI
              ? 'bg-[#1a2235] border border-white/[0.06] text-white/90 rounded-tl-none'
              : 'bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-tr-none shadow-lg shadow-indigo-900/30'
          }`}>
            {/* Render markdown-lite: bold **text** */}
            {textToShow.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
              }
              if (part.startsWith('*') && part.endsWith('*')) {
                return <em key={i} className="italic text-white/70">{part.slice(1, -1)}</em>;
              }
              return <span key={i}>{part}</span>;
            })}
            {/* Blinking cursor while typing */}
            {isAI && isLatestAI && !done && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.7 }}
                className="inline-block w-[2px] h-4 bg-indigo-300 align-middle ml-0.5"
              />
            )}
          </div>
        )}

        {/* Dynamic widgets rendered by AI — shown after typewriter finishes */}
        {isAI && message.components && message.components.length > 0 && (done || !isLatestAI) && (
          <div className="w-full max-w-3xl space-y-4">
            {message.components.map((Component, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                {Component}
              </motion.div>
            ))}
          </div>
        )}
        
        {isAI && !message.content && !isTyping && (
          <div>
            <motion.h1
              initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight"
            >
              Hi, I'm your Travia Guide.
            </motion.h1>
            <motion.p
              initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-white/50 text-base max-w-md"
            >
              Tell me about your dream trip — where you're headed, your vibe, and your budget. I'll handle the planning so you can focus on the journey.
            </motion.p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
