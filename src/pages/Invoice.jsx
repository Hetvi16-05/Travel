import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Printer, Download, Mail, CheckCircle2, MapPin,
  Calendar, Clock, Users, BedDouble, Car, Utensils, Ticket,
  Plane, Shield, Star, Copy, ChevronDown, Sparkles, CreditCard, AlertCircle,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import api from '../lib/api';
import { useApp } from '../context/AppContext';
import { Loader } from '../components/ui/Loader';

const STATUS = {
  confirmed: { label: 'Booking Confirmed', dot: 'bg-emerald-400', ring: 'bg-emerald-400/10 border-emerald-400/30 text-emerald-400' },
  pending:   { label: 'Awaiting Confirmation', dot: 'bg-amber-400', ring: 'bg-amber-400/10 border-amber-400/30 text-amber-400' },
  cancelled: { label: 'Cancelled', dot: 'bg-red-400', ring: 'bg-red-400/10 border-red-400/30 text-red-400' },
};

const fadeUp  = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };

export default function Invoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useApp();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const res = await api.trips.getById(id);
        setTrip(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTripData();
  }, [id]);

  if (loading) return (
    <DashboardLayout>
      <div className="h-screen flex items-center justify-center"><Loader size="lg" /></div>
    </DashboardLayout>
  );

  if (error || !trip) return (
    <DashboardLayout>
      <div className="h-screen flex flex-col items-center justify-center text-center p-6">
        <AlertCircle size={48} className="text-red-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Invoice Not Found</h2>
        <p className="text-white/40 mb-6">{error || 'Could not find the requested booking.'}</p>
        <button onClick={() => navigate('/trips')} className="px-6 py-2 rounded-xl bg-primary text-white font-bold">Back to Trips</button>
      </div>
    </DashboardLayout>
  );

  // Derive booking data from trip
  const startDate = trip.start_date ? new Date(trip.start_date) : null;
  const endDate = trip.end_date ? new Date(trip.end_date) : null;
  
  const isValidRange = startDate && endDate && !isNaN(startDate) && !isNaN(endDate);
  const nights = isValidRange ? Math.max(0, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))) : 0;
  const totalDays = nights + 1;

  const booking = {
    invoiceId: `TRV-${new Date(trip.created_at).getFullYear()}-${(trip.id || '0000').slice(0, 4).toUpperCase()}`,
    bookingDate: new Date(trip.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    status: trip.payment_status === 'paid' ? 'confirmed' : 'pending',
    traveler: {
      name: user?.name || 'Guest Traveler',
      email: user?.email || 'traveler@travia.ai',
      phone: '+91 ' + (user?.phone || '98765 43210'),
      tier: 'Premium Member',
    },
    trip: {
      title: trip.title || 'Untitled Trip',
      emoji: '🌍',
      destination: trip.destination || 'Global',
      checkIn: startDate && !isNaN(startDate) ? startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD',
      checkOut: endDate && !isNaN(endDate) ? endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD',
      nights: nights,
      days: totalDays,
      guests: 2,
      mood: trip.mood || 'Adventure',
    },
    lineItems: [
      {
        id: 1, category: 'Hotel', icon: BedDouble,
        description: `Accommodation in ${trip.destination || 'Destination'} (${nights} Nights)`,
        qty: `${nights} nights`, unitPrice: 140, total: nights * 140,
        accent: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
      },
      {
        id: 2, category: 'Flights', icon: Plane,
        description: `Round-trip flight to ${trip.destination}`,
        qty: '2 pax', unitPrice: 112.50, total: 225,
        accent: { text: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
      },
      {
        id: 3, category: 'Transport', icon: Car,
        description: 'Airport transfers + Local transport package',
        qty: '1 pkg', unitPrice: 150, total: 150,
        accent: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
      },
      ...((trip.stops || []).flatMap(stop => stop.activities || []).slice(0, 3).map((act, i) => ({
        id: 10 + i, category: 'Activities', icon: Ticket,
        description: act.title,
        qty: '1 activity', unitPrice: 50, total: 50,
        accent: { text: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
      }))),
      {
        id: 6, category: 'AI Premium', icon: Sparkles,
        description: 'Travia AI Concierge — 24/7 itinerary support',
        qty: `${totalDays} days`, unitPrice: 5, total: totalDays * 5,
        accent: { text: 'text-primary-400', bg: 'bg-primary-500/10', border: 'border-primary-500/20' },
      },
    ],
    taxes: (totalDays * 20),
    discount: 60.50,
    insuranceAdded: true,
    insuranceCost: 49.00,
  };

  const subtotal = booking.lineItems.reduce((s, l) => s + l.total, 0);
  const grand = subtotal + booking.taxes + booking.insuranceCost - booking.discount;
  const st = STATUS[booking.status] ?? STATUS.confirmed;

  const copyInvoiceId = () => {
    navigator.clipboard.writeText(booking.invoiceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pb-28 pt-2 space-y-6">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => navigate('/trips')}
            className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm font-medium group w-fit"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to My Trips
          </button>

          <div className="flex items-center gap-2">
            <TopBtn icon={Printer} label="Print" onClick={() => window.print()} />
            <button
              onClick={() => alert('PDF generation would trigger here.')}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-violet-500 text-white text-sm font-semibold shadow-glow hover:shadow-glow-lg transition-all hover:-translate-y-px active:translate-y-0"
            >
              <Download size={14} />
              Download PDF
            </button>
          </div>
        </div>

        {/* Page heading */}
        <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-1">
          <motion.h1 variants={fadeUp} className="text-4xl font-display font-bold text-white tracking-tight">
            Booking Invoice
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/40 text-sm">
            Trip reference for {booking.trip.title} — here's a full breakdown of your reservation.
          </motion.p>
        </motion.div>

        {/* Invoice Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111827] border border-white/[0.07] rounded-[2rem] overflow-hidden shadow-card"
        >
          {/* Header */}
          <div className="relative p-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center shadow-glow">
                <Plane size={22} className="text-white" />
              </div>
              <div>
                <div className="text-xl font-display font-bold text-white leading-tight">
                  Travia <span className="text-primary-400">AI</span>
                </div>
                <div className="text-white/35 text-xs mt-0.5">AI-Powered Travel Planning</div>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">
              <div className="text-white/30 text-[10px] uppercase tracking-[0.15em] font-medium">Invoice Reference</div>
              <div className="flex items-center gap-2">
                <span className="text-white font-mono font-bold text-lg tracking-wide">#{booking.invoiceId}</span>
                <button onClick={copyInvoiceId} className="p-1 text-white/30 hover:text-white/70">
                  {copied ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
                </button>
              </div>
              <div className="text-white/30 text-xs">Issued: {booking.bookingDate}</div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${st.ring}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${st.dot} animate-pulse`} />
                {st.label}
              </span>
            </div>
          </div>

          {/* Trip Summary */}
          <div className="px-8 py-6 bg-gradient-to-r from-primary-500/5 via-transparent to-violet-500/5 border-b border-white/[0.06] flex flex-wrap gap-8">
            <SummaryChip icon={MapPin} label="Destination" value={booking.trip.destination} />
            <SummaryChip icon={Calendar} label="Check-in" value={booking.trip.checkIn} />
            <SummaryChip icon={Calendar} label="Check-out" value={booking.trip.checkOut} />
            <SummaryChip icon={Clock} label="Duration" value={`${booking.trip.days} Days`} />
            <SummaryChip icon={Users} label="Guests" value={`${booking.trip.guests} Travelers`} />
          </div>

          {/* Traveler Info */}
          <div className="px-8 py-6 border-b border-white/[0.06] flex flex-wrap gap-6">
            <TravelerMeta label="Full Name" value={booking.traveler.name} />
            <TravelerMeta label="Email" value={booking.traveler.email} />
            <TravelerMeta label="Trip Mood" value={booking.trip.mood} />
          </div>

          {/* Line Items */}
          <div className="px-8 py-6 border-b border-white/[0.06]">
            <div className="hidden md:grid grid-cols-12 text-[10px] text-white/25 uppercase tracking-widest px-4 pb-3">
              <span className="col-span-6">Description</span>
              <span className="col-span-2 text-center">Category</span>
              <span className="col-span-2 text-right">Qty / Rate</span>
              <span className="col-span-2 text-right">Total</span>
            </div>
            <div className="space-y-2">
              {booking.lineItems.map((item) => (
                <div key={item.id} className="grid grid-cols-12 items-center px-4 py-4 rounded-xl bg-white/[0.015] border border-white/[0.06]">
                  <div className="col-span-12 md:col-span-6 flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.accent.bg} border ${item.accent.border}`}>
                      <item.icon size={15} className={item.accent.text} />
                    </div>
                    <div className="text-white text-sm font-medium">{item.description}</div>
                  </div>
                  <div className="hidden md:flex col-span-2 justify-center">
                    <span className={`text-[10px] px-2.5 py-1 rounded-lg font-semibold ${item.accent.bg} ${item.accent.text}`}>{item.category}</span>
                  </div>
                  <div className="col-span-6 md:col-span-2 text-right">
                    <div className="text-white/40 text-xs">{item.qty}</div>
                    <div className="text-white/30 text-[10px]">${item.unitPrice.toFixed(2)}</div>
                  </div>
                  <div className="col-span-6 md:col-span-2 text-right">
                    <span className="text-white font-semibold">${item.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Totals */}
          <div className="px-8 py-6 ml-auto max-w-sm space-y-3">
            <TotalRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <TotalRow label="Taxes & Fees (8%)" value={`+$${booking.taxes.toFixed(2)}`} muted />
            <TotalRow label="Loyalty Discount" value={`-$${booking.discount.toFixed(2)}`} green />
            <div className="h-px bg-white/10 my-2" />
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white/40 text-xs">Amount Due</div>
                <div className="text-3xl font-display font-bold text-white">${grand.toFixed(2)}</div>
              </div>
              <span className={`px-3 py-1.5 rounded-full border text-xs font-semibold ${st.ring}`}>{st.label}</span>
            </div>
          </div>

          {/* ── Pay Now CTA (shown for pending bookings) ── */}
          {booking.status === 'pending' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
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
                onClick={() => navigate(`/trips/${id}/payment`)}
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
              Travia AI · support@travia.ai · travia.ai
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
            onClick={() => navigate(`/trips/${id}/itinerary`)}
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition-all shadow-glow hover:-translate-y-px active:translate-y-0"
          >
            View Itinerary <ArrowLeft size={14} className="rotate-180" />
          </button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

function TopBtn({ icon: Icon, label, onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/50 text-sm hover:bg-white/10 hover:text-white transition-all">
      <Icon size={13} /> {label}
    </button>
  );
}

function SummaryChip({ icon: Icon, label, value }) {
  return (
    <div>
      <div className="flex items-center gap-1 text-white/25 text-[10px] uppercase tracking-widest mb-1 font-medium">
        <Icon size={9} /> {label}
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
      <span className={`text-sm font-semibold ${green ? 'text-emerald-400' : muted ? 'text-white/50' : 'text-white'}`}>{value}</span>
    </div>
  );
}
