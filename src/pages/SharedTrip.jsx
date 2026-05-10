import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Calendar, Clock, Users, Heart, Share2, Copy, MessageCircle, Map, Coffee, Camera, Plane } from 'lucide-react';
import { Button } from '../components/ui/Button';

// Mock Data for the Shared Trip
const mockTrip = {
  id: '1',
  title: 'Japan Winter Expedition',
  destination: 'Tokyo & Kyoto, Japan',
  author: { name: 'Sarah Jenkins', avatar: 'S' },
  dates: 'Dec 20 - Dec 27, 2026',
  duration: '7 Days',
  type: 'Adventure & Culture',
  cover: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop',
  likes: 245,
  summary: "A carefully curated winter journey through Japan's most iconic cities. From the neon-lit streets of Shinjuku to the serene, snow-dusted temples of Kyoto. This itinerary balances high-energy city exploration with peaceful cultural experiences.",
  days: [
    {
      day: 1,
      date: 'Dec 20',
      title: 'Arrival in Neon City',
      location: 'Tokyo',
      story: "Landed at Narita and took the Skyliner straight into the heart of the city. The contrast between the quiet train ride and the absolute sensory overload of stepping out into Shinjuku is something I'll never forget.",
      activities: [
        { time: '14:00', title: 'Check-in at Shinjuku', icon: MapPin },
        { time: '19:00', title: 'Ramen at Ichiran', icon: Coffee }
      ]
    },
    {
      day: 2,
      date: 'Dec 21',
      title: 'Temples and Digital Art',
      location: 'Tokyo',
      story: "Started the morning early at Senso-ji to beat the crowds. The crisp winter air made the hot street food taste even better. In the afternoon, we lost ourselves in the immersive digital exhibits at teamLab Planets.",
      activities: [
        { time: '09:00', title: 'Senso-ji Temple', icon: Camera },
        { time: '15:00', title: 'teamLab Planets', icon: MapPin }
      ]
    },
    {
      day: 3,
      date: 'Dec 22',
      title: 'The Bullet Train to Tradition',
      location: 'Kyoto',
      story: "Riding the Shinkansen past Mt. Fuji (we got the right-side seats!) was breathtaking. Arrived in Kyoto and immediately felt the shift in pace. Walked through the thousands of vermilion gates at Fushimi Inari just before sunset.",
      activities: [
        { time: '10:00', title: 'Shinkansen to Kyoto', icon: Plane },
        { time: '15:30', title: 'Fushimi Inari Shrine', icon: Camera }
      ]
    }
  ],
  gallery: [
    'https://images.unsplash.com/photo-1542051812871-757500874185?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1578469645760-bfaeecf86e34?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=800&auto=format&fit=crop',
  ]
};

