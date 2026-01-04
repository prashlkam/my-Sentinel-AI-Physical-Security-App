
import React, { useState } from 'react';
import { Tab } from './types';
import EvacuationTab from './components/EvacuationTab';
import EmergencyTab from './components/EmergencyTab';
import IncidentTab from './components/IncidentTab';
import AIAssistantTab from './components/AIAssistantTab';
import AuthPage from './components/AuthPage';
import { 
  ShieldAlert, 
  MapPin, 
  AlertTriangle, 
  Bot, 
  Settings,
  LogOut
} from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.INCIDENT);
  const [showSettings, setShowSettings] = useState(false);

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case Tab.EVACUATION:
        return <EvacuationTab />;
      case Tab.EMERGENCY:
        return <EmergencyTab />;
      case Tab.INCIDENT:
        return <IncidentTab />;
      case Tab.AI_ASSISTANT:
        return <AIAssistantTab />;
      default:
        return <IncidentTab />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-8 h-8 text-blue-500" />
          <div>
            <h1 className="text-xl font-bold tracking-tight leading-none">SENTINEL</h1>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Secure Terminal</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-full transition-colors ${showSettings ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Settings Panel Overlay */}
      {showSettings && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute right-4 top-16 w-64 bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                {user?.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-sm truncate">{user?.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-600/10 text-red-500 transition-colors text-sm font-bold"
            >
              <LogOut className="w-5 h-5" />
              Sign Out Securely
            </button>
            <button 
              onClick={() => setShowSettings(false)}
              className="w-full mt-2 p-3 text-center text-xs text-slate-500 font-bold uppercase tracking-widest"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {renderContent()}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 safe-bottom z-40">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          <NavButton 
            active={activeTab === Tab.EVACUATION} 
            onClick={() => setActiveTab(Tab.EVACUATION)}
            icon={<MapPin />}
            label="Evac"
          />
          <NavButton 
            active={activeTab === Tab.EMERGENCY} 
            onClick={() => setActiveTab(Tab.EMERGENCY)}
            icon={<AlertTriangle />}
            label="Guides"
          />
          <NavButton 
            active={activeTab === Tab.INCIDENT} 
            onClick={() => setActiveTab(Tab.INCIDENT)}
            icon={<ShieldAlert />}
            label="Incident"
          />
          <NavButton 
            active={activeTab === Tab.AI_ASSISTANT} 
            onClick={() => setActiveTab(Tab.AI_ASSISTANT)}
            icon={<Bot />}
            label="AI Assist"
          />
        </div>
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 w-full h-full ${
      active ? 'text-blue-500 scale-110' : 'text-slate-500 hover:text-slate-300'
    }`}
  >
    {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
    <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
  </button>
);

export default App;
