import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { HeartPulse, AlertTriangle } from 'lucide-react';

export function BudgetHealthMeter({ spent = 100000, total = 120000 }) {
  const percentage = Math.min((spent / total) * 100, 100);
  const isWarning = percentage > 80;
  
  const strokeColor = isWarning ? '#ef4444' : '#10B981'; // Red if warning, emerald if safe
  const bgGlow = isWarning ? 'bg-red-500/10' : 'bg-emerald-500/10';

  return (
    <Card className={`relative overflow-hidden p-6 border-white/5 bg-[#111827] h-full`}>
      <div className={`absolute top-0 right-0 w-64 h-64 ${bgGlow} rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none transition-colors duration-1000`} />
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h3 className="text-white/80 font-medium flex items-center gap-2 mb-1">
            <HeartPulse size={16} className={isWarning ? 'text-red-400' : 'text-emerald-400'} /> 
            Budget Health
          </h3>
          <p className="text-sm text-white/50">Overall spending status</p>
        </div>
        {isWarning && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 animate-pulse">
            <AlertTriangle size={12} /> High Alert
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center py-4 relative z-10 flex-1">
        <div className="relative w-48 h-48">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96" cy="96" r="88"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="12"
              fill="none"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="96" cy="96" r="88"
              stroke={strokeColor}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 88}
              initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - percentage / 100) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-display font-bold text-white">{Math.round(percentage)}%</span>
            <span className="text-white/50 text-xs font-semibold uppercase tracking-wider mt-1">Consumed</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center relative z-10">
        {isWarning ? (
          <p className="text-sm text-red-400/80">You are approaching your budget limit. Review upcoming expenses.</p>
        ) : (
          <p className="text-sm text-emerald-400/80">You are on track! Keep up the good spending habits.</p>
        )}
      </div>
    </Card>
  );
}
