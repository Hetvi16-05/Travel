"use client";

import React, { useState } from "react";
import { motion, Reorder } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  Plane, MapPin, Calendar, Clock, Map as MapIcon, 
  Trash2, Plus, GripVertical, ChevronRight, Sparkles 
} from "lucide-react";

const initialItinerary = [
  { id: "1", time: "09:00 AM", title: "Breakfast at Shinjuku", type: "Food", location: "Shinjuku, Tokyo" },
  { id: "2", time: "11:30 AM", title: "Ghibli Museum Visit", type: "Culture", location: "Mitaka, Tokyo" },
  { id: "3", time: "03:00 PM", title: "Shibuya Crossing", type: "Sightseeing", location: "Shibuya, Tokyo" },
  { id: "4", time: "07:30 PM", title: "Robot Restaurant Dinner", type: "Entertainment", location: "Shinjuku, Tokyo" },
];

export default function PlannerPage() {
  const [items, setItems] = useState(initialItinerary);
  const [activeDay, setActiveDay] = useState(1);

  return (
    <main className="min-h-screen pt-24 bg-black">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center">
                <Plane className="text-white w-6 h-6" />
              </div>
              <h1 className="text-4xl font-bold">Tokyo Odyssey <span className="text-white/20 ml-2">/</span> <span className="text-pink-500">Day {activeDay}</span></h1>
            </div>
            <p className="text-white/50 text-lg">Planning your 12-day adventure in Japan.</p>
          </div>
          
          <div className="flex items-center gap-3">
             {[1, 2, 3, 4, 5].map(day => (
               <button
                 key={day}
                 onClick={() => setActiveDay(day)}
                 className={cn(
                   "w-12 h-12 rounded-xl font-bold transition-all border",
                   activeDay === day 
                    ? "bg-white text-black border-white" 
                    : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10"
                 )}
               >
                 {day}
               </button>
             ))}
             <button className="w-12 h-12 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center">
               <Plus className="w-5 h-5" />
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Timeline Builder */}
          <div className="lg:col-span-2">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Clock className="w-6 h-6 text-pink-500" /> Timeline
              </h2>
              <button className="text-sm font-bold text-violet-400 flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
                <Sparkles className="w-4 h-4" /> AI Optimize Route
              </button>
            </div>

            <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-4">
              {items.map((item) => (
                <Reorder.Item key={item.id} value={item}>
                  <GlassCard className="flex items-center gap-6 group hover:border-violet-500/50 cursor-grab active:cursor-grabbing">
                    <div className="flex items-center gap-4 shrink-0">
                      <GripVertical className="w-5 h-5 text-white/10 group-hover:text-white/40" />
                      <div className="text-center w-20">
                        <p className="text-xs font-bold text-white/40 uppercase">{item.time.split(" ")[1]}</p>
                        <p className="text-lg font-bold">{item.time.split(" ")[0]}</p>
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60">
                          {item.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-pink-500 transition-colors">{item.title}</h3>
                      <p className="text-sm text-white/30 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" /> {item.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/30 hover:text-red-500 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 hover:bg-violet-500/20 text-white/30 hover:text-violet-400 transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </GlassCard>
                </Reorder.Item>
              ))}
            </Reorder.Group>

            <button className="w-full mt-8 py-6 rounded-[32px] border-2 border-dashed border-white/10 flex items-center justify-center gap-3 text-white/30 hover:text-white hover:border-white/30 transition-all group">
              <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-bold">Add New Activity</span>
            </button>
          </div>

          {/* Side Panel: Map & Suggestions */}
          <div className="space-y-8">
            <GlassCard className="!p-0 h-[400px] relative">
              <div className="absolute inset-0 bg-white/5 flex items-center justify-center flex-col gap-4 text-center p-8">
                 <MapIcon className="w-16 h-16 text-white/10 animate-pulse" />
                 <p className="text-white/40 font-medium">Interactive Route Map is Loading...</p>
                 <button className="glass px-6 py-2 rounded-xl text-sm font-bold">Open Fullscreen Map</button>
              </div>
              {/* This would be the Mapbox integration */}
            </GlassCard>

            <GlassCard className="bg-gradient-to-br from-violet-600/10 to-transparent">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-400" /> AI Suggestions for You
              </h3>
              <div className="space-y-4">
                {[
                  { title: "TeamLab Borderless", desc: "Digital art museum nearby", color: "from-pink-500" },
                  { title: "Meiji Jingu", desc: "Serene forest temple", color: "from-green-500" },
                  { title: "Tsukiji Market", desc: "Fresh sushi for breakfast", color: "from-blue-500" },
                ].map((sug, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                    <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-tr shrink-0", sug.color)} />
                    <div>
                      <p className="text-sm font-bold">{sug.title}</p>
                      <p className="text-xs text-white/40">{sug.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

import { cn } from "@/lib/utils";
