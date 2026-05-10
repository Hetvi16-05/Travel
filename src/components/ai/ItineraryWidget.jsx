import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Coffee, Sun, Moon, CheckCircle2, RotateCcw, Bookmark, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { tripsApi } from '../../lib/api';

const TIME_ICONS = {
  Morning:   { icon: Coffee, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  Afternoon: { icon: Sun,    color: 'text-orange-400', bg: 'bg-orange-400/10' },
  Evening:   { icon: Moon,   color: 'text-violet-400', bg: 'bg-violet-400/10' },
};

export function ItineraryWidget({ data, onRegenerate, showActionBar = true }) {
  const [savedTripId, setSavedTripId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [expandedDays, setExpandedDays] = useState({ 0: true }); // Day 1 open by default

  const toggleDay = (idx) =>
    setExpandedDays(prev => ({ ...prev, [idx]: !prev[idx] }));

  const handleSaveToTrips = async () => {
    if (savedTripId || isSaving) return;
    setIsSaving(true);
    setSaveError(null);
    try {
      const tripPayload = {
        title: data.title,
        destination: data.cityName,
        start_date: null,
        end_date: null,
        status: 'planned',
        notes: `AI-generated ${data.duration} ${data.style} trip for ${data.travellerType}`,
      };
      const res = await tripsApi.create(tripPayload);
      setSavedTripId(res?.data?.id || res?.id || true);
    } catch (err) {
      setSaveError('Could not save — is the server running?');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#111827] to-[#0d1424] border border-white/[0.07] rounded-2xl overflow-hidden shadow-xl">
      {/* City hero image */}
      {data.cityImage && (
        <div className="relative h-36 overflow-hidden">
          <img
            src={data.cityImage}
            alt={data.cityName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent" />
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <MapPin size={14} className="text-indigo-400" />
            <span className="text-white text-sm font-semibold">{data.cityName}</span>
            <span className="text-white/40 text-xs">• {data.duration}</span>
          </div>
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-xs text-white/70 font-medium capitalize">
            {data.style} • {data.travellerType}
          </div>
        </div>
      )}

      <div className="p-5">
        {/* Header (shown when no city image) */}
        {!data.cityImage && (
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <h3 className="text-white font-bold text-base">{data.title}</h3>
              <p className="text-white/50 text-xs mt-0.5">{data.duration} • {data.style} • {data.travellerType}</p>
            </div>
          </div>
        )}

        {/* Days */}
        <div className="space-y-3">
          {data.days.map((day, idx) => {
            const isOpen = !!expandedDays[idx];
            return (
              <div key={idx} className="border border-white/[0.06] rounded-xl overflow-hidden bg-white/[0.02]">
                {/* Day header — clickable */}
                <button
                  onClick={() => toggleDay(idx)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                      <Star size={12} className="text-indigo-400" />
                    </div>
                    <span className="text-white font-semibold text-sm">Day {day.day}</span>
                    <span className="text-white/30 text-xs">{day.activities.length} activities</span>
                  </div>
                  {isOpen ? <ChevronUp size={14} className="text-white/30" /> : <ChevronDown size={14} className="text-white/30" />}
                </button>

                {/* Activities */}
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-3 pb-3 space-y-2"
                  >
                    {day.activities.map((act, i) => {
                      const slot = TIME_ICONS[act.time] || TIME_ICONS.Morning;
                      const Icon = slot.icon;
                      return (
                        <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors border border-white/[0.04]">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${slot.bg}`}>
                            <Icon size={14} className={slot.color} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h5 className="text-white text-sm font-medium truncate">{act.title}</h5>
                              {act.price_est > 0 && (
                                <span className="text-white/40 text-xs shrink-0">₹{act.price_est.toLocaleString('en-IN')}</span>
                              )}
                            </div>
                            <p className="text-white/50 text-xs mt-0.5 leading-relaxed line-clamp-2">{act.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Bar */}
        {showActionBar && (
          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
            <button
              onClick={onRegenerate}
              className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs font-medium transition-colors"
            >
              <RotateCcw size={12} />
              Regenerate
            </button>

            <div className="flex items-center gap-2">
              {saveError && (
                <span className="text-rose-400 text-xs">{saveError}</span>
              )}
              <button
                onClick={handleSaveToTrips}
                disabled={isSaving || !!savedTripId}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  savedTripId
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 disabled:opacity-60 disabled:cursor-not-allowed'
                }`}
              >
                {savedTripId
                  ? <><CheckCircle2 size={12} /> Saved to Trips!</>
                  : isSaving
                    ? <><span className="animate-spin inline-block">⟳</span> Saving…</>
                    : <><Bookmark size={12} /> Save to Trips</>
                }
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
