import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Plane, Calendar, MapPin, TrendingUp, Sparkles, Plus, Wallet, Star
} from 'lucide-react'
import DashboardLayout from '../components/layout/DashboardLayout'
import api from '../lib/api'
import { aiSuggestions } from '../data/mockData'
import { useApp } from '../context/AppContext'
import { StatsWidget } from '../components/widgets/StatsWidget'
import { BudgetChart } from '../components/widgets/BudgetChart'
import { WeatherWidget } from '../components/widgets/WeatherWidget'
import { TrendingDestinations } from '../components/widgets/TrendingDestinations'
import { MapWidget } from '../components/widgets/MapWidget'


export default function Dashboard() {
  const { user } = useApp()
  const [trips, setTrips] = useState([])
  const [stats, setStats] = useState({
    totalTrips: 0,
    citiesVisited: 0,
    distance: 0,
    savings: 0
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.trips.getAll()
        const allTrips = response.data
        setTrips(allTrips)
        
        // Calculate some basic stats from live data
        setStats({
          totalTrips: allTrips.length,
          citiesVisited: [...new Set(allTrips.map(t => t.destination))].length,
          distance: allTrips.length * 1200, // mock calculation
          savings: allTrips.length * 1500  // mock calculation
        })
      } catch (error) {
        console.error('Failed to fetch dashboard data', error)
      }
    }
    fetchDashboardData()
  }, [])
  
  const upcomingTrips = trips.filter(t => t.status === 'upcoming' || t.status === 'planned')


  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8 pb-20">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-primary-400 font-semibold mb-2"
            >
              <Sparkles size={16} />
              <span>Welcome back, {user?.name.split(' ')[0]}</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight"
            >
              Where to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-violet-400">next?</span>
            </motion.h1>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-12 px-6 rounded-xl bg-primary hover:bg-primary-600 text-white font-medium flex items-center gap-2 shadow-glow transition-colors"
          >
            <Plus size={18} />
            Plan New Trip
          </motion.button>
        </div>

        {/* Stats Row */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <motion.div variants={item}><StatsWidget title="Total Trips" value={stats.totalTrips.toString()} icon={Plane} trend="up" trendValue="Live Data" /></motion.div>
          <motion.div variants={item}><StatsWidget title="Cities Visited" value={stats.citiesVisited.toString()} icon={MapPin} trend="up" trendValue="Live Data" /></motion.div>
          <motion.div variants={item}><StatsWidget title="Distance Traveled" value={`${stats.distance.toLocaleString()} km`} icon={TrendingUp} trend="neutral" trendValue="Estimated" /></motion.div>
          <motion.div variants={item}><StatsWidget title="AI Savings" value={`₹${stats.savings.toLocaleString()}`} icon={Wallet} trend="up" trendValue="Live Data" /></motion.div>
        </motion.div>


        {/* Middle Row: AI, Chart, Weather */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* AI Assistant */}
          <motion.div variants={item} className="lg:col-span-1">
            <div className="h-full rounded-3xl p-6 relative overflow-hidden group border border-primary/30 bg-gradient-to-br from-primary-900/40 to-violet-900/20 backdrop-blur-xl">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
              <div className="relative z-10 space-y-4 flex flex-col h-full">
                <div className="flex items-center gap-2 text-primary-400">
                  <Sparkles size={20} className="animate-pulse" />
                  <span className="font-bold text-sm">AI Copilot</span>
                </div>
                <h3 className="text-xl font-bold text-white">Let's build your dream itinerary.</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-4">
                  I can find hidden gems, optimize routes, and manage your budget automatically.
                </p>
                <div className="space-y-2 flex-1">
                  {aiSuggestions.slice(0, 3).map((s, i) => (
                    <button key={i} className="w-full text-left p-3 rounded-xl bg-black/20 hover:bg-black/40 border border-white/5 text-xs text-white/70 transition-all">
                      "{s}"
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Budget Chart */}
          <motion.div variants={item} className="lg:col-span-1">
             <BudgetChart />
          </motion.div>

          {/* Weather Widget */}
          <motion.div variants={item} className="lg:col-span-1">
            <WeatherWidget />
          </motion.div>
        </motion.div>

        {/* Bottom Row: Map, Upcoming Trips, Trending */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Upcoming Trips */}
          <motion.div variants={item} className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xl font-bold text-white">Upcoming Trips</h2>
              <button className="text-sm text-primary-400 hover:text-primary-300 font-medium">View all</button>
            </div>
            
            <div className="space-y-4">
              {upcomingTrips.slice(0, 2).map((trip) => (
                <div key={trip.id} className="flex gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group cursor-pointer">
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 relative">
                    <img src={trip.cover} alt={trip.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="flex-1 py-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-white font-semibold text-base group-hover:text-primary-300 transition-colors">{trip.title}</h4>
                      <p className="text-xs text-white/40 flex items-center gap-1 mt-1"><MapPin size={10}/> {trip.destination}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-primary-400 font-medium bg-primary/10 px-2 py-1 rounded-md">{trip.days} Days</p>
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                        <Star size={12} className="fill-amber-400" /> 4.9
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Interactive Map */}
          <motion.div variants={item} className="lg:col-span-4">
             <MapWidget />
          </motion.div>

          {/* Trending */}
          <motion.div variants={item} className="lg:col-span-3">
             <TrendingDestinations />
          </motion.div>
        </motion.div>

      </div>
    </DashboardLayout>
  )
}