export default function SharedTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const headerY = useTransform(scrollY, [0, 500], [0, 150]);
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Floating nav visibility
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white selection:bg-primary-500/30">
      
      {/* Floating Action Bar (Appears on scroll) */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: showNav ? 0 : -100 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1C]/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-xl font-display font-bold text-white tracking-tight">Traveloop</button>
          <div className="hidden md:block w-px h-6 bg-white/20" />
          <h2 className="hidden md:block font-medium truncate max-w-xs">{mockTrip.title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            <Share2 size={16} />
          </button>
          <Button className="shadow-glow" onClick={() => alert('Copied to your trips!')}>
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
          <img src={mockTrip.cover} alt={mockTrip.title} className="w-full h-full object-cover" />
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
                {mockTrip.type}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5">
                <MapPin size={12} /> {mockTrip.destination}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] tracking-tight mb-8">
              {mockTrip.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg">
                  {mockTrip.author.avatar}
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">Created by</p>
                  <p className="font-medium text-white">{mockTrip.author.name}</p>
                </div>
              </div>
              <div className="w-px h-8 bg-white/20 hidden md:block" />
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider font-semibold flex items-center gap-1"><Calendar size={12}/> Dates</p>
                <p className="font-medium text-white">{mockTrip.dates}</p>
              </div>
              <div className="w-px h-8 bg-white/20 hidden md:block" />
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider font-semibold flex items-center gap-1"><Clock size={12}/> Duration</p>
                <p className="font-medium text-white">{mockTrip.duration}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Story & Itinerary */}
          <div className="lg:col-span-8 space-y-20">
            
            {/* Overview */}
            <section>
              <h2 className="text-3xl font-display font-bold mb-6">Trip Overview</h2>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
                {mockTrip.summary}
              </p>
            </section>

            {/* The Itinerary Timeline */}
            <section>
              <h2 className="text-3xl font-display font-bold mb-10">The Journey</h2>
              
              <div className="space-y-16">
                {mockTrip.days.map((day, idx) => (
                  <div key={idx} className="relative pl-8 md:pl-12">
                    {/* Timeline Line */}
                    {idx !== mockTrip.days.length - 1 && (
                      <div className="absolute left-[11px] top-10 bottom-[-64px] w-0.5 bg-gradient-to-b from-primary-500/50 to-transparent" />
                    )}
                    {/* Timeline Node */}
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#0A0F1C] border-4 border-primary-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] flex items-center justify-center z-10" />
                    
                    <div className="mb-4">
                      <span className="text-primary-400 font-bold uppercase tracking-wider text-sm">Day {day.day} • {day.date}</span>
                      <h3 className="text-2xl font-bold mt-1 text-white">{day.title}</h3>
                      <p className="text-white/40 text-sm flex items-center gap-1 mt-1"><MapPin size={14}/> {day.location}</p>
                    </div>

                    <p className="text-white/80 leading-relaxed mb-6 bg-white/[0.02] p-6 rounded-3xl border border-white/5">
                      {day.story}
                    </p>

                    <div className="space-y-3">
                      {day.activities.map((act, i) => {
                        const Icon = act.icon;
                        return (
                          <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-[#0A0F1C] flex items-center justify-center text-primary-400 shrink-0">
                              <Icon size={18} />
                            </div>
                            <div>
                              <p className="text-sm text-white/50">{act.time}</p>
                              <p className="font-medium text-white">{act.title}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: Sticky Sidebar Widgets */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-32 space-y-8">
              
              {/* Interaction Card */}
              <div className="bg-[#111827] border border-white/10 rounded-3xl p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/10">
                  <div className="text-center">
                    <p className="text-3xl font-display font-bold text-white mb-1">{mockTrip.likes + (isLiked ? 1 : 0)}</p>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">Likes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-display font-bold text-white mb-1">12</p>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">Copies</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
                      isLiked ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-transparent'
                    }`}
                  >
                    <Heart size={18} className={isLiked ? "fill-pink-400" : ""} /> {isLiked ? 'Liked' : 'Like'}
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all">
                    <Share2 size={18} /> Share
                  </button>
                </div>

                <Button className="w-full shadow-glow py-6 text-lg" onClick={() => alert('Copied to your trips!')}>
                  Copy Itinerary
                </Button>
              </div>

              {/* Map Preview Card */}
              <div className="bg-[#111827] border border-white/10 rounded-3xl p-2 h-64 relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-[#0A0F1C] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:16px_16px]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Map size={32} className="text-white/20 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center justify-between">
                  <span className="font-medium text-sm">View Interactive Map</span>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary-400">
                    →
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Full Width Gallery */}
        <section className="mt-24">
          <h2 className="text-3xl font-display font-bold mb-10 text-center">Trip Gallery</h2>
          <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
            {mockTrip.gallery.map((img, i) => (
              <div key={i} className="break-inside-avoid rounded-3xl overflow-hidden relative group">
                <img src={img} alt={`Gallery ${i}`} className="w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <Button variant="secondary" size="sm" className="rounded-full">View</Button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
