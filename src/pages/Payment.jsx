import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, CreditCard, Smartphone, Building2, Shield, Lock,
  CheckCircle2, ChevronRight, Sparkles, AlertCircle, Info,
  BedDouble, Plane, Car, Utensils, Ticket, Wallet,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

/* ─── Order Summary (mirrors Invoice mock) ─────────────────── */
const ORDER = {
  tripTitle:   'Goa Retreat 🌴',
  invoiceId:   'TRV-2024-08-4421',
  subtotal:    1605.00,
  taxes:       121.25,
  insurance:   49.00,
  discount:    60.50,
  lineItems: [
    { icon: BedDouble, label: 'Hotel (6 nights)',   amount: 840,  accent: 'text-violet-400' },
    { icon: Plane,     label: 'Flights (2 pax)',    amount: 225,  accent: 'text-sky-400' },
    { icon: Car,       label: 'Transport pack',     amount: 150,  accent: 'text-amber-400' },
    { icon: Utensils,  label: 'Dining (3 dinners)', amount: 165,  accent: 'text-emerald-400' },
    { icon: Ticket,    label: 'Activities (3)',      amount: 190,  accent: 'text-pink-400' },
    { icon: Sparkles,  label: 'AI Concierge',       amount: 35,   accent: 'text-primary-400' },
  ],
};

const GRAND = ORDER.subtotal + ORDER.taxes + ORDER.insurance - ORDER.discount;

/* ─── Payment Methods ───────────────────────────────────────── */
const METHODS = [
  { id: 'card',   label: 'Credit / Debit Card', icon: CreditCard,  desc: 'Visa, Mastercard, RuPay, Amex' },
  { id: 'upi',    label: 'UPI',                 icon: Smartphone,  desc: 'GPay, PhonePe, Paytm, BHIM' },
  { id: 'netbanking', label: 'Net Banking',      icon: Building2,   desc: 'All major Indian banks supported' },
  { id: 'wallet', label: 'Wallets',             icon: Wallet,      desc: 'Paytm, Amazon Pay, MobiKwik' },
];

