import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, MapPin } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { DestinationCard } from '../components/explore/DestinationCard';
import { ActivityCard } from '../components/explore/ActivityCard';
import { CategoryFilter } from '../components/explore/CategoryFilter';
import api from '../lib/api';
import { Loader } from '../components/ui/Loader';

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExploreData = async () => {
      setIsLoading(true);
      try {
        const [citiesRes, activitiesRes] = await Promise.all([
          api.cities.getAll(),
          api.activities.getAll()
        ]);

        // Map cities to DestinationCard format
        const mappedDestinations = citiesRes.data.map(city => ({
          id: city.id,
          title: city.name,
          country: city.country,
          image: city.image_url || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop',
          rating: '4.9'
        }));

        // Map activities to ActivityCard format
        const mappedActivities = activitiesRes.data.map(activity => ({
          id: activity.id,
          category: activity.category,
          title: activity.name,
          description: activity.description,
          image: activity.image_url || 'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?q=80&w=800&auto=format&fit=crop',
          rating: '4.8',
          price: parseInt(activity.price_est),
          duration: `${activity.duration_hr} hours`
        }));

        setDestinations(mappedDestinations);
        setActivities(mappedActivities);
      } catch (error) {
        console.error('Failed to fetch explore data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExploreData();
  }, []);

  const filteredActivities = activities.filter(activity => {
    const matchesCategory = activeCategory === 'all' || activity.category === activeCategory;
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <Loader size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-64px)] md:h-screen overflow-y-auto scrollbar-none pt-16 md:pt-0 pb-20">
        
        {/* Hero Section */}
        <div className="relative h-[40vh] min-h-[300px] flex flex-col items-center justify-center text-center px-4 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/80 to-transparent" />
          
          <div className="relative z-10 max-w-3xl w-full">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
            >
              Discover the World
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="relative group max-w-2xl mx-auto"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/30 to-violet-500/30 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500" />
              <div className="relative flex items-center bg-[#111827] border border-white/10 rounded-full px-6 py-4 shadow-2xl backdrop-blur-xl">
                <Search className="text-white/50 w-6 h-6 mr-4" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search destinations, activities, or themes..."
                  className="bg-transparent border-none outline-none text-white w-full text-lg placeholder-white/30"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-8 relative z-20 space-y-16">
          
          {/* Trending Destinations */}
          {searchQuery === '' && activeCategory === 'all' && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                  <MapPin className="text-primary-400" /> Trending Destinations
                </h2>
                <button className="text-primary-400 hover:text-primary-300 font-medium transition-colors">See all</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {destinations.slice(0, 6).map((dest, idx) => (
                  <DestinationCard key={dest.id} item={dest} index={idx} />
                ))}
              </div>
            </section>
          )}

          {/* Activities Explorer */}
          <section>
            <div className="sticky top-0 z-30 bg-[#0A0F1C]/90 backdrop-blur-xl py-4 mb-6 -mx-4 px-4 md:mx-0 md:px-0 border-b border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                  <Compass className="text-emerald-400" /> Experiences & Activities
                </h2>
              </div>
              <CategoryFilter activeCategory={activeCategory} onSelect={setActiveCategory} />
            </div>

            {filteredActivities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredActivities.map((activity, idx) => (
                  <ActivityCard key={activity.id} item={activity} index={idx} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Compass className="w-16 h-16 text-white/10 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">No activities found</h3>
                <p className="text-white/50">Try adjusting your filters or search query.</p>
              </div>
            )}
          </section>

        </div>
      </div>
    </DashboardLayout>
  );
}
