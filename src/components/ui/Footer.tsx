"use client";

import React from "react";
import { Plane, Globe, Camera, Code, Briefcase } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="relative z-10 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-pink-600 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Plane className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Travel<span className="text-gradient">oop</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              The futuristic travel operating system. Plan, explore, and share your journeys with the power of AI.
            </p>
            <div className="flex items-center gap-4">
              <Globe className="w-5 h-5 text-white/50 hover:text-white cursor-pointer transition-colors" />
              <Camera className="w-5 h-5 text-white/50 hover:text-white cursor-pointer transition-colors" />
              <Code className="w-5 h-5 text-white/50 hover:text-white cursor-pointer transition-colors" />
              <Briefcase className="w-5 h-5 text-white/50 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-4 text-white/50 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">AI Trip Planner</li>
              <li className="hover:text-white transition-colors cursor-pointer">Budget Tool</li>
              <li className="hover:text-white transition-colors cursor-pointer">Mobile App</li>
              <li className="hover:text-white transition-colors cursor-pointer">Community</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-white/50 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
              <li className="hover:text-white transition-colors cursor-pointer">Blog</li>
              <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Newsletter</h4>
            <p className="text-white/50 text-sm mb-4">Get the latest travel tips and AI updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-violet-500 transition-colors w-full"
              />
              <button className="bg-violet-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-violet-700 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs">
          <p>© 2026 Traveloop AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
