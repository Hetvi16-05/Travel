import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, MapPin } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { DestinationCard } from '../components/explore/DestinationCard';
import { ActivityCard } from '../components/explore/ActivityCard';
import { CategoryFilter } from '../components/explore/CategoryFilter';

const MOCK_DESTINATIONS = [
  { id: 1, title: 'Kyoto', country: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop', rating: '4.9' },
  { id: 2, title: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac542?q=80&w=800&auto=format&fit=crop', rating: '4.8' },
  { id: 3, title: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop', rating: '4.7' },
];

const MOCK_ACTIVITIES = [
  { 
    id: 1, category: 'adventure', title: 'Mount Batur Sunrise Trek', 
    description: 'Hike up an active volcano in time to catch a magnificent sunrise over the clouds.',
    image: 'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?q=80&w=800&auto=format&fit=crop', 
    rating: '4.9', price: 4500, duration: '6 hours'
  },
  { 
    id: 2, category: 'food', title: 'Authentic Sushi Making', 
    description: 'Learn the art of making sushi from a master chef in the heart of Tokyo.',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop', 
    rating: '4.8', price: 8500, duration: '3 hours'
  },
  { 
    id: 3, category: 'relaxation', title: 'Blue Lagoon Geothermal Spa', 
    description: 'Relax in the famous mineral-rich warm waters surrounded by lava fields.',
    image: 'https://images.unsplash.com/photo-1536142721855-66ea17e4bc4a?q=80&w=800&auto=format&fit=crop', 
    rating: '4.9', price: 12000, duration: 'Flexible'
  },
  { 
    id: 4, category: 'culture', title: 'Tea Ceremony Experience', 
    description: 'Experience a traditional Japanese matcha tea ceremony in a historic machiya.',
    image: 'https://images.unsplash.com/photo-1543325603-99d0c64b4c3e?q=80&w=800&auto=format&fit=crop', 
    rating: '4.7', price: 3500, duration: '2 hours'
  },
  { 
    id: 5, category: 'adventure', title: 'Scuba Diving at Manta Point', 
    description: 'Dive with majestic manta rays in crystal clear waters off the coast of Nusa Penida.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop', 
    rating: '4.9', price: 9500, duration: '5 hours'
  },
  { 
    id: 6, category: 'nightlife', title: 'Rooftop Bar Hopping', 
    description: 'Discover the best hidden rooftop bars with panoramic city views and craft cocktails.',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop', 
    rating: '4.6', price: 6000, duration: '4 hours'
  },
];

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredActivities = MOCK_ACTIVITIES.filter(activity => {
    const matchesCategory = activeCategory === 'all' || activity.category === activeCategory;
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                {MOCK_DESTINATIONS.map((dest, idx) => (
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
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredActivities.map((activity, idx) => (
                  <div key={activity.id} className="break-inside-avoid">
                    <ActivityCard item={activity} index={idx} />
                  </div>
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
