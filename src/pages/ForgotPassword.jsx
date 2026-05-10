import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button } from '../components/ui/Button';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <AuthLayout 
      image="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80"
      quote="The best journeys answer questions that in the beginning you didn't even think to ask."
      author="18th Century Proverb"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8">
          <ArrowLeft size={16} /> Back to log in
        </Link>

        <h1 className="font-display font-bold text-4xl text-white mb-2 tracking-tight">Reset password</h1>
        
        <AnimatePresence mode="wait">
          {!isSent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="text-white/50 mb-8">Enter your email and we'll send you a link to reset your password.</p>
              
              <form onSubmit={handleReset} className="space-y-5">
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none group-focus-within:text-primary-400 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 outline-none focus:bg-white/10 focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.2)] transition-all"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" className="w-full h-12 text-base shadow-glow" isLoading={isLoading}>
                    <Send size={18} /> Send Reset Link
                  </Button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-4">
                <Send size={24} />
              </div>
              <h3 className="text-white font-medium text-lg mb-2">Check your email</h3>
              <p className="text-white/60 text-sm mb-6">We sent a password reset link to <strong className="text-white">{email}</strong></p>
              
              <p className="text-white/40 text-sm">
                Didn't receive the email? <button onClick={() => setIsSent(false)} className="text-primary-400 hover:text-primary-300 font-medium ml-1">Click to resend</button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AuthLayout>
  );
}
