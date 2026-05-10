import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Filter, AlertCircle } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import api from '../lib/api';
import { TripCard } from '../components/trips/TripCard';
import { Button } from '../components/ui/Button';
import { Loader } from '../components/ui/Loader';

export default function Trips() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const filters = ['All', 'Upcoming', 'Completed', 'Drafts'];

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.trips.getAll();
        setTrips(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const filteredTrips = trips.filter(trip => {
    const statusMatch = filter === 'All' || trip.status?.toLowerCase() === filter.toLowerCase();
    const searchMatch = !searchQuery || trip.title.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto pb-20 space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#111827]/50 p-6 md:p-8 rounded-[2rem] border border-white/5 backdrop-blur-xl">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">My Trips</h1>
            <p className="text-white/50">Manage and organize your travel itineraries.</p>
          </div>
          <Button
            onClick={() => navigate('/trips/create')}
            className="h-12 px-6 shadow-glow shrink-0"
          >
            <Plus size={18} /> Create New Trip
          </Button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex bg-[#111827] p-1.5 rounded-xl border border-white/10 w-full sm:w-auto overflow-x-auto scrollbar-none">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  filter === f
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search trips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111827] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/5 transition-all"
              />
            </div>
            <button className="w-10 h-10 rounded-xl bg-[#111827] border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors shrink-0">
              <Filter size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <Loader size="lg" />
              <p className="text-white/50 animate-pulse">Loading your trips...</p>
            </div>
          ) : error ? (
            <div className="py-20 text-center border border-red-500/10 rounded-[2rem] bg-red-500/5">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-red-400">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Failed to load trips</h3>
              <p className="text-white/50 mb-6">{error}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : filteredTrips.length > 0 ? (
            <motion.div 
              key="grid"
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTrips.map((trip, idx) => (
                <TripCard 
                  key={trip.id} 
                  trip={trip} 
                  index={idx} 
                  onDeleteSuccess={(id) => setTrips(prev => prev.filter(t => t.id !== id))}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center border border-white/5 rounded-[2rem] bg-white/[0.02]"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-white/30" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {trips.length === 0 ? 'No trips yet' : 'No trips found'}
              </h3>
              <p className="text-white/50 mb-6">
                {trips.length === 0
                  ? 'Create your first trip to get started.'
                  : 'Try adjusting your search or filter settings.'}
              </p>
              {trips.length === 0 ? (
                <Button onClick={() => navigate('/trips/create')} className="shadow-glow">
                  <Plus size={16} className="mr-2" /> Create First Trip
                </Button>
              ) : (
                <Button variant="outline" onClick={() => { setFilter('All'); setSearchQuery(''); }}>
                  Clear Filters
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}
