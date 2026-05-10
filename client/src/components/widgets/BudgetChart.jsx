import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';
import { Wallet } from 'lucide-react';

const data = [
  { name: 'Mon', budget: 4000, actual: 2400 },
  { name: 'Tue', budget: 3000, actual: 1398 },
  { name: 'Wed', budget: 2000, actual: 3800 },
  { name: 'Thu', budget: 2780, actual: 3908 },
  { name: 'Fri', budget: 1890, actual: 4800 },
  { name: 'Sat', budget: 2390, actual: 3800 },
  { name: 'Sun', budget: 3490, actual: 4300 },
];

export function BudgetChart() {
  return (
    <Card className="h-[350px] flex flex-col p-6 border-white/5 bg-white/[0.02]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white/80 font-medium flex items-center gap-2">
          <Wallet size={16} className="text-primary-400" /> Budget Overview
        </h3>
        <select className="bg-transparent text-white/50 text-xs outline-none border border-white/10 rounded-lg px-2 py-1">
          <option>This Trip</option>
          <option>All Trips</option>
        </select>
      </div>
      
      <div className="flex-1 w-full h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.1)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke="rgba(255,255,255,0.1)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="actual" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorBudget)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
