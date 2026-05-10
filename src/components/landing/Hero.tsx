"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlowButton } from "../ui/GlowButton";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] animate-pulse-slow" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
              AI-Powered Travel OS
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
            Plan Your Dream <br />
            <span className="text-gradient">Journey with AI</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-xl leading-relaxed">
            Create intelligent multi-city itineraries, optimize budgets, discover hidden gems, and travel smarter with Traveloop.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <GlowButton className="w-full sm:w-auto text-lg px-10 py-4">
              Start Planning
            </GlowButton>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-white/80 hover:text-white transition-colors group">
              Explore Destinations
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#030014] bg-white/10" />
              ))}
            </div>
            <p className="text-sm text-white/40">
              <span className="text-white font-semibold">20k+</span> travelers already joined
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/hero-mockup.png"
              alt="Traveloop Dashboard"
              width={800}
              height={600}
              className="w-full h-auto scale-105 hover:scale-110 transition-transform duration-700"
            />
          </div>
          
          {/* Floating UI Elements */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 glass p-4 rounded-2xl shadow-xl z-20 hidden md:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 font-bold">$</span>
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase">Budget Optimized</p>
                <p className="text-sm font-bold">Saved $420.00</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 glass p-4 rounded-2xl shadow-xl z-20 hidden md:block"
          >
             <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 font-bold">
                AI
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase">New Suggestion</p>
                <p className="text-sm font-bold">Kyoto, Japan</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
