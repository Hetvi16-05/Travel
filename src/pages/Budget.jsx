import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, TrendingDown, TrendingUp, Filter, Download, Plus, MapPin, AlertCircle } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { SpendingBreakdownChart } from '../components/widgets/SpendingBreakdownChart';
import { ExpenseHistoryChart } from '../components/widgets/ExpenseHistoryChart';
import { BudgetHealthMeter } from '../components/widgets/BudgetHealthMeter';
import { Button } from '../components/ui/Button';
import api from '../lib/api';
import { Loader } from '../components/ui/Loader';


// Removed mock recentTransactions


export default function Budget() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      navigate('/trips');
      return;
    }

    const fetchData = async () => {
      try {
        const [tripRes, expenseRes] = await Promise.all([
          api.trips.getById(id),
          api.trips.getBudget(id)
        ]);
        setTrip(tripRes.data);
        setExpenses(expenseRes.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  if (!id) return null;
  if (isLoading) return <DashboardLayout><div className="flex justify-center py-20"><Loader size="lg" /></div></DashboardLayout>;
  if (error) return <DashboardLayout><div className="text-center py-20 text-red-400"><AlertCircle className="mx-auto mb-2" /><p>{error}</p></div></DashboardLayout>;

  const totalSpent = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const remaining = (trip.budget || 50000) - totalSpent;
  const healthPercent = Math.max(0, Math.min(100, (totalSpent / (trip.budget || 50000)) * 100));

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
              <MapPin size={14} /> {trip.title}
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
            <h3 className="text-3xl font-display font-bold text-white mb-4">₹{totalSpent.toLocaleString()}</h3>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
              <TrendingDown size={14} /> {100 - Math.round(healthPercent)}% under budget
            </div>
          </motion.div>


          <motion.div variants={item} className="bg-[#111827] border border-white/5 rounded-[2rem] p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors" />
            <p className="text-white/50 text-sm font-medium mb-1">Remaining Budget</p>
            <h3 className="text-3xl font-display font-bold text-white mb-4">₹{remaining.toLocaleString()}</h3>
            <div className="flex items-center gap-2 text-white/40 text-sm font-medium">
              Out of ₹{(trip.budget || 50000).toLocaleString()} total
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
            <BudgetHealthMeter spent={totalSpent} total={trip.budget || 50000} />
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
            <SpendingBreakdownChart expenses={expenses} />
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
                {expenses.length > 0 ? expenses.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg bg-primary/10 text-primary-400`}>
                        {tx.category === 'Food' ? '🍜' : tx.category === 'Transport' ? '🚅' : '💰'}
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm group-hover:text-emerald-300 transition-colors">{tx.title}</h4>
                        <p className="text-white/40 text-xs mt-0.5">{new Date(tx.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-semibold block">-₹{Number(tx.amount).toLocaleString()}</span>
                      <span className="text-white/40 text-xs">{tx.category}</span>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-10 text-white/20">No expenses recorded.</div>
                )}
              </div>

            </div>
          </motion.div>
        </motion.div>

      </div>
    </DashboardLayout>
  );
}
