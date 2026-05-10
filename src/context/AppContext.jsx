import { createContext, useContext, useState, useEffect } from 'react'
import api from '../lib/api'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTrip, setActiveTrip] = useState(null)
  const [theme, setTheme] = useState('dark')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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

  const logout = () => {
    localStorage.removeItem('traveloop_token')
    setUser(null)
    setIsAuthenticated(false)
  }

  const toggleSidebar = () => setSidebarOpen(prev => !prev)

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <AppContext.Provider value={{
      user, setUser, isAuthenticated, login, register, logout,
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
