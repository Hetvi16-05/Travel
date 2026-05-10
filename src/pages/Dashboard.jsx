import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Plane, Calendar, MapPin, TrendingUp, Sparkles, Plus, Wallet, Star
} from 'lucide-react'
import DashboardLayout from '../components/layout/DashboardLayout'
import api from '../lib/api'
import { MapWidget } from '../components/widgets/MapWidget'
import RecommendedCities from '../components/widgets/RecommendedCities'
import { useApp } from '../context/AppContext'
import { StatsWidget } from '../components/widgets/StatsWidget'
import { BudgetChart } from '../components/widgets/BudgetChart'
import { WeatherWidget } from '../components/widgets/WeatherWidget'
import { TrendingDestinations } from '../components/widgets/TrendingDestinations'


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
        const [tripsRes, statsRes] = await Promise.all([
          api.trips.getAll(),
          api.users.getStats()
        ]);
        
        setTrips(tripsRes.data);
        
        const liveStats = statsRes.data;
        setStats({
          totalTrips: liveStats.trips_planned,
          citiesVisited: liveStats.cities_visited,
          distance: liveStats.distance_traveled,
          savings: liveStats.ai_savings
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      }
    };
    fetchDashboardData()
  }, [])
  
  const navigate = useNavigate();
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
            onClick={() => navigate('/trips/create')}
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

        {/* Middle Row: AI Recommendations */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6"
        >
          <motion.div variants={item}>
             <RecommendedCities />
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
                <div 
                  key={trip.id} 
                  onClick={() => navigate(`/trips/${trip.id}/itinerary`)}
                  className="flex gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group cursor-pointer"
                >
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
