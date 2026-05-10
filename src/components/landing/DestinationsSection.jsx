import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

const places = [
  { name: 'Swiss Alps', img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80', span: 'col-span-12 md:col-span-8', height: 'h-[400px]' },
  { name: 'Tokyo Neon', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80', span: 'col-span-12 md:col-span-4', height: 'h-[400px]' },
  { name: 'Amalfi Coast', img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80', span: 'col-span-12 md:col-span-4', height: 'h-[300px]' },
  { name: 'Maldives', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80', span: 'col-span-12 md:col-span-8', height: 'h-[300px]' },
];

export function DestinationsSection() {
  return (
    <section id="destinations" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Explore the impossible
            </h2>
            <p className="text-white/50 text-xl font-light">From iconic cities to hidden paradises.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
          >
            <Button variant="ghost" className="text-primary-400 hover:text-primary-300">
              View all destinations <ArrowRight size={16} className="ml-2" />
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {places.map((place, i) => (
            <motion.div
              key={place.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`${place.span} ${place.height} relative rounded-3xl overflow-hidden group cursor-pointer`}
            >
              <img 
                src={place.img} 
                alt={place.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-white font-display font-bold text-3xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{place.name}</h3>
                <p className="text-white/70 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Plan a trip with AI <ArrowRight size={14} className="inline ml-1" /></p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
