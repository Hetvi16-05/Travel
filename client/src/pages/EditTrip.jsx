import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Image as ImageIcon, MapPin, Calendar, Compass, Wallet } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { mockTrips } from '../data/mockData';
import { Button } from '../components/ui/Button';

export default function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const trip = mockTrips.find(t => t.id === parseInt(id)) || mockTrips[0];
  
  const [formData, setFormData] = useState({
    title: trip.title,
    destination: trip.destination,
    budget: trip.budget,
    mood: trip.mood
  });

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pb-20 pt-8 space-y-8">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/trips')} 
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-2xl font-bold text-white tracking-tight">Edit Trip</h1>
          </div>
          <Button className="shadow-glow" onClick={() => navigate('/trips')}>
            <Save size={16} className="mr-2" /> Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-1 space-y-6">
            {/* Cover Image Upload */}
            <div className="bg-[#111827] border border-white/10 rounded-2xl overflow-hidden group">
              <div className="relative h-48 bg-white/5 flex items-center justify-center">
                <img src={trip.cover} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm cursor-pointer">
                  <ImageIcon size={24} className="text-white mb-2" />
                  <span className="text-sm text-white font-medium">Change Cover</span>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-white font-medium mb-2">Trip Status</h3>
              <div className="w-full bg-white/5 rounded-xl border border-white/10 p-4">
                <p className="text-sm text-white/50 mb-1">Spent</p>
                <p className="text-xl font-bold text-emerald-400">₹{trip.spent.toLocaleString()}</p>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(trip.spent/trip.budget)*100}%` }} />
                </div>
              </div>
              <Button variant="outline" className="w-full text-red-400 hover:bg-red-400/10 hover:text-red-400 border-red-400/20">
                Delete Trip
              </Button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            {/* Main Form */}
            <div className="bg-[#111827] border border-white/10 rounded-[2rem] p-8">
              <h2 className="text-xl font-bold text-white mb-6">General Details</h2>
              
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Trip Name</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 outline-none focus:bg-white/10 focus:border-primary/50 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2 relative group">
                    <label className="text-sm font-medium text-white/70">Destination</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none group-focus-within:text-primary-400">
                        <MapPin size={16} />
                      </div>
                      <input 
                        type="text" 
                        value={formData.destination}
                        onChange={(e) => setFormData({...formData, destination: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:bg-white/10 focus:border-primary/50 transition-all"
                    />
                    </div>
                  </div>
                  
                  <div className="space-y-2 relative group">
                    <label className="text-sm font-medium text-white/70">Total Budget</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none group-focus-within:text-primary-400">
                        <Wallet size={16} />
                      </div>
                      <input 
                        type="number" 
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value)})}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:bg-white/10 focus:border-primary/50 transition-all"
                    />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2 relative group">
                    <label className="text-sm font-medium text-white/70">Dates</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none group-focus-within:text-primary-400">
                        <Calendar size={16} />
                      </div>
                      <input 
                        type="text" 
                        defaultValue="Dec 20 - 27, 2026"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:bg-white/10 focus:border-primary/50 transition-all"
                    />
                    </div>
                  </div>

                  <div className="space-y-2 relative group">
                    <label className="text-sm font-medium text-white/70">Trip Mood</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none group-focus-within:text-primary-400">
                        <Compass size={16} />
                      </div>
                      <select 
                        value={formData.mood}
                        onChange={(e) => setFormData({...formData, mood: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1A2235] border border-white/10 text-white outline-none focus:bg-white/10 focus:border-primary/50 transition-all appearance-none"
                      >
                        <option value="Adventure">Adventure</option>
                        <option value="Luxury">Luxury</option>
                        <option value="Relaxation">Relaxation</option>
                        <option value="Family">Family</option>
                      </select>
                    </div>
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
