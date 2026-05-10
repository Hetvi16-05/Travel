import { Plane, Train, Car } from 'lucide-react';

export function TransportConnector({ type, duration, details }) {
  const getIcon = () => {
    switch(type) {
      case 'flight': return <Plane size={14} className="text-blue-400" />;
      case 'train': return <Train size={14} className="text-emerald-400" />;
      default: return <Car size={14} className="text-amber-400" />;
    }
  };

  return (
    <div className="flex items-center gap-4 py-2 relative my-2">
      {/* Dashed Line Background */}
      <div className="absolute left-[38px] top-0 bottom-0 w-[2px] border-l-2 border-dashed border-white/10" />
      
      {/* Icon Node */}
      <div className="w-8 h-8 rounded-full bg-[#111827] border-2 border-white/10 flex items-center justify-center z-10 ml-[23px] relative">
        {getIcon()}
      </div>

      {/* Details Box */}
      <div className="bg-white/[0.02] border border-white/5 px-4 py-2 rounded-xl flex items-center gap-4 z-10 hover:bg-white/[0.05] transition-colors cursor-pointer">
        <span className="text-sm font-semibold text-white/80">{duration}</span>
        <div className="h-4 w-px bg-white/10" />
        <span className="text-sm text-white/50">{details}</span>
      </div>
    </div>
  );
}
