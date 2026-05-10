import { motion } from 'framer-motion';
import { Calendar, MapPin, MoreVertical, Compass, CreditCard, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

const PAYMENT_BADGE = {
  paid:   { label: 'Paid',     icon: CheckCircle2, cls: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400' },
  unpaid: { label: 'Pay Now',  icon: AlertCircle,  cls: 'bg-amber-500/15  border-amber-500/30  text-amber-400'   },
};

export function TripCard({ trip, index, onDeleteSuccess }) {
  const navigate = useNavigate();
  const payment  = PAYMENT_BADGE[trip.payment_status];

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete your trip to ${trip.destination || trip.title}?`)) {
      try {
        await api.trips.delete(trip.id);
        onDeleteSuccess && onDeleteSuccess(trip.id);
      } catch (err) {
        alert('Failed to delete trip: ' + err.message);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate(`/trips/${trip.id}/itinerary`)}
      className="group relative bg-[#111827] border border-white/10 rounded-[2rem] overflow-hidden cursor-pointer hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] flex flex-col h-full"
    >
      {/* ── Cover image ── */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={trip.cover || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80'}
          alt={trip.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
          {/* Mood pill */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold text-white">
            <Compass size={12} className="text-primary-400" />
            {trip.mood || 'Adventure'}
          </div>

          <div className="flex items-center gap-2">
            {/* Payment status badge */}
            {payment && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${payment.cls} backdrop-blur-md`}>
                <payment.icon size={11} />
                {payment.label}
              </div>
            )}
            {/* Edit button */}
            <button
              className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-colors"
              onClick={e => { e.stopPropagation(); navigate(`/trips/${trip.id}/edit`); }}
            >
              <MoreVertical size={14} />
            </button>

            {/* Delete button */}
            <button
              className="w-8 h-8 rounded-full bg-red-500/20 backdrop-blur-md border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-500/40 hover:text-red-300 transition-colors"
              onClick={handleDelete}
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-xl font-display font-bold text-white leading-tight mb-1">{trip.title}</h3>
          <p className="text-sm text-white/60 flex items-center gap-1">
            <MapPin size={12} /> {trip.destination || 'Unknown Destination'}
          </p>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        {/* Date / days row */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-white/50 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
            <Calendar size={14} />
            <span className="font-medium">
              {trip.start_date ? new Date(trip.start_date).toLocaleDateString('en-IN',{ day:'numeric', month:'short' }) : 'TBD'}
              {' – '}
              {trip.end_date ? new Date(trip.end_date).toLocaleDateString('en-IN',{ day:'numeric', month:'short' }) : 'TBD'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-primary/10 text-primary-300 px-3 py-1.5 rounded-lg border border-primary/20 font-medium">
            {trip.days || 0} Days
          </div>
        </div>

        {/* Budget bar */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <p className="text-xs text-white/40 font-medium uppercase tracking-wider">Budget Status</p>
            <p className="text-sm font-semibold text-emerald-400">
              ₹{(trip.spent || 0).toLocaleString()}{' '}
              <span className="text-white/30 font-normal">/ ₹{(trip.budget || 0).toLocaleString()}</span>
            </p>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(((trip.spent || 0) / (trip.budget || 1)) * 100, 100)}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-emerald-500 rounded-full"
            />
          </div>
        </div>

        {/* ── Pay Now CTA (only for unpaid trips) ── */}
        {trip.payment_status === 'unpaid' && (
          <button
            id={`pay-trip-${trip.id}-btn`}
            onClick={e => {
              e.stopPropagation();
              navigate(`/trips/${trip.id}/payment`);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold hover:bg-amber-500/20 hover:border-amber-400/50 transition-all group/pay"
          >
            <CreditCard size={14} className="group-hover/pay:scale-110 transition-transform" />
            Complete Payment
          </button>
        )}

        {/* ── View Invoice link (for paid trips) ── */}
        {trip.payment_status === 'paid' && (
          <button
            id={`invoice-trip-${trip.id}-btn`}
            onClick={e => {
              e.stopPropagation();
              navigate(`/trips/${trip.id}/invoice`);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] text-white/40 text-sm font-medium hover:bg-white/[0.06] hover:text-white/70 transition-all"
          >
            <CheckCircle2 size={13} className="text-emerald-400" />
            View Invoice
          </button>
        )}
      </div>
    </motion.div>
  );
}
