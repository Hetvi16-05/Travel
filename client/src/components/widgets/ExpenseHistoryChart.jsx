import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';
import { Activity } from 'lucide-react';

const data = [
  { day: 'Day 1', amount: 15000 },
  { day: 'Day 2', amount: 8000 },
  { day: 'Day 3', amount: 12000 },
  { day: 'Day 4', amount: 25000 }, // High spending day
  { day: 'Day 5', amount: 9000 },
  { day: 'Day 6', amount: 11000 },
  { day: 'Day 7', amount: 20000 },
];

export function ExpenseHistoryChart() {
  return (
    <Card className="h-[350px] flex flex-col p-6 border-white/5 bg-[#111827]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white/80 font-medium flex items-center gap-2">
          <Activity size={16} className="text-emerald-400" /> Daily Expense History
        </h3>
      </div>
      
      <div className="flex-1 w-full h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="day" stroke="rgba(255,255,255,0.1)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke="rgba(255,255,255,0.1)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
              itemStyle={{ color: '#fff' }}
              formatter={(value) => `₹${value.toLocaleString()}`}
            />
            <Area type="monotone" dataKey="amount" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
