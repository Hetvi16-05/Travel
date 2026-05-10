import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const isPasswordValid = formData.password.length >= 8;

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      setError('Password must be at least 8 characters long');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <AuthLayout
      image="https://images.unsplash.com/photo-1522083111333-81a4eb862b5d?w=1200&q=80"
      quote="Planning a group trip used to be a nightmare. Now, we vote on everything and Travia handles the rest."
      author="The Wanderlust Crew"
    >
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="font-display font-bold text-4xl text-white mb-2 tracking-tight">Create an account</h1>
          <p className="text-white/50">Start your AI-powered travel journey today.</p>
        </motion.div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
          >
            <AlertCircle size={16} className="shrink-0" />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none group-focus-within:text-primary-400 transition-colors">
              <User size={18} />
            </div>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Full name"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 outline-none focus:bg-white/10 focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.2)] transition-all"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none group-focus-within:text-primary-400 transition-colors">
              <Mail size={18} />
            </div>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email address"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 outline-none focus:bg-white/10 focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.2)] transition-all"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none group-focus-within:text-primary-400 transition-colors">
              <Lock size={18} />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Create password"
              className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 outline-none focus:bg-white/10 focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.2)] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            {/* Validation Indicator */}
            <div className="absolute -bottom-6 left-1 flex items-center gap-2">
              <CheckCircle2 size={12} className={`transition-colors ${isPasswordValid ? 'text-green-400' : 'text-white/20'}`} />
              <span className={`text-xs transition-colors ${isPasswordValid ? 'text-green-400/80' : 'text-white/40'}`}>
                Must be at least 8 characters
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-6">
            <Button
              type="submit"
              className="w-full h-12 text-base shadow-glow"
              isLoading={isLoading}
              disabled={!isPasswordValid}
            >
              <Sparkles size={18} /> Create Account
            </Button>
          </motion.div>
        </form>

        <motion.p variants={itemVariants} className="text-center mt-8 text-white/50 text-sm">
          By signing up, you agree to our{' '}
          <a href="#" className="text-white hover:underline">Terms of Service</a> and{' '}
          <a href="#" className="text-white hover:underline">Privacy Policy</a>.
        </motion.p>

        <motion.p variants={itemVariants} className="text-center mt-6 text-white/50 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-400 hover:text-primary-300 transition-colors font-medium">
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </AuthLayout>
  );
}
