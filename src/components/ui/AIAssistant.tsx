"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-[320px] md:w-[380px] h-[450px] glass-dark rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-violet-500/30"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-violet-600/20 to-pink-600/20 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center animate-pulse">
                  <Sparkles className="text-white w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Traveloop AI</h4>
                  <p className="text-[10px] text-green-400 uppercase tracking-widest font-bold">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow p-6 overflow-y-auto space-y-4">
              <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 max-w-[80%] text-sm text-white/80">
                Hi there! I'm your Traveloop AI assistant. Where would you like to go next?
              </div>
              <div className="bg-violet-600/20 border border-violet-500/20 rounded-2xl rounded-tr-none p-4 max-w-[80%] ml-auto text-sm text-white/80">
                I'm looking for a 5-day trip to Japan on a $2000 budget.
              </div>
              <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 max-w-[80%] text-sm text-white/80">
                Excellent choice! For Japan in 5 days, I recommend focusing on Tokyo and Kyoto. Would you like me to generate a draft itinerary for you?
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything about your trip..."
                className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-violet-500 transition-colors"
              />
              <button className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white hover:bg-violet-700 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300",
          isOpen ? "bg-white text-black rotate-90" : "bg-gradient-to-tr from-violet-600 to-pink-600 text-white"
        )}
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full border-2 border-[#030014] animate-bounce" />
        )}
      </motion.button>
    </div>
  );
};
