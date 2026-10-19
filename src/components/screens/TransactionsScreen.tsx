import React, { useMemo } from 'react';
import { useBank } from '../../context/BankContext';
import { Transaction } from '../../types';

export const TransactionsScreen: React.FC = () => {
  const {
    filterState,
    setFilterState,
    resetFilters,
    filteredTransactions,
    setSelectedTransaction,
    setIsFilterSheetOpen,
    isBalanceHidden,
    showToast,
  } = useBank();

  const categories = [
    { id: 'All', label: 'All', icon: 'apps' },
    { id: 'Income', label: 'Income', icon: 'trending_up', iconColor: 'text-[#006d34]' },
    { id: 'Transfers', label: 'Transfers', icon: 'swap_horiz' },
    { id: 'Shopping', label: 'Shopping', icon: 'shopping_bag' },
    { id: 'Bills & Utilities', label: 'Bills & Utilities', icon: 'receipt' },
    { id: 'Food & Dining', label: 'Food & Dining', icon: 'restaurant' },
  ];

  // Group filtered transactions by dateGroup
  const groupedTransactions = useMemo(() => {
    const groups: { [key: string]: { items: Transaction[]; netTotal: number } } = {};

    filteredTransactions.forEach((tx) => {
      const groupKey = tx.dateGroup || 'Other Transactions';
      if (!groups[groupKey]) {
        groups[groupKey] = { items: [], netTotal: 0 };
      }
      groups[groupKey].items.push(tx);
      const delta = tx.type === 'inflow' ? tx.amount : -tx.amount;
      groups[groupKey].netTotal += delta;
    });

    return groups;
  }, [filteredTransactions]);

  const handleCategoryClick = (cat: string) => {
    setFilterState((prev) => ({ ...prev, category: cat }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterState((prev) => ({ ...prev, searchQuery: e.target.value }));
  };

  const handleClearSearch = () => {
    setFilterState((prev) => ({ ...prev, searchQuery: '' }));
  };

  const handleCardClick = (tx: Transaction) => {
    setSelectedTransaction(tx);
    showToast(`Viewing receipt for ${tx.name}`);
  };

  return (
    <div className="flex flex-col w-full pb-8 animate-in fade-in duration-200">
      <div className="max-w-3xl mx-auto w-full">
        {/* Search & Instant Filter Bar */}
        <div className="px-margin pt-4 pb-2">
          <div className="flex items-center gap-space-xs">
            <div className="flex-1 flex items-center bg-[#ffffff] shadow-xs border border-[#e5eeff] rounded-full h-12 px-4 transition-all focus-within:shadow-md focus-within:border-[#006d34]">
              <span className="material-symbols-outlined text-[#75777d] text-[20px] mr-2">
                search
              </span>
              <input
                className="w-full bg-transparent border-0 outline-none font-body-md text-body-md text-[#0b1c30] placeholder:text-[#75777d]"
                placeholder="Search by merchant, note, or amount..."
                type="text"
                value={filterState.searchQuery}
                onChange={handleSearchChange}
              />
              {filterState.searchQuery && (
                <button
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  className="text-[#75777d] hover:text-[#0b1c30] transition-colors p-1"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>

            <button
              onClick={() => setIsFilterSheetOpen(true)}
              aria-label="Filter transactions"
              className="w-12 h-12 rounded-full bg-[#ffffff] border border-[#e5eeff] shadow-xs flex items-center justify-center text-[#0b1c30] hover:bg-[#dce9ff] transition-transform active:scale-95 relative"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#006d34]"></span>
            </button>
          </div>
        </div>

        {/* Category Pills (Horizontal Scroll) */}
        <div className="w-full overflow-x-auto no-scrollbar py-2.5 px-margin">
          <div className="flex items-center gap-2 min-w-max">
            {categories.map((cat) => {
              const isActive = filterState.category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`h-8 px-4 rounded-full font-label-md text-label-md flex items-center gap-1.5 transition-all shadow-xs active:scale-95 ${
                    isActive
                      ? 'bg-[#000000] text-[#ffffff] font-semibold'
                      : 'bg-[#ffffff] text-[#0b1c30] border border-[#e5eeff] hover:bg-[#dce9ff]'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      cat.iconColor && !isActive ? cat.iconColor : ''
                    }`}
                  >
                    {cat.icon}
                  </span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Monthly Summary Widget */}
        <div className="px-margin my-2">
          <div className="bg-[#ffffff] border border-[#e5eeff] rounded-2xl p-4 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006d34] text-[18px]">
                  calendar_month
                </span>
                <span className="font-headline-sm text-headline-sm text-[#0b1c30]">
                  March 2025
                </span>
              </div>
              <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-[#54fd8f] text-[#00210b] font-bold tracking-wide">
                +50.2% Net
              </span>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 pt-1 pb-3">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-[#44474c] uppercase tracking-wider">
                  Total Inflow
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-label-numeric text-label-numeric text-[#006d34] font-bold text-lg">
                    {isBalanceHidden ? '••••••' : '+$6,800.00'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-[#44474c] uppercase tracking-wider">
                  Total Outflow
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-label-numeric text-label-numeric text-[#0b1c30] font-bold text-lg">
                    {isBalanceHidden ? '••••••' : '-$3,420.50'}
                  </span>
                </div>
              </div>
            </div>

            {/* Mini Spending Ratio Bar */}
            <div className="space-y-1.5">
              <div className="w-full bg-[#e5eeff] h-2 rounded-full overflow-hidden flex">
                <div
                  className="bg-[#006d34] h-full rounded-l-full transition-all duration-500"
                  style={{ width: '66.5%' }}
                ></div>
                <div
                  className="bg-[#44474c]/40 h-full rounded-r-full transition-all duration-500"
                  style={{ width: '33.5%' }}
                ></div>
              </div>
              <div className="flex justify-between items-center font-body-sm text-body-sm text-[#44474c]">
                <span>Inflow 66.5%</span>
                <span>Outflow 33.5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Applied Filter Chips / Status Row */}
        <div className="px-margin py-1 flex items-center justify-between text-[#44474c]">
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              Feed
            </span>
            <span className="w-1 h-1 rounded-full bg-[#c5c6cd]"></span>
            <span className="font-label-sm text-label-sm">
              {filteredTransactions.length} Transaction
              {filteredTransactions.length === 1 ? '' : 's'}
            </span>
          </div>
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 font-label-sm text-label-sm text-[#006d34] hover:underline"
          >
            <span className="material-symbols-outlined text-[14px]">history</span>
            <span>Reset filters</span>
          </button>
        </div>

        {/* Grouped Transactions Feed */}
        {filteredTransactions.length > 0 ? (
          <div className="space-y-4 px-margin mt-1">
            {Object.entries(groupedTransactions).map(([dateGroup, groupData]) => (
              <div key={dateGroup} className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <h3 className="font-headline-sm text-headline-sm text-[#0b1c30]">{dateGroup}</h3>
                  <span className="font-body-sm text-body-sm text-[#44474c]">
                    {isBalanceHidden
                      ? '••••'
                      : `${groupData.netTotal >= 0 ? '+' : '-'}$${Math.abs(
                          groupData.netTotal
                        ).toFixed(2)} Net`}
                  </span>
                </div>

                <div className="space-y-2">
                  {groupData.items.map((tx) => (
                    <div
                      key={tx.id}
                      onClick={() => handleCardClick(tx)}
                      className="group relative flex items-center justify-between p-3.5 bg-[#ffffff] border border-[#e5eeff] rounded-2xl shadow-xs hover:shadow-md hover:border-[#006d34]/40 transition-all active:scale-[0.99] cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                            tx.type === 'inflow'
                              ? 'bg-[#54fd8f]/30 text-[#007237]'
                              : 'bg-[#e5eeff] text-[#0b1c30]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[22px]">{tx.icon}</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`font-headline-sm text-headline-sm truncate transition-colors ${
                                tx.type === 'inflow'
                                  ? 'text-[#0b1c30] group-hover:text-[#006d34]'
                                  : 'text-[#0b1c30] group-hover:text-[#000000]'
                              }`}
                            >
                              {tx.name}
                            </span>
                            {tx.verifiedEmployer && (
                              <span
                                className="inline-flex items-center text-[#006d34]"
                                title="Verified employer deposit"
                              >
                                <span
                                  className="material-symbols-outlined text-[16px]"
                                  style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                  verified
                                </span>
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-[#44474c] mt-0.5 truncate">
                            {tx.isAutoPay && (
                              <span className="px-1.5 py-0.2 rounded bg-[#dce9ff] text-[#0b1c30] font-semibold text-[10px]">
                                AUTOPAY
                              </span>
                            )}
                            <span>{tx.timeStr}</span>
                            <span>•</span>
                            {tx.cardLast4 ? (
                              <span className="inline-flex items-center gap-0.5">
                                <span className="material-symbols-outlined text-[13px]">
                                  credit_card
                                </span>
                                Card *{tx.cardLast4}
                              </span>
                            ) : (
                              <span
                                className={
                                  tx.type === 'inflow' ? 'text-[#006d34] font-medium' : ''
                                }
                              >
                                {tx.note || tx.subCategory || tx.category}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0 pl-2">
                        <span
                          className={`font-label-numeric text-label-numeric font-bold block ${
                            tx.type === 'inflow' ? 'text-[#006d34]' : 'text-[#0b1c30]'
                          }`}
                        >
                          {isBalanceHidden
                            ? '••••••'
                            : `${tx.type === 'inflow' ? '+' : '-'}$${tx.amount.toFixed(2)}`}
                        </span>
                        <span
                          className={`font-label-sm text-label-sm uppercase tracking-wider ${
                            tx.type === 'inflow'
                              ? 'text-[#006d34] font-semibold'
                              : 'text-[#44474c]'
                          }`}
                        >
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="px-margin py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#dce9ff] flex items-center justify-center text-[#75777d] mb-3">
              <span className="material-symbols-outlined text-[32px]">search_off</span>
            </div>
            <h4 className="font-headline-sm text-headline-sm text-[#0b1c30]">
              No transactions match
            </h4>
            <p className="font-body-md text-body-md text-[#44474c] mt-1 max-w-xs">
              Try checking for typos or adjusting your filter parameters to view more results.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-5 py-2 rounded-full bg-[#000000] text-[#ffffff] font-label-md text-label-md shadow-sm active:scale-95 transition-all hover:bg-[#213145]"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
