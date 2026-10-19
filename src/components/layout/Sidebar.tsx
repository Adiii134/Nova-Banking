import React from 'react';
import { useBank } from '../../context/BankContext';
import { TabType, Beneficiary } from '../../types';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    selectedAccount,
    isBalanceHidden,
    beneficiaries,
    setSelectedBeneficiary,
    isSidebarOpen,
    setIsSidebarOpen,
    setIsAccountModalOpen,
    setQuickActionModal,
    transactions,
  } = useBank();

  const navItems: { id: TabType; label: string; icon: string; badge?: string }[] = [
    { id: 'dashboard', label: 'Home', icon: 'dashboard' },
    {
      id: 'transactions',
      label: 'Activity',
      icon: 'receipt_long',
      badge: `${transactions.length}`,
    },
    { id: 'transfer', label: 'Transfer', icon: 'swap_horiz' },
    { id: 'analytics', label: 'Insights', icon: 'monitoring' },
    { id: 'cards', label: 'Cards', icon: 'credit_card', badge: '2' },
  ];

  const handleSelectContact = (contact: Beneficiary) => {
    setSelectedBeneficiary(contact);
    setActiveTab('transfer');
    setIsSidebarOpen(false);
  };

  const handleNavClick = (tab: TabType) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-[#0b1c30]/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 md:z-30 h-screen w-72 bg-[#ffffff] border-r border-[#e5eeff] flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top Header & Navigation */}
        <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar">
          {/* Logo brand & mobile close */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-[#f1f5f9]">
            <div className="flex items-center gap-2.5">
              <img
                alt="Nova Bank"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1VorFrDlEKt3LEl5_ucY2kCw3YezE9XlN9cxMM0y4zVrJMd1muiwCUiD48j4K6uBDnVdlBTG1gZqs2WDz43Ck_WTdpuRXLj0JfAxstvVeCaphnyVZaXp01oggSYCEWutw5j0T-Z-Ot7Gj-bYhxKTVO4TLhMIY2dtPQsPd8cWSj3l4podNpSnvz7Km9gtDgtqF2v7PhVK4_zAz6zuoOIQNg7RCwpNGI470iiIpPbJRqYifmDbQExHEmJzhU"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-[#0b1c30] leading-none">Nova Bank</span>
                <span className="font-label-sm text-[#006d34] font-bold">DIGITAL WEALTH</span>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden w-8 h-8 rounded-full flex items-center justify-center text-[#44474c] hover:bg-[#e5eeff]"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Quick Account Snapshot Card */}
          <div className="p-4">
            <div className="bg-gradient-to-br from-[#0e1c2f] to-[#213145] text-white p-4 rounded-2xl shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-[#bac7e1] mb-1">
                <span>{selectedAccount.name}</span>
                <span className="font-mono text-[11px] opacity-80">{selectedAccount.accountNumber}</span>
              </div>
              <div className="font-display-currency text-[24px] font-bold tracking-tight text-white my-1">
                {isBalanceHidden
                  ? '••••••••'
                  : `$${selectedAccount.balance.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                    })}`}
              </div>
              <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/10">
                <div className="flex items-center gap-1 text-[11px] text-[#54fd8f]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#54fd8f]"></span>
                  <span>Instant FedNow</span>
                </div>
                <button
                  onClick={() => setIsAccountModalOpen(true)}
                  className="text-[11px] text-white/80 hover:text-white underline"
                >
                  Switch
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1">
            <span className="px-3 text-[11px] font-semibold text-[#75777d] uppercase tracking-wider">
              Navigation
            </span>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all font-body-md ${
                    isActive
                      ? 'bg-[#000000] text-[#ffffff] font-semibold shadow-sm'
                      : 'text-[#44474c] hover:bg-[#e5eeff]/70 hover:text-[#0b1c30]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`material-symbols-outlined text-[22px] ${
                        isActive ? 'text-[#54fd8f]' : 'text-[#75777d]'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        isActive
                          ? 'bg-[#54fd8f] text-[#00210b]'
                          : 'bg-[#e5eeff] text-[#0b1c30]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Send Shortcut */}
          <div className="p-3 mt-4">
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-[11px] font-semibold text-[#75777d] uppercase tracking-wider">
                Quick Send
              </span>
              <button
                onClick={() => {
                  setActiveTab('transfer');
                  setIsSidebarOpen(false);
                }}
                className="text-[11px] font-semibold text-[#006d34] hover:underline"
              >
                Send New
              </button>
            </div>
            <div className="space-y-1.5">
              {beneficiaries.slice(0, 3).map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => handleSelectContact(contact)}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#e5eeff]/50 transition-colors text-left group"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-[#c5c6cd]">
                    <img
                      src={contact.avatarUrl}
                      alt={contact.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                    {contact.verified && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#006d34] ring-1 ring-white"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-md font-semibold text-[#0b1c30] truncate group-hover:text-[#006d34] transition-colors">
                      {contact.name}
                    </p>
                    <p className="text-[11px] text-[#75777d] truncate">{contact.tag}</p>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-[#75777d] group-hover:text-[#006d34] transition-colors">
                    arrow_forward
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Profile & Security Footer */}
        <div className="p-3 border-t border-[#f1f5f9] bg-[#f8f9ff]">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#e5eeff] shadow-xs">
            <div
              className="flex items-center gap-2.5 min-w-0 cursor-pointer"
              onClick={() => setIsAccountModalOpen(true)}
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbdaQp-uq4N-XrH1UlRuwWvS_a4n440IH9Rzrew4eVakIGWFEpzFJPYaHAXrr4mzEn0bkI_W55L9EntId12DtBgk-k2SuX3yXb0usB_2exr4J-TN9flRd8pnHNbJt9ZYY9qhTXlF-E9dX5zqmR0FV1uA-j_zYU12m1EYeINQ4XbvMs8htXWdij2FEiReXT_9wFJsVEueKTWmVrtExZt0mkUT46RIZbcURtKcfJbEZs1H2_qmwVwmC-"
                alt="Alex Morgan"
                className="w-9 h-9 rounded-full object-cover ring-1 ring-[#c5c6cd]"
              />
              <div className="min-w-0">
                <p className="font-label-md font-semibold text-[#0b1c30] truncate">Alex Morgan</p>
                <p className="text-[11px] text-[#006d34] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006d34]"></span>
                  Active Session
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAccountModalOpen(true)}
              title="Switch Account"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#75777d] hover:text-[#0b1c30] hover:bg-[#e5eeff] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
