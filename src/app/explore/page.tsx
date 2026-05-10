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
    <main className="min-h-screen pt-24">
      <Navbar />
      
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* AI Search Header */}
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Discover Your Next <br /><span className="text-gradient">Masterpiece Trip</span>
            </motion.h1>
            
            <div className="max-w-2xl mx-auto relative mt-12">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-white/30" />
              </div>
              <input 
                type="text" 
                placeholder="Where do you want to go? AI will help you decide..."
                className="w-full glass py-6 pl-16 pr-24 rounded-3xl text-lg focus:outline-none focus:border-violet-500/50 transition-all shadow-2xl"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-violet-600 to-pink-600 px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2">
                <Zap className="w-4 h-4" /> AI Suggest
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                    activeCategory === cat 
                      ? "bg-white text-black" 
                      : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <button className="flex items-center gap-2 glass px-5 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-all">
              <Filter className="w-4 h-4" /> All Filters
            </button>
          </div>

          {/* Destination Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden mb-6 shadow-2xl">
                  <Image 
                    src={dest.image} 
                    alt={dest.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 glass px-3 py-1 rounded-xl flex items-center gap-1 font-bold text-sm">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    {dest.score}
                  </div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {dest.tags.map(tag => (
                      <span key={tag} className="glass px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-pink-500 transition-colors">{dest.name}</h3>
                    <div className="flex items-center gap-1 text-white/40 text-sm">
                      <MapPin className="w-3 h-3" /> Asia • Recommended for you
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{dest.budget}</p>
                    <p className="text-[10px] text-white/30 uppercase font-bold">Budget</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <button className="glass px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
              Load More Destinations
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Add cn utility if not imported
import { cn } from "@/lib/utils";
