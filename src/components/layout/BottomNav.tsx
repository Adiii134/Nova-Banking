import React from 'react';
import { useBank } from '../../context/BankContext';
import { TabType } from '../../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useBank();

  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Home', icon: 'dashboard' },
    { id: 'transactions', label: 'Activity', icon: 'receipt_long' },
    { id: 'transfer', label: 'Transfer', icon: 'swap_horiz' },
    { id: 'analytics', label: 'Insights', icon: 'monitoring' },
    { id: 'cards', label: 'Cards', icon: 'credit_card' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#f8f9ff]/90 backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.06)] border-t border-[#e5eeff] pb-[env(safe-area-inset-bottom,0px)] md:hidden">
      <div className="flex justify-between items-center h-16 px-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center h-full min-w-[44px] transition-all relative ${
                isActive ? 'text-[#006d34]' : 'text-[#44474c] hover:text-[#0b1c30]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="font-label-sm text-label-sm mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#006d34]"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
