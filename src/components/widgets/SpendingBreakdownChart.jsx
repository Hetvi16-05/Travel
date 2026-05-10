import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card } from '../ui/Card';
import { PieChart as PieChartIcon } from 'lucide-react';

const data = [
  { name: 'Hotels', value: 45000, color: '#8B5CF6' }, // Violet
  { name: 'Transport', value: 25000, color: '#3B82F6' }, // Blue
  { name: 'Food', value: 18000, color: '#F59E0B' }, // Amber
  { name: 'Activities', value: 12000, color: '#10B981' }, // Emerald
];

export function SpendingBreakdownChart() {
  return (
    <Card className="h-full min-h-[350px] flex flex-col p-6 border-white/5 bg-[#111827]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white/80 font-medium flex items-center gap-2">
          <PieChartIcon size={16} className="text-primary-400" /> Spending Breakdown
        </h3>
      </div>
      
      <div className="flex-1 w-full h-full min-h-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
              itemStyle={{ color: '#fff' }}
              formatter={(value) => `₹${value.toLocaleString()}`}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">Total Spent</span>
          <span className="text-white font-display font-bold text-2xl">₹100k</span>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-white/70 text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
