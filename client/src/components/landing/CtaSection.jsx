import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export function CtaSection() {
  const navigate = useNavigate();

  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative rounded-[3rem] overflow-hidden bg-[#111827] border border-white/10 p-12 md:p-24 text-center shadow-[0_0_100px_rgba(99,102,241,0.15)]"
        >
          {/* Subtle Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/20 blur-[120px] rounded-[100%] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="font-display font-black text-5xl md:text-7xl text-white mb-8 tracking-tight">
              Your next adventure <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-violet-400">starts right here.</span>
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto mb-12 font-light">
              Join thousands of modern travelers who have upgraded their planning experience. It takes seconds to generate your first itinerary.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-10 text-lg shadow-glow w-full sm:w-auto" onClick={() => navigate('/signup')}>
                <Sparkles size={20} /> Create Free Account
              </Button>
            </div>
            <p className="text-white/30 text-sm mt-8">No credit card required. Cancel anytime.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
