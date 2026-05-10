import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GripVertical, Clock, MapPin, ChevronDown, Utensils, Camera, Map, Edit2, Trash2 } from 'lucide-react';

export function ActivityCard({ activity }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getIcon = () => {
    switch(activity.type) {
      case 'food': return <Utensils size={18} className="text-orange-400" />;
      case 'sight': return <Camera size={18} className="text-violet-400" />;
      default: return <Map size={18} className="text-primary-400" />;
    }
  };

  const getBgColor = () => {
    switch(activity.type) {
      case 'food': return 'bg-orange-500/10 border-orange-500/20';
      case 'sight': return 'bg-violet-500/10 border-violet-500/20';
      default: return 'bg-primary-500/10 border-primary-500/20';
    }
  };

  return (
    <motion.div 
      layout
      className="group relative bg-[#1A2235]/80 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors"
    >
      <div className="flex items-start p-4 gap-4">
        {/* Drag Handle (Visual only for now) */}
        <div className="mt-2 text-white/20 group-hover:text-white/40 cursor-grab active:cursor-grabbing">
          <GripVertical size={16} />
        </div>

        {/* Icon */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${getBgColor()}`}>
          {getIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-white font-semibold text-lg truncate">{activity.title}</h4>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white/50 flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg">
                <Clock size={12} /> {activity.time}
              </span>
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 transition-colors"
              >
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                  <ChevronDown size={16} />
                </motion.div>
              </button>
            </div>
          </div>
          
          <p className="text-white/50 text-sm flex items-center gap-1.5 truncate">
            <MapPin size={12} /> {activity.location}
          </p>
        </div>
      </div>

      {/* Expandable Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 pl-14 pr-4 border-t border-white/5 mt-2">
              <p className="text-sm text-white/60 leading-relaxed mb-4">
                {activity.description || "No additional notes provided for this activity. Enjoy your visit!"}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">
                    Est: ₹{activity.cost || 0}
                  </span>
                  {activity.bookingRef && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-400/10 px-2 py-1 rounded-md">
                      Ref: {activity.bookingRef}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-xs font-medium text-white/50 hover:text-white transition-colors flex items-center gap-1">
                    <Edit2 size={12} /> Edit
                  </button>
                  <button className="text-xs font-medium text-red-400/50 hover:text-red-400 transition-colors flex items-center gap-1">
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
