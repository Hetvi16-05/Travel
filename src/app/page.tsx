import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { PopularDestinations } from "@/components/landing/PopularDestinations";
import { Pricing } from "@/components/landing/Pricing";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <PopularDestinations />
      <Features />
      
      {/* Dynamic Stats Section */}
      <section className="py-20 px-6 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-gradient mb-2">500k+</p>
            <p className="text-sm text-white/40 uppercase tracking-widest">Trips Planned</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gradient mb-2">120+</p>
            <p className="text-sm text-white/40 uppercase tracking-widest">Countries Covered</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gradient mb-2">4.9/5</p>
            <p className="text-sm text-white/40 uppercase tracking-widest">User Rating</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gradient mb-2">24/7</p>
            <p className="text-sm text-white/40 uppercase tracking-widest">AI Assistance</p>
          </div>
        </div>
      </section>

      <Pricing />
      
      {/* CTA Section */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">Ready for your next <br /><span className="text-gradient">Adventure?</span></h2>
          <p className="text-white/60 mb-12 text-lg">Join thousands of travelers who plan their journeys with the world's most advanced AI travel assistant.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-white/90 transition-colors">
              Get Started for Free
            </button>
            <button className="text-white font-bold hover:underline">
              Speak to AI Assistant
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
