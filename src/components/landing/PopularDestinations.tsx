"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";

const destinations = [
  {
    name: "Tokyo, Japan",
    image: "/tokyo.png",
    rating: 4.9,
    price: "$1,200",
    tags: ["Futuristic", "Cuisine", "Tech"],
  },
  {
    name: "Bali, Indonesia",
    image: "/bali.png",
    rating: 4.8,
    price: "$800",
    tags: ["Nature", "Relax", "Culture"],
  },
  {
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    price: "$1,500",
    tags: ["Romance", "Art", "Food"],
  },
  {
    name: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    price: "$1,800",
    tags: ["Views", "Luxury", "Sea"],
  },
];

export const PopularDestinations = () => {
  return (
    <section className="py-40 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-4"
            >
              Popular <span className="text-gradient">Destinations</span>
            </motion.h2>
            <p className="text-white/50">Curated by AI based on global trends and your preferences.</p>
          </div>
          <button className="text-pink-500 font-semibold hover:text-pink-400 transition-colors flex items-center gap-2">
            View all destinations <span className="text-xl">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative rounded-3xl overflow-hidden glass aspect-[3/4]"
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-pink-400 mb-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-bold">{dest.rating}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{dest.name}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {dest.tags.map((tag) => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-md bg-white/10 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Starts from <span className="text-white font-bold">{dest.price}</span></span>
                  <button className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    +
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
