import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import { Button } from '../ui/Button';

export function LandingNavbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-500"
      style={{ 
        background: scrolled ? 'rgba(15,23,42,0.8)' : 'transparent', 
        backdropFilter: scrolled ? 'blur(20px)' : 'none', 
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent' 
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-primary shadow-glow">
          <Plane size={20} className="text-white" />
        </div>
        <span className="font-display font-bold text-2xl text-white tracking-tight">Traveloop <span className="text-primary-400">AI</span></span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 bg-white/5 px-8 py-2 rounded-full border border-white/10 backdrop-blur-md">
        {['Features', 'Showcase', 'Destinations', 'Testimonials'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            {item}
          </a>
        ))}
      </div>
      
      <div className="flex items-center gap-4">
        <Link to="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors hidden sm:block">
          Sign in
        </Link>
        <Button onClick={() => navigate('/signup')} size="sm" className="shadow-glow">
          Get Started
        </Button>
      </div>
    </motion.nav>
  );
}
