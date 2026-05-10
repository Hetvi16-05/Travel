import { Plane } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 pt-20 pb-10 px-6 bg-[#0F172A] relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-primary shadow-glow">
              <Plane size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white">Traveloop AI</span>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            The next generation of travel planning. Powered by artificial intelligence, designed for modern adventurers.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-6">Product</h4>
          <ul className="space-y-4">
            {['Features', 'Itinerary Builder', 'Budget Tracker', 'Pricing'].map(l => (
              <li key={l}><a href="#" className="text-white/50 hover:text-white text-sm transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Resources</h4>
          <ul className="space-y-4">
            {['Blog', 'Travel Guides', 'Community', 'Help Center'].map(l => (
              <li key={l}><a href="#" className="text-white/50 hover:text-white text-sm transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Company</h4>
          <ul className="space-y-4">
            {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'].map(l => (
              <li key={l}><a href="#" className="text-white/50 hover:text-white text-sm transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/30 text-sm">© {new Date().getFullYear()} Traveloop AI Inc. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer">
            <span className="text-white/50 text-xs">𝕏</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer">
            <span className="text-white/50 text-xs">in</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
