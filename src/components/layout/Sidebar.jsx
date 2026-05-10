import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import {
  LayoutDashboard, Map, Sparkles, Wallet, NotebookPen, 
  CheckSquare, Share2, User, Settings, LogOut,
  ChevronLeft, Plane, Compass, ShieldAlert
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/explore', icon: Compass, label: 'Explore' },
  { to: '/trips', icon: Map, label: 'Trips' },
  { to: '/ai-planner', icon: Sparkles, label: 'AI Planner' },
  { to: '/budget', icon: Wallet, label: 'Budget' },
  { to: '/notes', icon: NotebookPen, label: 'Notes' },
  { to: '/checklist', icon: CheckSquare, label: 'Checklist' },
  { to: '/shared', icon: Share2, label: 'Shared Trips' },
]

const bottomItems = [
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
  { to: '/admin', icon: ShieldAlert, label: 'Admin Panel' },
]

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar, user, logout } = useApp()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <AnimatePresence>
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 240 : 72 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-0 h-full z-40 flex flex-col overflow-hidden bg-[#0A0F1C]/95 backdrop-blur-2xl border-r border-white/5"
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-white/5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-primary shadow-glow">
              <Plane size={18} className="text-white" />
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-display font-bold text-white text-lg whitespace-nowrap tracking-tight"
                >
                  Traveloop
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <button onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
          >
            <motion.div animate={{ rotate: sidebarOpen ? 0 : 180 }} transition={{ duration: 0.3 }}>
              <ChevronLeft size={16} className="text-white/40" />
            </motion.div>
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-none">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap overflow-hidden group ${
                  isActive 
                    ? 'bg-primary/10 text-primary-300 border border-primary/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]' 
                    : 'text-white/50 hover:bg-white/5 hover:text-white/90 border border-transparent'
                }`
              }
            >
              <Icon size={18} className="flex-shrink-0" />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/5 py-4 px-3 space-y-1">
          {bottomItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap overflow-hidden ${
                  isActive 
                    ? 'bg-white/10 text-white border border-white/20' 
                    : 'text-white/50 hover:bg-white/5 hover:text-white/90 border border-transparent'
                }`
              }
            >
              <Icon size={18} className="flex-shrink-0" />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}

          {/* User card */}
          <AnimatePresence>
            {sidebarOpen && user && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="mt-4 p-3 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 bg-gradient-to-br from-indigo-400 to-violet-500 text-white">
                    {user.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white/90 truncate">{user.name}</p>
                    <p className="text-xs text-white/40 truncate">{user.email}</p>
                  </div>
                  <button onClick={handleLogout} className="p-1.5 rounded-lg hover:bg-red-500/20 hover:text-red-400 text-white/40 transition-colors">
                    <LogOut size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!sidebarOpen && (
            <button onClick={handleLogout}
              className="mt-2 flex items-center justify-center w-full p-3 rounded-xl text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-colors"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </motion.aside>
    </AnimatePresence>
  )
}
