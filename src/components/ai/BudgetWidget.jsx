import { motion } from 'framer-motion';
import { Wallet, Plane, Home, Utensils, Compass, HelpCircle, Info } from 'lucide-react';

const CATEGORY_ICONS = {
  'Transport':      { icon: Plane,      color: 'text-blue-400',    bg: 'bg-blue-400/15',    bar: 'bg-blue-500' },
  'Accommodation':  { icon: Home,       color: 'text-violet-400',  bg: 'bg-violet-400/15',  bar: 'bg-violet-500' },
  'Food & Drinks':  { icon: Utensils,   color: 'text-orange-400',  bg: 'bg-orange-400/15',  bar: 'bg-orange-500' },
  'Activities':     { icon: Compass,    color: 'text-emerald-400', bg: 'bg-emerald-400/15', bar: 'bg-emerald-500' },
  'Miscellaneous':  { icon: HelpCircle, color: 'text-rose-400',    bg: 'bg-rose-400/15',    bar: 'bg-rose-500' },
};

export function BudgetWidget({ data }) {
  const totalAmount = data.breakdown.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="w-full bg-gradient-to-br from-[#111827] to-[#0d1424] border border-amber-500/20 rounded-2xl overflow-hidden shadow-xl">
      {/* Glow blob */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Wallet size={18} />
            </div>
            <div>
              <h3 className="text-white font-bold text-base">Budget Estimate</h3>
              <p className="text-white/40 text-xs mt-0.5">Based on current rates</p>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="mb-5 flex items-end gap-2">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-emerald-400 font-mono"
          >
            {data.currency || '₹'}{totalAmount.toLocaleString('en-IN')}
          </motion.span>
          <span className="text-white/40 text-xs mb-1 uppercase tracking-widest font-semibold">Total</span>
        </div>

        {/* Summary bar */}
        <div className="flex h-2 rounded-full overflow-hidden mb-5 gap-0.5">
          {data.breakdown.map((item, idx) => {
            const meta = CATEGORY_ICONS[item.category] || CATEGORY_ICONS['Miscellaneous'];
            const pct = ((item.amount / totalAmount) * 100).toFixed(1);
            return (
              <motion.div
                key={idx}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: 'easeOut' }}
                style={{ width: `${pct}%` }}
                className={`${meta.bar} origin-left rounded-full`}
                title={`${item.category}: ${pct}%`}
              />
            );
          })}
        </div>

        {/* Breakdown rows */}
        <div className="space-y-2.5">
          {data.breakdown.map((item, idx) => {
            const meta = CATEGORY_ICONS[item.category] || CATEGORY_ICONS['Miscellaneous'];
            const Icon = meta.icon;
            const pct = ((item.amount / totalAmount) * 100).toFixed(0);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * idx }}
                className="flex items-center gap-3"
              >
                {/* Icon */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${meta.bg}`}>
                  <Icon size={14} className={meta.color} />
                </div>

                {/* Label + bar */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/80 text-xs font-medium">{item.category}</span>
                    <span className="text-white/90 text-xs font-bold">
                      ₹{item.amount.toLocaleString('en-IN')}
                      <span className="text-white/30 font-normal ml-1">({pct}%)</span>
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.1 + idx * 0.08, duration: 0.6, ease: 'easeOut' }}
                      className={`h-full rounded-full ${meta.bar}`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Budget note */}
        {data.note && (
          <div className="mt-4 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <Info size={12} className="text-amber-400 shrink-0" />
            <p className="text-amber-300/80 text-xs">{data.note}</p>
          </div>
        )}
      </div>
    </div>
  );
}
