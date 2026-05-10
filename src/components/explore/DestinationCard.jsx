import { motion } from 'framer-motion';
import { MapPin, Star, Map, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function DestinationCard({ item, index }) {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate(`/trips/create?city=${item.title}`)}
      className="group relative rounded-3xl overflow-hidden cursor-pointer bg-[#111827] border border-white/5 h-[300px] hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all"
    >
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
      
      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10">
        <Star size={12} className="text-amber-400 fill-amber-400" />
        <span className="text-white text-xs font-bold">{item.rating}</span>
      </div>

      <div className="absolute top-4 left-4 flex gap-2">
        <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity translate-y-[-10px] group-hover:translate-y-0 text-white hover:bg-primary/50">
          <Map size={14} />
        </div>
        <div className="w-8 h-8 rounded-full bg-primary/80 backdrop-blur-md flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity translate-y-[-10px] group-hover:translate-y-0 text-white hover:bg-primary delay-75 shadow-glow">
          <Plus size={14} />
        </div>
      </div>
      
      <div className="absolute bottom-5 left-5 right-5">
        <p className="text-xs text-primary-300 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
          <MapPin size={12} /> {item.country}
        </p>
        <h3 className="text-2xl font-display font-bold text-white leading-tight">{item.title}</h3>
      </div>
    </motion.div>
  );
}
