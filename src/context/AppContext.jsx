import { createContext, useContext, useState, useEffect } from 'react'
<<<<<<< HEAD
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

=======
import { authApi } from '../lib/api'

const AppContext = createContext(null)

>>>>>>> ce7529b (feat: integrate real API endpoints for user registration and trip management)
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
<<<<<<< HEAD
  const [isLoading, setIsLoading] = useState(true)
=======
  const [authLoading, setAuthLoading] = useState(true)
>>>>>>> ce7529b (feat: integrate real API endpoints for user registration and trip management)

  // Restore session from localStorage on mount
  useEffect(() => {
<<<<<<< HEAD
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
=======
    const token = localStorage.getItem('traveloop_token')
>>>>>>> ce7529b (feat: integrate real API endpoints for user registration and trip management)
    const savedUser = localStorage.getItem('traveloop_user')
    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
<<<<<<< HEAD
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
=======
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
>>>>>>> ce7529b (feat: integrate real API endpoints for user registration and trip management)
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
<<<<<<< HEAD
<<<<<<< HEAD
    localStorage.removeItem('traveloop_token')
=======
    localStorage.removeItem('traveloop_auth')
    localStorage.removeItem('traveloop_token')
    localStorage.removeItem('traveloop_user')
>>>>>>> 5d49661 (feat: implement Google OAuth2 authentication flow for users)
=======
    authApi.logout().catch(() => {})
    localStorage.removeItem('traveloop_token')
    localStorage.removeItem('traveloop_user')
    localStorage.removeItem('traveloop_auth')
>>>>>>> ce7529b (feat: integrate real API endpoints for user registration and trip management)
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
<<<<<<< HEAD
      user, setUser, isAuthenticated, login, register, logout,
=======
      user, setUser, isAuthenticated, login, logout, googleLogin,
>>>>>>> 5d49661 (feat: implement Google OAuth2 authentication flow for users)
=======
      user, setUser, isAuthenticated, authLoading,
      login, register, logout, googleLogin,
>>>>>>> ce7529b (feat: integrate real API endpoints for user registration and trip management)
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
