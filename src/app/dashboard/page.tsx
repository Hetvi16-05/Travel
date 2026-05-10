"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Navbar } from "@/components/ui/Navbar";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { 
  Calendar, MapPin, TrendingUp, Wallet, Clock, 
  ChevronRight, Map as MapIcon, Plus, Settings
} from "lucide-react";

const data = [
  { name: "Flights", value: 850 },
  { name: "Hotels", value: 620 },
  { name: "Food", value: 340 },
  { name: "Activities", value: 450 },
];

const spendingHistory = [
  { day: "Day 1", amount: 120 },
  { day: "Day 2", amount: 250 },
  { day: "Day 3", amount: 180 },
  { day: "Day 4", amount: 320 },
  { day: "Day 5", amount: 210 },
];

const COLORS = ["#8b5cf6", "#ec4899", "#f97316", "#06b6d4"];

export default function Dashboard() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-6">
      <Navbar />
      
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold mb-2"
            >
              Welcome back, <span className="text-gradient">Alex</span> 👋
            </motion.h1>
            <p className="text-white/50 text-lg">You have 2 upcoming trips and 1 active itinerary.</p>
          </div>
          <div className="flex gap-4">
            <button className="glass px-6 py-3 rounded-2xl flex items-center gap-2 text-sm font-bold hover:bg-white/10 transition-all">
              <Calendar className="w-4 h-4" />
              Calendar
            </button>
            <button className="bg-gradient-to-r from-violet-600 to-pink-600 px-6 py-3 rounded-2xl flex items-center gap-2 text-sm font-bold shadow-lg hover:shadow-violet-500/20 transition-all">
              <Plus className="w-4 h-4" />
              New Trip
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Upcoming Trips & Stats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Trip Card */}
            <GlassCard className="!p-0 border-violet-500/30 overflow-hidden">
              <div className="h-48 relative">
                <img 
                  src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200" 
                  alt="Tokyo" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600 text-[10px] font-bold uppercase tracking-wider mb-3">
                    Active Trip
                  </div>
                  <h2 className="text-3xl font-bold">Tokyo Odyssey</h2>
                  <p className="text-white/60 flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4" /> Tokyo, Japan • June 12 - June 24
                  </p>
                </div>
              </div>
              <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-xs text-white/40 uppercase mb-1">Status</p>
                  <p className="font-bold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-400" /> Day 4 of 12
                  </p>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase mb-1">Budget</p>
                  <p className="font-bold">$2,450 / $4,000</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase mb-1">Next Activity</p>
                  <p className="font-bold">TeamLab Borderless</p>
                </div>
                <div className="flex justify-end">
                  <button className="text-pink-500 font-bold hover:underline">View Details</button>
                </div>
              </div>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Spending Chart */}
              <GlassCard>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-pink-500" /> Spending Flow
                  </h3>
                  <select className="bg-white/5 border border-white/10 rounded-lg text-xs p-1 outline-none">
                    <option>Last 7 days</option>
                  </select>
                </div>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={spendingHistory}>
                      <CartGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                        itemStyle={{ color: "#fff" }}
                      />
                      <Bar dataKey="amount" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>

              {/* Category Breakdown */}
              <GlassCard>
                <h3 className="font-bold text-lg mb-8 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-500" /> Category Split
                </h3>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Right Column: AI Insights & Quick Actions */}
          <div className="space-y-8">
            <GlassCard className="bg-gradient-to-br from-violet-600/10 to-transparent border-violet-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center">
                  <TrendingUp className="text-white w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">AI Smart Insights</h3>
              </div>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-bold">Budget Alert</p>
                    <p className="text-xs text-white/50 leading-relaxed">You've spent 40% of your food budget in 3 days. Try local street markets to save.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-bold">Weather Warning</p>
                    <p className="text-xs text-white/50 leading-relaxed">Rain expected in Kyoto tomorrow. I've moved your "Fushimi Inari" hike to Thursday.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-bold">New Suggestion</p>
                    <p className="text-xs text-white/50 leading-relaxed">A new hidden coffee shop opened in Shibuya. Added it to your discovery list.</p>
                  </div>
                </li>
              </ul>
            </GlassCard>

            <GlassCard>
              <h3 className="font-bold mb-6">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { name: "Share Itinerary", icon: <Share2 className="w-4 h-4" /> },
                  { name: "Upload Receipts", icon: <Plus className="w-4 h-4" /> },
                  { name: "Offline Sync", icon: <Clock className="w-4 h-4" /> },
                  { name: "Travel Insurance", icon: <MapIcon className="w-4 h-4" /> },
                ].map((action) => (
                  <button key={action.name} className="w-full p-4 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-between group transition-all">
                    <span className="text-sm font-medium flex items-center gap-3">
                      {action.name}
                    </span>
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-all" />
                  </button>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="bg-gradient-to-r from-pink-600/20 to-orange-600/20">
              <h3 className="font-bold mb-2">Upgrade to Pro</h3>
              <p className="text-xs text-white/60 mb-6">Unlock real-time group planning and priority AI assistance.</p>
              <button className="w-full py-3 rounded-xl bg-white text-black text-sm font-bold">Upgrade Now</button>
            </GlassCard>
          </div>
        </div>
      </div>
    </main>
  );
}

// Add missing icon
const Share2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
);

// Add missing CartesianGrid
const CartGrid = ({ strokeDasharray, stroke }: { strokeDasharray?: string, stroke?: string }) => (
  <CartesianGrid strokeDasharray={strokeDasharray} stroke={stroke} />
);
