import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Map as MapIcon, Calendar, MoreVertical, Share2, Download } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { DayCard } from '../components/itinerary/DayCard';
import { Button } from '../components/ui/Button';

const mockItineraryData = {
  id: 1,
  title: "Japan Winter Expedition",
  dates: "Dec 20 - Dec 27",
  days: [
    {
      day: 1,
      date: "Dec 20",
      city: "Tokyo",
      items: [
        { type: 'transport', method: 'flight', duration: '12h 30m', details: 'Flight to Narita (NRT)' },
        { type: 'sight', title: 'Check-in at Shinjuku Prince', time: '14:00', location: 'Shinjuku, Tokyo', cost: 15000, bookingRef: 'HTL-9921' },
        { type: 'food', title: 'Ramen at Ichiran', time: '19:00', location: 'Shinjuku', description: 'Famous tonkotsu ramen with private dining booths.', cost: 1200 }
      ]
    },
    {
      day: 2,
      date: "Dec 21",
      city: "Tokyo",
      items: [
        { type: 'sight', title: 'Senso-ji Temple', time: '09:00', location: 'Asakusa', description: 'Oldest temple in Tokyo. Go early to avoid crowds.' },
        { type: 'food', title: 'Street Food at Nakamise', time: '11:30', location: 'Asakusa', cost: 2000 },
        { type: 'sight', title: 'teamLab Planets', time: '15:00', location: 'Toyosu', cost: 3800, bookingRef: 'TL-4412' }
      ]
    },
    {
      day: 3,
      date: "Dec 22",
      city: "Kyoto",
      items: [
        { type: 'transport', method: 'train', duration: '2h 15m', details: 'Shinkansen to Kyoto' },
        { type: 'sight', title: 'Fushimi Inari Shrine', time: '13:00', location: 'Fushimi Ward', description: 'Famous for its thousands of vermilion torii gates.' },
        { type: 'food', title: 'Traditional Kaiseki Dinner', time: '19:30', location: 'Gion', cost: 12000 }
      ]
    }
  ]
};

export default function ItineraryBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Map');

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
              <h1 className="text-2xl font-bold text-white tracking-tight">{mockItineraryData.title}</h1>
              <p className="text-white/50 text-sm flex items-center gap-2 mt-1">
                <Calendar size={12} /> {mockItineraryData.dates}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex w-10 h-10 rounded-xl bg-white/5 border border-white/10 items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
              <Share2 size={16} />
            </button>
            <button className="hidden sm:flex w-10 h-10 rounded-xl bg-white/5 border border-white/10 items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
              <Download size={16} />
            </button>
            <Button className="shadow-glow" onClick={() => navigate('/trips')}>
              <Save size={16} className="mr-2" /> Save
            </Button>
          </div>
        </div>

        {/* Main Content Split */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Panel: Timeline */}
          <div className="w-full lg:w-1/2 h-full overflow-y-auto scrollbar-none p-6 md:p-8">
            <div className="max-w-2xl mx-auto space-y-8 pb-32">
              {mockItineraryData.days.map((day) => (
                <DayCard key={day.day} day={day} />
              ))}
            </div>
          </div>

          {/* Right Panel: Sticky Map/Overview (Hidden on mobile) */}
          <div className="hidden lg:flex w-1/2 h-full border-l border-white/5 flex-col bg-[#111827]">
            <div className="flex p-4 gap-2 border-b border-white/5">
              {['Map', 'Calendar', 'Notes'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab 
                      ? 'bg-white/10 text-white' 
                      : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 relative overflow-hidden">
              {activeTab === 'Map' && (
                <div className="absolute inset-0 p-6 flex flex-col items-center justify-center">
                  <div className="w-full h-full rounded-[2rem] border border-white/10 relative overflow-hidden bg-[#0A0F1C] flex flex-col group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:24px_24px]" />
                    
                    {/* Glowing Route Visualization */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500" preserveAspectRatio="none">
                      <path 
                        d="M 100 400 C 200 350, 150 150, 300 200 S 450 100, 400 300" 
                        fill="transparent" 
                        stroke="url(#routeGlow)" 
                        strokeWidth="4"
                        strokeDasharray="8,8"
                        className="animate-[dash_20s_linear_infinite]"
                      />
                      <defs>
                        <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6366F1" />
                          <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Map Pins */}
                    <div className="absolute top-[80%] left-[20%] w-4 h-4 bg-primary-500 rounded-full shadow-glow z-10 flex items-center justify-center">
                      <div className="absolute w-12 h-12 rounded-full border border-primary/30 animate-ping" />
                      <span className="absolute -top-6 text-white text-xs font-bold whitespace-nowrap bg-black/50 px-2 py-1 rounded backdrop-blur-md">Narita</span>
                    </div>
                    
                    <div className="absolute top-[40%] left-[60%] w-4 h-4 bg-violet-500 rounded-full shadow-glow z-10 flex items-center justify-center">
                      <div className="absolute w-12 h-12 rounded-full border border-violet/30 animate-ping" />
                      <span className="absolute -top-6 text-white text-xs font-bold whitespace-nowrap bg-black/50 px-2 py-1 rounded backdrop-blur-md">Tokyo</span>
                    </div>

                    <div className="absolute top-[60%] left-[80%] w-4 h-4 bg-emerald-500 rounded-full shadow-glow z-10 flex items-center justify-center">
                      <div className="absolute w-12 h-12 rounded-full border border-emerald/30 animate-ping" />
                      <span className="absolute -top-6 text-white text-xs font-bold whitespace-nowrap bg-black/50 px-2 py-1 rounded backdrop-blur-md">Kyoto</span>
                    </div>

                    {/* Controls overlay */}
                    <div className="absolute bottom-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20">+</button>
                      <button className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20">-</button>
                    </div>
                  </div>
                </div>
              )}
              {activeTab !== 'Map' && (
                <div className="h-full flex items-center justify-center text-white/30">
                  <p>{activeTab} view coming soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
