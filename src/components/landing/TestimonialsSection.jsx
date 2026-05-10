import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Card } from '../ui/Card';

const testimonials = [
  { name: 'Priya Mehta', role: 'Solo Traveler', text: 'Travia AI planned my entire Ladakh road trip in 2 minutes. The budget tracker saved my life!', avatar: 'P', color: 'from-pink-500 to-rose-500' },
  { name: 'Rahul Joshi', role: 'Travel Blogger', text: 'The itinerary builder is gorgeous. I use it to create visual content for my blog. 10/10 UX.', avatar: 'R', color: 'from-blue-500 to-cyan-500' },
  { name: 'Sneha Patel', role: 'Family Traveler', text: 'Finally a travel app that feels premium. The collaborative features let my whole family vote on activities.', avatar: 'S', color: 'from-amber-500 to-orange-500' },
  { name: 'Arjun Singh', role: 'Digital Nomad', text: 'I travel 8 months a year. Travia is the only tool I need now. The AI suggestions are actually hidden gems.', avatar: 'A', color: 'from-violet-500 to-fuchsia-500' },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
            Loved by modern travelers
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <Card className="h-full bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04] transition-colors p-8 flex flex-col">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-white/70 text-base leading-relaxed mb-8 flex-1">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg bg-gradient-to-br ${t.color}`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/40">{t.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
