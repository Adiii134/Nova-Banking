import React from 'react';
import { useBank } from '../../context/BankContext';

export const FilterBottomSheet: React.FC = () => {
  const {
    isFilterSheetOpen,
    setIsFilterSheetOpen,
    filterState,
    setFilterState,
    resetFilters,
    showToast,
  } = useBank();

  if (!isFilterSheetOpen) return null;

  const handleTimeframeChange = (tf: 'All Time' | 'March 2025' | 'Past 30 Days') => {
    setFilterState((prev) => ({ ...prev, timeframe: tf }));
  };

  const handleTypeChange = (tp: 'All Types' | 'Money In (+)' | 'Money Out (-)') => {
    setFilterState((prev) => ({ ...prev, transactionType: tp }));
  };

  const handleApply = () => {
    setIsFilterSheetOpen(false);
    showToast('Filters applied successfully');
  };

  const handleReset = () => {
    resetFilters();
    setIsFilterSheetOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b1c30]/50 backdrop-blur-xs flex items-end sm:items-center sm:justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={() => setIsFilterSheetOpen(false)} />

      <div className="relative w-full sm:max-w-md bg-[#ffffff] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl z-10 max-h-[85vh] overflow-y-auto no-scrollbar animate-in slide-in-from-bottom-6 duration-200">
        {/* Handle & Header */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-10 h-1 bg-[#d3e4fe] rounded-full mb-3 sm:hidden"></div>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0b1c30] text-[22px]">tune</span>
              <h3 className="font-headline-md text-headline-md text-[#0b1c30]">Refine Feed</h3>
            </div>
            <button
              onClick={() => setIsFilterSheetOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#44474c] hover:bg-[#e5eeff] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Form */}
        <div className="space-y-4">
          {/* Timeframe Selection */}
          <div>
            <label className="block font-label-sm text-label-sm text-[#44474c] uppercase tracking-wider mb-2 font-semibold">
              Timeframe
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['All Time', 'March 2025', 'Past 30 Days'] as const).map((tf) => {
                const isActive = filterState.timeframe === tf;
                return (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => handleTimeframeChange(tf)}
                    className={`py-2 px-1 rounded-xl font-label-md text-xs transition-colors text-center ${
                      isActive
                        ? 'bg-[#000000] text-white font-semibold'
                        : 'bg-[#e5eeff] text-[#0b1c30] hover:bg-[#dce9ff]'
                    }`}
                  >
                    {tf}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Transaction Type */}
          <div>
            <label className="block font-label-sm text-label-sm text-[#44474c] uppercase tracking-wider mb-2 font-semibold">
              Transaction Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['All Types', 'Money In (+)', 'Money Out (-)'] as const).map((tp) => {
                const isActive = filterState.transactionType === tp;
                return (
                  <button
                    key={tp}
                    type="button"
                    onClick={() => handleTypeChange(tp)}
                    className={`py-2 px-1 rounded-xl font-label-md text-xs transition-colors text-center ${
                      isActive
                        ? 'bg-[#000000] text-white font-semibold'
                        : 'bg-[#e5eeff] text-[#0b1c30] hover:bg-[#dce9ff]'
                    }`}
                  >
                    {tp}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Account Picker */}
          <div>
            <label className="block font-label-sm text-label-sm text-[#44474c] uppercase tracking-wider mb-2 font-semibold">
              Account
            </label>
            <div className="flex flex-col gap-2">
              <div
                onClick={() =>
                  setFilterState((prev) => ({
                    ...prev,
                    account: 'Everyday Checking (*4821)',
                  }))
                }
                className="flex items-center justify-between p-3 rounded-xl bg-[#e5eeff] cursor-pointer hover:bg-[#dce9ff] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-[#0b1c30]">
                    account_balance_wallet
                  </span>
                  <span className="font-body-md text-body-md font-medium text-[#0b1c30]">
                    Checking Account (*4821)
                  </span>
                </div>
                <span
                  className="material-symbols-outlined text-[#006d34] text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>

              <div
                onClick={() => showToast('Filtered to High-Yield Vault')}
                className="flex items-center justify-between p-3 rounded-xl bg-[#e5eeff] cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-[#44474c]">
                    savings
                  </span>
                  <span className="font-body-md text-body-md text-[#0b1c30]">
                    High-Yield Vault (*1092)
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#75777d] text-[20px]">
                  radio_button_unchecked
                </span>
              </div>
            </div>
          </div>

          {/* Amount Range Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-label-sm text-label-sm text-[#44474c] uppercase tracking-wider font-semibold">
                Amount Threshold
              </label>
              <span className="font-label-numeric text-label-numeric font-bold text-[#0b1c30]">
                Up to ${filterState.maxAmount.toLocaleString()}
              </span>
            </div>
            <input
              className="w-full accent-[#000000] h-2 bg-[#e5eeff] rounded-lg cursor-pointer"
              max="5000"
              min="10"
              step="50"
              type="range"
              value={filterState.maxAmount}
              onChange={(e) =>
                setFilterState((prev) => ({
                  ...prev,
                  maxAmount: Number(e.target.value),
                }))
              }
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-6 pt-2">
          <button
            onClick={handleReset}
            className="flex-1 h-12 rounded-full bg-[#e5eeff] text-[#0b1c30] font-label-md text-label-md font-semibold active:scale-95 transition-all hover:bg-[#dce9ff]"
          >
            Reset All
          </button>
          <button
            onClick={handleApply}
            className="flex-[2] h-12 rounded-full bg-[#000000] text-white font-label-md text-label-md font-bold active:scale-95 transition-all shadow-md hover:bg-[#213145]"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
