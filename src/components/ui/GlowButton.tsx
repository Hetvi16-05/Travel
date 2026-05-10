"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationEnd" | "onAnimationIteration"> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
}

export const GlowButton = ({ className, variant = "primary", children, ...props }: GlowButtonProps) => {
  const variants = {
    primary: "bg-gradient-to-r from-violet-600 via-pink-600 to-orange-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]",
    secondary: "bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]",
    outline: "border border-white/20 bg-white/5 hover:bg-white/10 text-white",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative px-8 py-3 rounded-full font-medium transition-all duration-300 overflow-hidden group",
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
