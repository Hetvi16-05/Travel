import { Card } from '../ui/Card';
import { CloudRain, Sun, Wind, Droplets } from 'lucide-react';

export function WeatherWidget() {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-white/5 p-0">
      {/* Dynamic Weather Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="p-6 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">Upcoming Destination</p>
            <h3 className="text-white font-display font-bold text-2xl">Bali, Indonesia</h3>
            <p className="text-white/60 text-sm">Tomorrow</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-glow-amber">
            <Sun size={24} />
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-display font-black text-white">30°</span>
            <span className="text-white/50 font-medium">Mostly Sunny</span>
          </div>

          <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
            <div className="flex flex-col gap-1">
              <span className="text-white/40 text-xs flex items-center gap-1"><CloudRain size={10} /> Prec</span>
              <span className="text-white text-sm font-semibold">10%</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/40 text-xs flex items-center gap-1"><Wind size={10} /> Wind</span>
              <span className="text-white text-sm font-semibold">12 km/h</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/40 text-xs flex items-center gap-1"><Droplets size={10} /> Hum</span>
              <span className="text-white text-sm font-semibold">65%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
