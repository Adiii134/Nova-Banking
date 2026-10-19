import React from 'react';
import { useBank } from '../../context/BankContext';

export const TransactionReceiptModal: React.FC = () => {
  const { selectedTransaction, setSelectedTransaction, showToast } = useBank();

  if (!selectedTransaction) return null;

  const handleDownload = () => {
    showToast(`Official Receipt PDF saved for ${selectedTransaction.referenceId}`);
  };

  const handleDispute = () => {
    showToast(`Dispute ticket opened for ${selectedTransaction.name}`);
    setSelectedTransaction(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b1c30]/50 backdrop-blur-xs flex items-end sm:items-center sm:justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setSelectedTransaction(null)} />

      <div className="relative w-full sm:max-w-md bg-[#ffffff] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto no-scrollbar animate-in slide-in-from-bottom-6 duration-200">
        {/* Handle */}
        <div className="w-10 h-1 bg-[#d3e4fe] rounded-full mx-auto mb-4 sm:hidden"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e5eeff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006d34] text-[22px]">
              verified
            </span>
            <span className="font-headline-sm text-sm uppercase tracking-wider text-[#44474c] font-bold">
              Transaction Details
            </span>
          </div>
          <button
            onClick={() => setSelectedTransaction(null)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#44474c] hover:bg-[#e5eeff] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Amount & Status Hero */}
        <div className="text-center py-6 border-b border-[#e5eeff] bg-[#f8f9ff] -mx-6 px-6">
          <div
            className={`w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center ${
              selectedTransaction.type === 'inflow'
                ? 'bg-[#54fd8f]/30 text-[#007237]'
                : 'bg-[#e5eeff] text-[#0b1c30]'
            }`}
          >
            <span className="material-symbols-outlined text-[28px]">
              {selectedTransaction.icon}
            </span>
          </div>

          <p className="font-headline-md text-xl font-bold text-[#0b1c30]">
            {selectedTransaction.name}
          </p>

          <p
            className={`font-display-currency text-3xl font-bold tracking-tight my-1 ${
              selectedTransaction.type === 'inflow' ? 'text-[#006d34]' : 'text-[#0b1c30]'
            }`}
          >
            {selectedTransaction.type === 'inflow' ? '+' : '-'}$
            {selectedTransaction.amount.toFixed(2)} USD
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#54fd8f]/20 text-[#006d34] text-xs font-bold mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006d34]"></span>
            <span>{selectedTransaction.status} • FedNow Instant</span>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="py-4 space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-[#44474c]">Category</span>
            <span className="font-semibold text-[#0b1c30]">{selectedTransaction.category}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#44474c]">Account</span>
            <span className="font-semibold text-[#0b1c30]">{selectedTransaction.accountUsed}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#44474c]">Date & Time</span>
            <span className="font-semibold text-[#0b1c30]">
              {selectedTransaction.dateGroup} • {selectedTransaction.timeStr}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#44474c]">Reference Code</span>
            <span className="font-mono text-xs font-semibold text-[#0b1c30] bg-[#eff4ff] px-2 py-0.5 rounded">
              {selectedTransaction.referenceId}
            </span>
          </div>

          {selectedTransaction.cardLast4 && (
            <div className="flex justify-between items-center">
              <span className="text-[#44474c]">Payment Instrument</span>
              <span className="font-semibold text-[#0b1c30]">
                Nova Elite VISA (•••• {selectedTransaction.cardLast4})
              </span>
            </div>
          )}

          {selectedTransaction.note && (
            <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#e5eeff] text-xs text-[#44474c] mt-2">
              <span className="font-semibold text-[#0b1c30] block mb-0.5">Note:</span>
              {selectedTransaction.note}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleDownload}
            className="flex-1 py-3 px-4 rounded-xl bg-[#000000] text-white font-label-md text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#213145] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Get Receipt</span>
          </button>

          <button
            onClick={handleDispute}
            className="py-3 px-4 rounded-xl bg-[#eff4ff] hover:bg-[#ffdad6] text-[#ba1a1a] font-label-md text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">report_problem</span>
            <span>Dispute</span>
          </button>
        </div>
      </div>
    </div>
  );
};
