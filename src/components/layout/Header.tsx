import React, { useState, useRef, useEffect } from 'react';
import { useBank } from '../../context/BankContext';
import { TabType } from '../../types';

export const Header: React.FC = () => {
  const {
    activeTab,
    unreadCount,
    notifications,
    markNotificationsAsRead,
    isBalanceHidden,
    toggleBalanceHidden,
    setIsAccountModalOpen,
    selectedAccount,
    isSidebarOpen,
    setIsSidebarOpen,
    viewMode,
    setViewMode,
  } = useBank();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close notifications dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSubTitle = (tab: TabType) => {
    switch (tab) {
      case 'dashboard':
        return 'DASHBOARD';
      case 'transactions':
        return 'TRANSACTIONS';
      case 'transfer':
        return 'TRANSFER';
      case 'analytics':
        return 'ANALYTICS';
      case 'cards':
        return 'CARDS';
      default:
        return 'BANKING';
    }
  };

  return (
    <header className="sticky top-0 w-full z-40 bg-[#f8f9ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e5eeff]/80">
      <div className="h-16 px-4 md:px-6 flex items-center justify-between">
        {/* Left: Mobile hamburger + Nova Bank Logo & Subtitle */}
        <div className="flex items-center gap-3">
          {/* Mobile sidebar toggle button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-[#0b1c30] hover:bg-[#dce9ff]/60 transition-colors"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {isSidebarOpen ? 'close' : 'menu'}
            </span>
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer">
            <img
              alt="Nova Bank Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VorFrDlEKt3LEl5_ucY2kCw3YezE9XlN9cxMM0y4zVrJMd1muiwCUiD48j4K6uBDnVdlBTG1gZqs2WDz43Ck_WTdpuRXLj0JfAxstvVeCaphnyVZaXp01oggSYCEWutw5j0T-Z-Ot7Gj-bYhxKTVO4TLhMIY2dtPQsPd8cWSj3l4podNpSnvz7Km9gtDgtqF2v7PhVK4_zAz6zuoOIQNg7RCwpNGI470iiIpPbJRqYifmDbQExHEmJzhU"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-[#0b1c30] leading-none tracking-tight">
                Nova Bank
              </span>
              <span className="font-label-sm text-label-sm text-[#44474c] uppercase tracking-wider font-semibold">
                {getSubTitle(activeTab)}
              </span>
            </div>
          </div>
        </div>


        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Privacy Eye Toggle */}
          <button
            onClick={toggleBalanceHidden}
            title={isBalanceHidden ? 'Show Balances' : 'Hide Balances'}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#44474c] hover:text-[#0b1c30] hover:bg-[#dce9ff]/60 transition-colors"
            aria-label="Toggle balance privacy"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isBalanceHidden ? 'visibility_off' : 'visibility'}
            </span>
          </button>

          {/* Viewport Frame Switcher (Switch between Desktop Dashboard vs Realistic Mobile Frame) */}
          <button
            onClick={() => setViewMode(viewMode === 'desktop' ? 'mobile-frame' : 'desktop')}
            title={viewMode === 'desktop' ? 'Preview Mobile Frame' : 'Full Screen View'}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold bg-[#e5eeff] text-[#0b1c30] hover:bg-[#dce9ff] transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">
              {viewMode === 'desktop' ? 'smartphone' : 'desktop_windows'}
            </span>
            <span className="font-label-sm">
              {viewMode === 'desktop' ? 'Mobile View' : 'Wide View'}
            </span>
          </button>

          {/* Notifications Flyout */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              aria-label="Notifications"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#0b1c30] hover:bg-[#dce9ff]/60 transition-colors relative"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#006d34] ring-2 ring-[#f8f9ff]"></span>
              )}
            </button>

            {/* Notifications Menu */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#ffffff] rounded-2xl shadow-2xl border border-[#e5eeff] p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-[#e5eeff]">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-headline-sm text-[#0b1c30]">
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#54fd8f]/30 text-[#006d34] text-[11px] font-bold">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markNotificationsAsRead}
                      className="text-[12px] font-semibold text-[#006d34] hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="divide-y divide-[#f1f5f9] max-h-80 overflow-y-auto no-scrollbar pt-1">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`py-3 flex gap-3 items-start transition-colors rounded-xl px-2 ${
                        !notif.read ? 'bg-[#f8f9ff]' : 'hover:bg-[#f8f9ff]/70'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                          notif.type === 'transfer'
                            ? 'bg-[#54fd8f]/30 text-[#007237]'
                            : notif.type === 'security'
                            ? 'bg-[#e5eeff] text-[#0b1c30]'
                            : 'bg-[#dce9ff] text-[#004c6e]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {notif.type === 'transfer'
                            ? 'payments'
                            : notif.type === 'security'
                            ? 'verified_user'
                            : 'lightbulb'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-label-md font-semibold text-[#0b1c30] truncate">
                            {notif.title}
                          </p>
                          <span className="text-[11px] text-[#75777d]">{notif.time}</span>
                        </div>
                        <p className="font-body-sm text-[#44474c] mt-0.5 leading-snug">
                          {notif.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar with Account Switcher trigger */}
          <button
            onClick={() => setIsAccountModalOpen(true)}
            aria-label="User Account Profile"
            className="flex items-center gap-2 p-1 rounded-full hover:bg-[#dce9ff]/50 transition-colors group"
          >
            <div className="relative">
              <img
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#dce9ff] group-hover:ring-[#006d34] transition-all"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbdaQp-uq4N-XrH1UlRuwWvS_a4n440IH9Rzrew4eVakIGWFEpzFJPYaHAXrr4mzEn0bkI_W55L9EntId12DtBgk-k2SuX3yXb0usB_2exr4J-TN9flRd8pnHNbJt9ZYY9qhTXlF-E9dX5zqmR0FV1uA-j_zYU12m1EYeINQ4XbvMs8htXWdij2FEiReXT_9wFJsVEueKTWmVrtExZt0mkUT46RIZbcURtKcfJbEZs1H2_qmwVwmC-"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#006d34] ring-2 ring-[#ffffff]"></span>
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="font-label-md font-semibold text-[#0b1c30] leading-none">
                Alex Morgan
              </span>
              <span className="text-[11px] text-[#44474c] mt-0.5">
                {selectedAccount.name} {selectedAccount.accountNumber}
              </span>
            </div>
            <span className="hidden xl:inline material-symbols-outlined text-[16px] text-[#75777d]">
              expand_more
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
