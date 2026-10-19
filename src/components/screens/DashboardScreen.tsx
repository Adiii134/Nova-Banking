import React from 'react';
import { useBank } from '../../context/BankContext';
import { Transaction } from '../../types';

export const DashboardScreen: React.FC = () => {
  const {
    selectedAccount,
    isBalanceHidden,
    toggleBalanceHidden,
    setActiveTab,
    beneficiaries,
    setSelectedBeneficiary,
    transactions,
    setSelectedTransaction,
    setQuickActionModal,
    showToast,
  } = useBank();

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText('0194821049281');
    showToast('Account number copied to clipboard: ****4821');
  };

  const handleSelectFeaturedContact = () => {
    const sarah = beneficiaries.find((b) => b.name.includes('Sarah')) || beneficiaries[0];
    setSelectedBeneficiary(sarah);
    setActiveTab('transfer');
    showToast(`Quick send to ${sarah.name}`);
  };

  const recentTransactions = transactions.slice(0, 4);

  return (
    <div className="flex flex-col w-full pb-8 animate-in fade-in duration-200">
      <div className="px-margin pt-4 pb-4 space-y-6 max-w-3xl mx-auto w-full">
        {/* TOTAL NET BALANCE CARD */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0e1c2f] via-[#15273f] to-[#071321] text-white p-5 sm:p-6 shadow-xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#54fd8f]/10 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-4">
            {/* Header row inside card */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#bac7e1]">
                  Total Net Balance
                </span>
                <button
                  onClick={toggleBalanceHidden}
                  className="text-[#bac7e1] hover:text-white transition-colors"
                  title="Toggle Balance Visibility"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isBalanceHidden ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>

              {/* Account Pill with Copy */}
              <button
                onClick={handleCopyAccount}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/15 text-xs text-[#bac7e1] hover:text-white transition-colors border border-white/5"
              >
                <span>Nova ••• 4821</span>
                <span className="material-symbols-outlined text-[13px]">content_copy</span>
              </button>
            </div>

            {/* Currency Display */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl text-[#bac7e1] font-light">$</span>
                <span className="font-display-currency text-3xl sm:text-[36px] font-bold tracking-tight text-white">
                  {isBalanceHidden
                    ? '••••••••'
                    : selectedAccount.balance.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#bac7e1]">USD</span>
              </div>

              <div className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full bg-[#54fd8f]/20 text-[#2fe378] text-[12px] font-semibold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                <span>+8.4% this mo</span>
              </div>
            </div>

            {/* 4 Action Pills: Send, Request, Bills, Top-up */}
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/10">
              {/* Send */}
              <button
                onClick={() => setActiveTab('transfer')}
                className="flex flex-col items-center gap-1.5 group p-1"
              >
                <div className="w-11 h-11 rounded-full bg-[#006d34] group-hover:bg-[#008a44] text-white flex items-center justify-center shadow-md active:scale-95 transition-all">
                  <span className="material-symbols-outlined text-[20px] -rotate-45">send</span>
                </div>
                <span className="text-[12px] font-medium text-white/90">Send</span>
              </button>

              {/* Request */}
              <button
                onClick={() => setQuickActionModal('request')}
                className="flex flex-col items-center gap-1.5 group p-1"
              >
                <div className="w-11 h-11 rounded-full bg-white/10 group-hover:bg-white/20 text-white flex items-center justify-center border border-white/10 active:scale-95 transition-all">
                  <span className="material-symbols-outlined text-[20px]">call_received</span>
                </div>
                <span className="text-[12px] font-medium text-white/90">Request</span>
              </button>

              {/* Bills */}
              <button
                onClick={() => setQuickActionModal('bills')}
                className="flex flex-col items-center gap-1.5 group p-1"
              >
                <div className="w-11 h-11 rounded-full bg-white/10 group-hover:bg-white/20 text-white flex items-center justify-center border border-white/10 active:scale-95 transition-all">
                  <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                </div>
                <span className="text-[12px] font-medium text-white/90">Bills</span>
              </button>

              {/* Top-up */}
              <button
                onClick={() => setQuickActionModal('topup')}
                className="flex flex-col items-center gap-1.5 group p-1"
              >
                <div className="w-11 h-11 rounded-full bg-white/10 group-hover:bg-white/20 text-white flex items-center justify-center border border-white/10 active:scale-95 transition-all">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                </div>
                <span className="text-[12px] font-medium text-white/90">Top-up</span>
              </button>
            </div>
          </div>
        </div>

        {/* MY CARDS SECTION */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-headline-sm text-[#0b1c30]">My Cards</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#0b1c30] text-[11px] font-semibold">
                2 Active
              </span>
            </div>
            <button
              onClick={() => setActiveTab('cards')}
              className="text-xs font-semibold text-[#006d34] hover:underline flex items-center gap-0.5"
            >
              Manage <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
          </div>

          {/* Cards Carousel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Card 1: Platinum Debit Nova Elite */}
            <div
              onClick={() => setActiveTab('cards')}
              className="rounded-2xl p-4 bg-gradient-to-br from-[#1b2b3e] via-[#0f1a28] to-[#08101a] text-white shadow-md relative overflow-hidden cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-[#bac7e1] font-bold">
                    Platinum Debit
                  </span>
                  <span className="font-headline-sm text-base text-white">Nova Elite</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#54fd8f]/20 flex items-center justify-center text-[#54fd8f]">
                  <span className="material-symbols-outlined text-[16px]">contactless</span>
                </div>
              </div>

              <div className="flex items-center gap-3 my-3">
                <div className="w-7 h-5 rounded bg-[#bac7e1]/30 border border-[#bac7e1]/40 flex items-center justify-center">
                  <div className="w-3 h-2.5 border border-[#bac7e1]/60 rounded-xs"></div>
                </div>
                <span className="font-mono text-sm tracking-widest text-[#bac7e1]">•••• 4821</span>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-[#bac7e1]">
                <span>Expires 08/28</span>
                <span className="font-bold italic text-sm text-white tracking-wider">VISA</span>
              </div>
            </div>

            {/* Card 2: Gold Vault Yield Savings */}
            <div
              onClick={() => setActiveTab('cards')}
              className="rounded-2xl p-4 bg-gradient-to-br from-[#00281b] via-[#003b25] to-[#00170e] text-white shadow-md relative overflow-hidden cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-[#54fd8f] font-bold">
                    Gold Vault
                  </span>
                  <span className="font-headline-sm text-base text-white">Yield Savings</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#54fd8f]">
                  <span className="material-symbols-outlined text-[16px]">savings</span>
                </div>
              </div>

              <div className="flex items-center gap-3 my-3">
                <div className="w-7 h-5 rounded bg-[#54fd8f]/30 border border-[#54fd8f]/50 flex items-center justify-center">
                  <div className="w-3 h-2.5 border border-[#54fd8f]/80 rounded-xs"></div>
                </div>
                <span className="font-mono text-sm tracking-widest text-[#54fd8f]">•••• 1092</span>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-[#bac7e1]">
                <span>Variable High-Yield</span>
                <span className="font-bold text-xs text-[#54fd8f] px-2 py-0.5 rounded-full bg-[#54fd8f]/20">
                  4.65% APY
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK SEND SECTION */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-headline-sm text-[#0b1c30]">Quick Send</h2>
            <span className="text-xs font-semibold text-[#75777d]">Favorites</span>
          </div>

          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-xs border border-[#e5eeff]">
            {/* Add New Contact button */}
            <button
              onClick={() => {
                setActiveTab('transfer');
                showToast('Select or enter a new recipient');
              }}
              className="flex flex-col items-center justify-center shrink-0 w-20 group"
            >
              <div className="w-14 h-14 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#0b1c30] group-hover:bg-[#dce9ff] group-active:scale-95 transition-all shadow-xs mb-1.5 border border-[#dce9ff]">
                <span className="material-symbols-outlined text-[24px]">person_add</span>
              </div>
              <span className="text-[12px] font-medium text-[#44474c] group-hover:text-[#0b1c30]">
                Add New
              </span>
            </button>

            {/* Featured Portrait: Sarah M. */}
            <div
              onClick={handleSelectFeaturedContact}
              className="flex-1 flex flex-col items-center cursor-pointer group"
            >
              <div className="relative w-36 h-48 sm:w-44 sm:h-52 rounded-[28px] overflow-hidden shadow-md ring-2 ring-[#006d34]/20 group-hover:ring-[#006d34] group-hover:scale-[1.02] transition-all">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-NWvJ6yNApNO4e8N-8QsETw7b0lVybQzwj3iwjIXVJ0Zr83DiA6RliDi86OBCUWEb0Lx9hWTEWZefjBJp6RXRggmjnpQe2e1qn-Sh1e4BR4bVyrX5UnfbMVSf_zC5yeFxoHv-M5J6zJFAho6okylX8AboL7exud-Ci6h8sw_gD9sc5jhddHFarQWYI3VkGypJErTTQecyPFWIsLTuMPGTAEwd8YEXLMYpMw9OUnUIZUK9LGbPt6WU"
                  alt="Sarah Miller"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-[#0b1c30]/90 via-[#0b1c30]/40 to-transparent flex items-center justify-between text-white">
                  <div>
                    <p className="text-xs font-bold leading-none">Sarah M.</p>
                    <p className="text-[10px] text-[#54fd8f] mt-0.5">@sarahm</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#006d34] flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RECENT TRANSACTIONS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-headline-sm text-[#0b1c30]">Recent Transactions</h2>
              <span className="w-2 h-2 rounded-full bg-[#006d34]"></span>
            </div>
            <button
              onClick={() => setActiveTab('transactions')}
              className="text-xs font-semibold text-[#006d34] hover:underline flex items-center gap-0.5"
            >
              See All <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xs border border-[#e5eeff] divide-y divide-[#f1f5f9] overflow-hidden">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                onClick={() => setSelectedTransaction(tx)}
                className="p-3.5 flex items-center justify-between hover:bg-[#f8f9ff] active:scale-[0.99] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                      tx.type === 'inflow'
                        ? 'bg-[#54fd8f]/30 text-[#007237]'
                        : 'bg-[#e5eeff] text-[#0b1c30]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{tx.icon}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline-sm text-sm text-[#0b1c30] truncate group-hover:text-[#006d34] transition-colors">
                      {tx.name}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-[#44474c] mt-0.5 truncate">
                      {tx.isAutoPay && (
                        <span className="px-1.5 py-0.2 rounded bg-[#dce9ff] text-[#0b1c30] font-semibold text-[9px]">
                          AUTOPAY
                        </span>
                      )}
                      <span>{tx.subCategory || tx.category}</span>
                      <span>•</span>
                      <span>{tx.timeStr}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-2">
                  <span
                    className={`font-label-numeric font-bold block ${
                      tx.type === 'inflow' ? 'text-[#006d34]' : 'text-[#0b1c30]'
                    }`}
                  >
                    {isBalanceHidden
                      ? '••••••'
                      : `${tx.type === 'inflow' ? '+' : '-'}$${tx.amount.toFixed(2)}`}
                  </span>
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider ${
                      tx.type === 'inflow' ? 'text-[#006d34]' : 'text-[#75777d]'
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACCOUNT PROTECTED BANNER */}
        <div className="p-3.5 rounded-2xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-between text-[#0b1c30] shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#54fd8f]/30 flex items-center justify-center text-[#006d34] shrink-0">
              <span className="material-symbols-outlined text-[22px]">verified_user</span>
            </div>
            <div>
              <p className="font-headline-sm text-sm font-bold">Account Protected</p>
              <p className="text-xs text-[#44474c]">
                Biometric auth active • Zero liability guarantee
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-[18px] text-[#75777d]">chevron_right</span>
        </div>
      </div>
    </div>
  );
};
