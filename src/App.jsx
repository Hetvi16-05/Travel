import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AppProvider, useApp } from './context/AppContext'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Trips from './pages/Trips'
import CreateTrip from './pages/CreateTrip'
import EditTrip from './pages/EditTrip'
import AiPlanner from './pages/AiPlanner'
import ItineraryBuilder from './pages/ItineraryBuilder'
import Budget from './pages/Budget'
import Explore from './pages/Explore'
import Checklist from './pages/Checklist'
import Notes from './pages/Notes'
import SharedTrip from './pages/SharedTrip'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Admin from './pages/Admin'
import Invoice from './pages/Invoice'
import Payment from './pages/Payment'
import './App.css'

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useApp()
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-white/40 text-sm font-medium animate-pulse">Initializing Travia...</p>
        </div>
      </div>
    )
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Public Shared Trip Route */}
      <Route path="/shared/:id" element={<SharedTrip />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/explore" 
        element={
          <ProtectedRoute>
            <Explore />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/trips" 
        element={
          <ProtectedRoute>
            <Trips />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/trips/create" 
        element={
          <ProtectedRoute>
            <CreateTrip />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/trips/:id/edit" 
        element={
          <ProtectedRoute>
            <EditTrip />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/trips/:id/itinerary" 
        element={
          <ProtectedRoute>
            <ItineraryBuilder />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/ai-planner" 
        element={
          <ProtectedRoute>
            <AiPlanner />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/trips/:id/checklist" 
        element={
          <ProtectedRoute>
            <Checklist />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/trips/:id/notes" 
        element={
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/notes" 
        element={
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/checklist" 
        element={
          <ProtectedRoute>
            <Checklist />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/notes" 
        element={
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/trips/:id/invoice" 
        element={
          <ProtectedRoute>
            <Invoice />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/trips/:id/payment" 
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        } 
      />
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

import OnboardingModal from './components/onboarding/OnboardingModal'

function AppWrapper() {
  const { isAuthenticated, preferences, setPreferences } = useApp()
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    if (isAuthenticated && preferences && !preferences.onboarding_done) {
      setShowOnboarding(true)
    } else {
      setShowOnboarding(false)
    }
  }, [isAuthenticated, preferences])

  return (
    <>
      <AppRoutes />
      {showOnboarding && (
        <OnboardingModal 
          onComplete={() => {
            setShowOnboarding(false)
            setPreferences(prev => ({ ...prev, onboarding_done: true }))
          }} 
        />
      )}
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1E293B',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
          },
        }}
      />
    </>
  )
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppWrapper />
      </Router>
    </AppProvider>
  )
}

export default App
