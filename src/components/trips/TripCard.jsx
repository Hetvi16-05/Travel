import { motion } from 'framer-motion';
import { Calendar, MapPin, Star, MoreVertical, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TripCard({ trip, index }) {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate(`/trips/${trip.id}/itinerary`)}
      className="group relative bg-[#111827] border border-white/10 rounded-[2rem] overflow-hidden cursor-pointer hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] flex flex-col h-full"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={trip.cover} 
          alt={trip.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
        
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold text-white">
            <Compass size={12} className="text-primary-400" />
            {trip.mood}
          </div>
          <button 
            className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-colors"
            onClick={(e) => { 
              e.stopPropagation(); 
              navigate(`/trips/${trip.id}/edit`);
            }}
          >
            <MoreVertical size={14} />
          </button>
        </div>
        
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-xl font-display font-bold text-white leading-tight mb-1">{trip.title}</h3>
          <p className="text-sm text-white/60 flex items-center gap-1">
            <MapPin size={12} /> {trip.destination}
          </p>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-white/50 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
            <Calendar size={14} />
            <span className="font-medium">Dec 20 - 27</span>
          </div>
          <div className="flex items-center gap-1.5 bg-primary/10 text-primary-300 px-3 py-1.5 rounded-lg border border-primary/20 font-medium">
            {trip.days} Days
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-end mb-2">
            <p className="text-xs text-white/40 font-medium uppercase tracking-wider">Budget Status</p>
            <p className="text-sm font-semibold text-emerald-400">₹{trip.spent.toLocaleString()} <span className="text-white/30 font-normal">/ ₹{trip.budget.toLocaleString()}</span></p>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((trip.spent / trip.budget) * 100, 100)}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-emerald-500 rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
