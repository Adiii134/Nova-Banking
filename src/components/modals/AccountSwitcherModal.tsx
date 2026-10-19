import React from 'react';
import { useBank } from '../../context/BankContext';

export const AccountSwitcherModal: React.FC = () => {
  const {
    isAccountModalOpen,
    setIsAccountModalOpen,
    accounts,
    selectedAccountId,
    setSelectedAccountId,
    isBalanceHidden,
    showToast,
  } = useBank();

  if (!isAccountModalOpen) return null;

  const handleSelectAccount = (id: string, name: string) => {
    setSelectedAccountId(id);
    setIsAccountModalOpen(false);
    showToast(`Switched active account to ${name}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b1c30]/50 backdrop-blur-xs flex items-end sm:items-center sm:justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setIsAccountModalOpen(false)} />

      <div className="relative w-full sm:max-w-md bg-[#ffffff] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl z-10 max-h-[85vh] overflow-y-auto no-scrollbar animate-in slide-in-from-bottom-6 duration-200">
        <div className="w-10 h-1 bg-[#d3e4fe] rounded-full mx-auto mb-4 sm:hidden"></div>

        <div className="flex items-center justify-between pb-3 border-b border-[#e5eeff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006d34] text-[22px]">
              account_balance
            </span>
            <h3 className="font-headline-sm text-sm uppercase tracking-wider text-[#0b1c30] font-bold">
              Select Active Account
            </h3>
          </div>
          <button
            onClick={() => setIsAccountModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#44474c] hover:bg-[#e5eeff] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Account List */}
        <div className="py-4 space-y-3">
          {accounts.map((acc) => {
            const isSelected = selectedAccountId === acc.id;
            return (
              <div
                key={acc.id}
                onClick={() => handleSelectAccount(acc.id, acc.name)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-[#006d34] bg-[#54fd8f]/10 shadow-xs'
                    : 'border-[#e5eeff] bg-white hover:bg-[#f8f9ff]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      acc.type === 'checking'
                        ? 'bg-[#0e1c2f] text-white'
                        : acc.type === 'savings'
                        ? 'bg-[#006d34] text-white'
                        : 'bg-[#1b2b3e] text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {acc.type === 'checking'
                        ? 'account_balance_wallet'
                        : acc.type === 'savings'
                        ? 'savings'
                        : 'credit_card'}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-headline-sm text-sm font-bold text-[#0b1c30] truncate">
                        {acc.name}
                      </p>
                      {acc.apy && (
                        <span className="px-1.5 py-0.5 rounded-full bg-[#54fd8f] text-[#00210b] font-bold text-[9px]">
                          {acc.apy}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#44474c] mt-0.5">
                      Account {acc.accountNumber} • Routing 021000021
                    </p>
                  </div>
                </div>

                <div className="text-right pl-2">
                  <p className="font-label-numeric font-bold text-sm text-[#0b1c30]">
                    {isBalanceHidden
                      ? '••••••'
                      : `$${acc.balance.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                        })}`}
                  </p>
                  {isSelected ? (
                    <span className="text-[11px] font-bold text-[#006d34] flex items-center gap-0.5 justify-end">
                      <span className="material-symbols-outlined text-[14px]">check</span> Active
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#75777d]">Select</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Wire & ACH Details */}
        <div className="p-3.5 rounded-2xl bg-[#eff4ff] border border-[#e5eeff] text-xs space-y-1 text-[#44474c]">
          <div className="flex justify-between">
            <span>Domestic Fedwire / ACH Routing</span>
            <span className="font-mono font-bold text-[#0b1c30]">021000021</span>
          </div>
          <div className="flex justify-between">
            <span>Direct Deposit Status</span>
            <span className="font-semibold text-[#006d34]">Active (No Fee)</span>
          </div>
        </div>

        <button
          onClick={() => {
            setIsAccountModalOpen(false);
            showToast('External Plaid account linking started');
          }}
          className="mt-4 w-full py-3 rounded-full bg-[#000000] text-white font-label-md text-xs font-bold hover:bg-[#213145] transition-all"
        >
          + Link External Bank Account
        </button>
      </div>
    </div>
  );
};
