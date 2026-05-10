import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
<<<<<<< HEAD


export default function Signup() {
  const navigate = useNavigate();
  const { register } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
=======

export default function Signup() {
  const navigate = useNavigate();
  const { googleLogin } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
>>>>>>> 5d49661 (feat: implement Google OAuth2 authentication flow for users)
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

<<<<<<< HEAD
=======
  const handleGoogleSuccess = async (credentialResponse) => {
    setIsGoogleLoading(true);
    setError('');
    try {
      const result = await googleLogin(credentialResponse);
      if (result?.success) {
        navigate('/dashboard');
      }
    } catch {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const signInWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => {
      setError('Google sign-in was cancelled or failed.');
      setIsGoogleLoading(false);
    },
    flow: 'implicit',
    ux_mode: 'popup',
  });

  const handleGoogleClick = () => {
    setIsGoogleLoading(true);
    setError('');
    signInWithGoogle();
  };
>>>>>>> 5d49661 (feat: implement Google OAuth2 authentication flow for users)

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
      quote="Planning a group trip used to be a nightmare. Now, we vote on everything and Traveloop handles the rest."
      author="The Wanderlust Crew"
    >
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="font-display font-bold text-4xl text-white mb-2 tracking-tight">Create an account</h1>
          <p className="text-white/50">Start your AI-powered travel journey today.</p>
        </motion.div>

<<<<<<< HEAD
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
=======
        {/* Google Sign Up Button */}
        <motion.div variants={itemVariants} className="mb-6">
          <button
            id="google-signup-btn"
            type="button"
            disabled={isGoogleLoading}
            onClick={handleGoogleClick}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-60 disabled:cursor-not-allowed text-white/80 transition-all font-medium"
          >
            {isGoogleLoading ? (
              <svg className="w-5 h-5 animate-spin text-white/60" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            {isGoogleLoading ? 'Signing up...' : 'Continue with Google'}
          </button>
        </motion.div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
          >
            <AlertCircle size={16} className="shrink-0" />
>>>>>>> 5d49661 (feat: implement Google OAuth2 authentication flow for users)
            {error}
          </motion.div>
        )}

<<<<<<< HEAD
=======
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-white/30 text-sm">or sign up with email</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </motion.div>

>>>>>>> 5d49661 (feat: implement Google OAuth2 authentication flow for users)
        <form onSubmit={handleSignup} className="space-y-5">

          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none group-focus-within:text-primary-400 transition-colors">
              <User size={18} />
            </div>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
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
              onChange={(e) => setFormData({...formData, email: e.target.value})}
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
              onChange={(e) => setFormData({...formData, password: e.target.value})}
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
            <Button type="submit" className="w-full h-12 text-base shadow-glow" isLoading={isLoading}>
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
