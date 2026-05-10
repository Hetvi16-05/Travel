import { motion } from 'framer-motion';
import { MapPin, Clock, Coffee, Sun, Moon } from 'lucide-react';
import { Card } from '../ui/Card';

export function ItineraryWidget({ data }) {
  return (
    <Card className="w-full bg-[#111827] border-primary/20 p-6 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary-400 flex items-center justify-center">
          <MapPin size={20} />
        </div>
        <div>
          <h3 className="text-white font-display font-bold text-lg">AI Generated Itinerary</h3>
          <p className="text-white/50 text-sm">{data.title} • {data.duration}</p>
        </div>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[19px] before:w-px before:bg-white/10">
        {data.days.map((day, idx) => (
          <div key={idx} className="relative pl-12">
            <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-primary border-4 border-[#111827] shadow-[0_0_10px_rgba(99,102,241,0.5)] z-10" />
            <h4 className="text-white font-semibold mb-3">Day {day.day}</h4>
            
            <div className="space-y-3">
              {day.activities.map((act, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-xl flex gap-4 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-black/30 flex items-center justify-center text-white/50 shrink-0">
                    {act.time === 'Morning' && <Coffee size={16} className="text-amber-400" />}
                    {act.time === 'Afternoon' && <Sun size={16} className="text-orange-400" />}
                    {act.time === 'Evening' && <Moon size={16} className="text-violet-400" />}
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-medium">{act.title}</h5>
                    <p className="text-white/50 text-xs mt-1 leading-relaxed">{act.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10 flex justify-end gap-3">
        <button className="text-white/50 text-sm hover:text-white font-medium transition-colors">Regenerate</button>
        <button className="bg-primary/20 text-primary-300 text-sm px-4 py-2 rounded-lg font-medium hover:bg-primary/30 transition-colors">Save to Trips</button>
      </div>
    </Card>
  );
}