const BANKS = ['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'PNB', 'IndusInd', 'Yes Bank'];
const UPI_APPS = [
  { id: 'gpay',    label: 'Google Pay',  color: 'bg-white',           emoji: '🔵' },
  { id: 'phonepe', label: 'PhonePe',     color: 'bg-purple-600/20',   emoji: '💜' },
  { id: 'paytm',   label: 'Paytm',       color: 'bg-blue-500/20',     emoji: '💙' },
  { id: 'bhim',    label: 'BHIM',        color: 'bg-orange-500/20',   emoji: '🇮🇳' },
];

const fadeUp  = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
export default function Payment() {
  const navigate = useNavigate();
  const [method, setMethod]         = useState('card');
  const [selectedBank, setBank]     = useState('');
  const [selectedUpi, setUpi]       = useState('');
  const [upiId, setUpiId]           = useState('');
  const [paying, setPaying]         = useState(false);
  const [paid, setPaid]             = useState(false);
  const [saveCard, setSaveCard]     = useState(true);
  const [card, setCard]             = useState({ number: '', expiry: '', cvv: '', name: '' });

  /* ── Format card number with spaces ── */
  const fmtCard = (v) => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
  const fmtExp  = (v) => {
    const d = v.replace(/\D/g,'').slice(0,4);
    return d.length > 2 ? d.slice(0,2)+'/'+d.slice(2) : d;
  };

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => { setPaying(false); setPaid(true); }, 2800);
  };

  /* ─── SUCCESS SCREEN ─── */
  if (paid) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="text-center max-w-md mx-auto px-6"
          >
            {/* Success ring */}
            <div className="relative w-28 h-28 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
              <div className="relative w-28 h-28 rounded-full bg-emerald-500/20 border-2 border-emerald-400/40 flex items-center justify-center">
                <CheckCircle2 size={48} className="text-emerald-400" />
              </div>
            </div>

            <h1 className="text-3xl font-display font-bold text-white mb-3">Payment Successful!</h1>
            <p className="text-white/50 mb-2">
              Your booking for <span className="text-white font-semibold">{ORDER.tripTitle}</span> is now confirmed.
            </p>
            <p className="text-white/30 text-sm mb-8">
              A receipt has been sent to your email. Reference: <span className="font-mono text-white/50">{ORDER.invoiceId}</span>
            </p>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 mb-8 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Amount Paid</span>
                <span className="text-white font-bold">${GRAND.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Payment Method</span>
                <span className="text-white/80 capitalize">{method === 'card' ? 'Card' : method.toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Date</span>
                <span className="text-white/80">{new Date().toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/invoice')}
                className="w-full py-3 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors shadow-glow"
              >
                View Invoice
              </button>
              <button
                onClick={() => navigate('/trips')}
                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 font-medium hover:bg-white/10 hover:text-white transition-colors"
              >
                Back to My Trips
              </button>
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  /* ─── MAIN PAYMENT PAGE ─── */
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto pb-28 pt-2 space-y-6">

        {/* ── Nav ── */}
        <button
          onClick={() => navigate('/invoice')}
          className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm font-medium group w-fit"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Invoice
        </button>

        <div>
          <h1 className="text-4xl font-display font-bold text-white tracking-tight">Secure Checkout</h1>
          <p className="text-white/40 text-sm mt-1 flex items-center gap-1.5">
            <Lock size={12} className="text-emerald-400" />
            256-bit SSL encrypted · Your payment details are safe
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

          {/* ══ LEFT — Payment form ══ */}
          <div className="lg:col-span-3 space-y-4">

            {/* Method selector */}
            <div className="bg-[#111827] border border-white/[0.07] rounded-[1.5rem] p-6 space-y-3">
              <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold mb-4">Payment Method</p>
              <div className="grid grid-cols-2 gap-3">
                {METHODS.map(m => (
                  <button
                    key={m.id}
                    id={`method-${m.id}-btn`}
                    onClick={() => { setMethod(m.id); setBank(''); setUpi(''); }}
                    className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                      method === m.id
                        ? 'bg-primary-500/10 border-primary-500/40 shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                        : 'bg-white/[0.02] border-white/[0.07] hover:bg-white/[0.04] hover:border-white/[0.12]'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${method === m.id ? 'bg-primary-500/20' : 'bg-white/5'}`}>
                      <m.icon size={17} className={method === m.id ? 'text-primary-400' : 'text-white/40'} />
                    </div>
                    <div className="min-w-0">
                      <div className={`text-sm font-semibold ${method === m.id ? 'text-white' : 'text-white/60'}`}>{m.label}</div>
                      <div className="text-[10px] text-white/30 truncate">{m.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ─ Method-specific form ─ */}
            <AnimatePresence mode="wait">

              {/* CARD FORM */}
              {method === 'card' && (
                <motion.div key="card" variants={fadeUp} initial="hidden" animate="show" exit="hidden"
                  className="bg-[#111827] border border-white/[0.07] rounded-[1.5rem] p-6 space-y-4"
                >
                  <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold">Card Details</p>

                  {/* Card number */}
                  <div className="space-y-1">
                    <label className="text-white/50 text-xs">Card Number</label>
                    <div className="relative">
                      <CreditCard size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                      <input
                        id="card-number-input"
                        type="text"
                        inputMode="numeric"
                        placeholder="1234 5678 9012 3456"
                        value={card.number}
                        onChange={e => setCard({...card, number: fmtCard(e.target.value)})}
                        className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 text-sm font-mono outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all"
                      />
                    </div>
                  </div>

                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-white/50 text-xs">Cardholder Name</label>
                    <input
                      id="card-name-input"
                      type="text"
                      placeholder="As printed on card"
                      value={card.name}
                      onChange={e => setCard({...card, name: e.target.value})}
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 text-sm outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all"
                    />
                  </div>

                  {/* Expiry + CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-white/50 text-xs">Expiry Date</label>
                      <input
                        id="card-expiry-input"
                        type="text"
                        placeholder="MM/YY"
                        value={card.expiry}
                        onChange={e => setCard({...card, expiry: fmtExp(e.target.value)})}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 text-sm font-mono outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-white/50 text-xs flex items-center gap-1">
                        CVV <Info size={10} className="text-white/20" />
                      </label>
                      <input
                        id="card-cvv-input"
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        value={card.cvv}
                        onChange={e => setCard({...card, cvv: e.target.value.replace(/\D/g,'').slice(0,4)})}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 text-sm font-mono outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all"
                      />
                    </div>
                  </div>

                  {/* Save card toggle */}
                  <button
                    onClick={() => setSaveCard(v => !v)}
                    className="flex items-center gap-3 w-full p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors"
                  >
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${saveCard ? 'bg-primary-500 border-primary-500' : 'border-white/20'}`}>
                      {saveCard && <CheckCircle2 size={12} className="text-white" />}
                    </div>
                    <span className="text-sm text-white/60">Save card for faster future payments</span>
                  </button>
                </motion.div>
              )}

              {/* UPI FORM */}
              {method === 'upi' && (
                <motion.div key="upi" variants={fadeUp} initial="hidden" animate="show" exit="hidden"
                  className="bg-[#111827] border border-white/[0.07] rounded-[1.5rem] p-6 space-y-4"
                >
                  <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold">Choose UPI App</p>
                  <div className="grid grid-cols-4 gap-3">
                    {UPI_APPS.map(app => (
                      <button
                        key={app.id}
                        onClick={() => setUpi(app.id)}
                        className={`flex flex-col items-center gap-2 py-4 rounded-xl border text-center transition-all ${
                          selectedUpi === app.id
                            ? 'bg-primary-500/10 border-primary-500/40'
                            : 'bg-white/[0.02] border-white/[0.07] hover:bg-white/[0.04]'
                        }`}
                      >
                        <span className="text-2xl">{app.emoji}</span>
                        <span className={`text-xs font-semibold ${selectedUpi === app.id ? 'text-primary-300' : 'text-white/50'}`}>{app.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="relative flex items-center gap-3">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-white/30 text-xs">or enter UPI ID</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  <input
                    id="upi-id-input"
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 text-sm outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all"
                  />
                </motion.div>
              )}

              {/* NET BANKING FORM */}
              {method === 'netbanking' && (
                <motion.div key="nb" variants={fadeUp} initial="hidden" animate="show" exit="hidden"
                  className="bg-[#111827] border border-white/[0.07] rounded-[1.5rem] p-6 space-y-4"
                >
                  <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold">Select Your Bank</p>
                  <div className="grid grid-cols-4 gap-3">
                    {BANKS.map(b => (
                      <button
                        key={b}
                        onClick={() => setBank(b)}
                        className={`py-3 px-2 rounded-xl border text-xs font-semibold transition-all ${
                          selectedBank === b
                            ? 'bg-primary-500/10 border-primary-500/40 text-primary-300'
                            : 'bg-white/[0.02] border-white/[0.07] text-white/50 hover:bg-white/[0.04] hover:text-white/70'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  {selectedBank && (
                    <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                      className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-sm"
                    >
                      <CheckCircle2 size={14} />
                      {selectedBank} selected. You'll be redirected to your bank's secure portal.
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* WALLET FORM */}
              {method === 'wallet' && (
                <motion.div key="wallet" variants={fadeUp} initial="hidden" animate="show" exit="hidden"
                  className="bg-[#111827] border border-white/[0.07] rounded-[1.5rem] p-6 space-y-4"
                >
                  <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold">Select Wallet</p>
                  {['Paytm Wallet', 'Amazon Pay', 'MobiKwik', 'Freecharge'].map(w => (
                    <button
                      key={w}
                      onClick={() => setUpi(w)}
                      className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl border text-sm font-medium transition-all ${
                        selectedUpi === w
                          ? 'bg-primary-500/10 border-primary-500/40 text-white'
                          : 'bg-white/[0.02] border-white/[0.07] text-white/60 hover:bg-white/[0.04]'
                      }`}
                    >
                      {w}
                      {selectedUpi === w && <CheckCircle2 size={15} className="text-primary-400" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Security note */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <Shield size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-white/35 text-xs leading-relaxed">
                Payments are processed via <span className="text-white/50">Razorpay</span> with PCI-DSS Level 1 compliance. We never store your full card details.
              </p>
            </div>
          </div>

          {/* ══ RIGHT — Order summary ══ */}
          <div className="lg:col-span-2 space-y-4 lg:sticky lg:top-20">

            {/* Summary card */}
            <div className="bg-[#111827] border border-white/[0.07] rounded-[1.5rem] overflow-hidden">
              {/* Trip banner */}
              <div className="relative h-28 bg-gradient-to-br from-primary-500/20 via-violet-500/10 to-transparent flex items-center px-5">
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 to-transparent" />
                <div className="relative flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                    <Plane size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold">{ORDER.tripTitle}</div>
                    <div className="text-white/40 text-xs font-mono">#{ORDER.invoiceId}</div>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold">Order Summary</p>

                {/* Line items */}
                <div className="space-y-2.5">
                  {ORDER.lineItems.map((li, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <li.icon size={13} className={li.accent} />
                        <span className="text-white/55 text-sm">{li.label}</span>
                      </div>
                      <span className="text-white/70 text-sm">${li.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-white/[0.06]" />

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/40">
                    <span>Subtotal</span><span>${ORDER.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/40">
                    <span>Taxes (8%)</span><span>+${ORDER.taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/40">
                    <span className="flex items-center gap-1"><Shield size={11} className="text-emerald-400" />Insurance</span>
                    <span>+${ORDER.insurance.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>Loyalty Discount</span><span>-${ORDER.discount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="h-px bg-white/[0.06]" />

                <div className="flex justify-between items-center">
                  <span className="text-white/60 font-medium">Total Due</span>
                  <span className="text-white font-display font-bold text-2xl">${GRAND.toFixed(2)}</span>
                </div>

                {/* Pay button */}
                <button
                  id="pay-now-btn"
                  onClick={handlePay}
                  disabled={paying}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-500 to-violet-500 text-white font-bold text-base shadow-glow hover:shadow-glow-lg transition-all hover:-translate-y-px active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {paying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing…
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      Pay ${GRAND.toFixed(2)}
                    </>
                  )}
                </button>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-4 pt-1">
                  {['Razorpay', 'PCI DSS', 'SSL Secure'].map(b => (
                    <div key={b} className="flex items-center gap-1 text-white/20 text-[10px]">
                      <Shield size={9} />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Help note */}
            <div className="flex items-start gap-2 px-1">
              <AlertCircle size={13} className="text-white/20 flex-shrink-0 mt-0.5" />
              <p className="text-white/25 text-xs">
                Booking is held for <span className="text-white/40">15 minutes</span>. Price may change if session expires. Need help? <button className="text-primary-400 underline underline-offset-2">Contact support.</button>
              </p>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
