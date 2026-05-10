import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft, Printer, Download, Mail, CheckCircle2, MapPin,
  Calendar, Clock, Users, BedDouble, Car, Utensils, Ticket,
  Plane, Shield, Star, Copy, ChevronDown, Sparkles, CreditCard, AlertCircle,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

/* ─────────────────────────────────────────────────────────────
   MOCK BOOKING DATA  (in production, receive via router state
   or an API call using the trip ID from useParams)
───────────────────────────────────────────────────────────── */
const MOCK_BOOKING = {
  invoiceId: 'TRV-2024-08-4421',
  bookingDate: 'May 10, 2026',
  status: 'pending',          // 'confirmed' | 'pending' | 'cancelled'
  traveler: {
    name: 'Alex Mercer',
    email: 'alex@example.com',
    phone: '+91 98765 43210',
    tier: 'Premium Member',
  },
  trip: {
    title: 'Goa Retreat',
    emoji: '🌴',
    destination: 'Goa, India',
    checkIn: 'Oct 12, 2026',
    checkOut: 'Oct 18, 2026',
    nights: 6,
    days: 7,
    guests: 2,
    mood: 'Luxury',
  },
  lineItems: [
    {
      id: 1, category: 'Hotel', icon: BedDouble,
      description: 'Calangute Beach Resort — Deluxe Sea View (6 Nights)',
      qty: '6 nights', unitPrice: 140, total: 840,
      accent: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    },
    {
      id: 2, category: 'Flights', icon: Plane,
      description: 'GoAir BOM–GOI & GOI–BOM (2 passengers)',
      qty: '2 pax', unitPrice: 112.50, total: 225,
      accent: { text: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
    },
    {
      id: 3, category: 'Transport', icon: Car,
      description: 'Airport transfers + Scooter rental 4 days',
      qty: '1 pkg', unitPrice: 150, total: 150,
      accent: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    },
    {
      id: 4, category: 'Dining', icon: Utensils,
      description: 'AI-curated restaurant reservations (3 dinners)',
      qty: '3 meals', unitPrice: 55, total: 165,
      accent: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    },
    {
      id: 5, category: 'Activities', icon: Ticket,
      description: 'Old Goa Churches Tour + Boat Cruise + Spice Plantation',
      qty: '3 activities', unitPrice: 63.33, total: 190,
      accent: { text: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
    },
    {
      id: 6, category: 'AI Premium', icon: Sparkles,
      description: 'Traveloop AI Concierge — 24/7 itinerary support',
      qty: '7 days', unitPrice: 5, total: 35,
      accent: { text: 'text-primary-400', bg: 'bg-primary-500/10', border: 'border-primary-500/20' },
    },
  ],
  taxes: 121.25,
  discount: 60.50,
  insuranceAdded: true,
  insuranceCost: 49.00,
};

/* ─────────────────────────────────────────────────────────────
   STATUS CONFIG
───────────────────────────────────────────────────────────── */
const STATUS = {
  confirmed: { label: 'Booking Confirmed', dot: 'bg-emerald-400', ring: 'bg-emerald-400/10 border-emerald-400/30 text-emerald-400' },
  pending:   { label: 'Awaiting Confirmation', dot: 'bg-amber-400', ring: 'bg-amber-400/10 border-amber-400/30 text-amber-400' },
  cancelled: { label: 'Cancelled', dot: 'bg-red-400', ring: 'bg-red-400/10 border-red-400/30 text-red-400' },
};

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────── */
const fadeUp  = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
export default function Invoice() {
  const navigate   = useNavigate();
  const [copied, setCopied]   = useState(false);
  const [expanded, setExpanded] = useState(true);
  const booking = MOCK_BOOKING;   // replace with route state / API data

  /* Totals */
  const subtotal = booking.lineItems.reduce((s, l) => s + l.total, 0);
  const grand    = subtotal + booking.taxes + booking.insuranceCost - booking.discount;

  const st = STATUS[booking.status] ?? STATUS.confirmed;

  const copyInvoiceId = () => {
    navigator.clipboard.writeText(booking.invoiceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pb-28 pt-2 space-y-6">

        {/* ── Top bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            id="back-to-trips-btn"
            onClick={() => navigate('/trips')}
            className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm font-medium group w-fit"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to My Trips
          </button>

          <div className="flex items-center gap-2">
            <TopBtn icon={Printer}  label="Print"       onClick={() => window.print()} />
            <TopBtn icon={Mail}     label="Email"        onClick={() => {}} />
            <button
              id="download-pdf-btn"
              onClick={() => alert('PDF generation would trigger here.')}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-violet-500 text-white text-sm font-semibold shadow-glow hover:shadow-glow-lg transition-all hover:-translate-y-px active:translate-y-0"
            >
              <Download size={14} />
              Download PDF
            </button>
          </div>
        </div>

        {/* ── Page heading ── */}
        <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-1">
          <motion.h1 variants={fadeUp} className="text-4xl font-display font-bold text-white tracking-tight">
            Booking Invoice
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/40 text-sm">
            Your trip is booked — here's a full breakdown of your reservation.
          </motion.p>
        </motion.div>

        {/* ══════════════════════════════════════
            INVOICE CARD
        ══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#111827] border border-white/[0.07] rounded-[2rem] overflow-hidden shadow-card"
        >

          {/* ── Invoice Header ── */}
          <div className="relative overflow-hidden">
            {/* Ambient gradient blob */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative p-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6 border-b border-white/[0.06]">
              {/* Brand block */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center shadow-glow flex-shrink-0">
                  <Plane size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-xl font-display font-bold text-white leading-tight">
                    Traveloop <span className="text-primary-400">AI</span>
                  </div>
                  <div className="text-white/35 text-xs mt-0.5">AI-Powered Travel Planning</div>
                  <div className="flex items-center gap-1.5 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-white/30 text-xs ml-1">Verified Partner</span>
                  </div>
                </div>
              </div>

              {/* Invoice meta */}
              <div className="flex flex-col items-start md:items-end gap-2">
                <div className="text-white/30 text-[10px] uppercase tracking-[0.15em] font-medium">Invoice Reference</div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-mono font-bold text-lg tracking-wide">#{booking.invoiceId}</span>
                  <button
                    onClick={copyInvoiceId}
                    className="p-1 rounded-md hover:bg-white/10 text-white/30 hover:text-white/70 transition-colors"
                    title="Copy ID"
                  >
                    <AnimatePresence mode="wait">
                      {copied
                        ? <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><CheckCircle2 size={13} className="text-emerald-400" /></motion.div>
                        : <motion.div key="copy"  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Copy size={13} /></motion.div>
                      }
                    </AnimatePresence>
                  </button>
                </div>
                <div className="text-white/30 text-xs">Issued: {booking.bookingDate}</div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${st.ring}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${st.dot} animate-pulse`} />
                  {st.label}
                </span>
              </div>
            </div>
          </div>

          {/* ── Trip Summary Banner ── */}
          <div className="px-8 py-6 bg-gradient-to-r from-primary-500/5 via-transparent to-violet-500/5 border-b border-white/[0.06]">
            <div className="flex flex-wrap gap-8">
              <SummaryChip icon={MapPin}    label="Destination" value={`${booking.trip.destination} ${booking.trip.emoji}`} />
              <SummaryChip icon={Calendar}  label="Check-in"    value={booking.trip.checkIn} />
              <SummaryChip icon={Calendar}  label="Check-out"   value={booking.trip.checkOut} />
              <SummaryChip icon={Clock}     label="Duration"    value={`${booking.trip.days} Days, ${booking.trip.nights} Nights`} />
              <SummaryChip icon={Users}     label="Guests"      value={`${booking.trip.guests} Travelers`} />
            </div>
          </div>

          {/* ── Traveler Details ── */}
          <div className="px-8 py-6 border-b border-white/[0.06]">
            <SectionHeader label="Traveler Details" />
            <div className="flex flex-wrap gap-6 mt-4">
              <div>
                <div className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Full Name</div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-violet-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                    {booking.traveler.name[0]}
                  </div>
                  <span className="text-white font-semibold">{booking.traveler.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 font-semibold">
                    {booking.traveler.tier}
                  </span>
                </div>
              </div>
              <TravelerMeta label="Email"  value={booking.traveler.email} />
              <TravelerMeta label="Phone"  value={booking.traveler.phone} />
              <TravelerMeta label="Trip Mood" value={booking.trip.mood} />
            </div>
          </div>

          {/* ── Line Items ── */}
          <div className="px-8 py-6 border-b border-white/[0.06]">
            <button
              onClick={() => setExpanded(v => !v)}
              className="w-full flex items-center justify-between group mb-4"
            >
              <SectionHeader label="Booking Items" />
              <ChevronDown
                size={16}
                className={`text-white/30 group-hover:text-white/60 transition-all duration-200 ${expanded ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Table header */}
            <div className="hidden md:grid grid-cols-12 text-[10px] text-white/25 uppercase tracking-widest px-4 pb-3 font-medium">
              <span className="col-span-6">Description</span>
              <span className="col-span-2 text-center">Category</span>
              <span className="col-span-2 text-right">Qty / Rate</span>
              <span className="col-span-2 text-right">Total</span>
            </div>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  key="items"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-2">
                    {booking.lineItems.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={fadeUp}
                        className="grid grid-cols-12 items-center px-4 py-4 rounded-xl bg-white/[0.015] border border-white/[0.06] hover:bg-white/[0.03] transition-colors group cursor-default"
                      >
                        {/* Description */}
                        <div className="col-span-12 md:col-span-6 flex items-start gap-3 mb-2 md:mb-0">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${item.accent.bg} border ${item.accent.border}`}>
                            <item.icon size={15} className={item.accent.text} />
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium leading-snug group-hover:text-primary-300 transition-colors">
                              {item.description}
                            </div>
                            <div className={`text-[10px] mt-0.5 font-semibold ${item.accent.text} md:hidden`}>
                              {item.category}
                            </div>
                          </div>
                        </div>
                        {/* Category */}
                        <div className="hidden md:flex col-span-2 justify-center">
                          <span className={`text-[10px] px-2.5 py-1 rounded-lg font-semibold ${item.accent.bg} ${item.accent.text} border ${item.accent.border}`}>
                            {item.category}
                          </span>
                        </div>
                        {/* Qty */}
                        <div className="col-span-6 md:col-span-2 text-right">
                          <div className="text-white/40 text-xs">{item.qty}</div>
                          <div className="text-white/30 text-[10px]">${item.unitPrice.toFixed(2)} ea.</div>
                        </div>
                        {/* Total */}
                        <div className="col-span-6 md:col-span-2 text-right">
                          <span className="text-white font-semibold">${item.total.toFixed(2)}</span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Totals ── */}
          <div className="px-8 py-6">
            <div className="ml-auto max-w-sm space-y-3">
              <TotalRow label="Subtotal"                value={`$${subtotal.toFixed(2)}`}    />
              <TotalRow label="Taxes & Fees (8%)"       value={`+$${booking.taxes.toFixed(2)}`} muted />
              {booking.insuranceAdded && (
                <TotalRow
                  label={<span className="flex items-center gap-1.5"><Shield size={12} className="text-emerald-400" />Travel Insurance</span>}
                  value={`+$${booking.insuranceCost.toFixed(2)}`}
                  muted
                />
              )}
              <TotalRow label="Loyalty Discount (3%)"  value={`-$${booking.discount.toFixed(2)}`} green />

              <div className="h-px bg-white/10 my-2" />

              {/* Grand total */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white/40 text-xs">Amount Due</div>
                  <div className="text-3xl font-display font-bold text-white mt-0.5">
                    ${grand.toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${st.ring}`}>
                    <CheckCircle2 size={12} />
                    {booking.status === 'confirmed' ? 'Paid in Full' : st.label}
                  </span>
                  <div className="text-white/25 text-[10px] mt-1.5">USD · {booking.bookingDate}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Pay Now CTA (shown for pending bookings) ── */}
          {booking.status === 'pending' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mx-8 mb-6 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3"
            >
              <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
                <AlertCircle size={15} />
                Payment Required to Confirm Booking
              </div>
              <p className="text-white/35 text-xs leading-relaxed">
                Your trip is reserved but not yet confirmed. Complete payment to lock in your booking and receive the full AI-generated itinerary.
              </p>
              <button
                id="pay-now-invoice-btn"
                onClick={() => navigate('/payment')}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm hover:-translate-y-px active:translate-y-0 transition-all"
              >
                <CreditCard size={15} />
                Pay ${grand.toFixed(2)} to Confirm Trip
              </button>
            </motion.div>
          )}

          {/* ── Footer strip ── */}
          <div className="px-8 py-5 bg-white/[0.015] border-t border-white/[0.06] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="text-white/25 text-xs">
              Traveloop AI · support@traveloop.ai · traveloop.ai
            </p>
            <p className="text-white/20 text-xs">
              This invoice was auto-generated. For support, quote reference <span className="text-white/40 font-mono">#{booking.invoiceId}</span>.
            </p>
          </div>

        </motion.div>

        {/* ── CTA after booking ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary-500/10 via-violet-500/5 to-transparent border border-primary-500/20"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
              <Sparkles size={18} className="text-primary-400" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Your itinerary is being crafted by AI</div>
              <div className="text-white/40 text-xs">Check the Itinerary Builder to view your day-by-day plan.</div>
            </div>
          </div>
          <button
            id="view-itinerary-btn"
            onClick={() => navigate('/trips')}
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition-all shadow-glow hover:-translate-y-px active:translate-y-0"
          >
            View Itinerary <ArrowLeft size={14} className="rotate-180" />
          </button>
        </motion.div>

      </div>
    </DashboardLayout>
  );
}

/* ─────────────────────────────────────────────────────────────
   SMALL HELPER COMPONENTS
───────────────────────────────────────────────────────────── */
function TopBtn({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/50 text-sm font-medium hover:bg-white/10 hover:text-white/80 transition-all"
    >
      <Icon size={13} />
      {label}
    </button>
  );
}

function SectionHeader({ label }) {
  return (
    <span className="text-white/30 text-[10px] uppercase tracking-[0.15em] font-semibold select-none">
      {label}
    </span>
  );
}

function SummaryChip({ icon: Icon, label, value }) {
  return (
    <div>
      <div className="flex items-center gap-1 text-white/25 text-[10px] uppercase tracking-widest mb-1 font-medium">
        <Icon size={9} />
        {label}
      </div>
      <div className="text-white font-semibold text-sm">{value}</div>
    </div>
  );
}

function TravelerMeta({ label, value }) {
  return (
    <div>
      <div className="text-white/30 text-[10px] uppercase tracking-widest mb-1">{label}</div>
      <div className="text-white/80 text-sm font-medium">{value}</div>
    </div>
  );
}

function TotalRow({ label, value, muted = false, green = false }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${muted ? 'text-white/40' : 'text-white/60'}`}>{label}</span>
      <span className={`text-sm font-semibold ${green ? 'text-emerald-400' : muted ? 'text-white/50' : 'text-white'}`}>
        {value}
      </span>
    </div>
  );
}
