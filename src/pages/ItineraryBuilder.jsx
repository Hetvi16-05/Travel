import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Map as MapIcon, Calendar, MoreVertical, Share2, Download, Plus, AlertCircle, Sparkles, Ticket, Wallet } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { DayCard } from '../components/itinerary/DayCard';
import { Button } from '../components/ui/Button';
import api from '../lib/api';
import { Loader } from '../components/ui/Loader';
import { toast } from 'react-hot-toast';
import PlannerPanel from '../components/itinerary/PlannerPanel';
import MapComponent from '../components/itinerary/MapComponent';
import { useApp } from '../context/AppContext';

export default function ItineraryBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Map');
  const { activeTrip, setActiveTrip, user } = useApp();
  const [trip, setTrip] = useState(null);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [focusedDay, setFocusedDay] = useState(null);

  const fetchTrip = async () => {
    try {
      const [tripRes, notesRes] = await Promise.all([
        api.trips.getById(id),
        api.trips.getNotes(id)
      ]);
      setTrip(tripRes.data);
      setNotes(notesRes.data || []);
      // Sync active trip to context
      setActiveTrip(id);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchTrip();
    
    // Also set active trip on mount in case fetch is slow
    setActiveTrip(id);

    // Cleanup on unmount (optional, but keep it for now)
    // return () => setActiveTrip(null); 
  }, [id]);

  const generateAIItinerary = async () => {
    setIsGenerating(true);
    try {
      await api.trips.aiPopulate(id);
      toast.success('AI magic complete! Your itinerary is ready.');
      fetchTrip();
    } catch (err) {
      toast.error('AI magic failed: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const addStop = async () => {
    const cityName = prompt('Enter city name:');
    if (!cityName) return;
    
    try {
      const cityRes = await api.cities.search(cityName);
      if (!cityRes.data || cityRes.data.length === 0) {
        toast.error('City not found in our database');
        return;
      }
      
      const city = cityRes.data[0];
      await api.trips.addStop(id, { 
        city_id: city.id,
        day_number: (trip.stops?.length || 0) + 1,
        order_index: trip.stops?.length || 0
      });
      
      toast.success(`Added ${city.name} to your itinerary!`);
      fetchTrip();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <Loader size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !trip) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 text-red-400">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Failed to load itinerary</h2>
          <p className="text-white/50 mb-6">{error || 'Trip not found'}</p>
          <Button onClick={() => navigate('/trips')}>Back to Trips</Button>
        </div>
      </DashboardLayout>
    );
  }

  const formatDateRange = () => {
    if (!trip.start_date) return 'Flexible Dates';
    const start = new Date(trip.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (!trip.end_date) return start;
    const end = new Date(trip.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${start} - ${end}`;
  };

  const formattedDays = trip.stops?.length > 0 ? trip.stops.map(stop => {
    const dayDate = new Date(trip.start_date);
    dayDate.setDate(dayDate.getDate() + (stop.day_number - 1));
    
    return {
      id: stop.id,
      day: stop.day_number,
      date: dayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      city: stop.city?.name || 'Unknown City',
      items: stop.activities || []
    };
  }) : [];

  const handleActivityAdded = () => {
    fetchTrip();
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-64px)] md:h-screen flex flex-col pt-16 md:pt-0 pb-6 relative overflow-hidden">
        
        {/* Header */}
        <div className="px-6 md:px-8 py-6 flex items-center justify-between border-b border-white/5 bg-[#0A0F1C]/80 backdrop-blur-md z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/trips')} 
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">{trip.title}</h1>
              <p className="text-white/50 text-sm flex items-center gap-2 mt-1">
                <Calendar size={12} /> {formatDateRange()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex w-10 h-10 rounded-xl bg-white/5 border border-white/10 items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
              <Share2 size={16} />
            </button>
            <Button className="shadow-glow" onClick={addStop}>
              <Plus size={16} className="mr-2" /> Add Stop
            </Button>
          </div>
        </div>

        {/* Main Content Split */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Panel: Timeline */}
          <div className="w-full lg:w-1/2 h-full overflow-y-auto scrollbar-none p-6 md:p-8">
            <div className="max-w-2xl mx-auto space-y-8 pb-32">
              {formattedDays.length > 0 ? (
                formattedDays.map((day) => (
                  <DayCard 
                    key={day.id} 
                    day={day} 
                    onActivityAdded={handleActivityAdded} 
                    onFocus={setFocusedDay}
                  />
                ))
              ) : (
                <div className="text-center py-20 bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6 mx-auto relative z-10">
                      <Sparkles className="w-10 h-10 text-primary-400 animate-pulse" />
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-3 relative z-10">Your itinerary is empty</h3>
                   <p className="text-white/50 mb-8 max-w-sm mx-auto relative z-10">
                      Don't want to plan manually? Let our self-hosted AI suggest the perfect stops and activities for your {trip.title}.
                   </p>
                   <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                      <Button 
                        size="lg" 
                        className="shadow-glow px-8" 
                        onClick={generateAIItinerary}
                        isLoading={isGenerating}
                      >
                         <Sparkles size={18} className="mr-2" /> Plan an AI Adventure
                      </Button>
                      <Button variant="secondary" size="lg" onClick={addStop}>
                         Add Stop Manually
                      </Button>
                   </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Map/Overview */}
          <div className="hidden lg:flex w-1/2 h-full border-l border-white/5 flex-col bg-[#111827]">
            <div className="flex p-4 items-center justify-between border-b border-white/5">
              <div className="flex gap-2 overflow-x-auto scrollbar-none">
                {['Map', 'Calendar', 'Budget', 'Notes', 'Checklist'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      activeTab === tab 
                        ? 'bg-white/10 text-white' 
                        : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => navigate(`/trips/${id}/invoice`)}
                className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary-300 hover:bg-primary/20 text-xs font-bold flex items-center gap-2 transition-all"
              >
                <Ticket size={14} /> Booking Report
              </button>
            </div>

            <div className="flex-1 relative overflow-hidden">
              {activeTab === 'Map' && (
                <div className="absolute inset-0 p-6 flex flex-col items-center justify-center">
                  <MapComponent 
                    stops={trip.stops || []} 
                    selectedDay={focusedDay} 
                  />
                </div>
              )}
              
              {activeTab === 'Calendar' && (
                <div className="h-full overflow-y-auto p-6 space-y-6 scrollbar-none pb-20">
                  {formattedDays.map(day => (
                    <div key={day.id} className="space-y-3">
                      <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-wider">
                        <Calendar size={12} /> Day {day.day} • {day.date}
                      </div>
                      <div className="space-y-2">
                        {day.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                            <span className="text-white text-sm font-medium">{item.title}</span>
                            <span className="text-[10px] text-white/40">{item.time_slot}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {formattedDays.length === 0 && <p className="text-center py-20 text-white/20">No items in calendar.</p>}
                </div>
              )}

              {activeTab === 'Notes' && (
                <div className="h-full overflow-y-auto p-6 space-y-4 scrollbar-none pb-20">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="text-white font-semibold">Trip Notes</h3>
                     <Button size="sm" variant="secondary" onClick={() => navigate(`/trips/${id}/notes`)}>
                        Manage All
                     </Button>
                  </div>
                  {notes.map(note => (
                    <div key={note.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                      <h4 className="text-white font-medium mb-1 group-hover:text-primary-400 transition-colors">{note.title}</h4>
                      <p className="text-white/40 text-xs line-clamp-2">{note.content}</p>
                    </div>
                  ))}
                  {notes.length === 0 && (
                    <div className="text-center py-20">
                      <p className="text-white/20 text-sm mb-4">No notes for this trip yet.</p>
                      <Button size="sm" onClick={() => navigate(`/trips/${id}/notes`)}>Create First Note</Button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'Budget' && (
                <div className="h-full overflow-y-auto p-6 space-y-6 scrollbar-none pb-20">
                   <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">Quick Budget</h3>
                      <Button size="sm" variant="secondary" onClick={() => navigate(`/trips/${id}/budget`)}>
                         Full Analytics
                      </Button>
                   </div>
                   <div className="p-6 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20">
                      <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">Total Budget</p>
                      <h4 className="text-2xl font-bold text-white">₹{(trip.budget || 0).toLocaleString()}</h4>
                      <div className="mt-4 h-2 w-full bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-emerald-500 rounded-full" style={{ width: '45%' }} />
                      </div>
                      <p className="text-white/40 text-xs mt-2 italic">Based on your current plan.</p>
                   </div>
                </div>
              )}

              {activeTab === 'Checklist' && (
                <div className="h-full overflow-y-auto p-6 space-y-4 scrollbar-none pb-20">
                   <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">Tasks</h3>
                      <Button size="sm" variant="secondary" onClick={() => navigate(`/trips/${id}/checklist`)}>
                         Manage All
                      </Button>
                   </div>
                   <div className="space-y-2">
                      {['Pack clothes', 'Book tickets', 'Check passport'].map((task, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                           <div className="w-5 h-5 rounded border border-white/20 flex-shrink-0" />
                           <span className="text-white text-sm">{task}</span>
                        </div>
                      ))}
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating AI Panel */}
        <PlannerPanel tripId={id} onUpdate={fetchTrip} />
      </div>
    </DashboardLayout>
  );
}
