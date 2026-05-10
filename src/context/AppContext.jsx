import { createContext, useContext, useState, useEffect } from 'react'
import api, { authApi } from '../lib/api'

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
  const [isLoading, setIsLoading] = useState(true)

  // Restore session from localStorage on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('traveloop_token')
      const savedUser = localStorage.getItem('traveloop_user')
      
      if (token && savedUser) {
        setUser(JSON.parse(savedUser))
        setIsAuthenticated(true)
        
        // Verify token with backend
        try {
          const { data } = await authApi.me()
          const updatedUser = {
            ...data.user,
            avatar: data.user.avatar_url || null,
          }
          setUser(updatedUser)
          localStorage.setItem('traveloop_user', JSON.stringify(updatedUser))
        } catch (error) {
          console.error('Token verification failed', error)
          if (error.status === 401) {
            logout()
          }
        }
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

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
      user, setUser, isAuthenticated, isLoading,
      login, register, logout,
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
