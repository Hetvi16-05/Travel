import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { HeroSection } from '../components/landing/HeroSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { ShowcaseSection } from '../components/landing/ShowcaseSection';
import { DestinationsSection } from '../components/landing/DestinationsSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { CtaSection } from '../components/landing/CtaSection';
import { Footer } from '../components/landing/Footer';

export default function Landing() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Smooth scrolling for anchor links
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-[#0F172A] min-h-screen text-slate-50 selection:bg-primary-500/30 selection:text-primary-100 font-sans overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-primary transform origin-left z-[60]"
        style={{ scaleX }}
      />

      <LandingNavbar />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <ShowcaseSection />
        <DestinationsSection />
        <TestimonialsSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
