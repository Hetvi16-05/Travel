"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlowButton } from "../ui/GlowButton";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen pt-64 pb-32 px-6 overflow-hidden flex items-center justify-center">
      {/* Background Blobs - Lower opacity to avoid visual noise */}
      <div className="absolute top-0 -left-20 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[150px] animate-pulse-slow" />
      <div className="absolute bottom-0 -right-20 w-[600px] h-[600px] bg-pink-600/5 rounded-full blur-[150px] animate-pulse-slow" />

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center relative z-10 pt-56 md:pt-72">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center w-full max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 mb-12 backdrop-blur-md">
            <Sparkles className="w-5 h-5 text-pink-500" />
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-white/80">
              AI-Powered Travel OS
            </span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black leading-[0.95] mb-12 tracking-tighter text-center">
            Plan Your Dream <br />
            <span className="text-gradient">Journey with AI</span>
          </h1>
          
          <p className="text-lg md:text-3xl text-white/30 mb-16 max-w-3xl leading-relaxed font-medium text-center">
            Create intelligent itineraries, optimize budgets, and discover experiences with Traveloop's advanced neural planner.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full">
            <GlowButton className="w-full sm:w-auto text-2xl px-16 py-7 shadow-2xl shadow-violet-500/20">
              Start Planning
            </GlowButton>
            <button className="w-full sm:w-auto flex items-center justify-center gap-4 px-12 py-7 rounded-full font-bold text-white/60 hover:text-white transition-all group border border-white/10 hover:bg-white/10 hover:border-white/20">
              Explore Destinations
              <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
            </button>
          </div>

          <div className="mt-24 flex flex-col items-center gap-8">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-16 h-16 rounded-3xl border-4 border-[#030014] bg-gradient-to-tr from-violet-600 to-pink-600 flex items-center justify-center text-[10px] font-bold shadow-2xl">
                  User
                </div>
              ))}
            </div>
            <p className="text-sm text-white/20 uppercase tracking-[0.2em] font-bold">
              Trusted by <span className="text-white">20,000+ Travelers</span>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:ml-12"
        >
          <div className="relative z-10 rounded-[48px] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(139,92,246,0.2)] bg-[#030014]">
            <Image
              src="/hero-mockup.png"
              alt="Traveloop Dashboard"
              width={1200}
              height={900}
              className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity duration-700"
            />
          </div>
          
          {/* Floating UI Elements - Repositioned to avoid overlap with other sections */}
          <motion.div
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 -right-8 glass p-6 rounded-[24px] shadow-2xl z-20 hidden xl:block min-w-[200px] border border-white/10"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 font-bold text-xl">$</span>
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-[0.2em] mb-1">Savings</p>
                <p className="text-xl font-bold">+$420.00</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-16 -left-16 glass p-6 rounded-[24px] shadow-2xl z-20 hidden xl:block min-w-[200px] border border-white/10"
          >
             <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-600/20 flex items-center justify-center text-violet-400 font-bold text-lg">
                AI
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-[0.2em] mb-1">Neural Select</p>
                <p className="text-xl font-bold">Kyoto, JP</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
