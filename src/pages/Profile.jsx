import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Camera, Edit2, Shield, Heart, Map, Settings as SettingsIcon, Share2 } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('about');

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
                  SJ
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                    <Camera size={24} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0A0F1C]" />
            </div>
            
            <div className="mb-4 hidden md:block">
              <h1 className="text-3xl font-display font-bold text-white shadow-sm">Sarah Jenkins</h1>
              <p className="text-white/80 flex items-center gap-1"><MapPin size={14} /> San Francisco, CA</p>
            </div>
          </div>

          <div className="absolute -bottom-12 right-8 md:right-12 hidden sm:flex gap-3">
            <Button variant="secondary" className="bg-white/5 border-white/10 hover:bg-white/10">
              <Share2 size={16} className="mr-2" /> Share Profile
            </Button>
            <Button className="shadow-glow">
              <Edit2 size={16} className="mr-2" /> Edit Profile
            </Button>
          </div>
        </div>
        
        {/* Mobile Name (shows below avatar on small screens) */}
        <div className="mb-8 px-4 md:hidden">
          <h1 className="text-3xl font-display font-bold text-white">Sarah Jenkins</h1>
          <p className="text-white/60 flex items-center gap-1"><MapPin size={14} /> San Francisco, CA</p>
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
            
            {/* Left Column (Main Content) */}
            <div className="lg:col-span-2 space-y-8">
              {activeTab === 'about' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="bg-[#111827] border border-white/5 rounded-3xl p-8">
                    <h3 className="text-lg font-bold text-white mb-4">Bio</h3>
                    <p className="text-white/60 leading-relaxed">
                      Digital nomad, photography enthusiast, and coffee addict. I travel to experience new cultures through food and architecture. Always looking for the next hidden gem and perfectly brewed pour-over. 30 countries and counting! 🌍✈️
                    </p>
                  </div>

                  <div className="bg-[#111827] border border-white/5 rounded-3xl p-8">
                    <h3 className="text-lg font-bold text-white mb-6">Travel Preferences</h3>
                    <div className="flex flex-wrap gap-3">
                      {['Backpacking', 'Luxury', 'Foodie', 'Photography', 'Architecture', 'Nature'].map(pref => (
                        <span key={pref} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer">
                          {pref}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'saved' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-48 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group cursor-pointer">
                        <img src={`https://images.unsplash.com/photo-1542051812871-757500874185?q=80&w=800&auto=format&fit=crop`} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity" />
                        <div className="absolute bottom-4 left-4">
                          <p className="font-bold text-lg text-white">Kyoto Temples</p>
                          <p className="text-sm text-white/60">Japan</p>
                        </div>
                        <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-pink-400">
                          <Heart size={14} className="fill-pink-400" />
                        </button>
                      </div>
                    ))}
                  </div>
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
                    <span className="font-bold text-white">32</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white/80"><MapPin size={18} className="text-emerald-400" /> Trips Planned</div>
                    <span className="font-bold text-white">14</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white/80"><Heart size={18} className="text-pink-400" /> Saved Places</div>
                    <span className="font-bold text-white">128</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-primary-500/20 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 text-primary-500/20"><Shield size={100} /></div>
                <h3 className="text-lg font-bold text-white mb-2 relative z-10">Pro Member</h3>
                <p className="text-sm text-white/60 mb-4 relative z-10">You have access to all premium features including AI Planning.</p>
                <button className="text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors relative z-10">Manage Subscription →</button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
