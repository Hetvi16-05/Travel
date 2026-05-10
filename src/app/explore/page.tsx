"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { Search, MapPin, Filter, Star, Zap, DollarSign } from "lucide-react";
import Image from "next/image";

const categories = ["Trending", "Adventure", "Culture", "Relaxation", "Food", "Nightlife"];

const destinations = [
  {
    id: 1,
    name: "Seoul, South Korea",
    image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=800",
    score: 9.8,
    budget: "$$$",
    tags: ["Tech", "Food", "Nightlife"],
  },
  {
    id: 2,
    name: "Reykjavik, Iceland",
    image: "https://images.unsplash.com/photo-1504541982953-47285c6efb3f?auto=format&fit=crop&q=80&w=800",
    score: 9.5,
    budget: "$$$$",
    tags: ["Nature", "Aurora", "Adventure"],
  },
  {
    id: 3,
    name: "Lisbon, Portugal",
    image: "https://images.unsplash.com/photo-1548705085-101177834f47?auto=format&fit=crop&q=80&w=800",
    score: 9.2,
    budget: "$$",
    tags: ["History", "Views", "Coastal"],
  },
  {
    id: 4,
    name: "Cape Town, SA",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&q=80&w=800",
    score: 9.4,
    budget: "$$$",
    tags: ["Mountains", "Sea", "Wine"],
  },
  {
    id: 5,
    name: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
    score: 9.9,
    budget: "$$$",
    tags: ["Temple", "Zen", "Food"],
  },
  {
    id: 6,
    name: "New York, USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800",
    score: 9.1,
    budget: "$$$$$",
    tags: ["Art", "Skyline", "Non-stop"],
  },
];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("Trending");

  return (
    <main className="min-h-screen pt-64 md:pt-80 overflow-x-hidden bg-[#030014]">
      <Navbar />
      
      <section className="px-8 md:px-16 lg:px-24 py-24 w-full flex flex-col items-center">
        <div className="w-full flex flex-col items-center relative z-10">
          {/* AI Search Header */}
          <div className="w-full flex flex-col items-center justify-center relative z-10 pt-56 md:pt-72 px-8 md:px-20 lg:px-32 mb-36">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center w-full mx-auto"
            >
                <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
                  <Search className="w-8 h-8 text-white/30" />
                </div>
                <input 
                  type="text" 
                  placeholder="Where do you want to go? AI will help you decide..."
                  className="w-full bg-white/5 border border-white/10 backdrop-blur-3xl py-10 pl-20 pr-32 rounded-[40px] text-2xl focus:outline-none focus:border-violet-500/50 transition-all shadow-2xl text-center placeholder:text-white/20"
                />
                <button className="absolute right-6 top-1/2 -translate-y-1/2 bg-gradient-to-r from-violet-600 to-pink-600 px-12 py-5 rounded-3xl font-bold text-lg flex items-center gap-3 shadow-lg shadow-pink-500/20 active:scale-95 transition-transform">
                  <Zap className="w-5 h-5" /> AI Suggest
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col items-center gap-16 mb-40 w-full">
            <div className="flex items-center justify-center gap-6 overflow-x-auto pb-10 no-scrollbar w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-14 py-6 rounded-[28px] text-lg font-bold transition-all whitespace-nowrap border",
                    activeCategory === cat 
                      ? "bg-white text-black border-white shadow-[0_0_50px_rgba(255,255,255,0.4)]" 
                      : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:border-white/20"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6">
              <button className="flex items-center gap-4 bg-white/5 border border-white/10 px-14 py-6 rounded-[28px] text-lg font-bold hover:bg-white/10 transition-all shadow-xl">
                <Filter className="w-6 h-6 text-pink-500" /> Advanced Filters
              </button>
              <button className="flex items-center gap-4 bg-white/5 border border-white/10 px-14 py-6 rounded-[28px] text-lg font-bold hover:bg-white/10 transition-all shadow-xl">
                <DollarSign className="w-6 h-6 text-green-500" /> Budget Range
              </button>
            </div>
          </div>

          {/* Destination Grid - More columns for full screen */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 w-full">
            {destinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-[48px] overflow-hidden mb-8 shadow-2xl border border-white/10">
                  <Image 
                    src={dest.image} 
                    alt={dest.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 right-6 glass px-5 py-2 rounded-2xl flex items-center gap-2 font-black text-lg">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    {dest.score}
                  </div>
                  <div className="absolute bottom-6 left-6 flex gap-3">
                    {dest.tags.map(tag => (
                      <span key={tag} className="glass px-4 py-2 rounded-xl text-[12px] font-black uppercase tracking-[0.2em]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-start px-4">
                  <div>
                    <h3 className="text-2xl font-black mb-2 group-hover:text-pink-500 transition-colors tracking-tight">{dest.name}</h3>
                    <div className="flex items-center gap-2 text-white/30 text-base">
                      <MapPin className="w-4 h-4" /> Asia • Recommended for you
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-2xl">{dest.budget}</p>
                    <p className="text-[12px] text-white/20 uppercase font-bold tracking-widest">Budget</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-32 text-center w-full">
            <button className="bg-white/5 border border-white/10 px-16 py-6 rounded-[32px] font-black text-xl hover:bg-white/10 transition-all shadow-2xl">
              Load More Destinations
            </button>
          </div>
        </div>
      </section>
>

      <Footer />
    </main>
  );
}

// Add cn utility if not imported
import { cn } from "@/lib/utils";
