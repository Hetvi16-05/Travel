import { motion } from 'framer-motion';
import { Wallet, TrendingDown, TrendingUp, Filter, Download, Plus, MapPin } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { SpendingBreakdownChart } from '../components/widgets/SpendingBreakdownChart';
import { ExpenseHistoryChart } from '../components/widgets/ExpenseHistoryChart';
import { BudgetHealthMeter } from '../components/widgets/BudgetHealthMeter';
import { Button } from '../components/ui/Button';

const recentTransactions = [
  { id: 1, title: 'Shinkansen Ticket', category: 'Transport', amount: 8500, date: 'Today, 09:30 AM', icon: '🚅', color: 'bg-blue-500/10 text-blue-400' },
  { id: 2, title: 'Ichiran Ramen', category: 'Food', amount: 1200, date: 'Today, 13:00 PM', icon: '🍜', color: 'bg-orange-500/10 text-orange-400' },
  { id: 3, title: 'Senso-ji Temple Souvenirs', category: 'Activities', amount: 3500, date: 'Yesterday', icon: '⛩️', color: 'bg-emerald-500/10 text-emerald-400' },
  { id: 4, title: 'Shinjuku Prince Hotel', category: 'Hotels', amount: 15000, date: 'Yesterday', icon: '🏨', color: 'bg-violet-500/10 text-violet-400' },
];

export default function Budget() {
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
      <div className="max-w-7xl mx-auto pb-20 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-[#111827]/50 p-6 md:p-8 rounded-[2rem] border border-white/5 backdrop-blur-xl">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
              <Wallet size={16} />
              <span>Budget Analytics</span>
            </div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Financial Overview</h1>
            <p className="text-white/50 flex items-center gap-2">
              <MapPin size={14} /> Japan Winter Expedition
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
              <Filter size={16} />
            </button>
            <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
              <Download size={16} />
            </button>
            <Button className="h-10 px-4 shadow-glow bg-emerald-500 hover:bg-emerald-600 text-white border-none">
              <Plus size={16} className="mr-2" /> Add Expense
            </Button>
          </div>
        </div>

        {/* Top KPI Cards */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div variants={item} className="bg-[#111827] border border-white/5 rounded-[2rem] p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-colors" />
            <p className="text-white/50 text-sm font-medium mb-1">Total Spent</p>
            <h3 className="text-3xl font-display font-bold text-white mb-4">₹100,000</h3>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
              <TrendingDown size={14} /> 12% under budget
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-[#111827] border border-white/5 rounded-[2rem] p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors" />
            <p className="text-white/50 text-sm font-medium mb-1">Remaining Budget</p>
            <h3 className="text-3xl font-display font-bold text-white mb-4">₹20,000</h3>
            <div className="flex items-center gap-2 text-white/40 text-sm font-medium">
              Out of ₹120,000 total
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-[#111827] border border-white/5 rounded-[2rem] p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-500/20 transition-colors" />
            <p className="text-white/50 text-sm font-medium mb-1">Daily Average</p>
            <h3 className="text-3xl font-display font-bold text-white mb-4">₹14,285</h3>
            <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
              <TrendingUp size={14} /> ₹2k higher than planned
            </div>
          </motion.div>
        </motion.div>

        {/* Charts Row */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <motion.div variants={item} className="lg:col-span-1">
            <BudgetHealthMeter spent={100000} total={120000} />
          </motion.div>
          <motion.div variants={item} className="lg:col-span-2">
            <ExpenseHistoryChart />
          </motion.div>
        </motion.div>

        {/* Bottom Row */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <motion.div variants={item} className="h-full">
            <SpendingBreakdownChart />
          </motion.div>

          <motion.div variants={item}>
            <div className="bg-[#111827] border border-white/5 rounded-[2rem] p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white/80 font-medium">Recent Transactions</h3>
                <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors">
                  View all
                </button>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto pr-2 scrollbar-none">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${tx.color}`}>
                        {tx.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm group-hover:text-emerald-300 transition-colors">{tx.title}</h4>
                        <p className="text-white/40 text-xs mt-0.5">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-semibold block">-₹{tx.amount.toLocaleString()}</span>
                      <span className="text-white/40 text-xs">{tx.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </DashboardLayout>
  );
}
