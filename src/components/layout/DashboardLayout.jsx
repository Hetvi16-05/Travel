import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { useApp } from '../../context/AppContext'

export default function DashboardLayout({ children }) {
  const { sidebarOpen } = useApp()
  return (
    <div className="min-h-screen" style={{ background: '#0F172A' }}>
      <Sidebar />
      <Navbar />
      <main
        className="transition-all duration-300 pt-16 min-h-screen"
        style={{ marginLeft: sidebarOpen ? '240px' : '72px' }}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
