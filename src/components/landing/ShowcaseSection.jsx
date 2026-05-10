import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, ChevronRight, BarChart3, Clock } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { StatsWidget } from '../widgets/StatsWidget';

export function ShowcaseSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="showcase" ref={containerRef} className="py-32 px-6 relative overflow-hidden bg-[#0A0F1C]">
      {/* Background elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <Badge variant="primary" className="bg-primary/10 border-primary/20 text-primary-300">
              <Sparkles size={14} className="mr-1" /> Intelligent Generation
            </Badge>
            <h2 className="font-display font-bold text-4xl md:text-6xl text-white leading-[1.1]">
              A complete trip, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-violet-400">generated in seconds.</span>
            </h2>
            <p className="text-xl text-white/50 font-light leading-relaxed max-w-lg">
              Say goodbye to dozens of open tabs. Travia AI analyzes millions of data points to craft the perfect itinerary, optimized route, and realistic budget for your next adventure.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                'Hyper-personalized day-by-day plans',
                'Interactive drag-and-drop timeline',
                'Real-time automated budget tracking'
              ].map((item, i) => (
                <li key={i} className="flex items-center text-white/70">
                  <div className="mr-4 p-1 rounded-full bg-primary/20 text-primary-400">
                    <ChevronRight size={16} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Visual Showcase / Parallax Elements */}
          <div className="relative h-[600px] rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden flex items-center justify-center">
            {/* Base UI Mockup */}
            <motion.div 
              style={{ y: y3 }}
              className="absolute inset-8 rounded-2xl border border-white/10 bg-[#0F172A] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Fake App Header */}
              <div className="h-12 border-b border-white/10 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="ml-4 h-6 w-48 bg-white/5 rounded-md" />
              </div>
              {/* Fake App Body */}
              <div className="p-6 flex-1 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80')] bg-cover bg-center">
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
                <div className="relative z-10 space-y-4">
                   <div className="h-8 w-64 bg-white/10 rounded-lg animate-pulse" />
                   <div className="h-4 w-96 bg-white/5 rounded-lg" />
                   <div className="h-4 w-72 bg-white/5 rounded-lg" />
                </div>
              </div>
            </motion.div>

            {/* Floating Element 1: Stats Widget */}
            <motion.div 
              style={{ y: y1 }}
              className="absolute top-16 right-[-20px] w-64 z-20 hidden sm:block"
            >
              <StatsWidget 
                title="Budget Remaining" 
                value="₹45,200" 
                icon={BarChart3} 
                trend="up" 
                trendValue="+₹2,000" 
                className="bg-[#111827]/90 backdrop-blur-xl border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.6)]"
              />
            </motion.div>

            {/* Floating Element 2: Timeline Card */}
            <motion.div 
              style={{ y: y2 }}
              className="absolute bottom-24 left-[-20px] w-72 z-20 hidden sm:block"
            >
              <Card className="bg-[#111827]/90 backdrop-blur-xl border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.6)] p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-medium flex items-center gap-2">
                    <Clock size={16} className="text-violet-400" /> Day 2 Timeline
                  </h4>
                </div>
                <div className="space-y-3 relative before:absolute before:inset-y-0 before:left-2.5 before:w-px before:bg-white/10">
                  <div className="flex gap-4 relative">
                    <div className="w-5 h-5 rounded-full bg-violet-500 border-4 border-[#111827] z-10" />
                    <div>
                      <p className="text-white text-sm">Snorkeling at Blue Bay</p>
                      <p className="text-white/40 text-xs">09:00 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-4 relative">
                    <div className="w-5 h-5 rounded-full bg-white/20 border-4 border-[#111827] z-10" />
                    <div>
                      <p className="text-white/80 text-sm">Seafood Lunch</p>
                      <p className="text-white/40 text-xs">01:30 PM</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
