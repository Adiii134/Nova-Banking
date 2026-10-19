import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';

export const QuickActionModals: React.FC = () => {
  const { quickActionModal, setQuickActionModal, showToast } = useBank();

  const [requestAmount, setRequestAmount] = useState('120.00');
  const [topupAmount, setTopupAmount] = useState('500.00');

  if (!quickActionModal) return null;

  const handleClose = () => setQuickActionModal(null);

  return (
    <div className="fixed inset-0 z-50 bg-[#0b1c30]/50 backdrop-blur-xs flex items-end sm:items-center sm:justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="relative w-full sm:max-w-md bg-[#ffffff] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl z-10 max-h-[85vh] overflow-y-auto no-scrollbar animate-in slide-in-from-bottom-6 duration-200">
        <div className="w-10 h-1 bg-[#d3e4fe] rounded-full mx-auto mb-4 sm:hidden"></div>

        {/* Modal: REQUEST MONEY */}
        {quickActionModal === 'request' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e5eeff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006d34] text-[22px]">
                  call_received
                </span>
                <h3 className="font-headline-sm text-sm uppercase tracking-wider text-[#0b1c30] font-bold">
                  Request Funds
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#44474c] hover:bg-[#e5eeff]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="text-center py-4 bg-[#f8f9ff] rounded-2xl border border-[#e5eeff]">
              <span className="text-xs text-[#75777d] uppercase font-semibold">Requested Amount</span>
              <div className="flex items-center justify-center text-3xl font-bold font-display-currency text-[#0b1c30] mt-1">
                <span>$</span>
                <input
                  type="text"
                  value={requestAmount}
                  onChange={(e) => setRequestAmount(e.target.value)}
                  className="w-36 text-center bg-transparent outline-none"
                />
              </div>
              <p className="text-xs text-[#006d34] mt-1">Instant FedNow QR code will be generated</p>
            </div>

            <div className="p-4 bg-[#ffffff] border-2 border-dashed border-[#c5c6cd] rounded-2xl flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-[64px] text-[#0b1c30]">qr_code_2</span>
              <p className="font-mono text-xs font-semibold text-[#0b1c30] mt-2">
                nova.bank/pay/alexm/{requestAmount}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  showToast('Payment link copied to clipboard!');
                  handleClose();
                }}
                className="flex-1 py-3 rounded-full bg-[#000000] text-white font-label-md text-xs font-bold hover:bg-[#213145] transition-all"
              >
                Copy Link
              </button>
              <button
                onClick={() => {
                  showToast('Shared request via Messages');
                  handleClose();
                }}
                className="py-3 px-5 rounded-full bg-[#e5eeff] text-[#0b1c30] font-label-md text-xs font-semibold hover:bg-[#dce9ff]"
              >
                Share
              </button>
            </div>
          </div>
        )}

        {/* Modal: PAY BILLS */}
        {quickActionModal === 'bills' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e5eeff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006d34] text-[22px]">
                  receipt_long
                </span>
                <h3 className="font-headline-sm text-sm uppercase tracking-wider text-[#0b1c30] font-bold">
                  Scheduled Bills
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#44474c] hover:bg-[#e5eeff]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-2xl bg-[#eff4ff] border border-[#e5eeff] flex items-center justify-between">
                <div>
                  <p className="font-headline-sm text-sm font-bold text-[#0b1c30]">
                    Metropolitan Edison Power
                  </p>
                  <p className="text-xs text-[#006d34] font-medium">AUTOPAY active • Due March 24</p>
                </div>
                <div className="text-right">
                  <span className="font-label-numeric font-bold text-[#0b1c30]">$112.40</span>
                  <span className="block text-[10px] text-[#75777d]">Monthly</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#eff4ff] border border-[#e5eeff] flex items-center justify-between">
                <div>
                  <p className="font-headline-sm text-sm font-bold text-[#0b1c30]">
                    Fiber Internet Gig+
                  </p>
                  <p className="text-xs text-[#75777d]">Manual Pay • Due March 28</p>
                </div>
                <div className="text-right">
                  <span className="font-label-numeric font-bold text-[#0b1c30]">$70.00</span>
                  <button
                    onClick={() => {
                      showToast('Internet bill paid early ($70.00)');
                      handleClose();
                    }}
                    className="block text-[10px] text-[#006d34] font-bold hover:underline"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                showToast('Add Biller workflow initiated');
                handleClose();
              }}
              className="w-full py-3 rounded-full bg-[#000000] text-white font-label-md text-xs font-bold hover:bg-[#213145]"
            >
              + Add New Biller
            </button>
          </div>
        )}

        {/* Modal: TOP-UP / DEPOSIT */}
        {quickActionModal === 'topup' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e5eeff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006d34] text-[22px]">add</span>
                <h3 className="font-headline-sm text-sm uppercase tracking-wider text-[#0b1c30] font-bold">
                  Top-up Checking Balance
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#44474c] hover:bg-[#e5eeff]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="text-center py-4 bg-[#f8f9ff] rounded-2xl border border-[#e5eeff]">
              <span className="text-xs text-[#75777d] uppercase font-semibold">Deposit Amount</span>
              <div className="flex items-center justify-center text-3xl font-bold font-display-currency text-[#0b1c30] mt-1">
                <span>$</span>
                <input
                  type="text"
                  value={topupAmount}
                  onChange={(e) => setTopupAmount(e.target.value)}
                  className="w-36 text-center bg-transparent outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#44474c] uppercase">Funding Source</span>
              <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#e5eeff] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#006d34]">account_balance</span>
                  <span className="text-sm font-semibold text-[#0b1c30]">
                    Chase Premier (*9102)
                  </span>
                </div>
                <span className="text-xs text-[#006d34] font-bold">Instant ACH</span>
              </div>
            </div>

            <button
              onClick={() => {
                showToast(`Deposited $${topupAmount} into Everyday Checking via Instant FedNow`);
                handleClose();
              }}
              className="w-full py-3.5 rounded-full bg-[#006d34] text-white font-label-md text-sm font-bold shadow-md hover:bg-[#008a44]"
            >
              Deposit Funds Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
