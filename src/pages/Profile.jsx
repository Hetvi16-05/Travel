import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Camera, Edit2, Shield, Heart, Map, Settings as SettingsIcon, Share2, AlertCircle } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import api from '../lib/api';
import { Loader } from '../components/ui/Loader';

export default function Profile() {
  const { user, logout } = useApp();
  const [activeTab, setActiveTab] = useState('about');
  const [savedDestinations, setSavedDestinations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', avatar_url: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    countries_visited: 0,
    trips_planned: 0,
    saved_places: 0
  });

  useEffect(() => {
    if (user) {
      setEditData({ name: user.name, avatar_url: user.avatar_url || '' });
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      await api.users.updateMe(editData);
      setIsEditing(false);
      window.location.reload(); 
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.users.getStats();
        setStats(response.data);
      } catch (err) {
        console.error('Failed to fetch stats', err);
      }
    };
    fetchStats();

    if (activeTab === 'saved') {
      const fetchSaved = async () => {
        setIsLoading(true);
        try {
          const response = await api.users.getSavedDestinations();
          setSavedDestinations(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchSaved();
    }
  }, [activeTab]);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto pb-20">
        
        {/* Cover & Avatar */}
        <div className="relative mb-20">
          <div className="h-64 md:h-80 w-full rounded-b-[2rem] md:rounded-3xl overflow-hidden relative group">
            <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop" alt="Cover" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            <button className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
              <Camera size={14} /> Change Cover
            </button>
          </div>

          <div className="absolute -bottom-16 left-8 md:left-12 flex items-end gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 p-1 shadow-2xl">
                <div className="w-full h-full rounded-[22px] bg-[#0A0F1C] flex items-center justify-center text-4xl font-bold text-white overflow-hidden relative">
                  {user?.avatar_url ? (
                    <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    user?.name?.substring(0, 2).toUpperCase() || 'TR'
                  )}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                    <Camera size={24} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0A0F1C]" />
            </div>
            
            <div className="mb-4 hidden md:block">
              {isEditing ? (
                <input 
                  type="text" 
                  value={editData.name} 
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white font-bold text-3xl outline-none focus:border-primary/50"
                />
              ) : (
                <h1 className="text-3xl font-display font-bold text-white shadow-sm">{user?.name}</h1>
              )}
              <p className="text-white/80 flex items-center gap-1"><MapPin size={14} /> {user?.email}</p>
            </div>
          </div>

          <div className="absolute -bottom-12 right-8 md:right-12 hidden sm:flex gap-3">
            <Button variant="secondary" className="bg-white/5 border-white/10 hover:bg-white/10">
              <Share2 size={16} className="mr-2" /> Share Profile
            </Button>
            {isEditing ? (
              <Button className="shadow-glow" onClick={handleUpdateProfile} isLoading={isLoading}>
                Save Changes
              </Button>
            ) : (
              <Button className="shadow-glow" onClick={() => setIsEditing(true)}>
                <Edit2 size={16} className="mr-2" /> Edit Profile
              </Button>
            )}
            <Button variant="secondary" className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20" onClick={logout}>
              Log out
            </Button>
          </div>
        </div>
        
        {/* Mobile Name */}
        <div className="mb-8 px-4 md:hidden">
          <h1 className="text-3xl font-display font-bold text-white">{user?.name}</h1>
          <p className="text-white/60 flex items-center gap-1"><MapPin size={14} /> {user?.email}</p>
        </div>

        {/* Content Tabs */}
        <div className="px-4 md:px-8">
          <div className="flex items-center gap-6 border-b border-white/5 mb-8">
            {['about', 'saved', 'badges'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-semibold capitalize transition-colors relative ${
                  activeTab === tab ? 'text-primary-400' : 'text-white/50 hover:text-white'
                }`}
              >
                {tab === 'about' ? 'About Me' : tab === 'saved' ? 'Saved Places' : 'Travel Badges'}
                {activeTab === tab && (
                  <motion.div layoutId="profileTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400 rounded-t-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {activeTab === 'about' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="bg-[#111827] border border-white/5 rounded-3xl p-8">
                    <h3 className="text-lg font-bold text-white mb-4">Bio</h3>
                    <p className="text-white/60 leading-relaxed">
                      Digital nomad, photography enthusiast, and coffee addict. I travel to experience new cultures through food and architecture. Always looking for the next hidden gem and perfectly brewed pour-over. 🌍✈️
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'saved' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  {isLoading ? (
                    <div className="flex justify-center py-10"><Loader size="lg" /></div>
                  ) : savedDestinations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {savedDestinations.map(dest => (
                        <div key={dest.id} className="h-48 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group cursor-pointer">
                          <img src={dest.image_url || `https://images.unsplash.com/photo-1542051812871-757500874185?q=80&w=800&auto=format&fit=crop`} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity" />
                          <div className="absolute bottom-4 left-4">
                            <p className="font-bold text-lg text-white">{dest.name}</p>
                            <p className="text-sm text-white/60">{dest.country}</p>
                          </div>
                          <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-pink-400">
                            <Heart size={14} className="fill-pink-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                      <p className="text-white/40">You haven't saved any destinations yet.</p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Right Column (Sidebar Stats) */}
            <div className="space-y-6">
              <div className="bg-[#111827] border border-white/5 rounded-3xl p-6">
                <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-6">Statistics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white/80"><Map size={18} className="text-primary-400" /> Countries Visited</div>
                    <span className="font-bold text-white">{stats.countries_visited}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white/80"><MapPin size={18} className="text-emerald-400" /> Trips Planned</div>
                    <span className="font-bold text-white">{stats.trips_planned}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white/80"><Heart size={18} className="text-pink-400" /> Saved Places</div>
                    <span className="font-bold text-white">{stats.saved_places}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
