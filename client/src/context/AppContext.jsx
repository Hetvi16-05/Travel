import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

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

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTrip, setActiveTrip] = useState(null)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const savedAuth = localStorage.getItem('traveloop_auth')
    if (savedAuth) {
      setUser(mockUser)
      setIsAuthenticated(true)
    }
  }, [])

  const login = (email, password) => {
    localStorage.setItem('traveloop_auth', 'true')
    setUser(mockUser)
    setIsAuthenticated(true)
    return true
  }

  const logout = () => {
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
      user, setUser, isAuthenticated, login, logout,
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
