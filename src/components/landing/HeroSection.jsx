import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

const destinations = [
  { name: 'Santorini', temp: '24°C', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80', x: '15%', y: '25%', rotate: -6 },
  { name: 'Bali', temp: '30°C', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80', x: '75%', y: '50%', rotate: 8 },
  { name: 'Kyoto', temp: '18°C', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80', x: '60%', y: '15%', rotate: 4 },
];

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden pt-32 pb-20">
      {/* Premium Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-30 blur-[120px] bg-primary" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[120px] bg-violet-600" />
        <div className="absolute top-[40%] left-[50%] w-[30%] h-[30%] rounded-full opacity-10 blur-[100px] bg-amber-500 -translate-x-1/2 -translate-y-1/2" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }} 
        animate={{ opacity: 1, y: 0, scale: 1 }} 
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <Badge variant="primary" className="mb-8 py-2 px-4 text-sm border-primary/50 shadow-glow bg-primary/10 backdrop-blur-md">
          <Sparkles size={14} className="text-primary-400" /> 
          <span className="text-primary-100">Traveloop AI is now in Beta</span>
        </Badge>

        <h1 className="font-display font-black text-6xl md:text-8xl leading-[1.1] tracking-tight mb-8 max-w-5xl text-white">
          Plan Smarter <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-violet-400 to-primary-400 animate-shimmer" style={{ backgroundSize: '200% auto' }}>Journeys</span>
          {' '}with AI
        </h1>

        <p className="text-lg md:text-2xl text-white/60 max-w-2xl mb-12 leading-relaxed font-light">
          Your intelligent travel companion that generates hyper-personalized itineraries and tracks budgets — in seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-24">
          <Button onClick={() => navigate('/signup')} size="lg" className="h-14 px-8 text-lg w-full sm:w-auto">
            <Sparkles size={20} /> Start Planning Free
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate('/dashboard')} className="h-14 px-8 text-lg w-full sm:w-auto bg-white/5 backdrop-blur-md">
            Explore Trips <ArrowRight size={20} />
          </Button>
        </div>
      </motion.div>

      {/* Floating Parallax Cards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden h-[120vh]">
        {destinations.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: 1, 
              y: [0, -20, 0],
              rotate: [d.rotate, d.rotate + 2, d.rotate]
            }}
            transition={{ 
              opacity: { delay: 0.5 + i * 0.2, duration: 1 },
              y: { duration: 6 + i, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 8 + i, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="absolute rounded-2xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.5)] border border-white/20 backdrop-blur-sm"
            style={{ left: d.x, top: d.y, width: 220, height: 150 }}
          >
            <img src={d.img} alt={d.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-4">
              <p className="text-white text-sm font-bold tracking-wide">{d.name}</p>
              <p className="text-white/70 text-xs font-medium">{d.temp}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-xs font-medium uppercase tracking-widest">Scroll to explore</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
}
