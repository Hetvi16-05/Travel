"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Search, User, Menu, X } from "lucide-react";
import { GlowButton } from "./GlowButton";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Explore", href: "/explore" },
    { name: "Planner", href: "/planner" },
    { name: "Journal", href: "/journal" },
    { name: "Community", href: "/community" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6",
        scrolled ? "top-2" : "top-0"
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto rounded-2xl transition-all duration-500 flex items-center justify-between px-6 py-2",
          scrolled ? "bg-black/40 backdrop-blur-xl shadow-2xl border border-white/10" : "bg-transparent py-4"
        )}
      >
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-pink-600 flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Plane className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            Travel<span className="text-gradient">oop</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="p-2 text-white/70 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/auth">
            <GlowButton variant="outline" className="px-6 py-2 text-sm">
              Sign In
            </GlowButton>
          </Link>
          <GlowButton className="px-6 py-2 text-sm">Get Started</GlowButton>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-24 left-6 right-6 glass-dark rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-white/70 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-white/10" />
              <GlowButton className="w-full">Get Started</GlowButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
