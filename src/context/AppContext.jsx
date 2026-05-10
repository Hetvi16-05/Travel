import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../lib/api'

const AppContext = createContext(null)

// Decode a Google id_token payload (base64url) — no verification, read-only
function decodeJwtPayload(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64))
  } catch {
    return null
  }
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTrip, setActiveTrip] = useState(null)
  const [theme, setTheme] = useState('dark')
  const [authLoading, setAuthLoading] = useState(true)

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('traveloop_token')
    const savedUser = localStorage.getItem('traveloop_user')
    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
    setAuthLoading(false)
  }, [])

  /**
   * Email/password login — calls POST /api/auth/login
   */
  const login = async (email, password) => {
    const { data } = await authApi.login(email, password)
    const loggedInUser = {
      ...data.user,
      avatar: data.user.avatar_url || null,
    }
    localStorage.setItem('traveloop_token', data.accessToken)
    localStorage.setItem('traveloop_user', JSON.stringify(loggedInUser))
    setUser(loggedInUser)
    setIsAuthenticated(true)
    return { success: true }
  }

  /**
   * Email/password register — calls POST /api/auth/register
   */
  const register = async (name, email, password) => {
    const { data } = await authApi.register(name, email, password)
    const newUser = {
      ...data.user,
      avatar: data.user.avatar_url || null,
    }
    localStorage.setItem('traveloop_token', data.accessToken)
    localStorage.setItem('traveloop_user', JSON.stringify(newUser))
    setUser(newUser)
    setIsAuthenticated(true)
    return { success: true }
  }

  /**
   * Google sign-in — POSTs id_token to /api/auth/google
   * Falls back to decoded Google profile if backend is unreachable.
   */
  const googleLogin = async (credentialResponse) => {
    const idToken = credentialResponse.credential
    const profile = decodeJwtPayload(idToken)

    try {
      const { data } = await authApi.googleAuth(idToken)
      const loggedInUser = {
        ...data.user,
        avatar: data.user.avatar_url || profile?.picture || null,
      }
      localStorage.setItem('traveloop_token', data.accessToken)
      localStorage.setItem('traveloop_user', JSON.stringify(loggedInUser))
      setUser(loggedInUser)
      setIsAuthenticated(true)
      return { success: true }
    } catch {
      // Fallback: use Google-decoded profile directly (works without backend)
      const fallbackUser = {
        id: profile?.sub || 'google-user',
        name: profile?.name || 'Google User',
        email: profile?.email || '',
        avatar: profile?.picture || null,
        memberSince: new Date().getFullYear().toString(),
        preferences: { currency: 'INR', language: 'English', theme: 'dark' },
      }
      localStorage.setItem('traveloop_user', JSON.stringify(fallbackUser))
      localStorage.setItem('traveloop_auth', 'google')
      setUser(fallbackUser)
      setIsAuthenticated(true)
      return { success: true, fallback: true }
    }
  }

  const logout = () => {
    authApi.logout().catch(() => {})
    localStorage.removeItem('traveloop_token')
    localStorage.removeItem('traveloop_user')
    localStorage.removeItem('traveloop_auth')
    setUser(null)
    setIsAuthenticated(false)
  }

  const toggleSidebar = () => setSidebarOpen(prev => !prev)

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <AppContext.Provider value={{
      user, setUser, isAuthenticated, authLoading,
      login, register, logout, googleLogin,
      sidebarOpen, setSidebarOpen, toggleSidebar,
      activeTrip, setActiveTrip,
      theme, toggleTheme,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
}
