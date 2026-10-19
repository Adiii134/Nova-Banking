import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';

export const AnalyticsScreen: React.FC = () => {
  const { isBalanceHidden, depositSurplus, showToast } = useBank();

  const [timeframe, setTimeframe] = useState<'Week' | 'Month' | 'Year' | 'Custom'>('Month');
  const [selectedMonth, setSelectedMonth] = useState('March 2025');
  const [activeDonutSegment, setActiveDonutSegment] = useState<string | null>(null);
  const [goals, setGoals] = useState([
    {
      id: 'goal-1',
      title: 'Stay under $850 grocery target',
      status: '$820.00',
      completed: true,
      icon: 'check_circle',
    },
    {
      id: 'goal-2',
      title: 'Automated $500 monthly investment',
      status: 'Executed',
      completed: true,
      icon: 'check_circle',
    },
    {
      id: 'goal-3',
      title: 'Zero discretionary spend this weekend',
      status: 'Pending',
      completed: false,
      icon: 'radio_button_unchecked',
    },
  ]);

  const categories = [
    {
      id: 'housing',
      name: 'Housing & Rent',
      amount: 1300,
      percentage: 38,
      color: '#0B192C',
      transactions: '3 transactions',
      status: 'On budget',
      icon: 'apartment',
    },
    {
      id: 'food',
      name: 'Food & Groceries',
      amount: 820,
      percentage: 24,
      color: '#00D26A',
      transactions: '28 transactions',
      status: '-$145 MoM',
      icon: 'shopping_cart',
    },
    {
      id: 'shopping',
      name: 'Shopping & Ent.',
      amount: 615,
      percentage: 18,
      color: '#0EA5E9',
      transactions: '14 transactions',
      status: '+4% MoM',
      icon: 'movie',
    },
    {
      id: 'transport',
      name: 'Transport',
      amount: 410,
      percentage: 12,
      color: '#F59E0B',
      transactions: '11 transactions',
      status: '-8% MoM',
      icon: 'directions_car',
    },
    {
      id: 'utilities',
      name: 'Utilities & Subs',
      amount: 275,
      percentage: 8,
      color: '#64748B',
      transactions: '6 transactions',
      status: 'Fixed',
      icon: 'bolt',
    },
  ];

  const toggleGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const next = !g.completed;
          showToast(next ? `Completed goal: ${g.title}` : `Marked pending: ${g.title}`);
          return {
            ...g,
            completed: next,
            status: next ? 'Completed' : 'Pending',
            icon: next ? 'check_circle' : 'radio_button_unchecked',
          };
        }
        return g;
      })
    );
  };

  const handleDepositInsight = () => {
    depositSurplus(145.0);
  };

  const completedGoalsCount = goals.filter((g) => g.completed).length;

  return (
    <div className="flex flex-col w-full pb-8 animate-in fade-in duration-200">
      <div className="max-w-3xl mx-auto w-full px-margin pt-space-md flex flex-col gap-space-lg">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-label-sm text-label-sm text-[#44474c] uppercase tracking-wider font-semibold">
              Financial Pulse
            </p>
            <h1 className="font-headline-md text-headline-md text-[#0b1c30]">
              Spending Insights
            </h1>
          </div>
          <button
            onClick={() => showToast('Financial Statement PDF generated for March 2025')}
            aria-label="Export Financial Statement"
            className="w-10 h-10 rounded-full bg-[#e5eeff] flex items-center justify-center text-[#0b1c30] hover:bg-[#dce9ff] transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[20px]">download</span>
          </button>
        </div>

        {/* Segmented Timeframe Control */}
        <div className="bg-[#e5eeff] p-1 rounded-full flex items-center justify-between shadow-inner">
          {(['Week', 'Month', 'Year', 'Custom'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`flex-1 py-1.5 rounded-full text-center font-label-md text-label-md transition-all ${
                timeframe === t
                  ? 'bg-[#ffffff] text-[#0b1c30] font-bold shadow-xs'
                  : 'text-[#44474c] hover:text-[#0b1c30]'
              }`}
              type="button"
            >
              {t}
            </button>
          ))}
        </div>

        {/* Timeframe Sub-banner */}
        <div className="flex items-center justify-between px-space-xs">
          <button
            onClick={() => {
              setSelectedMonth('February 2025');
              showToast('Loaded February 2025 data');
            }}
            aria-label="Previous month"
            className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#44474c] hover:text-[#0b1c30] transition-colors border border-[#e5eeff]"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <div className="flex items-center gap-space-xs">
            <span
              className="material-symbols-outlined text-[#006d34] text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              calendar_today
            </span>
            <span className="font-headline-sm text-headline-sm text-[#0b1c30]">
              {selectedMonth}
            </span>
          </div>
          <button
            onClick={() => {
              setSelectedMonth('April 2025 (Projected)');
              showToast('Loaded April 2025 forecast');
            }}
            aria-label="Next month"
            className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#44474c] hover:text-[#0b1c30] transition-colors border border-[#e5eeff]"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>

        {/* Total Spend Metric Hero Card */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0e1c2f] via-[#1b2b3e] to-[#071321] p-space-lg text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-[#54fd8f]/10 blur-2xl pointer-events-none"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-[#d3e4fe]/10 blur-xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm tracking-wider uppercase text-[#77849c] font-semibold">
                Total Spend
              </span>
              <div className="flex items-center gap-1 bg-[#54fd8f]/20 px-2.5 py-1 rounded-full text-[#2fe378]">
                <span className="material-symbols-outlined text-[14px]">trending_down</span>
                <span className="font-label-sm text-label-sm font-semibold">14% less</span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="font-display-currency text-display-currency tracking-tight text-white">
                {isBalanceHidden ? '••••••' : '$3,420.50'}
              </div>
              <p className="font-body-sm text-body-sm text-[#77849c] mt-1">
                vs $3,977.30 in February
              </p>
            </div>

            <div className="mt-space-xs pt-space-sm bg-white/5 rounded-xl p-space-sm flex items-center justify-between border border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#2fe378]">
                  <span className="material-symbols-outlined text-[16px]">pace</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-[#77849c] leading-none">
                    Daily Average
                  </span>
                  <span className="font-label-numeric text-label-numeric text-white mt-1">
                    {isBalanceHidden ? '••••' : '$114.02'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-label-sm text-label-sm text-[#2fe378] font-semibold">
                  Healthy Pace
                </span>
                <p className="font-body-sm text-body-sm text-[#77849c]">-$18.50/day</p>
              </div>
            </div>
          </div>
        </div>

        {/* Spending Breakdown Section */}
        <div className="rounded-2xl bg-[#ffffff] border border-[#e5eeff] p-space-lg shadow-xs flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-[#0b1c30]">Top Categories</h2>
              <p className="font-body-sm text-body-sm text-[#44474c]">
                Tap category to isolate spend
              </p>
            </div>
            <button
              onClick={() => showToast('Displaying all 12 spending categories')}
              className="font-label-sm text-label-sm text-[#006d34] font-semibold uppercase tracking-wider flex items-center gap-0.5 hover:underline"
            >
              View All <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>

          {/* Donut Chart & Legend Composite */}
          <div className="flex flex-col sm:flex-row items-center gap-space-md py-space-xs">
            <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background track */}
                <circle cx="50" cy="50" fill="none" r="38" stroke="#E5EEFF" strokeWidth="12" />
                {/* Housing & Rent (38%) */}
                <circle
                  onClick={() => setActiveDonutSegment('Housing & Rent')}
                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                  cx="50"
                  cy="50"
                  fill="none"
                  r="38"
                  stroke="#0B192C"
                  strokeDasharray="90.73 238.76"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  strokeWidth="12"
                />
                {/* Food & Groceries (24%) */}
                <circle
                  onClick={() => setActiveDonutSegment('Food & Groceries')}
                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                  cx="50"
                  cy="50"
                  fill="none"
                  r="38"
                  stroke="#00D26A"
                  strokeDasharray="57.30 238.76"
                  strokeDashoffset="-92"
                  strokeLinecap="round"
                  strokeWidth="12"
                />
                {/* Shopping & Entertainment (18%) */}
                <circle
                  onClick={() => setActiveDonutSegment('Shopping & Ent.')}
                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                  cx="50"
                  cy="50"
                  fill="none"
                  r="38"
                  stroke="#0EA5E9"
                  strokeDasharray="42.98 238.76"
                  strokeDashoffset="-151"
                  strokeLinecap="round"
                  strokeWidth="12"
                />
                {/* Transport & Travel (12%) */}
                <circle
                  onClick={() => setActiveDonutSegment('Transport')}
                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                  cx="50"
                  cy="50"
                  fill="none"
                  r="38"
                  stroke="#F59E0B"
                  strokeDasharray="28.65 238.76"
                  strokeDashoffset="-195.5"
                  strokeLinecap="round"
                  strokeWidth="12"
                />
                {/* Utilities & Subscriptions (8%) */}
                <circle
                  onClick={() => setActiveDonutSegment('Utilities & Subs')}
                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                  cx="50"
                  cy="50"
                  fill="none"
                  r="38"
                  stroke="#64748B"
                  strokeDasharray="19.10 238.76"
                  strokeDashoffset="-225.5"
                  strokeLinecap="round"
                  strokeWidth="12"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="font-label-sm text-label-sm text-[#44474c] uppercase">
                  {activeDonutSegment ? 'Selected' : 'Largest'}
                </span>
                <span className="font-headline-sm text-headline-sm text-[#0b1c30] font-bold">
                  {activeDonutSegment
                    ? categories.find((c) => c.name === activeDonutSegment)?.percentage + '%'
                    : '38%'}
                </span>
                <span className="font-body-sm text-body-sm text-[#44474c] leading-none">
                  {activeDonutSegment
                    ? categories.find((c) => c.name === activeDonutSegment)?.name.split(' ')[0]
                    : 'Housing'}
                </span>
              </div>
            </div>

            {/* Compact Segment Representation */}
            <div className="flex-1 flex flex-col gap-2 min-w-0 w-full">
              {categories.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setActiveDonutSegment(c.name);
                    showToast(`Isolated category: ${c.name}`);
                  }}
                  className={`flex items-center justify-between text-[#0b1c30] p-1 rounded-lg cursor-pointer transition-colors ${
                    activeDonutSegment === c.name ? 'bg-[#e5eeff]' : 'hover:bg-[#f8f9ff]'
                  }`}
                >
                  <span className="font-body-sm text-body-sm font-medium flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: c.color }}
                    ></span>
                    <span className="truncate">{c.name}</span>
                  </span>
                  <span className="font-label-numeric text-label-numeric font-bold">
                    ${c.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Segmented Category Row Details */}
          <div className="flex flex-col gap-space-sm pt-space-xs">
            {categories.slice(0, 3).map((c) => (
              <div
                key={c.id}
                onClick={() => showToast(`Breakdown for ${c.name}`)}
                className="p-space-sm rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] transition-all flex items-center justify-between cursor-pointer border border-[#e5eeff]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      c.id === 'housing'
                        ? 'bg-[#dce9ff] text-[#0b1c30]'
                        : c.id === 'food'
                        ? 'bg-[#54fd8f]/30 text-[#007237]'
                        : 'bg-[#d3e4fe] text-[#0b1c30]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{c.icon}</span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md font-semibold text-[#0b1c30]">
                      {c.name}
                    </p>
                    <p className="font-body-sm text-body-sm text-[#44474c]">
                      {c.transactions} • {c.percentage}%
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-label-numeric text-label-numeric font-bold text-[#0b1c30]">
                    ${c.amount.toFixed(2)}
                  </p>
                  <span
                    className={`font-label-sm text-label-sm font-semibold ${
                      c.status.includes('-') ? 'text-[#006d34]' : 'text-[#44474c]'
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spend Velocity (Week-by-week: Feb vs Mar) */}
        <div className="rounded-2xl bg-[#ffffff] border border-[#e5eeff] p-space-lg shadow-xs flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-[#0b1c30]">Spend Velocity</h2>
              <p className="font-body-sm text-body-sm text-[#44474c]">Week-by-week: Feb vs Mar</p>
            </div>
            <div className="flex items-center gap-space-sm text-label-sm font-label-sm">
              <div className="flex items-center gap-1 text-[#44474c]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c5c6cd]"></span>
                <span>Feb</span>
              </div>
              <div className="flex items-center gap-1 text-[#0b1c30]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006d34]"></span>
                <span className="font-semibold">Mar</span>
              </div>
            </div>
          </div>

          {/* Multi-bar Chart Visualizer */}
          <div className="pt-space-md pb-space-xs">
            <div className="h-40 w-full flex items-end justify-between gap-3 px-space-xs">
              {/* W1 */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full flex items-end justify-center gap-1.5 h-32">
                  <div className="w-3 bg-[#c5c6cd]/60 rounded-t-sm" style={{ height: '65%' }}></div>
                  <div
                    className="w-3 bg-[#006d34] rounded-t-sm relative group cursor-pointer"
                    style={{ height: '52%' }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0e1c2f] text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-20">
                      $710
                    </div>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-[#44474c]">W1</span>
              </div>

              {/* W2 */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full flex items-end justify-center gap-1.5 h-32">
                  <div className="w-3 bg-[#c5c6cd]/60 rounded-t-sm" style={{ height: '85%' }}></div>
                  <div
                    className="w-3 bg-[#006d34] rounded-t-sm relative group cursor-pointer"
                    style={{ height: '70%' }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0e1c2f] text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-20">
                      $950
                    </div>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-[#44474c]">W2</span>
              </div>

              {/* W3 */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full flex items-end justify-center gap-1.5 h-32">
                  <div className="w-3 bg-[#c5c6cd]/60 rounded-t-sm" style={{ height: '75%' }}></div>
                  <div
                    className="w-3 bg-[#006d34] rounded-t-sm relative group cursor-pointer"
                    style={{ height: '62%' }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0e1c2f] text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-20">
                      $840
                    </div>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-[#44474c]">W3</span>
              </div>

              {/* W4 (Now) */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full flex items-end justify-center gap-1.5 h-32">
                  <div className="w-3 bg-[#c5c6cd]/60 rounded-t-sm" style={{ height: '90%' }}></div>
                  <div
                    className="w-3 bg-[#006d34] rounded-t-sm relative group cursor-pointer"
                    style={{ height: '68%' }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0e1c2f] text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-20">
                      $920
                    </div>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm font-bold text-[#006d34]">
                  W4 (Now)
                </span>
              </div>

              {/* W5 Projection */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full flex items-end justify-center gap-1.5 h-32">
                  <div className="w-3 bg-[#c5c6cd]/60 rounded-t-sm" style={{ height: '40%' }}></div>
                  <div
                    className="w-3 bg-[#dce9ff] rounded-t-sm relative border border-dashed border-[#75777d]"
                    style={{ height: '30%' }}
                  ></div>
                </div>
                <span className="font-label-sm text-label-sm text-[#44474c]">W5</span>
              </div>
            </div>
          </div>

          <div className="bg-[#eff4ff] p-space-sm rounded-xl flex items-center justify-between border border-[#e5eeff]">
            <span className="font-body-sm text-body-sm text-[#44474c]">Pace relative to Feb</span>
            <span className="font-label-sm text-label-sm font-semibold text-[#006d34] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              $556.80 under previous total
            </span>
          </div>
        </div>

        {/* Financial Health & Budget Limits Widget */}
        <div className="rounded-2xl bg-[#ffffff] border border-[#e5eeff] p-space-lg shadow-xs flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[#006d34] text-[22px]">shield</span>
              <h2 className="font-headline-sm text-headline-sm text-[#0b1c30]">Monthly Budget</h2>
            </div>
            <span className="bg-[#e5eeff] px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold text-[#0b1c30]">
              Limit: $4,500
            </span>
          </div>

          {/* Segmented Bar & Stats */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-baseline">
              <span className="font-headline-sm text-headline-sm text-[#0b1c30] font-bold">
                76% <span className="font-body-sm text-[#44474c] font-normal">used</span>
              </span>
              <span className="font-label-numeric text-label-numeric font-semibold text-[#44474c]">
                $1,079.50 left
              </span>
            </div>

            {/* Visual Progress Track */}
            <div className="w-full h-3 bg-[#e5eeff] rounded-full overflow-hidden p-0.5 flex">
              <div
                className="h-full bg-[#006d34] rounded-full transition-all duration-500"
                style={{ width: '76%' }}
              ></div>
            </div>

            <div className="flex items-center justify-between font-body-sm text-body-sm text-[#44474c] mt-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#006d34]">
                  verified
                </span>
                17 days left in billing cycle
              </span>
              <span className="font-medium text-[#0b1c30]">$63.50 max/day</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
            <div className="p-space-sm rounded-xl bg-[#eff4ff] flex flex-col border border-[#e5eeff]">
              <span className="font-label-sm text-label-sm text-[#44474c] uppercase">
                Fixed Costs
              </span>
              <span className="font-label-numeric text-label-numeric font-bold text-[#0b1c30] mt-1">
                $1,985.00
              </span>
              <span className="font-body-sm text-body-sm text-[#006d34] mt-0.5">100% accounted</span>
            </div>
            <div className="p-space-sm rounded-xl bg-[#eff4ff] flex flex-col border border-[#e5eeff]">
              <span className="font-label-sm text-label-sm text-[#44474c] uppercase">
                Discretionary
              </span>
              <span className="font-label-numeric text-label-numeric font-bold text-[#0b1c30] mt-1">
                $1,435.50
              </span>
              <span className="font-body-sm text-body-sm text-[#44474c] mt-0.5">Safe velocity</span>
            </div>
          </div>
        </div>

        {/* AI Smart Savings Tip Card */}
        <div className="rounded-2xl bg-gradient-to-r from-[#54fd8f]/20 via-[#d3e4fe]/30 to-[#f8f9ff] p-space-md shadow-xs relative overflow-hidden border border-[#54fd8f]/30">
          <div className="flex items-start gap-space-md">
            <div className="w-12 h-12 rounded-full bg-[#54fd8f] flex items-center justify-center text-[#00210b] shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[24px]">rocket_launch</span>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#006d34] font-bold">
                  AI Savings Insight
                </span>
                <span
                  onClick={() => showToast('Insight dismissed')}
                  className="material-symbols-outlined text-[#44474c] text-[16px] cursor-pointer hover:text-[#0b1c30]"
                >
                  close
                </span>
              </div>
              <p className="font-body-md text-body-md text-[#0b1c30] font-medium leading-snug">
                You saved{' '}
                <span className="font-bold text-[#006d34] font-label-numeric">$145.00</span> on
                dining out compared to last month!
              </p>
              <p className="font-body-sm text-body-sm text-[#44474c]">
                Transfer this surplus directly into your{' '}
                <strong className="text-[#0b1c30]">Emergency Fund</strong> to reach your Q1
                milestone 8 days earlier.
              </p>
              <div className="mt-2 flex items-center gap-space-sm">
                <button
                  onClick={handleDepositInsight}
                  className="px-4 py-2 rounded-full bg-[#000000] text-white font-label-md text-label-md font-semibold hover:bg-[#213145] transition-transform active:scale-95 shadow-xs"
                >
                  Deposit $145
                </button>
                <button
                  onClick={() => showToast('Reminder set for 3 days from now')}
                  className="px-3 py-2 rounded-full text-[#0b1c30] font-label-md text-label-md font-medium hover:bg-[#e5eeff] transition-colors"
                >
                  Remind Later
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Financial Health Checklist */}
        <div className="rounded-2xl bg-[#ffffff] border border-[#e5eeff] p-space-lg shadow-xs flex flex-col gap-space-md mb-space-md">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-headline-sm text-[#0b1c30]">Month-End Goals</h2>
            <span className="font-label-sm text-label-sm text-[#006d34] font-semibold">
              {completedGoalsCount} of {goals.length} Complete
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            {goals.map((goal) => (
              <div
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className="flex items-center justify-between p-3 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] transition-colors cursor-pointer border border-[#e5eeff]"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      goal.completed ? 'text-[#006d34]' : 'text-[#75777d]'
                    }`}
                    style={goal.completed ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {goal.icon}
                  </span>
                  <span
                    className={`font-body-md text-body-md text-[#0b1c30] ${
                      goal.completed ? 'line-through opacity-80' : ''
                    }`}
                  >
                    {goal.title}
                  </span>
                </div>
                <span
                  className={`font-label-numeric text-label-numeric font-bold ${
                    goal.completed ? 'text-[#006d34]' : 'text-[#44474c]'
                  }`}
                >
                  {goal.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
