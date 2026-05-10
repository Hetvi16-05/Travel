"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { Brain, Wallet, Share2, CloudRain, Briefcase, Map } from "lucide-react";

const features = [
  {
    title: "AI Trip Planner",
    description: "Generate complete itineraries in seconds tailored to your mood and interests.",
    icon: <Brain className="w-6 h-6 text-violet-400" />,
    delay: 0.1,
  },
  {
    title: "Budget Optimization",
    description: "Smart cost tracking and predictive spending to keep your trip on budget.",
    icon: <Wallet className="w-6 h-6 text-pink-400" />,
    delay: 0.2,
  },
  {
    title: "Smart Recommendations",
    description: "Discover hidden gems and local favorites that match your travel style.",
    icon: <Map className="w-6 h-6 text-orange-400" />,
    delay: 0.3,
  },
  {
    title: "Collaborative Planning",
    description: "Plan with friends in real-time. Share lists, votes, and budgets effortlessly.",
    icon: <Share2 className="w-6 h-6 text-cyan-400" />,
    delay: 0.4,
  },
  {
    title: "Weather Insights",
    description: "Hyper-local weather forecasts integrated directly into your itinerary.",
    icon: <CloudRain className="w-6 h-6 text-blue-400" />,
    delay: 0.5,
  },
  {
    title: "Packing Assistant",
    description: "Custom packing lists generated based on your destination and activities.",
    icon: <Briefcase className="w-6 h-6 text-green-400" />,
    delay: 0.6,
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
          >
            Futuristic <span className="text-gradient">Capabilities</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-xl leading-relaxed"
          >
            Experience a new era of travel planning with our suite of intelligent tools designed for the modern nomad.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <GlassCard key={index} delay={feature.delay} className="hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {feature.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
