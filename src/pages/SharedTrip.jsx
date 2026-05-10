import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Calendar, Clock, Heart, Share2, Copy, Map, Coffee, Camera, Plane, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Loader } from '../components/ui/Loader';
import api from '../lib/api';

export default function SharedTrip() {
  const { id: token } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const { scrollY } = useScroll();
  
  const headerY = useTransform(scrollY, [0, 500], [0, 150]);
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const fetchSharedTrip = async () => {
      try {
        const res = await api.share.getByToken(token);
        setTrip(res.data);
      } catch (err) {
        setError(err.message || 'Shared trip not found');
      } finally {
        setLoading(false);
      }
    };
    fetchSharedTrip();

    const handleScroll = () => setShowNav(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [token]);

  if (loading) return <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center"><Loader size="lg" /></div>;
  
  if (error || !trip) return (
    <div className="min-h-screen bg-[#0A0F1C] flex flex-col items-center justify-center text-center p-6">
      <AlertCircle size={48} className="text-red-400 mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Trip Not Found</h2>
      <p className="text-white/40 mb-8">{error || 'This shared link may have expired or is invalid.'}</p>
      <Button onClick={() => navigate('/')}>Explore Travia</Button>
    </div>
  );

  const duration = trip.start_date && trip.end_date 
    ? Math.max(1, Math.ceil((new Date(trip.end_date) - new Date(trip.start_date)) / (1000 * 60 * 60 * 24)) + 1)
    : 1;

  const dates = trip.start_date 
    ? `${new Date(trip.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(trip.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
    : 'Flexible Dates';

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white selection:bg-primary-500/30">
      
      {/* Floating Action Bar */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: showNav ? 0 : -100 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1C]/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-xl font-display font-bold text-white tracking-tight">Travia</button>
          <div className="hidden md:block w-px h-6 bg-white/20" />
          <h2 className="hidden md:block font-medium truncate max-w-xs">{trip.title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button className="shadow-glow" onClick={() => alert('Feature coming soon: Save to My Trips')}>
            <Copy size={16} className="mr-2" /> Copy Itinerary
          </Button>
        </div>
      </motion.div>

      {/* Hero Section */}
      <div className="relative h-[85vh] min-h-[600px] overflow-hidden flex items-end pb-24 md:pb-32">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <img src={trip.cover_image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000'} alt={trip.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/40 to-transparent" />
        </motion.div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase">
                {trip.mood || 'Adventure'}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5">
                <MapPin size={12} /> {trip.destination}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] tracking-tight mb-8">
              {trip.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg uppercase">
                  {trip.author_name?.[0] || 'T'}
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">Created by</p>
                  <p className="font-medium text-white">{trip.author_name || 'Traveler'}</p>
                </div>
              </div>
              <div className="w-px h-8 bg-white/20 hidden md:block" />
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider font-semibold flex items-center gap-1"><Calendar size={12}/> Dates</p>
                <p className="font-medium text-white">{dates}</p>
              </div>
              <div className="w-px h-8 bg-white/20 hidden md:block" />
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider font-semibold flex items-center gap-1"><Clock size={12}/> Duration</p>
                <p className="font-medium text-white">{duration} Days</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-20">
            <section>
              <h2 className="text-3xl font-display font-bold mb-6">Trip Overview</h2>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
                {trip.description || "No description provided for this amazing journey."}
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-display font-bold mb-10">The Journey</h2>
              <div className="space-y-16">
                {(trip.stops || []).map((stop, idx) => (
                  <div key={idx} className="relative pl-8 md:pl-12">
                    {idx !== trip.stops.length - 1 && (
                      <div className="absolute left-[11px] top-10 bottom-[-64px] w-0.5 bg-gradient-to-b from-primary-500/50 to-transparent" />
                    )}
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#0A0F1C] border-4 border-primary-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] flex items-center justify-center z-10" />
                    <div className="mb-4">
                      <span className="text-primary-400 font-bold uppercase tracking-wider text-sm">Day {stop.day_number}</span>
                      <h3 className="text-2xl font-bold mt-1 text-white">{stop.city_name}</h3>
                    </div>
                    <div className="space-y-3">
                      {(stop.activities || []).map((act, i) => (
                        <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                          <div className="w-10 h-10 rounded-xl bg-[#0A0F1C] flex items-center justify-center text-primary-400 shrink-0 text-lg">
                            {act.category === 'Dining' ? '🍜' : act.category === 'Sightseeing' ? '🏛️' : '📍'}
                          </div>
                          <div>
                            <p className="text-sm text-white/50">{act.time_slot}</p>
                            <p className="font-medium text-white">{act.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-32 space-y-8">
              <div className="bg-[#111827] border border-white/10 rounded-3xl p-6 shadow-2xl">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button onClick={() => setIsLiked(!isLiked)} className={`flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${isLiked ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-transparent'}`}>
                    <Heart size={18} className={isLiked ? "fill-pink-400" : ""} /> {isLiked ? 'Liked' : 'Like'}
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all">
                    <Share2 size={18} /> Share
                  </button>
                </div>
                <Button className="w-full shadow-glow py-6 text-lg" onClick={() => alert('Coming soon!')}>
                  Copy Itinerary
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
