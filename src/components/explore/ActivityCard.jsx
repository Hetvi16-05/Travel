import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Plus, Check, Info } from 'lucide-react';

export function ActivityCard({ item, index }) {
  const [added, setAdded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => {/* Open details modal or similar */}}
      className="group relative rounded-3xl overflow-hidden cursor-pointer bg-[#111827] border border-white/5 hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
           <div className="bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10 text-white">
              <Info size={16} />
           </div>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            setAdded(!added);
          }}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
            added 
              ? 'bg-emerald-500/80 border-emerald-400 text-white shadow-glow' 
              : 'bg-black/40 border-white/10 text-white hover:bg-primary/80'
          }`}
        >
          {added ? <Check size={18} /> : <Plus size={18} />}
        </button>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white leading-tight group-hover:text-primary-300 transition-colors">{item.title}</h3>
          <div className="flex items-center gap-1 shrink-0 bg-white/5 px-2 py-1 rounded-md">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span className="text-white text-xs font-bold">{item.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-white/50 mb-4 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <p className="text-white font-bold">
            ₹{(item.price || 0).toLocaleString()} <span className="text-white/40 text-xs font-normal">/ person</span>
          </p>
          <p className="text-white/50 text-xs flex items-center gap-1 font-medium bg-white/5 px-2 py-1 rounded-md border border-white/5">
            <Clock size={12} /> {item.duration}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
