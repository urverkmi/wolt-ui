import { useState } from 'react';
import { Home, Map, User } from 'lucide-react';
import { HomePage } from './components/HomePage';
import { CityView } from './components/CityView';
import { ProfileView } from './components/ProfileView';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'city' | 'profile'>('city');

  return (
    <div className="fixed inset-0 flex flex-col bg-white">
      {/* Main Content Area (fills space above nav) */}
      <div className="relative flex-1">
        {activeTab === 'home' && <HomePage onNavigate={setActiveTab} />}
        {activeTab === 'city' && <CityView />}
        {activeTab === 'profile' && <ProfileView />}
      </div>

      {/* Bottom Navigation */}
      <nav className="h-16 bg-white border-t border-gray-200 z-30">
        <div className="flex justify-around items-center h-full max-w-screen-xl mx-auto px-4">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center space-y-1 ${
              activeTab === 'home' ? 'text-[#009de0]' : 'text-gray-400'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('city')}
            className={`flex flex-col items-center justify-center space-y-1 ${
              activeTab === 'city' ? 'text-[#009de0]' : 'text-gray-400'
            }`}
          >
            <Map className="w-6 h-6" />
            <span className="text-xs">City</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center space-y-1 ${
              activeTab === 'profile' ? 'text-[#009de0]' : 'text-gray-400'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
