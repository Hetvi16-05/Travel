"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlowButton } from "../ui/GlowButton";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[110vh] pt-48 pb-32 px-6 overflow-hidden flex items-center">
      {/* Background Blobs */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[150px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[150px] animate-pulse-slow" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
              AI-Powered Travel OS
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold leading-[1.1] mb-8 tracking-tight">
            Plan Your Dream <br />
            <span className="text-gradient">Journey with AI</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-white/50 mb-12 max-w-xl leading-relaxed">
            Create intelligent multi-city itineraries, optimize budgets, and discover experiences with Traveloop.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <GlowButton className="w-full sm:w-auto text-xl px-12 py-5">
              Start Planning
            </GlowButton>
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 rounded-full font-bold text-white/60 hover:text-white transition-all group border border-white/10 hover:bg-white/5">
              Explore Destinations
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="mt-16 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-[#030014] bg-gradient-to-tr from-violet-500 to-pink-500" />
              ))}
            </div>
            <p className="text-sm text-white/40">
              Join <span className="text-white font-bold">20,000+</span> travelers world-wide
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:ml-10"
        >
          <div className="relative z-10 rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.15)] bg-black/40 backdrop-blur-3xl">
            <Image
              src="/hero-mockup.png"
              alt="Traveloop Dashboard"
              width={1000}
              height={800}
              className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity duration-500"
            />
          </div>
          
          {/* Floating UI Elements with more spacing */}
          <motion.div
            animate={{ y: [0, -25, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -right-6 glass p-6 rounded-3xl shadow-2xl z-20 hidden xl:block min-w-[200px]"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 font-bold text-xl">$</span>
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Budget Boost</p>
                <p className="text-lg font-bold">Saved $420.00</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 25, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-12 -left-12 glass p-6 rounded-3xl shadow-2xl z-20 hidden xl:block min-w-[200px]"
          >
             <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center text-violet-400 font-bold text-lg">
                AI
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Smart Select</p>
                <p className="text-lg font-bold">Kyoto, Japan</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
