"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  Globe, Map as MapIcon, Award, Zap, 
  Settings, Camera, MapPin, TrendingUp 
} from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="min-h-screen pt-24 bg-[#030014]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Profile Header */}
        <div className="relative mb-20">
          <div className="h-64 rounded-[40px] bg-gradient-to-r from-violet-600/20 via-pink-600/20 to-orange-600/20 blur-2xl absolute inset-0 -z-10" />
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8 pt-12 px-8">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[40px] overflow-hidden border-4 border-[#030014] shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-2 right-2 w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center shadow-xl hover:scale-110 transition-all">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-grow text-center md:text-left mb-4">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold">Alex Rivera</h1>
                <div className="px-4 py-1 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-400 text-xs font-bold uppercase tracking-widest">
                  Level 24 Nomad
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-6 text-white/50">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> San Francisco, CA
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" /> 18 Countries Visited
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-4">
              <button className="glass px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-white/10 transition-all">
                <Settings className="w-4 h-4" /> Settings
              </button>
              <button className="bg-white text-black px-8 py-3 rounded-2xl font-bold hover:bg-white/90 transition-all">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Stats & Badges */}
          <div className="space-y-8">
            <GlassCard>
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-pink-500" /> Travel Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Trips Completed</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-2xl font-bold">124k</p>
                  <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Miles Flown</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">UNESCO Sites</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Active Badges</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-violet-400" /> Achievements
              </h3>
              <div className="flex flex-wrap gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600/20 to-pink-600/20 border border-white/10 flex items-center justify-center group cursor-help relative">
                    <Zap className="w-6 h-6 text-white/20 group-hover:text-violet-400 transition-colors" />
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[10px] px-3 py-1 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                      Master Traveler {i}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Travel Journal Feed */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold">Recent Memories</h2>
              <button className="text-pink-500 font-bold text-sm">View Full Journal</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Midnight in Tokyo", date: "April 12, 2026", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800" },
                { title: "Bali Sunsets", date: "March 20, 2026", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800" },
              ].map((memory, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-video rounded-[32px] overflow-hidden mb-4 shadow-xl border border-white/10">
                    <img src={memory.img} alt={memory.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-6">
                       <p className="text-xs font-bold text-white/60">{memory.date}</p>
                       <h4 className="text-lg font-bold">{memory.title}</h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <GlassCard className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
                  <MapIcon className="text-violet-400 w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Interactive World Map</h3>
                  <p className="text-sm text-white/40">You have explored 12% of the globe. 88% left to go!</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-white/10" />
            </GlassCard>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
);
