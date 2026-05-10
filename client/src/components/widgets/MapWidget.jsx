import { Card } from '../ui/Card';
import { Map, MapPin } from 'lucide-react';

export function MapWidget() {
  return (
    <Card className="h-full min-h-[300px] flex flex-col p-0 border-white/5 bg-[#0A0F1C] overflow-hidden relative">
      <div className="absolute top-6 left-6 z-10">
        <h3 className="text-white/80 font-medium flex items-center gap-2 mb-1 bg-[#0A0F1C]/80 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10">
          <Map size={16} className="text-primary-400" /> Interactive Map
        </h3>
      </div>
      
      {/* Decorative Map Visuals */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 mix-blend-screen pointer-events-none">
        {/* Simple dotted grid as a placeholder for map texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:24px_24px]" />
        
        {/* SVG curved path connecting nodes */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          <path 
            d="M 50 200 C 150 250, 250 100, 350 150" 
            fill="transparent" 
            stroke="url(#gradientMap)" 
            strokeWidth="3"
            strokeDasharray="5,5"
            className="animate-pulse"
          />
          <defs>
            <linearGradient id="gradientMap" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>

        {/* Location Pins */}
        <div className="absolute top-[60%] left-[10%] w-3 h-3 bg-primary-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,1)]">
          <div className="absolute -inset-2 bg-primary-500/20 rounded-full animate-ping" />
        </div>
        <div className="absolute top-[30%] left-[60%] w-3 h-3 bg-pink-500 rounded-full shadow-[0_0_15px_rgba(236,72,153,1)]">
          <div className="absolute -inset-2 bg-pink-500/20 rounded-full animate-ping" />
        </div>
        <div className="absolute top-[48%] left-[85%] w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,1)]">
          <div className="absolute -inset-2 bg-amber-500/20 rounded-full animate-ping" />
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 z-10 flex gap-2">
        <div className="bg-[#0A0F1C]/80 px-3 py-2 rounded-xl backdrop-blur-md border border-white/10 flex-1 flex items-center gap-3">
          <MapPin size={16} className="text-pink-500" />
          <div>
            <p className="text-[10px] text-white/50 uppercase font-bold">Next Stop</p>
            <p className="text-sm text-white font-medium">Ubud, Bali</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
