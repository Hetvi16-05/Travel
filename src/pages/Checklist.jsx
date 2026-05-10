import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, Plus, GripVertical, Check, Trash2, Luggage, Sparkles, AlertCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';
import api from '../lib/api';
import { Loader } from '../components/ui/Loader';


// Removed mock initialCategories


export default function Checklist() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tripRes, checklistRes] = await Promise.all([
          api.trips.getById(id),
          api.trips.getChecklist(id)
        ]);
        setTrip(tripRes.data);
        setItems(checklistRes.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const toggleItem = async (itemId) => {
    const item = items.find(i => i.id === itemId);
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, is_completed: !i.is_completed } : i));
    try {
      await api.trips.updateChecklistItem(id, itemId, { is_done: !item.is_done });
    } catch (err) {
      console.error(err);
      // rollback on error
      setItems(prev => prev.map(i => i.id === itemId ? { ...i, is_done: item.is_done } : i));
    }
  };

  if (isLoading) return <DashboardLayout><div className="flex justify-center py-20"><Loader size="lg" /></div></DashboardLayout>;
  if (error) return <DashboardLayout><div className="text-center py-20 text-red-400"><AlertCircle className="mx-auto mb-2" /><p>{error}</p></div></DashboardLayout>;

  // Group items by category
  const categories = items.reduce((acc, item) => {
    const cat = item.category || 'Uncategorized';
    if (!acc[cat]) acc[cat] = { id: cat, title: cat, items: [] };
    acc[cat].items.push(item);
    return acc;
  }, {});

  const categoryList = Object.values(categories);
  const totalItems = items.length;
  const completedItems = items.filter(i => i.is_done).length;
  const progress = totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);


  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8 px-4 md:px-8 pb-32">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-primary-400 font-semibold mb-2">
              <CheckSquare size={16} />
              <span>Packing List</span>
            </div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">{trip.title}</h1>
            <p className="text-white/50 text-sm">Organize your luggage and essentials.</p>
          </div>

          <div className="flex gap-3">
            <button className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors text-sm font-medium">
              <Sparkles size={16} className="mr-2 text-amber-400" /> AI Suggestions
            </button>
            <Button className="shadow-glow">
              <Plus size={16} className="mr-2" /> New Category
            </Button>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="bg-[#111827] border border-white/5 p-6 rounded-3xl mb-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors" />
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-white/50 text-sm font-medium mb-1 flex items-center gap-2">
                <Luggage size={14} /> Packing Progress
              </p>
              <h3 className="text-2xl font-bold text-white">
                {completedItems} <span className="text-white/30 text-lg">/ {totalItems} items packed</span>
              </h3>
            </div>
            <span className="text-primary-400 font-bold text-xl">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {categoryList.map((category) => (
            <div key={category.id} className="bg-[#111827] border border-white/5 rounded-3xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                <span className="text-xs font-medium text-white/40 bg-white/5 px-2 py-1 rounded-lg">
                  {category.items.filter(i => i.is_done).length}/{category.items.length}
                </span>
              </div>

              <div className="p-2">
                <AnimatePresence>
                  {category.items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group flex items-center gap-3 p-3 rounded-2xl hover:bg-white/[0.04] transition-colors"
                    >
                      <div className="text-white/20 hover:text-white/50 cursor-grab active:cursor-grabbing transition-colors">
                        <GripVertical size={16} />
                      </div>
                      
                      <button 
                        onClick={() => toggleItem(item.id)}
                        className={`w-6 h-6 rounded-[6px] border flex items-center justify-center transition-all flex-shrink-0 ${
                          item.is_done 
                            ? 'bg-primary border-primary text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]' 
                            : 'bg-transparent border-white/20 text-transparent hover:border-white/40'
                        }`}
                      >
                        <motion.div
                          initial={false}
                          animate={{ scale: item.is_done ? 1 : 0 }}
                        >
                          <Check size={14} strokeWidth={3} />
                        </motion.div>
                      </button>

                      
                      <span className={`flex-1 text-[15px] transition-all duration-300 ${
                        item.is_done ? 'text-white/30 line-through' : 'text-white/90'
                      }`}>
                        {item.label}
                      </span>


                      <button className="opacity-0 group-hover:opacity-100 p-2 text-white/30 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all">
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Add Item Input Mockup */}
                <div className="flex items-center gap-3 p-3 mt-2">
                  <div className="w-4" /> {/* spacer for grip */}
                  <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center text-white/20">
                    <Plus size={16} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Add an item..."
                    className="flex-1 bg-transparent border-none outline-none text-[15px] text-white placeholder-white/20"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}
