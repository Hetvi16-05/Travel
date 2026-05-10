"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Code, Globe, Mail, Lock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { GlowButton } from "@/components/ui/GlowButton";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-pink-600 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-violet-500/20">
              <Plane className="text-white w-7 h-7" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-white">
              Travel<span className="text-gradient">oop</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">
            {isLogin ? "Welcome Back" : "Start Your Adventure"}
          </h1>
          <p className="text-white/50">
            {isLogin ? "Log in to manage your AI itineraries." : "Create an account to plan your dream journey."}
          </p>
        </div>

        <motion.div
          key={isLogin ? "login" : "signup"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 rounded-[32px] border-white/10 shadow-2xl"
        >
          <div className="space-y-4 mb-8">
            <button className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 hover:bg-white/10 transition-all group">
              <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold">Continue with Google</span>
            </button>
            <button className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 hover:bg-white/10 transition-all group">
              <Code className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold">Continue with GitHub</span>
            </button>
          </div>

          <div className="relative mb-8 text-center">
            <hr className="border-white/10" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#030014] px-4 text-xs text-white/30 uppercase tracking-widest font-bold">
              OR
            </span>
          </div>

          <form className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-white/40 uppercase">Password</label>
                {isLogin && <button className="text-[10px] text-pink-500 font-bold hover:underline">Forgot?</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>

            <GlowButton className="w-full py-4 text-lg mt-4">
              {isLogin ? "Sign In" : "Create Account"}
            </GlowButton>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-white/40 hover:text-white transition-colors"
            >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span className="text-white font-bold underline">
                {isLogin ? "Sign Up" : "Log In"}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
