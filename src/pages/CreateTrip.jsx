import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Sparkles, Navigation, Loader2, AlertCircle } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { StepIndicator } from '../components/trips/StepIndicator';
import { Button } from '../components/ui/Button';
import api, { tripsApi, citiesApi } from '../lib/api';

const STEPS = ['Destination', 'Vibe', 'Budget', 'Review'];

const MOODS = [
  { id: 'adventure', label: 'Adventure', icon: '🏃‍♂️', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  { id: 'luxury', label: 'Luxury', icon: '✨', bg: 'bg-violet-500/10', border: 'border-violet-500/30' },
  { id: 'backpacking', label: 'Backpacking', icon: '🎒', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  { id: 'couple', label: 'Couple', icon: '❤️', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  { id: 'spiritual', label: 'Spiritual', icon: '🧘', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
];

export default function CreateTrip() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  const [cityInfo, setCityInfo] = useState(null);
  const [formData, setFormData] = useState({
    destination: '',
    start_date: '',
    end_date: '',
    mood: '',
    budget: 50000,
  });

  // Handle query params on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const city = params.get('city');
    if (city) {
      setFormData(prev => ({ ...prev, destination: city }));
    }
  }, [location]);

  // Fetch city info when destination changes
  useEffect(() => {
    if (formData.destination.length > 2) {
      const timer = setTimeout(async () => {
        try {
          const res = await citiesApi.search(formData.destination);
          if (res?.data?.length > 0) {
            setCityInfo(res.data[0]);
          } else {
            setCityInfo(null);
          }
        } catch (err) {
          console.error('Search failed', err);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [formData.destination]);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleCreate = async () => {
    setIsCreating(true);
    setError('');
    try {
      const payload = {
        title: `${formData.destination} Trip`,
        destination: formData.destination,
        start_date: formData.start_date || null,
        end_date: formData.end_date || null,
        mood: formData.mood,
        budget: formData.budget,
        status: 'planned',
      };
      const res = await tripsApi.create(payload);
      const newTripId = res?.data?.id;
      navigate(newTripId ? `/trips/${newTripId}/itinerary` : '/trips');
    } catch (err) {
      setError(err.message || 'Failed to create trip. Please try again.');
      setIsCreating(false);
    }
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: (direction) => ({ x: direction < 0 ? 50 : -50, opacity: 0, transition: { duration: 0.2 } })
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pb-20 pt-8">

        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => currentStep === 0 ? navigate('/trips') : prevStep()}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-2xl font-bold text-white tracking-tight">Create New Trip</h1>
        </div>

        <StepIndicator currentStep={currentStep} steps={STEPS} />

        <div className="bg-[#111827] border border-white/10 rounded-[2rem] p-8 md:p-12 min-h-[400px] relative overflow-hidden">

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            >
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait" custom={1}>

            {/* STEP 1: DESTINATION */}
            {currentStep === 0 && (
              <motion.div key="step1" custom={1} variants={slideVariants} initial="enter" animate="center" exit="exit" className="space-y-8 max-w-xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-display font-bold text-white mb-2">Where are you going?</h2>
                  <p className="text-white/50">Enter your destination and dates.</p>
                </div>
                <div className="space-y-5">
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none group-focus-within:text-primary-400 transition-colors">
                      <MapPin size={20} />
                    </div>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={e => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="e.g. Goa, India"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-lg text-white placeholder-white/40 outline-none focus:bg-white/10 focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.2)] transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none group-focus-within:text-primary-400 transition-colors">
                        <Calendar size={18} />
                      </div>
                      <input
                        type="date"
                        value={formData.start_date}
                        onChange={e => setFormData({ ...formData, start_date: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:bg-white/10 focus:border-primary/50 transition-all [color-scheme:dark]"
                      />
                    </div>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none group-focus-within:text-primary-400 transition-colors">
                        <Calendar size={18} />
                      </div>
                      <input
                        type="date"
                        value={formData.end_date}
                        onChange={e => setFormData({ ...formData, end_date: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:bg-white/10 focus:border-primary/50 transition-all [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {cityInfo && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex gap-4"
                    >
                      <img src={cityInfo.image_url} className="w-20 h-20 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-white">{cityInfo.name}, {cityInfo.country}</h4>
                        <p className="text-xs text-white/50 line-clamp-2 mt-1">{cityInfo.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                           <Sparkles size={12} className="text-primary-400" />
                           <span className="text-[10px] font-bold text-primary-400 uppercase tracking-wider">AI Itinerary Suggestion Ready</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 2: MOOD */}
            {currentStep === 1 && (
              <motion.div key="step2" custom={1} variants={slideVariants} initial="enter" animate="center" exit="exit" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-display font-bold text-white mb-2">What's the vibe?</h2>
                  <p className="text-white/50">Select the mood for your trip to help our AI personalize it.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {MOODS.map(mood => (
                    <button
                      key={mood.id}
                      onClick={() => setFormData({ ...formData, mood: mood.id })}
                      className={`p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 border ${
                        formData.mood === mood.id
                          ? `${mood.bg} ${mood.border} shadow-glow transform scale-[1.02]`
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-4xl block mb-2">{mood.icon}</span>
                      <span className={`font-medium ${formData.mood === mood.id ? 'text-white' : 'text-white/70'}`}>
                        {mood.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: BUDGET */}
            {currentStep === 2 && (
              <motion.div key="step3" custom={1} variants={slideVariants} initial="enter" animate="center" exit="exit" className="space-y-8 max-w-xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-display font-bold text-white mb-2">Set your budget</h2>
                  <p className="text-white/50">How much are you looking to spend?</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                  <h3 className="text-5xl font-display font-bold text-white mb-8">
                    ₹{formData.budget.toLocaleString()}
                  </h3>
                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="5000"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                    className="w-full accent-primary-500 h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-white/40 text-sm mt-4 font-medium">
                    <span>Budget Friendly</span>
                    <span>Luxury</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: REVIEW */}
            {currentStep === 3 && (
              <motion.div key="step4" custom={1} variants={slideVariants} initial="enter" animate="center" exit="exit" className="space-y-8 max-w-xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow mx-auto mb-6">
                    <Sparkles size={32} className="text-white" />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-white mb-2">Ready to create?</h2>
                  <p className="text-white/50">Review your trip details below.</p>
                </div>
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between pb-4 border-b border-white/10">
                    <span className="text-white/50">Destination</span>
                    <span className="font-semibold text-white">{formData.destination || '—'}</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-white/10">
                    <span className="text-white/50">Dates</span>
                    <span className="font-semibold text-white text-sm">
                      {formData.start_date && formData.end_date
                        ? `${formData.start_date} → ${formData.end_date}`
                        : '—'}
                    </span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-white/10">
                    <span className="text-white/50">Vibe</span>
                    <span className="font-semibold text-white capitalize">{formData.mood || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Budget</span>
                    <span className="font-semibold text-emerald-400">₹{formData.budget.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={currentStep === 0 ? 'opacity-0 pointer-events-none' : ''}
          >
            Back
          </Button>

          {currentStep < STEPS.length - 1 ? (
            <Button
              onClick={nextStep}
              disabled={currentStep === 0 && !formData.destination}
              className="px-8 shadow-glow"
            >
              Continue <ArrowRight size={16} className="ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleCreate}
              isLoading={isCreating}
              className="px-8 shadow-glow"
              size="lg"
            >
              <Sparkles size={18} className="mr-2" />
              Create Trip
            </Button>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}
