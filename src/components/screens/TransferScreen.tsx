import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { Beneficiary } from '../../types';

export const TransferScreen: React.FC = () => {
  const {
    selectedAccount,
    isBalanceHidden,
    beneficiaries,
    selectedBeneficiary,
    setSelectedBeneficiary,
    transferAmount,
    setTransferAmount,
    transferNote,
    setTransferNote,
    setIsAccountModalOpen,
    setIsReviewModalOpen,
    showToast,
  } = useBank();

  const [recipientQuery, setRecipientQuery] = useState('');

  const filteredBeneficiaries = beneficiaries.filter(
    (b) =>
      b.name.toLowerCase().includes(recipientQuery.toLowerCase()) ||
      b.tag.toLowerCase().includes(recipientQuery.toLowerCase()) ||
      b.bank.toLowerCase().includes(recipientQuery.toLowerCase())
  );

  const presets = [
    { label: '$50', value: '50.00' },
    { label: '$100', value: '100.00' },
    { label: '$250', value: '250.00' },
    { label: '$500', value: '500.00' },
    { label: 'Max', value: selectedAccount.balance.toFixed(2) },
  ];

  const handleSelectRecipient = (recipient: Beneficiary) => {
    setSelectedBeneficiary(recipient);
    showToast(`Selected recipient: ${recipient.name}`);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    setTransferAmount(val);
  };

  const handlePresetClick = (val: string) => {
    setTransferAmount(val);
  };

  const handleProceedClick = () => {
    const numericAmount = parseFloat(transferAmount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      showToast('Please enter a valid transfer amount');
      return;
    }
    if (numericAmount > selectedAccount.balance) {
      showToast('Amount exceeds available account balance');
      return;
    }
    setIsReviewModalOpen(true);
  };

  const parsedAmount = parseFloat(transferAmount) || 0;

  return (
    <div className="flex flex-col w-full pb-8 animate-in fade-in duration-200">
      <div className="max-w-3xl mx-auto w-full px-margin pt-space-md">
        {/* Dynamic Atmospheric Glow & Narrative Header */}
        <div className="relative mb-space-md">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-72 h-36 bg-gradient-to-b from-[#54fd8f]/20 via-[#d3e4fe]/25 to-transparent blur-3xl pointer-events-none rounded-full"></div>

          <div className="relative flex items-center justify-between mb-space-md">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#54fd8f]/20 text-[#007237] mb-1.5 border border-[#54fd8f]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006d34] animate-pulse"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  Live FedNow Enabled
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-[#0b1c30] tracking-tight">
                Transfer Funds
              </h1>
              <p className="font-body-sm text-body-sm text-[#44474c] mt-0.5">
                Fast, zero-fee instant settlements across accounts
              </p>
            </div>
            <button
              onClick={() => showToast('Instant routing optimized for low latency')}
              aria-label="Transfer Settings"
              className="w-10 h-10 rounded-full bg-[#dce9ff] flex items-center justify-center text-[#0b1c30] shadow-xs active:scale-95 transition-transform"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </button>
          </div>

          {/* Stepper Indicator */}
          <div className="grid grid-cols-3 gap-1.5 mb-space-md">
            <div className="h-1 rounded-full bg-[#000000]"></div>
            <div className="h-1 rounded-full bg-[#000000]"></div>
            <div className="h-1 rounded-full bg-[#006d34]"></div>
          </div>

          {/* STEP 1: Source Account Card */}
          <div className="mb-space-md">
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <span className="font-label-sm text-label-sm text-[#44474c] uppercase tracking-wider font-semibold">
                From Account
              </span>
              <span className="font-label-sm text-label-sm text-[#006d34] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">verified_user</span> Insured
              </span>
            </div>

            <div
              onClick={() => setIsAccountModalOpen(true)}
              className="relative bg-[#ffffff] border border-[#e5eeff] rounded-2xl p-space-md shadow-xs active:scale-[0.99] transition-all cursor-pointer hover:border-[#006d34]/40"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-[#0e1c2f] text-white flex items-center justify-center shadow-inner shrink-0">
                    <span className="material-symbols-outlined text-[22px]">
                      account_balance_wallet
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline-sm text-headline-sm text-[#0b1c30] truncate">
                        {selectedAccount.name}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#dce9ff] text-[#44474c] font-label-sm text-label-sm">
                        ({selectedAccount.accountNumber})
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-[#44474c] mt-0.5">
                      Available:{' '}
                      <span className="font-label-numeric text-label-numeric text-[#0b1c30] font-semibold">
                        {isBalanceHidden
                          ? '••••••'
                          : `$${selectedAccount.balance.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                            })}`}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#e5eeff] flex items-center justify-center text-[#0b1c30] shrink-0 ml-2">
                  <span className="material-symbols-outlined text-[20px]">swap_vert</span>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: Beneficiary / Recipient Selection */}
          <div className="mb-space-md">
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <span className="font-label-sm text-label-sm text-[#44474c] uppercase tracking-wider font-semibold">
                Recipient
              </span>
              <button
                onClick={() => showToast('Showing frequent contacts')}
                className="font-label-sm text-label-sm text-[#006d34] font-semibold hover:underline"
                type="button"
              >
                Recent History
              </button>
            </div>

            {/* Quick Search Bar */}
            <div className="relative mb-space-sm">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#44474c] text-[20px]">
                search
              </span>
              <input
                value={recipientQuery}
                onChange={(e) => setRecipientQuery(e.target.value)}
                className="w-full h-12 bg-[#ffffff] border border-[#e5eeff] rounded-2xl pl-11 pr-10 text-[#0b1c30] placeholder:text-[#44474c]/70 font-body-md text-body-md shadow-xs outline-none focus:ring-2 focus:ring-[#006d34]/40 transition-all"
                placeholder="Search name, @tag, email or phone"
                type="text"
              />
              <button
                onClick={() => showToast('QR camera scanner activated')}
                aria-label="Scan QR Code"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#44474c] hover:text-[#0b1c30]"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
              </button>
            </div>

            {/* Frequent Beneficiaries Carousel */}
            <div className="flex items-center gap-space-sm overflow-x-auto pb-1.5 no-scrollbar">
              {/* Add New Action Button */}
              <button
                onClick={() => showToast('Opening contact creator')}
                className="flex flex-col items-center shrink-0 w-16 group focus:outline-none"
                type="button"
              >
                <div className="w-12 h-12 rounded-full bg-[#dce9ff] group-active:scale-95 transition-transform flex items-center justify-center text-[#0b1c30] shadow-xs mb-1">
                  <span className="material-symbols-outlined text-[22px]">add</span>
                </div>
                <span className="font-label-sm text-label-sm text-[#44474c] text-center truncate w-full">
                  New
                </span>
              </button>

              {/* Beneficiary Carousel Items */}
              {filteredBeneficiaries.map((b) => {
                const isSelected = selectedBeneficiary.id === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => handleSelectRecipient(b)}
                    className="flex flex-col items-center shrink-0 w-16 focus:outline-none group"
                    type="button"
                  >
                    <div
                      className={`relative w-12 h-12 rounded-full p-0.5 shadow-xs mb-1 transition-all ${
                        isSelected
                          ? 'bg-[#006d34] scale-105 ring-2 ring-[#006d34]/40'
                          : 'bg-[#ffffff] border border-[#c5c6cd] group-active:scale-95'
                      }`}
                    >
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={b.avatarUrl}
                        alt={b.name}
                      />
                      {isSelected && (
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#006d34] text-white flex items-center justify-center text-[9px] shadow-xs">
                          ✓
                        </span>
                      )}
                    </div>
                    <span
                      className={`font-label-sm text-label-sm text-center truncate w-full ${
                        isSelected ? 'text-[#0b1c30] font-bold' : 'text-[#44474c]'
                      }`}
                    >
                      {b.name.split(' ')[0]} {b.name.split(' ')[1]?.[0] || ''}.
                    </span>
                  </button>
                );
              })}

              {/* Global Wire Action */}
              <button
                onClick={() => showToast('SWIFT / SEPA International Wire selected')}
                className="flex flex-col items-center shrink-0 w-16 group focus:outline-none"
                type="button"
              >
                <div className="w-12 h-12 rounded-full bg-[#d3e4fe]/50 group-active:scale-95 transition-transform flex items-center justify-center text-[#004c6e] shadow-xs mb-1">
                  <span className="material-symbols-outlined text-[20px]">public</span>
                </div>
                <span className="font-label-sm text-label-sm text-[#44474c] text-center truncate w-full">
                  Global
                </span>
              </button>
            </div>

            {/* Selected Recipient Hero Card */}
            <div className="mt-space-sm bg-[#ffffff] border border-[#e5eeff] rounded-2xl p-space-md shadow-xs relative overflow-hidden transition-all">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#54fd8f]/15 rounded-full blur-xl pointer-events-none"></div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-space-sm min-w-0">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden shrink-0 shadow-xs bg-[#e5eeff]">
                    <img
                      className="w-full h-full object-cover"
                      src={selectedBeneficiary.avatarUrl}
                      alt={selectedBeneficiary.name}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline-sm text-headline-sm text-[#0b1c30] truncate">
                        {selectedBeneficiary.name}
                      </span>
                      {selectedBeneficiary.verified && (
                        <span
                          className="material-symbols-outlined text-[#006d34] text-[16px]"
                          title="Nova Verified"
                        >
                          verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-[#44474c]">
                      <span className="text-[#006d34] font-medium font-label-numeric text-label-numeric">
                        {selectedBeneficiary.tag}
                      </span>
                      <span>•</span>
                      <span className="truncate">{selectedBeneficiary.bank}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => showToast('Editing recipient details')}
                  aria-label="Change recipient"
                  className="text-[#44474c] hover:text-[#0b1c30] p-1.5 rounded-full hover:bg-[#e5eeff] transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
              </div>
            </div>
          </div>

          {/* STEP 3: Amount Display & Dynamic Presets */}
          <div className="mb-space-md">
            <div className="bg-[#ffffff] border border-[#e5eeff] rounded-2xl p-space-md shadow-xs text-center relative overflow-hidden">
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-label-sm text-label-sm text-[#44474c] uppercase tracking-wider font-semibold">
                  Enter Amount
                </span>
                <div className="flex items-center gap-1 bg-[#e5eeff] px-2.5 py-1 rounded-full cursor-pointer hover:bg-[#dce9ff] transition-colors">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#0e1c2f] text-white flex items-center justify-center text-[9px] font-bold">
                    $
                  </span>
                  <span className="font-label-numeric text-label-numeric font-semibold text-[#0b1c30]">
                    USD
                  </span>
                  <span className="material-symbols-outlined text-[14px] text-[#44474c]">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Big Bold Currency Display */}
              <div className="my-space-sm flex items-center justify-center">
                <div className="flex items-baseline justify-center">
                  <span className="font-display-currency text-display-currency text-[#44474c]/80 mr-1 select-none">
                    $
                  </span>
                  <input
                    className="w-56 font-display-currency text-display-currency text-[#0b1c30] font-bold bg-transparent text-center outline-none border-none p-0 tracking-tight"
                    inputMode="decimal"
                    type="text"
                    value={transferAmount}
                    onChange={handleAmountChange}
                  />
                </div>
              </div>

              {/* Micro Feedback / Max Limit */}
              <p className="font-body-sm text-body-sm text-[#44474c] mb-space-md">
                Daily instant limit remaining:{' '}
                <span className="font-label-numeric text-label-numeric font-semibold text-[#0b1c30]">
                  $10,000.00
                </span>
              </p>

              {/* Preset Chips */}
              <div className="grid grid-cols-5 gap-1.5 mb-space-md">
                {presets.map((p) => {
                  const isPresetActive = transferAmount === p.value;
                  return (
                    <button
                      key={p.label}
                      onClick={() => handlePresetClick(p.value)}
                      className={`preset-btn py-2 rounded-xl font-label-numeric text-label-numeric font-semibold active:scale-95 transition-all ${
                        isPresetActive
                          ? 'bg-[#000000] text-white shadow-xs'
                          : 'bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0b1c30]'
                      }`}
                      type="button"
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>

              {/* Transfer Note Input */}
              <div className="relative">
                <div className="flex items-center gap-2 bg-[#eff4ff] rounded-xl px-3.5 py-2.5 text-left border border-[#e5eeff]">
                  <span className="material-symbols-outlined text-[18px] text-[#44474c]">
                    chat_bubble_outline
                  </span>
                  <input
                    value={transferNote}
                    onChange={(e) => setTransferNote(e.target.value)}
                    className="w-full bg-transparent text-[#0b1c30] placeholder:text-[#44474c]/60 font-body-md text-body-md outline-none"
                    placeholder="What is this for? e.g. Dinner & drinks"
                    type="text"
                  />
                  <span
                    className="text-[16px] select-none cursor-pointer"
                    title="Add Emoji"
                    onClick={() => setTransferNote(transferNote + ' 🍣')}
                  >
                    🍣
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Transfer Details Card (Live breakdown) */}
          <div className="bg-[#ffffff] border border-[#e5eeff] rounded-2xl p-space-md shadow-xs mb-space-lg">
            <div className="space-y-space-sm font-body-sm text-body-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#44474c] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">bolt</span> Transfer
                  Method
                </span>
                <span className="font-label-numeric text-label-numeric font-semibold text-[#0b1c30]">
                  Nova Direct Instant
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#44474c] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">schedule</span> Estimated
                  Arrival
                </span>
                <span className="inline-flex items-center gap-1 text-[#006d34] font-semibold font-label-sm text-label-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006d34]"></span> Within seconds
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#44474c] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">loyalty</span> Transfer Fee
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#44474c] line-through font-label-numeric text-label-numeric">
                    $2.50
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#54fd8f]/30 text-[#007237] font-label-sm text-label-sm font-bold uppercase tracking-wider">
                    Free
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Sticky CTA Container */}
          <div className="sticky bottom-0 left-0 right-0 pt-2 pb-4 bg-gradient-to-t from-[#f8f9ff] via-[#f8f9ff]/95 to-transparent">
            <div className="bg-[#ffffff]/90 backdrop-blur-md p-1.5 rounded-full shadow-lg border border-[#e5eeff] mb-2">
              <button
                onClick={handleProceedClick}
                className="w-full h-13 py-3.5 px-6 rounded-full bg-[#000000] text-white font-body-md text-body-md font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md group hover:bg-[#213145]"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">
                  lock
                </span>
                <span>Proceed to Review</span>
                <span className="font-label-numeric text-label-numeric ml-1 opacity-90">
                  (${parsedAmount.toFixed(2)})
                </span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

            {/* Security Subtext Assurance */}
            <div className="flex items-center justify-center gap-1 text-[#44474c] font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px] text-[#006d34]">
                encrypted
              </span>
              <span>256-bit bank-grade encryption with Zero-Liability protection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
