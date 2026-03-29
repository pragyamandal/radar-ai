import React from 'react';
import { Home, Radar as RadarIcon, Bot, Briefcase, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const storedName = localStorage.getItem('radar_user_name') || 'Arjun';
  const initials = storedName.substring(0, 2).toUpperCase();

  const navItems = [
    { name: 'HOME', icon: Home, path: '/dashboard' },
    { name: 'RADAR', icon: RadarIcon, path: '/radar' },
    { name: 'COACH', icon: Bot, path: '/coach' },
    { name: 'PORTFOLIO', icon: Briefcase, path: '/portfolio' },
    { name: 'SETTINGS', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#08080C] border-r border-white/5 flex flex-col justify-between py-8 z-50">
      
      <div>
        {/* Header Logo */}
        <div className="px-8 mb-12 flex flex-col">
          <div className="flex items-center space-x-3 mb-1">
            <div className="bg-blue-600 p-1.5 rounded-sm shadow-[0_0_15px_rgba(59,130,246,0.5)]">
               <div className="w-5 h-5 border-[3px] border-white/20 rounded-sm"></div>
            </div>
            <span className="text-2xl font-black tracking-tight text-white">Radar</span>
          </div>
          <span className="text-xs font-semibold text-gray-500 tracking-wider">Terminal v1.0</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            let isActive = false;
            const path = location.pathname;
            
            if (item.name === 'HOME') {
              isActive = path === '/' || path === '/home' || path.startsWith('/dashboard');
            } else if (item.name === 'RADAR') {
              isActive = path.startsWith('/radar') || path.startsWith('/stock/') || path.startsWith('/why/');
            } else if (item.name === 'COACH') {
              isActive = path.startsWith('/coach');
            } else if (item.name === 'PORTFOLIO') {
              isActive = path.startsWith('/portfolio');
            } else if (item.name === 'SETTINGS') {
              isActive = path.startsWith('/settings');
            }

            return (
              <div 
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-4 px-8 py-4 cursor-pointer relative transition-all ${
                  isActive 
                    ? 'text-white bg-gradient-to-r from-blue-600/10 to-transparent' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-md"></div>
                )}
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : ''}`} />
                <span className="text-sm font-bold tracking-widest">{item.name}</span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile */}
      <div className="px-8 mt-auto border-t border-white/5 pt-6">
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-sm font-bold text-gray-300 group-hover:bg-slate-700 transition-colors shadow-inner overflow-hidden relative">
            {/* If we had an image, we'd put it here. Using initials instead. */}
             <div className="absolute inset-0 bg-gradient-to-b from-slate-600 to-slate-800 z-0"></div>
            <span className="relative z-10 text-white shadow-sm">{initials}</span>
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">{storedName}</p>
            <p className="text-[10px] text-gray-500 font-medium tracking-wide">Pro Tier</p>
          </div>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
