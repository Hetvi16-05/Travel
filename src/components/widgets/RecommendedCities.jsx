import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, ChevronRight, Star, Plus } from 'lucide-react';
import api from '../../lib/api';
import { useNavigate } from 'react-router-dom';

export default function RecommendedCities() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const res = await api.recommendations.getCities();
        setRecommendations(res.data);
      } catch (err) {
        console.error('Failed to fetch recommendations', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecs();
  }, []);

  const handlePlanTrip = (city) => {
    navigate(`/trips/create?city=${encodeURIComponent(city.name)}`);
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center rounded-3xl bg-white/[0.02] border border-white/5">
        <Sparkles className="animate-pulse text-primary-400" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-primary-400" />
          <h2 className="text-xl font-bold text-white tracking-tight">Handpicked for you</h2>
        </div>
        <button 
          onClick={() => navigate('/explore')}
          className="text-sm text-primary-400 hover:text-primary-300 font-medium flex items-center gap-1 group"
        >
          Explore All <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {recommendations.slice(0, 6).map((city, idx) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-3xl aspect-[4/5] cursor-pointer"
              onClick={() => navigate(`/explore?city=${encodeURIComponent(city.name)}`)}
            >
              <img 
                src={city.image_url || 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80'} 
                alt={city.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                <span className="text-[10px] font-bold text-white">{city.confidence}% match</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                <div className="flex items-center gap-1 text-primary-400 text-[10px] font-bold uppercase tracking-widest">
                  <MapPin size={10} />
                  <span>{city.country}</span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-primary-300 transition-colors">
                  {city.name}
                </h3>
                <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                  {city.why}
                </p>
                <div className="pt-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanTrip(city);
                    }}
                    className="w-full h-10 rounded-xl bg-white/10 hover:bg-primary border border-white/10 hover:border-primary text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={14} /> Plan Trip
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
