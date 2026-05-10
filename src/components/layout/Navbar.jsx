import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bell, Search, Plus, Sun, Moon, ChevronDown, Plane } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function Navbar() {
  const { user, sidebarOpen, theme, toggleTheme } = useApp()
  const navigate = useNavigate()
  const [showNotif, setShowNotif] = useState(false)
  const [search, setSearch] = useState('')

  const notifications = [
    { id: 1, text: 'Your Goa trip is in 3 days! 🎉', time: '2h ago', unread: true },
    { id: 2, text: 'Budget alert: 75% spent on transport', time: '5h ago', unread: true },
    { id: 3, text: 'New AI itinerary generated', time: '1d ago', unread: false },
  ]

  return (
    <header
      className="fixed top-0 right-0 z-30 h-16 flex items-center justify-between px-6 transition-all duration-300"
      style={{
        left: sidebarOpen ? '240px' : '72px',
        background: 'rgba(15,23,42,0.9)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Search */}
      <div className="relative hidden md:block">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search destinations, trips..."
          className="pl-9 pr-4 py-2 text-sm rounded-xl w-64 outline-none transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#F8FAFC',
          }}
          onFocus={e => { e.target.style.borderColor = '#6366F1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)' }}
          onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none' }}
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3 ml-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/create-trip')}
          className="btn-primary text-sm py-2 px-4 hidden md:flex"
        >
          <Plus size={15} />
          New Trip
        </motion.button>

        {/* Theme toggle */}
        <button onClick={toggleTheme}
          className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          {theme === 'dark' ? <Sun size={16} className="text-white/60" /> : <Moon size={16} className="text-white/60" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors relative"
          >
            <Bell size={16} className="text-white/60" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-500"></span>
          </button>
          {showNotif && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 top-12 w-80 rounded-2xl shadow-2xl overflow-hidden z-50"
              style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="p-4 border-b border-white/8">
                <p className="text-sm font-semibold text-white">Notifications</p>
              </div>
              {notifications.map(n => (
                <div key={n.id} className="p-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5">
                  <div className="flex items-start gap-3">
                    {n.unread && <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />}
                    <div>
                      <p className="text-sm text-white/80">{n.text}</p>
                      <p className="text-xs text-white/40 mt-1">{n.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Avatar */}
        {user && (
          <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
              {user.name[0]}
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-semibold text-white">{user.name.split(' ')[0]}</p>
              <p className="text-xs text-white/40">Pro</p>
            </div>
          </Link>
        )}
      </div>
    </header>
  )
}
