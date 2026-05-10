import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Sparkles, AlertCircle } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, googleLogin } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
<<<<<<< HEAD
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });
=======
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');
>>>>>>> 5d49661 (feat: implement Google OAuth2 authentication flow for users)

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  // Called with the credential response from Google's popup
  const handleGoogleSuccess = async (credentialResponse) => {
    setIsGoogleLoading(true);
    setError('');
    try {
      const result = await googleLogin(credentialResponse);
      if (result?.success) {
        navigate('/dashboard');
      }
    } catch (err) {
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
    // Use credential_response (id_token) flow
    ux_mode: 'popup',
  });

  // Wrapper so we can show loading state immediately on click
  const handleGoogleClick = () => {
    setIsGoogleLoading(true);
    setError('');
    signInWithGoogle();
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
      image="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80"
      quote="The AI planner saved me countless hours. It's like having a local expert in my pocket."
      author="Sarah Jenkins, Explorer"
    >
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="font-display font-bold text-4xl text-white mb-2 tracking-tight">Welcome back</h1>
          <p className="text-white/50">Enter your details to access your trips.</p>
        </motion.div>

        {/* Social Sign-in Buttons */}
        <motion.div variants={itemVariants} className="flex gap-4 mb-8">
          <button
            id="google-signin-btn"
            type="button"
            disabled={isGoogleLoading}
            onClick={handleGoogleClick}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-60 disabled:cursor-not-allowed text-white/80 transition-all font-medium group"
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
            {isGoogleLoading ? 'Signing in...' : 'Google'}
          </button>

          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 transition-colors font-medium"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.09 2.4-.88 4-.8-1.55 1.55-2.3 3.3-1.5 5.5 2.13.78 2.8 2.37 2.2 4.49-.67 1.25-1.4 2.4-2.13 3.49zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.02 4.5-3.74 4.25z" />
            </svg>
            Apple
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
            {error}
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-white/30 text-sm">or continue with email</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">

          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none group-focus-within:text-primary-400 transition-colors">
              <Mail size={18} />
            </div>
            <input 
              type="email" 
              required
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 outline-none focus:bg-white/10 focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.2)] transition-all"

            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-primary-400 hover:text-primary-300 transition-colors font-medium">
              Forgot password?
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-2">
            <Button type="submit" className="w-full h-12 text-base shadow-glow" isLoading={isLoading}>
              <Sparkles size={18} /> Sign In
            </Button>
          </motion.div>
        </form>

        <motion.p variants={itemVariants} className="text-center mt-8 text-white/50 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary-400 hover:text-primary-300 transition-colors font-medium">
            Sign up
          </Link>
        </motion.p>
      </motion.div>
    </AuthLayout>
  );
}
