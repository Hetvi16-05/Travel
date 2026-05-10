import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Lock, Palette, CreditCard, Globe, Moon, Sun, Monitor } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';

const TABS = [
  { id: 'account', label: 'Account Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy & Security', icon: Lock },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'billing', label: 'Billing & Plan', icon: CreditCard },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('appearance');
  const [theme, setTheme] = useState('dark'); // mock state for UI

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto py-8 px-4 md:px-8 pb-32">
        
        <div className="mb-10">
          <h1 className="text-3xl font-display font-bold text-white mb-2">Settings</h1>
          <p className="text-white/50">Manage your account preferences and application settings.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Settings Sidebar */}
          <div className="w-full md:w-64 shrink-0 space-y-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary/10 text-primary-400 border border-primary/20' 
                      : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Settings Content Area */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#111827] border border-white/5 rounded-3xl p-6 md:p-8 min-h-[500px]"
            >
              
              {activeTab === 'appearance' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Appearance</h2>
                    <p className="text-white/50 text-sm">Customize how Traveloop looks on your device.</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest">Theme Preferences</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Light Mode Mock */}
                      <button 
                        onClick={() => setTheme('light')}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          theme === 'light' ? 'bg-primary/10 border-primary-500 shadow-[0_0_20px_rgba(99,102,241,0.15)]' : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4 text-white">
                          <Sun size={20} />
                        </div>
                        <p className="font-semibold text-white mb-1">Light</p>
                        <p className="text-xs text-white/50">Clean and bright.</p>
                      </button>

                      {/* Dark Mode Mock */}
                      <button 
                        onClick={() => setTheme('dark')}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          theme === 'dark' ? 'bg-primary/10 border-primary-500 shadow-[0_0_20px_rgba(99,102,241,0.15)]' : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4 text-white">
                          <Moon size={20} />
                        </div>
                        <p className="font-semibold text-white mb-1">Dark</p>
                        <p className="text-xs text-white/50">Easy on the eyes.</p>
                      </button>

                      {/* System Mode Mock */}
                      <button 
                        onClick={() => setTheme('system')}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          theme === 'system' ? 'bg-primary/10 border-primary-500 shadow-[0_0_20px_rgba(99,102,241,0.15)]' : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4 text-white">
                          <Monitor size={20} />
                        </div>
                        <p className="font-semibold text-white mb-1">System</p>
                        <p className="text-xs text-white/50">Follows OS settings.</p>
                      </button>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-white">Compact Mode</h3>
                        <p className="text-sm text-white/50">Reduce spacing to fit more content on screen.</p>
                      </div>
                      <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 bottom-1 w-4 bg-white/50 rounded-full transition-transform" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5 flex justify-end">
                    <Button className="shadow-glow">Save Changes</Button>
                  </div>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Account Profile</h2>
                    <p className="text-white/50 text-sm">Update your personal information.</p>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70">First Name</label>
                        <input type="text" defaultValue="Sarah" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary-500 transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70">Last Name</label>
                        <input type="text" defaultValue="Jenkins" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary-500 transition-colors" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Email Address</label>
                      <input type="email" defaultValue="sarah@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary-500 transition-colors" />
                    </div>
                    <div className="pt-4 flex justify-end">
                      <Button className="shadow-glow">Update Profile</Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Other tabs can be similarly mocked */}
              {['notifications', 'privacy', 'billing'].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 mb-4">
                    <Globe size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 capitalize">{activeTab} Settings</h3>
                  <p className="text-white/50 max-w-sm">This section is currently under development. Check back later for updates.</p>
                </div>
              )}

            </motion.div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
