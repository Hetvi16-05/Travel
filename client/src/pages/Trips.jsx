import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Filter, LayoutGrid, List } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { mockTrips } from '../data/mockData';
import { TripCard } from '../components/trips/TripCard';
import { Button } from '../components/ui/Button';

export default function Trips() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['All', 'Upcoming', 'Completed', 'Drafts'];

  const filteredTrips = mockTrips.filter(trip => {
    if (filter !== 'All' && trip.status.toLowerCase() !== filter.toLowerCase()) return false;
    if (searchQuery && !trip.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
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

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filteredTrips.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTrips.map((trip, idx) => (
                <TripCard key={trip.id} trip={trip} index={idx} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center border border-white/5 rounded-[2rem] bg-white/[0.02]"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-white/30" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No trips found</h3>
              <p className="text-white/50 mb-6">Try adjusting your search or filter settings.</p>
              <Button variant="outline" onClick={() => {setFilter('All'); setSearchQuery('');}}>
                Clear Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}
