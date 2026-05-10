"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlowButton } from "../ui/GlowButton";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Explorer",
    price: "Free",
    features: ["Up to 3 trips", "Basic AI suggestions", "Public sharing", "Community access"],
    gradient: "from-blue-500 to-cyan-500",
    glow: "rgba(59, 130, 246, 0.2)",
  },
  {
    name: "Traveler",
    price: "$9",
    features: ["Unlimited trips", "Advanced AI planning", "Budget optimization", "Weather integration", "PDF Exports"],
    gradient: "from-violet-600 to-pink-600",
    glow: "rgba(139, 92, 246, 0.3)",
    popular: true,
  },
  {
    name: "Nomad",
    price: "$29",
    features: ["Priority AI assistant", "Real-time collaboration", "Custom journal themes", "Offline maps", "VIP Lounge access"],
    gradient: "from-pink-600 to-orange-600",
    glow: "rgba(236, 72, 153, 0.2)",
  },
];

export const Pricing = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple <span className="text-gradient">Pricing</span></h2>
          <p className="text-white/50">Choose the plan that fits your travel style.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-3xl glass border-white/10 flex flex-col ${plan.popular ? "scale-105 border-violet-500/50 shadow-[0_0_40px_rgba(139,92,246,0.2)]" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-pink-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Free" && <span className="text-white/40">/month</span>}
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-white/70">
                    <Check className="w-4 h-4 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <GlowButton variant={plan.popular ? "primary" : "outline"} className="w-full">
                Get Started
              </GlowButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
