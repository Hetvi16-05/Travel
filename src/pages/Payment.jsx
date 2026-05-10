import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, CreditCard, Smartphone, Building2, Shield, Lock,
  CheckCircle2, Sparkles, AlertCircle, Info,
  BedDouble, Plane, Car, Utensils, Ticket, Wallet,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import api from '../lib/api';
import { Loader } from '../components/ui/Loader';

const METHODS = [
  { id: 'card',   label: 'Credit / Debit Card', icon: CreditCard,  desc: 'Visa, Mastercard, RuPay, Amex' },
  { id: 'upi',    label: 'UPI',                 icon: Smartphone,  desc: 'GPay, PhonePe, Paytm, BHIM' },
  { id: 'netbanking', label: 'Net Banking',      icon: Building2,   desc: 'All major Indian banks supported' },
  { id: 'wallet', label: 'Wallets',             icon: Wallet,      desc: 'Paytm, Amazon Pay, MobiKwik' },
];

const BANKS = ['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'PNB', 'IndusInd', 'Yes Bank'];
const UPI_APPS = [
  { id: 'gpay',    label: 'Google Pay',  emoji: '🔵' },
  { id: 'phonepe', label: 'PhonePe',     emoji: '💜' },
  { id: 'paytm',   label: 'Paytm',       emoji: '💙' },
  { id: 'bhim',    label: 'BHIM',        emoji: '🇮🇳' },
];

const fadeUp  = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [method, setMethod] = useState('card');
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' });

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.trips.getById(id);
        setTrip(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  const handlePay = async () => {
    setPaying(true);
    try {
      // Simulate gateway delay
      await new Promise(r => setTimeout(r, 2000));
      
      // Update payment status in DB
      await api.trips.update(id, { payment_status: 'paid' });
      
      setPaid(true);
    } catch (err) {
      alert('Payment failed: ' + err.message);
    } finally {
      setPaying(false);
    }
  };

  if (loading) return (
    <DashboardLayout>
      <div className="h-screen flex items-center justify-center"><Loader size="lg" /></div>
    </DashboardLayout>
  );

  if (error || !trip) return (
    <DashboardLayout>
      <div className="h-screen flex flex-col items-center justify-center text-center p-6">
        <AlertCircle size={48} className="text-red-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Payment Session Expired</h2>
        <p className="text-white/40 mb-6">{error || 'Could not find the requested booking.'}</p>
        <button onClick={() => navigate('/trips')} className="px-6 py-2 rounded-xl bg-primary text-white font-bold">Back to Trips</button>
      </div>
    </DashboardLayout>
  );

  const subtotal = (trip.days * 140) + 225 + 150 + (trip.days * 5); // Rough estimation matching Invoice logic
  const taxes = trip.days * 20;
  const grand = subtotal + taxes + 49 - 60.50;

  if (paid) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md mx-auto px-6">
            <div className="relative w-28 h-28 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
              <div className="relative w-28 h-28 rounded-full bg-emerald-500/20 border-2 border-emerald-400/40 flex items-center justify-center">
                <CheckCircle2 size={48} className="text-emerald-400" />
              </div>
            </div>
            <h1 className="text-3xl font-display font-bold text-white mb-3">Payment Successful!</h1>
            <p className="text-white/50 mb-8">Your booking for <span className="text-white font-semibold">{trip.title}</span> is now confirmed.</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => navigate(`/trips/${id}/invoice`)} className="w-full py-3 rounded-xl bg-primary-500 text-white font-semibold shadow-glow">View Invoice</button>
              <button onClick={() => navigate('/trips')} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white/70">Back to My Trips</button>
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto pb-28 pt-2 space-y-6">
        <button onClick={() => navigate(`/trips/${id}/invoice`)} className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm font-medium group w-fit">
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Invoice
        </button>

        <div>
          <h1 className="text-4xl font-display font-bold text-white tracking-tight">Secure Checkout</h1>
          <p className="text-white/40 text-sm mt-1 flex items-center gap-1.5"><Lock size={12} className="text-emerald-400" />256-bit SSL encrypted</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-[#111827] border border-white/[0.07] rounded-[1.5rem] p-6 space-y-3">
              <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold mb-4">Payment Method</p>
              <div className="grid grid-cols-2 gap-3">
                {METHODS.map(m => (
                  <button key={m.id} onClick={() => setMethod(m.id)} className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${method === m.id ? 'bg-primary-500/10 border-primary-500/40 shadow-glow' : 'bg-white/[0.02] border-white/[0.07] hover:bg-white/[0.04]'}`}>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${method === m.id ? 'bg-primary-500/20' : 'bg-white/5'}`}><m.icon size={17} className={method === m.id ? 'text-primary-400' : 'text-white/40'} /></div>
                    <div><div className="text-sm font-semibold text-white">{m.label}</div><div className="text-[10px] text-white/30">{m.desc}</div></div>
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {method === 'card' && (
                <motion.div key="card" variants={fadeUp} initial="hidden" animate="show" exit="hidden" className="bg-[#111827] border border-white/[0.07] rounded-[1.5rem] p-6 space-y-4">
                  <div className="space-y-1"><label className="text-white/50 text-xs">Card Number</label><input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-primary/50 transition-all" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1"><label className="text-white/50 text-xs">Expiry</label><input type="text" placeholder="MM/YY" className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-primary/50 transition-all" /></div>
                    <div className="space-y-1"><label className="text-white/50 text-xs">CVV</label><input type="password" placeholder="•••" className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-primary/50 transition-all" /></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"><Shield size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" /><p className="text-white/35 text-xs">Payments are processed via Razorpay with PCI-DSS compliance.</p></div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#111827] border border-white/[0.07] rounded-[1.5rem] overflow-hidden">
              <div className="relative h-28 bg-gradient-to-br from-primary-500/20 via-violet-500/10 to-transparent flex items-center px-5">
                <div className="relative flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center"><Plane size={18} className="text-white" /></div>
                  <div><div className="text-white font-bold">{trip.title}</div><div className="text-white/40 text-xs font-mono">TRV-{new Date(trip.created_at).getFullYear()}</div></div>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-center text-sm"><span className="text-white/60">Total Due</span><span className="text-white font-display font-bold text-2xl">${grand.toFixed(2)}</span></div>
                <button onClick={handlePay} disabled={paying} className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-500 to-violet-500 text-white font-bold text-base shadow-glow hover:shadow-glow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                  {paying ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing…</> : <><Lock size={16} />Pay ${grand.toFixed(2)}</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
