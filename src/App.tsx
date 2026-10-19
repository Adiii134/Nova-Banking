import React from 'react';
import { BankProvider, useBank } from './context/BankContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { TransactionsScreen } from './components/screens/TransactionsScreen';
import { TransferScreen } from './components/screens/TransferScreen';
import { AnalyticsScreen } from './components/screens/AnalyticsScreen';
import { CardsScreen } from './components/screens/CardsScreen';
import { FilterBottomSheet } from './components/modals/FilterBottomSheet';
import { TransactionReceiptModal } from './components/modals/TransactionReceiptModal';
import { TransferReviewModal } from './components/modals/TransferReviewModal';
import { AccountSwitcherModal } from './components/modals/AccountSwitcherModal';
import { QuickActionModals } from './components/modals/QuickActionModals';
import { Toast } from './components/common/Toast';

const AppLayout: React.FC = () => {
  const { activeTab, viewMode } = useBank();

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'transactions':
        return <TransactionsScreen />;
      case 'transfer':
        return <TransferScreen />;
      case 'analytics':
        return <AnalyticsScreen />;
      case 'cards':
        return <CardsScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-body-md antialiased selection:bg-[#54fd8f] selection:text-[#00210b]">
      {viewMode === 'mobile-frame' ? (
        /* Realistic Mobile Device Frame Mockup */
        <div className="flex-1 flex flex-col items-center justify-start py-4 px-2 sm:px-4 bg-[#0e1c2f]/90 min-h-screen">
          <div className="w-full max-w-[420px] bg-[#f8f9ff] rounded-[40px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-[8px] border-[#213145] overflow-hidden flex flex-col relative min-h-[850px] max-h-[92vh]">
            {/* Dynamic Island / Notch bar */}
            <div className="w-full bg-[#f8f9ff] pt-2 px-6 flex items-center justify-between z-50 shrink-0">
              <span className="text-[12px] font-bold text-[#0b1c30]">9:41</span>
              <div className="w-24 h-4 bg-[#0b1c30] rounded-full"></div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#0b1c30]">
                <span>5G</span>
                <span className="material-symbols-outlined text-[14px]">battery_full</span>
              </div>
            </div>

            {/* Header */}
            <Header />

            {/* Main Content Area (Scrollable within phone container) */}
            <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
              {renderActiveScreen()}
            </main>

            {/* Mobile Bottom Navigation */}
            <BottomNav />
          </div>
        </div>
      ) : (
        /* Full Layout: Persistent Header, Sidebar, and Main Content Area */
        <div className="flex min-h-screen w-full">
          {/* Sidebar */}
          <Sidebar />

          {/* Right Area: Header + Main Content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <Header />

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
              {renderActiveScreen()}
            </main>

            {/* Mobile Bottom Navigation for small screens */}
            <BottomNav />
          </div>
        </div>
      )}

      {/* Shared Global Modals */}
      <FilterBottomSheet />
      <TransactionReceiptModal />
      <TransferReviewModal />
      <AccountSwitcherModal />
      <QuickActionModals />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <BankProvider>
      <AppLayout />
    </BankProvider>
  );
}
