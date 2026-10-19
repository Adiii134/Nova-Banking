import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';

export const TransferReviewModal: React.FC = () => {
  const {
    isReviewModalOpen,
    setIsReviewModalOpen,
    transferAmount,
    transferNote,
    selectedBeneficiary,
    selectedAccount,
    executeTransfer,
    setActiveTab,
  } = useBank();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isReviewModalOpen) return null;

  const parsedAmount = parseFloat(transferAmount) || 0;

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate biometric check / network latency
    setTimeout(async () => {
      const success = await executeTransfer(parsedAmount, selectedBeneficiary, transferNote);
      setIsProcessing(false);
      if (success) {
        setIsSuccess(true);
      }
    }, 1000);
  };

  const handleFinish = () => {
    setIsSuccess(false);
    setIsReviewModalOpen(false);
    setActiveTab('transactions');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b1c30]/50 backdrop-blur-xs flex items-end sm:items-center sm:justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="absolute inset-0"
        onClick={() => !isProcessing && setIsReviewModalOpen(false)}
      />

      <div className="relative w-full sm:max-w-md bg-[#ffffff] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto no-scrollbar animate-in slide-in-from-bottom-6 duration-200">
        {!isSuccess ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#e5eeff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006d34] text-[22px]">
                  lock
                </span>
                <h3 className="font-headline-sm text-sm uppercase tracking-wider text-[#0b1c30] font-bold">
                  Review Instant Transfer
                </h3>
              </div>
              {!isProcessing && (
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#44474c] hover:bg-[#e5eeff] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              )}
            </div>

            {/* Amount Banner */}
            <div className="text-center py-5 bg-[#f8f9ff] -mx-6 px-6 border-b border-[#e5eeff]">
              <span className="text-xs uppercase font-semibold text-[#44474c] tracking-wider">
                Total Amount
              </span>
              <p className="font-display-currency text-3xl sm:text-4xl font-bold tracking-tight text-[#0b1c30] my-1">
                ${parsedAmount.toFixed(2)}{' '}
                <span className="text-xs font-semibold text-[#44474c]">USD</span>
              </p>
              <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#006d34]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006d34]"></span>
                <span>Zero-Fee FedNow Instant Transfer</span>
              </div>
            </div>

            {/* Recipient Details */}
            <div className="py-4 space-y-3 text-sm">
              <div className="p-3 rounded-2xl bg-[#eff4ff] border border-[#e5eeff] flex items-center gap-3">
                <img
                  src={selectedBeneficiary.avatarUrl}
                  alt={selectedBeneficiary.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#006d34]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-[#0b1c30] truncate">
                      {selectedBeneficiary.name}
                    </p>
                    {selectedBeneficiary.verified && (
                      <span className="material-symbols-outlined text-[#006d34] text-[16px]">
                        verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#006d34] font-medium">
                    {selectedBeneficiary.tag}
                  </p>
                  <p className="text-xs text-[#44474c] truncate">{selectedBeneficiary.bank}</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-[#44474c]">Source Account</span>
                <span className="font-semibold text-[#0b1c30]">
                  {selectedAccount.name} ({selectedAccount.accountNumber})
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-[#44474c]">Payment Route</span>
                <span className="font-semibold text-[#006d34]">Nova FedNow Instant</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-[#44474c]">Estimated Arrival</span>
                <span className="font-semibold text-[#0b1c30]">Within seconds</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-[#44474c]">Transfer Fee</span>
                <span className="font-bold text-[#006d34] uppercase tracking-wide">
                  $0.00 (Free)
                </span>
              </div>

              {transferNote && (
                <div className="p-3 rounded-xl bg-[#f8f9ff] border border-[#e5eeff] text-xs">
                  <span className="text-[#75777d] block mb-0.5">Note:</span>
                  <span className="font-medium text-[#0b1c30]">{transferNote}</span>
                </div>
              )}
            </div>

            {/* Authorize CTA */}
            <div className="pt-2">
              <button
                disabled={isProcessing}
                onClick={handleConfirm}
                className="w-full py-4 rounded-full bg-[#000000] text-white font-body-md text-sm font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#213145] active:scale-[0.98] transition-all disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <span className="inline-block w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                    <span>Authorizing Payment Route...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">fingerprint</span>
                    <span>Authorize with Biometrics</span>
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-[#75777d] mt-2.5">
                Protected by 256-bit encryption • Backed by Nova Bank Zero Liability
              </p>
            </div>
          </>
        ) : (
          /* SUCCESS SCREEN */
          <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#54fd8f]/30 text-[#006d34] mx-auto flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[36px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-[#54fd8f]/20 text-[#006d34] text-xs font-bold uppercase tracking-wider">
                Settled Instantly
              </span>
              <h3 className="font-headline-md text-2xl font-bold text-[#0b1c30] mt-2">
                Transfer Sent!
              </h3>
              <p className="text-sm text-[#44474c] mt-1">
                ${parsedAmount.toFixed(2)} has been sent to {selectedBeneficiary.name}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#eff4ff] border border-[#e5eeff] text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#44474c]">Reference ID</span>
                <span className="font-mono font-semibold text-[#0b1c30]">
                  NB-{Math.floor(100000 + Math.random() * 900000)}-FED
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#44474c]">Delivered To</span>
                <span className="font-semibold text-[#0b1c30]">
                  {selectedBeneficiary.tag} ({selectedBeneficiary.bank})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#44474c]">Remaining Balance</span>
                <span className="font-bold text-[#006d34]">
                  ${selectedAccount.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-full bg-[#006d34] text-white font-label-md text-sm font-bold shadow-md hover:bg-[#008a44] transition-all"
            >
              Done & View Activity
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
