import { motion } from 'framer-motion';
import { CalendarDays, Plus } from 'lucide-react';
import { ActivityCard } from './ActivityCard';
import { TransportConnector } from './TransportConnector';

export function DayCard({ day }) {
  return (
    <div className="relative pl-6 pb-12 last:pb-0">
      {/* Vertical Timeline Line */}
      <div className="absolute left-[9px] top-8 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 to-transparent" />

      {/* Date Header */}
      <div className="flex items-center justify-between mb-6 relative">
        <div className="flex items-center gap-4">
          <div className="absolute -left-[30px] w-4 h-4 rounded-full bg-primary border-4 border-[#0F172A] shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10" />
          <div>
            <h3 className="text-2xl font-display font-bold text-white flex items-center gap-2">
              Day {day.day}
              <span className="text-sm font-medium text-white/40 bg-white/5 px-2 py-1 rounded-lg flex items-center gap-1">
                <CalendarDays size={14} /> {day.date}
              </span>
            </h3>
            <p className="text-primary-300 font-medium text-sm mt-1">{day.city}</p>
          </div>
        </div>
        
        <button className="h-8 px-3 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary-300 text-sm font-semibold flex items-center gap-1 transition-colors">
          <Plus size={14} /> Add Activity
        </button>
      </div>

      {/* Activities & Transport */}
      <div className="space-y-4">
        {day.items.map((item, idx) => {
          if (item.type === 'transport') {
            return (
              <TransportConnector 
                key={idx} 
                type={item.method} 
                duration={item.duration} 
                details={item.details} 
              />
            );
          }
          return <ActivityCard key={idx} activity={item} />;
        })}
      </div>
    </div>
  );
}
