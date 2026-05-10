import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wallet, Users, Compass, Globe, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import api from '../../lib/api';

const STEPS = [
  {
    id: 'style',
    title: 'Your Travel Style',
    subtitle: 'What kind of experiences do you live for?',
    options: [
      { id: 'culture', label: 'Cultural', icon: Globe },
      { id: 'adventure', label: 'Adventure', icon: Compass },
      { id: 'food', label: 'Foodie', icon: Sparkles },
      { id: 'relax', label: 'Relaxation', icon: Sparkles },
      { id: 'nature', label: 'Nature', icon: Sparkles },
    ]
  },
  {
    id: 'budget',
    title: 'Typical Budget',
    subtitle: 'How do you prefer to spend your trip?',
    options: [
      { id: 'budget', label: 'Budget (Backpacker)', icon: Wallet },
      { id: 'mid', label: 'Mid-range (Comfort)', icon: Wallet },
      { id: 'luxury', label: 'Luxury (Splurge)', icon: Wallet },
    ]
  },
  {
    id: 'group',
    title: 'Travel Company',
    subtitle: 'Who do you usually travel with?',
    options: [
      { id: 'solo', label: 'Solo Traveler', icon: Users },
      { id: 'couple', label: 'Romantic Couple', icon: Users },
      { id: 'family', label: 'Family Trip', icon: Users },
      { id: 'friends', label: 'Friends Squad', icon: Users },
    ]
  }
];

export default function OnboardingModal({ onComplete }) {
  const [step, setStep] = useState(0);
  const [prefs, setPrefs] = useState({
    style: [],
    budget: 'mid',
    group: 'solo'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStep = STEPS[step];

  const handleOptionToggle = (optionId) => {
    if (currentStep.id === 'style') {
      setPrefs(prev => ({
        ...prev,
        style: prev.style.includes(optionId)
          ? prev.style.filter(s => s !== optionId)
          : [...prev.style, optionId]
      }));
    } else {
      setPrefs(prev => ({ ...prev, [currentStep.id]: optionId }));
    }
  };

  const handleNext = async () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      try {
        await api.users.updatePreferences({
          preferred_budget: prefs.budget,
          travel_style: prefs.style,
          preferred_group: prefs.group,
          onboarding_done: true
        });
        onComplete();
      } catch (err) {
        console.error('Onboarding failed', err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-xl bg-slate-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl relative"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
          <motion.div 
            className="h-full bg-primary shadow-glow"
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <div className="p-8 md:p-12 space-y-8">
          {/* Header */}
          <div className="space-y-2 text-center">
            <motion.div
              key={currentStep.title}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary-400">
                {(() => {
                  const Icon = currentStep.options[0].icon;
                  return <Icon size={32} />;
                })()}
              </div>
              <h2 className="text-3xl font-display font-bold text-white">{currentStep.title}</h2>
              <p className="text-white/40">{currentStep.subtitle}</p>
            </motion.div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentStep.options.map((opt) => {
              const isSelected = currentStep.id === 'style' 
                ? prefs.style.includes(opt.id)
                : prefs[currentStep.id] === opt.id;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleOptionToggle(opt.id)}
                  className={`p-4 rounded-2xl border transition-all text-left flex items-center justify-between group ${
                    isSelected 
                      ? 'bg-primary/20 border-primary shadow-glow text-white' 
                      : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-primary text-white' : 'bg-white/5 text-white/40 group-hover:text-white'
                    }`}>
                      <opt.icon size={20} />
                    </div>
                    <span className="font-semibold text-sm">{opt.label}</span>
                  </div>
                  {isSelected && <CheckCircle2 size={18} className="text-primary-400" />}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => step > 0 && setStep(step - 1)}
              disabled={step === 0}
              className="h-12 px-6 rounded-xl text-white/40 hover:text-white disabled:opacity-0 transition-all flex items-center gap-2"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <button
              onClick={handleNext}
              disabled={isSubmitting || (currentStep.id === 'style' && prefs.style.length === 0)}
              className="h-12 px-8 rounded-xl bg-primary hover:bg-primary-600 text-white font-bold shadow-glow transition-all flex items-center gap-2 disabled:opacity-50 disabled:grayscale"
            >
              {isSubmitting ? 'Personalizing...' : step === STEPS.length - 1 ? 'Start Exploring' : 'Continue'}
              {step < STEPS.length - 1 && <ChevronRight size={18} />}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
