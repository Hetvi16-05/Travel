import { motion } from 'framer-motion';
import { Sparkles, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function MessageBubble({ message, isTyping }) {
  const { user } = useApp();
  const isAI = message.role === 'ai';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-4 w-full ${isAI ? '' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isAI ? 'bg-gradient-primary shadow-glow' : 'bg-white/10'}`}>
        {isAI ? <Sparkles size={18} className="text-white" /> : <User size={18} className="text-white" />}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col gap-4 max-w-[85%] ${isAI ? 'items-start' : 'items-end'}`}>
        <div className={`px-5 py-4 rounded-2xl text-[15px] leading-relaxed shadow-lg ${
          isAI 
            ? 'bg-[#1E293B] border border-white/5 text-white/90 rounded-tl-none' 
            : 'bg-gradient-primary text-white rounded-tr-none'
        }`}>
          {message.content}
          {isTyping && (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="inline-block w-2 h-4 ml-1 bg-white align-middle"
            />
          )}
        </div>

        {/* Dynamic Components Rendered by AI */}
        {isAI && message.components && message.components.length > 0 && (
          <div className="w-full max-w-3xl mt-2 space-y-4">
            {message.components.map((Component, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {Component}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
