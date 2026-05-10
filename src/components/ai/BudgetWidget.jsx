import { motion } from 'framer-motion';
import { Wallet, Plane, Home, Utensils, Compass } from 'lucide-react';
import { Card } from '../ui/Card';

export function BudgetWidget({ data }) {
  const icons = {
    Flights: Plane,
    Accommodation: Home,
    Food: Utensils,
    Activities: Compass
  };

  return (
    <Card className="w-full bg-[#111827] border-amber-500/20 p-6 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
          <Wallet size={20} />
        </div>
        <div>
          <h3 className="text-white font-display font-bold text-lg">Estimated Budget</h3>
          <p className="text-white/50 text-sm">Based on recent pricing data</p>
        </div>
      </div>

      <div className="mb-6 flex items-end gap-2">
        <span className="text-4xl font-display font-bold text-emerald-400">₹{data.total.toLocaleString()}</span>
        <span className="text-white/40 text-sm mb-1 uppercase tracking-wider font-bold">Total Est.</span>
      </div>

      <div className="space-y-4">
        {data.breakdown.map((item, idx) => {
          const Icon = icons[item.category] || Wallet;
          return (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                  <Icon size={14} />
                </div>
                <span className="text-white text-sm font-medium">{item.category}</span>
              </div>
              <span className="text-white font-semibold">₹{item.amount.toLocaleString()}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
