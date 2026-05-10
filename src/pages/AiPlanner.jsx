import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, MapPin, Compass, Wallet, Calendar } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { MessageBubble } from '../components/ai/MessageBubble';
import { ItineraryWidget } from '../components/ai/ItineraryWidget';
import { BudgetWidget } from '../components/ai/BudgetWidget';

const SUGGESTIONS = [
  "Plan a 5-day Goa trip under ₹15000",
  "Luxury weekend in Udaipur for a couple",
  "Backpacking itinerary for Spiti Valley",
  "Family trip to Kerala for 7 days"
];

// Mock Data for the AI widgets
const mockItinerary = {
  title: "Goa Getaway",
  duration: "5 Days",
  days: [
    {
      day: 1,
      activities: [
        { time: 'Morning', title: 'Arrival & Check-in', description: 'Settle into your beachfront hostel in Anjuna.' },
        { time: 'Afternoon', title: 'Beach Hopping', description: 'Explore Anjuna and Vagator beaches. Grab lunch at Curlies.' },
        { time: 'Evening', title: 'Sunset at Chapora', description: 'Hike up to Chapora Fort for a stunning sunset view.' }
      ]
    },
    {
      day: 2,
      activities: [
        { time: 'Morning', title: 'Water Sports', description: 'Head to Baga beach for parasailing and jet skiing.' },
        { time: 'Afternoon', title: 'Old Goa Tour', description: 'Visit Basilica of Bom Jesus and Se Cathedral.' },
        { time: 'Evening', title: 'Panjim Walk', description: 'Explore Fontainhas, the Latin Quarter of Goa.' }
      ]
    }
  ]
};

const mockBudget = {
  total: 14500,
  breakdown: [
    { category: 'Flights/Train', amount: 4000, color: 'text-blue-400 bg-blue-400/20' },
    { category: 'Accommodation', amount: 4500, color: 'text-violet-400 bg-violet-400/20' },
    { category: 'Food', amount: 4000, color: 'text-orange-400 bg-orange-400/20' },
    { category: 'Activities', amount: 2000, color: 'text-emerald-400 bg-emerald-400/20' }
  ]
};

export default function AiPlanner() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    if (!text.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking and typing delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages([...newMessages, { 
        role: 'ai', 
        content: "Here is a carefully planned 5-day itinerary for Goa under ₹15,000, perfectly balancing adventure and relaxation on a budget. I've also included a cost breakdown.",
        components: [
          <ItineraryWidget key="itin" data={mockItinerary} />,
          <BudgetWidget key="budg" data={mockBudget} />
        ]
      }]);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-64px)] md:h-screen flex flex-col pt-16 md:pt-0 max-w-5xl mx-auto pb-6 relative">
        
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto scrollbar-none px-4 md:px-8 py-8">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-10">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-24 h-24 rounded-3xl bg-gradient-primary shadow-glow flex items-center justify-center"
              >
                <Sparkles size={40} className="text-white" />
              </motion.div>
              
              <div>
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
                >
                  What's your next adventure?
                </motion.h1>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                  className="text-white/50 text-lg"
                >
                  Ask me to plan a trip, find flights, estimate budgets, or discover hidden gems.
                </motion.p>
              </div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full"
              >
                {SUGGESTIONS.map((s, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSend(s)}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all text-sm text-left flex items-start gap-3"
                  >
                    <Compass size={16} className="text-primary-400 shrink-0 mt-0.5" />
                    {s}
                  </button>
                ))}
              </motion.div>
            </div>
          ) : (
            <div className="space-y-8 pb-32">
              {messages.map((msg, idx) => (
                <MessageBubble key={idx} message={msg} />
              ))}
              {isTyping && (
                <MessageBubble message={{ role: 'ai', content: '' }} isTyping={true} />
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area fixed at bottom of container */}
        <div className="absolute bottom-6 left-4 right-4 md:left-8 md:right-8 z-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 via-violet-500/20 to-primary-500/20 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-500" />
            <div className="relative bg-[#0F172A] border border-white/10 rounded-2xl p-2 flex items-end gap-2 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col flex-1">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(inputValue);
                    }
                  }}
                  placeholder="Ask anything about your travel plans..."
                  className="w-full bg-transparent text-white placeholder-white/30 resize-none outline-none py-3 px-4 max-h-32 min-h-[52px] scrollbar-none text-[15px]"
                  rows={1}
                />
              </div>
              <button 
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed shrink-0 transition-transform active:scale-95"
              >
                <Send size={18} className="ml-1" />
              </button>
            </div>
          </div>
          <p className="text-center text-white/30 text-xs mt-3">
            Traveloop AI can make mistakes. Please verify important booking details.
          </p>
        </div>

      </div>
    </DashboardLayout>
  );
}
