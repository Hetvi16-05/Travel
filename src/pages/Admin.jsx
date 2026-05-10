import { motion } from 'framer-motion';
import { Users, CreditCard, Activity, TrendingUp, Download, Filter } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardLayout from '../components/layout/DashboardLayout';

const userGrowthData = [
  { name: 'Jan', users: 4000 },
  { name: 'Feb', users: 3000 },
  { name: 'Mar', users: 5000 },
  { name: 'Apr', users: 8000 },
  { name: 'May', users: 12000 },
  { name: 'Jun', users: 15000 },
  { name: 'Jul', users: 20000 },
];

const destinationData = [
  { name: 'Japan', trips: 140 },
  { name: 'Italy', trips: 120 },
  { name: 'France', trips: 98 },
  { name: 'Spain', trips: 85 },
  { name: 'Thailand', trips: 65 },
];

const recentActivity = [
  { id: 1, user: 'Alex D.', action: 'Created a new trip to Bali', time: '2 mins ago', status: 'success' },
  { id: 2, user: 'Sarah J.', action: 'Upgraded to Pro', time: '15 mins ago', status: 'premium' },
  { id: 3, user: 'Mike R.', action: 'Shared itinerary "Euro Trip"', time: '1 hour ago', status: 'info' },
  { id: 4, user: 'Emma W.', action: 'Generated AI itinerary', time: '3 hours ago', status: 'success' },
];

export default function Admin() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 pb-32">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Platform Overview</h1>
            <p className="text-white/50">High-level metrics and system administration.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              <Filter size={16} className="mr-2" /> Filter
            </button>
            <button className="h-10 px-4 rounded-xl bg-primary-500 hover:bg-primary-600 flex items-center justify-center text-white font-medium shadow-glow transition-colors">
              <Download size={16} className="mr-2" /> Export Report
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <motion.div 
          variants={container} initial="hidden" animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <motion.div variants={item} className="bg-[#111827] border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-colors" />
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <Users size={20} />
            </div>
            <p className="text-white/50 text-sm font-medium mb-1">Total Users</p>
            <h3 className="text-3xl font-display font-bold text-white">24,592</h3>
            <p className="text-emerald-400 text-sm mt-2 flex items-center gap-1"><TrendingUp size={14}/> +12.5% from last month</p>
          </motion.div>

          <motion.div variants={item} className="bg-[#111827] border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary-500/20 transition-colors" />
            <div className="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-400 flex items-center justify-center mb-4">
              <Activity size={20} />
            </div>
            <p className="text-white/50 text-sm font-medium mb-1">Active Trips</p>
            <h3 className="text-3xl font-display font-bold text-white">8,405</h3>
            <p className="text-primary-400 text-sm mt-2 flex items-center gap-1"><TrendingUp size={14}/> +5.2% from last month</p>
          </motion.div>

          <motion.div variants={item} className="bg-[#111827] border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/20 transition-colors" />
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <CreditCard size={20} />
            </div>
            <p className="text-white/50 text-sm font-medium mb-1">Pro Subscriptions</p>
            <h3 className="text-3xl font-display font-bold text-white">3,240</h3>
            <p className="text-amber-400 text-sm mt-2 flex items-center gap-1"><TrendingUp size={14}/> +18.1% from last month</p>
          </motion.div>
          
          <motion.div variants={item} className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-3xl p-6 relative overflow-hidden shadow-glow">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="relative z-10">
              <h3 className="text-white font-bold text-lg mb-2">Platform Health</h3>
              <p className="text-white/80 text-sm mb-6">All systems are operational. No major issues reported in the last 24 hours.</p>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-white">99.9% Uptime</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-[#111827] border border-white/5 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">User Growth</h3>
              <select className="bg-[#0A0F1C] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white/70 outline-none">
                <option>Last 6 Months</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(10, 15, 28, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Secondary Chart */}
          <div className="bg-[#111827] border border-white/5 rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Top Destinations</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={destinationData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} width={70} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: 'rgba(10, 15, 28, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Bar dataKey="trips" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Activity Table */}
        <div className="bg-[#111827] border border-white/5 rounded-3xl p-6 overflow-hidden">
          <h3 className="text-lg font-bold text-white mb-6">Recent Platform Activity</h3>
          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-sm uppercase tracking-wider">
                  <th className="pb-4 font-semibold px-4">User</th>
                  <th className="pb-4 font-semibold px-4">Action</th>
                  <th className="pb-4 font-semibold text-right px-4">Time</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentActivity.map((log) => (
                  <tr key={log.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 font-medium text-white px-4">{log.user}</td>
                    <td className="py-4 text-white/70 px-4">
                      <span className="flex items-center gap-2">
                        {log.status === 'premium' && <div className="w-2 h-2 rounded-full bg-amber-400" />}
                        {log.status === 'success' && <div className="w-2 h-2 rounded-full bg-emerald-400" />}
                        {log.status === 'info' && <div className="w-2 h-2 rounded-full bg-blue-400" />}
                        {log.action}
                      </span>
                    </td>
                    <td className="py-4 text-right text-white/40 px-4">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
