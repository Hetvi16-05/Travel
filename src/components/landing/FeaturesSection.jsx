import { motion } from 'framer-motion';
import { Sparkles, Map, PieChart, Users, Calendar, Compass } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Generated Itineraries',
    description: 'Instant, personalized day-by-day plans based on your vibe, budget, and group size.',
    color: 'text-primary-400',
    bg: 'bg-primary-500/10',
    border: 'border-primary-500/20'
  },
  {
    icon: PieChart,
    title: 'Smart Budgeting',
    description: 'Track expenses in real-time, get AI saving tips, and visualize where your money goes.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20'
  },
  {
    icon: Map,
    title: 'Interactive Maps',
    description: 'Visualize your entire journey on a stunning interactive map with optimized routing.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20'
  },
  {
    icon: Calendar,
    title: 'Visual Timelines',
    description: 'Drag-and-drop timeline builder that makes adjusting your schedule effortless.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20'
  },
  {
    icon: Compass,
    title: 'Hidden Gems',
    description: 'Discover off-the-beaten-path locations and highly-rated local experiences.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20'
  },
  {
    icon: Users,
    title: 'Collaborative Planning',
    description: 'Invite friends, vote on activities, and split costs seamlessly in one place.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20'
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <Badge variant="outline" className="mb-6 border-white/10 text-white/60">
            Powerful Capabilities
          </Badge>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
            Everything you need to <br className="hidden sm:block" />
            travel smarter
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto font-light">
            We've completely reimagined travel planning. From AI generation to real-time expense tracking, it's all here.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <Card variant="interactive" className="h-full group relative overflow-hidden bg-white/[0.02] hover:bg-white/[0.04]">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${feature.bg} ${feature.border} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  <feature.icon size={28} className={feature.color} />
                </div>
                <h3 className="font-display font-semibold text-xl text-white mb-3 tracking-wide">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed font-light">{feature.description}</p>
                
                {/* Glow effect on hover */}
                <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-white/10 ${feature.bg}`} style={{ mixBlendMode: 'overlay' }} />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
