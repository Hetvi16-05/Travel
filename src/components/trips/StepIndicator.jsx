import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function StepIndicator({ currentStep, steps }) {
  return (
    <div className="flex items-center justify-center w-full max-w-2xl mx-auto mb-16">
      {steps.map((step, index) => {
        const isActive = currentStep === index;
        const isPast = currentStep > index;

        return (
          <div key={step} className="flex items-center relative flex-1 last:flex-none">
            <div className="relative flex flex-col items-center group">
              <motion.div
                animate={{
                  backgroundColor: isPast || isActive ? '#6366F1' : 'rgba(255,255,255,0.05)',
                  borderColor: isPast || isActive ? '#6366F1' : 'rgba(255,255,255,0.1)',
                }}
                className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center z-10 transition-colors duration-300 ${isActive ? 'shadow-[0_0_20px_rgba(99,102,241,0.4)]' : ''}`}
              >
                {isPast ? (
                  <Check size={16} className="text-white" />
                ) : (
                  <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-white/40'}`}>
                    {index + 1}
                  </span>
                )}
              </motion.div>
              <div className="absolute top-14 text-center w-24">
                <span className={`text-xs font-semibold uppercase tracking-wider ${isActive ? 'text-primary-400' : isPast ? 'text-white/80' : 'text-white/30'}`}>
                  {step}
                </span>
              </div>
            </div>
            
            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-4 relative bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: isPast ? '100%' : '0%' }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-y-0 left-0 bg-primary-500 rounded-full"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
