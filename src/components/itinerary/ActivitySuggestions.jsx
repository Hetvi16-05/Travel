import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus, Star, Info, X } from 'lucide-react';
import api from '../../lib/api';
import { toast } from 'react-hot-toast';

export default function ActivitySuggestions({ stopId, onAdd }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const res = await api.recommendations.getActivities(stopId);
      setSuggestions(res.data);
    } catch (err) {
      console.error('Failed to fetch activity recommendations', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && suggestions.length === 0) {
      fetchSuggestions();
    }
  }, [isOpen]);

  const handleAdd = async (activity) => {
    try {
      // For now, let's assume we have a generic "add activity" endpoint or 
      // the parent handles the actual DB update via the onAdd callback.
      // If we need to call an API here:
      // await api.stops.addActivity(stopId, { activity_id: activity.id });
      
      onAdd(activity);
      setSuggestions(prev => prev.filter(s => s.id !== activity.id));
      toast.success(`Added ${activity.name}!`);
    } catch (err) {
      toast.error('Failed to add activity');
    }
  };

  return (
    <div className="mt-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[10px] font-bold text-primary-400 uppercase tracking-widest hover:text-primary-300 transition-colors"
      >
        <Sparkles size={12} className={loading ? 'animate-spin' : ''} />
        {isOpen ? 'Hide Suggestions' : 'Magic Suggestions'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hide">
              {suggestions.map((act) => (
                <div 
                  key={act.id}
                  className="flex-shrink-0 w-64 p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/30 transition-colors group relative"
                >
                  <div className="absolute top-2 right-2 flex gap-1">
                    <div className="px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-md border border-white/10 text-[8px] font-bold text-primary-300">
                      {Math.round(act.rec_score * 10)}% MATCH
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary-400">
                      <Star size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{act.name}</h4>
                      <p className="text-[10px] text-white/40">{act.category}</p>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-white/60 line-clamp-2 leading-relaxed mb-3">
                    {act.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-400">₹{act.price_est}</span>
                    <button 
                      onClick={() => handleAdd(act)}
                      className="h-7 px-3 rounded-lg bg-primary hover:bg-primary-600 text-white text-[10px] font-bold flex items-center gap-1 transition-colors"
                    >
                      <Plus size={12} /> Add
                    </button>
                  </div>
                </div>
              ))}
              
              {suggestions.length === 0 && !loading && (
                <p className="text-[10px] text-white/20 italic">No more suggestions for this stop.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
