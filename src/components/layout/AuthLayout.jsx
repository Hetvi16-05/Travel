import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AuthLayout({ children, image, quote, author }) {
  return (
    <div className="min-h-screen bg-[#0A0F1C] flex">
      {/* Left side: Image and Quote (Hidden on small screens) */}
      <div className="hidden lg:flex w-[45%] relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0">
          <img src={image} alt="Travel scenery" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/40 to-transparent" />
          {/* Grain overlay for premium feel */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30" />
        </div>
        
        <Link to="/" className="relative z-10 flex items-center gap-3 w-fit">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 shadow-glow">
            <Plane size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-2xl text-white tracking-tight">Travia <span className="text-primary-400">AI</span></span>
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative z-10 max-w-md"
        >
          <p className="text-3xl font-display font-medium text-white leading-snug mb-4">
            "{quote}"
          </p>
          <p className="text-white/60 font-light">— {author}</p>
        </motion.div>
      </div>

      {/* Right side: Auth Form Container */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center items-center p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2" />
        
        <Link to="/" className="absolute top-8 left-8 lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/20 text-primary-400">
            <Plane size={16} />
          </div>
          <span className="font-display font-bold text-lg text-white">Travia AI</span>
        </Link>

        <div className="w-full max-w-md relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
