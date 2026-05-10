import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { ArrowRight, MapPin } from 'lucide-react';

const destinations = [
  { name: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80', trending: '#1' },
  { name: 'Santorini, Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a535def5ae?w=500&q=80', trending: '#2' },
  { name: 'Swiss Alps', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=500&q=80', trending: '#3' },
];

export function TrendingDestinations() {
  return (
    <Card className="flex flex-col p-6 border-white/5 bg-white/[0.02]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white/80 font-medium">Trending Destinations</h3>
        <button className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {destinations.map((dest, i) => (
          <motion.div 
            key={i} 
            whileHover={{ scale: 1.02 }}
            className="group relative h-24 rounded-2xl overflow-hidden cursor-pointer"
          >
            <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80" />
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white/60 text-[10px] uppercase tracking-wider font-bold mb-1 flex items-center gap-1">
                    <MapPin size={10} /> {dest.trending}
                  </p>
                  <h4 className="text-white font-semibold text-sm">{dest.name}</h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                  <ArrowRight size={14} className="text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
