import { createContext, useContext, useState, useEffect } from 'react'
import api from '../lib/api'

const AppContext = createContext(null)

<<<<<<< HEAD
=======
export const mockUser = {
  id: 1,
  name: 'Aryan Sharma',
  email: 'aryan@traveloop.ai',
  avatar: null,
  country: 'India',
  tripsCount: 12,
  citiesVisited: 28,
  totalKm: 45200,
  memberSince: '2023',
  preferences: { currency: 'INR', language: 'English', theme: 'dark' },
}

// Decode a Google id_token payload (base64url) — no verification, read-only
function decodeJwtPayload(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64))
  } catch {
    return null
  }
}

>>>>>>> 5d49661 (feat: implement Google OAuth2 authentication flow for users)
export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTrip, setActiveTrip] = useState(null)
  const [theme, setTheme] = useState('dark')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
<<<<<<< HEAD
    const checkAuth = async () => {
      const token = localStorage.getItem('traveloop_token')
      if (token) {
        try {
          const response = await api.auth.getMe()
          setUser(response.data)
          setIsAuthenticated(true)
        } catch (error) {
          localStorage.removeItem('traveloop_token')
        }
      }
      setIsLoading(false)
=======
    const savedToken = localStorage.getItem('traveloop_token')
    const savedUser = localStorage.getItem('traveloop_user')
    if (savedToken && savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
      return
    }
    const savedAuth = localStorage.getItem('traveloop_auth')
    if (savedAuth) {
      setUser(mockUser)
      setIsAuthenticated(true)
>>>>>>> 5d49661 (feat: implement Google OAuth2 authentication flow for users)
    }
    checkAuth()
  }, [])

  const login = async (email, password) => {
    const response = await api.auth.login({ email, password })
    const { token, user: userData } = response.data
    localStorage.setItem('traveloop_token', token)
    setUser(userData)
    setIsAuthenticated(true)
    return true
  }

  const register = async (name, email, password) => {
    const response = await api.auth.register({ name, email, password })
    const { token, user: userData } = response.data
    localStorage.setItem('traveloop_token', token)
    setUser(userData)
    setIsAuthenticated(true)
    return true
  }

  /**
   * Called after Google One-Tap / button sign-in.
   * POSTs the id_token to the backend; falls back to storing
   * the decoded Google profile locally if the backend is offline.
   */
  const googleLogin = async (credentialResponse) => {
    const idToken = credentialResponse.credential
    const profile = decodeJwtPayload(idToken)

    try {
      const res = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      })

      if (res.ok) {
        const { data } = await res.json()
        const loggedInUser = {
          ...data.user,
          avatar: data.user.avatar_url || profile?.picture || null,
        }
        localStorage.setItem('traveloop_token', data.accessToken)
        localStorage.setItem('traveloop_user', JSON.stringify(loggedInUser))
        setUser(loggedInUser)
        setIsAuthenticated(true)
        return { success: true }
      }
    } catch {
      // Backend offline — graceful fallback using Google profile
    }

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

  const logout = () => {
<<<<<<< HEAD
    localStorage.removeItem('traveloop_token')
=======
    localStorage.removeItem('traveloop_auth')
    localStorage.removeItem('traveloop_token')
    localStorage.removeItem('traveloop_user')
>>>>>>> 5d49661 (feat: implement Google OAuth2 authentication flow for users)
    setUser(null)
    setIsAuthenticated(false)
  }

  const toggleSidebar = () => setSidebarOpen(prev => !prev)

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <AppContext.Provider value={{
<<<<<<< HEAD
      user, setUser, isAuthenticated, login, register, logout,
=======
      user, setUser, isAuthenticated, login, logout, googleLogin,
>>>>>>> 5d49661 (feat: implement Google OAuth2 authentication flow for users)
      sidebarOpen, setSidebarOpen, toggleSidebar,
      activeTrip, setActiveTrip,
      theme, toggleTheme,
      isLoading,
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
