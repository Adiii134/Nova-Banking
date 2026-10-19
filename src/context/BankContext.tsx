import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  TabType,
  BankAccount,
  Beneficiary,
  Transaction,
  FilterState,
  BankNotification,
} from '../types';

interface BankContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  accounts: BankAccount[];
  selectedAccountId: string;
  setSelectedAccountId: (id: string) => void;
  selectedAccount: BankAccount;
  isBalanceHidden: boolean;
  toggleBalanceHidden: () => void;
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  beneficiaries: Beneficiary[];
  selectedBeneficiary: Beneficiary;
  setSelectedBeneficiary: (b: Beneficiary) => void;
  transferAmount: string;
  setTransferAmount: (val: string) => void;
  transferNote: string;
  setTransferNote: (val: string) => void;
  executeTransfer: (amount: number, recipient: Beneficiary, note: string) => Promise<boolean>;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  notifications: BankNotification[];
  unreadCount: number;
  markNotificationsAsRead: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  selectedTransaction: Transaction | null;
  setSelectedTransaction: (tx: Transaction | null) => void;
  isFilterSheetOpen: boolean;
  setIsFilterSheetOpen: (open: boolean) => void;
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  viewMode: 'desktop' | 'mobile-frame';
  setViewMode: (mode: 'desktop' | 'mobile-frame') => void;
  quickActionModal: 'send' | 'request' | 'bills' | 'topup' | null;
  setQuickActionModal: (action: 'send' | 'request' | 'bills' | 'topup' | null) => void;
  depositSurplus: (amount: number) => void;
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (open: boolean) => void;
}

const INITIAL_ACCOUNTS: BankAccount[] = [
  {
    id: 'checking-4821',
    name: 'Everyday Checking',
    accountNumber: '*4821',
    balance: 24850.75,
    type: 'checking',
    currency: 'USD',
    isPrimary: true,
  },
  {
    id: 'vault-1092',
    name: 'High-Yield Vault',
    accountNumber: '*1092',
    balance: 68420.0,
    type: 'savings',
    currency: 'USD',
    apy: '4.65% APY',
  },
  {
    id: 'credit-8812',
    name: 'Nova Elite Credit',
    accountNumber: '*8812',
    balance: 1420.5,
    type: 'credit',
    currency: 'USD',
  },
];

const INITIAL_BENEFICIARIES: Beneficiary[] = [
  {
    id: 'sarah-m',
    name: 'Sarah Miller',
    tag: '@sarahm',
    bank: 'Chase Bank ****9102',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA-NWvJ6yNApNO4e8N-8QsETw7b0lVybQzwj3iwjIXVJ0Zr83DiA6RliDi86OBCUWEb0Lx9hWTEWZefjBJp6RXRggmjnpQe2e1qn-Sh1e4BR4bVyrX5UnfbMVSf_zC5yeFxoHv-M5J6zJFAho6okylX8AboL7exud-Ci6h8sw_gD9sc5jhddHFarQWYI3VkGypJErTTQecyPFWIsLTuMPGTAEwd8YEXLMYpMw9OUnUIZUK9LGbPt6WU',
    altText: 'Sarah Miller portrait',
    verified: true,
  },
  {
    id: 'marcus-c',
    name: 'Marcus Chen',
    tag: '@marcusc',
    bank: 'Wells Fargo ****4190',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8nzVwScwZ9Lxm3aoNEPszJswC8UziqxDXSJA2KaQXNdUfcz10iENvz2OkuLKii8xO4ouQkHuTVuE1FVK_y_sU90St4R60KA2s-oSlKiSN-MnJIc09MDtA9cvUpI9-30zhdvF6GutbqA8ofP2cBdds2VhB2RhQ4HMMDye73FKNo8iym0wTh_susYe5nCxAmMcM2qdE6jTaCiiYURIjSqwNJu6AHeRjlSU5FCulzWorYLu2CDOb8Y32',
    altText: 'Marcus Chen portrait',
    verified: false,
  },
  {
    id: 'elena-r',
    name: 'Elena Rostova',
    tag: '@elena_r',
    bank: 'Citibank ****8831',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ28zqT_ILf46e6F_syzEu_4aJU5hK6jRMyJ8hQTvZxkYnZ6hoHcUQSmq3fv_aGTEqjHgdgZApz_7TUVDrgzvV7ExosndzWvh7Q-qdEDH_GjCf0XAhibqK_PrCuchVqnJ_b_4GYLiPGwe8oJ8RfVlgOuwmWaEkrewFUzum3mPUylA_tSfZxDLd5LNyYyP_llfJlK7oD8IGMe6POf3vRopQIxlleOJ2V_QZ6gWd5WEvleASy4QApgCu',
    altText: 'Elena Rostova portrait',
    verified: false,
  },
  {
    id: 'liam-v',
    name: 'Liam Vance',
    tag: '@lvance',
    bank: 'Bank of America ****3312',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCT-pRMa0_m0M4CuVBl2BvvVVHaQ140x-YYmKw4HI9rqoSMhzWIrhx7zIoLlXdUWjWD9L-K91jQvsm4vZDaMsuXzb5L_JoSPhgd5x5YRr87XxEXzoj4fimwgUXNWYkUysTK5HnQvkSIoaDVeZ9M-xCCB-GzpW30YlWtK0UZn7XAeSHIIw-B5p11YtLqkYO9FFEarDJcRCo3gkuCkK3SvUlHMB08UkMnmWqxZijEY8mnQawdmKxkRhqG',
    altText: 'Liam Vance portrait',
    verified: false,
  },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    name: 'Whole Foods Market',
    category: 'Shopping',
    subCategory: 'Groceries',
    amount: 84.2,
    type: 'outflow',
    timestamp: '2025-03-14T11:42:00',
    dateGroup: 'Today, March 14',
    timeStr: '11:42 AM',
    cardLast4: '4821',
    status: 'Settled',
    icon: 'shopping_cart',
    referenceId: 'NB-894102-WF',
    note: 'Weekly organic groceries & produce',
    accountUsed: 'Everyday Checking (*4821)',
  },
  {
    id: 'tx-2',
    name: 'Transfer from Michael Chen',
    category: 'Transfers',
    subCategory: 'Income',
    amount: 250.0,
    type: 'inflow',
    timestamp: '2025-03-14T09:15:00',
    dateGroup: 'Today, March 14',
    timeStr: '9:15 AM',
    status: 'Completed',
    icon: 'arrow_downward',
    referenceId: 'NB-990142-TX',
    note: 'Project payment',
    accountUsed: 'Everyday Checking (*4821)',
  },
  {
    id: 'tx-3',
    name: 'Uber Rides',
    category: 'Bills & Utilities',
    subCategory: 'Transport',
    amount: 24.5,
    type: 'outflow',
    timestamp: '2025-03-13T20:30:00',
    dateGroup: 'Yesterday, March 13',
    timeStr: '8:30 PM',
    status: 'Settled',
    icon: 'directions_car',
    referenceId: 'NB-318420-UB',
    note: 'Transport to Downtown Summit',
    accountUsed: 'Everyday Checking (*4821)',
  },
  {
    id: 'tx-4',
    name: 'TechCorp Payroll',
    category: 'Income',
    subCategory: 'Direct Deposit',
    amount: 4250.0,
    type: 'inflow',
    timestamp: '2025-03-13T06:00:00',
    dateGroup: 'Yesterday, March 13',
    timeStr: '6:00 AM',
    status: 'Cleared',
    icon: 'payments',
    verifiedEmployer: true,
    referenceId: 'NB-001294-DD',
    note: 'Direct Deposit • Verified Employer',
    accountUsed: 'Everyday Checking (*4821)',
  },
  {
    id: 'tx-5',
    name: 'Amazon.com',
    category: 'Shopping',
    subCategory: 'Order #9214',
    amount: 67.89,
    type: 'outflow',
    timestamp: '2025-03-13T13:15:00',
    dateGroup: 'Yesterday, March 13',
    timeStr: '1:15 PM',
    status: 'Settled',
    icon: 'local_mall',
    referenceId: 'NB-774019-AMZ',
    note: 'Order #9214 - Electronics Accessories',
    accountUsed: 'Everyday Checking (*4821)',
  },
  {
    id: 'tx-6',
    name: 'Electric Utility Bill',
    category: 'Bills & Utilities',
    subCategory: 'Utilities',
    amount: 112.4,
    type: 'outflow',
    timestamp: '2025-03-11T10:00:00',
    dateGroup: 'March 11, 2025',
    timeStr: '10:00 AM',
    status: 'Recurring',
    icon: 'bolt',
    isAutoPay: true,
    referenceId: 'NB-448201-UTL',
    note: 'AUTOPAY • Metropolitan Edison Power',
    accountUsed: 'Everyday Checking (*4821)',
  },
  {
    id: 'tx-7',
    name: 'Blue Bottle Coffee',
    category: 'Food & Dining',
    subCategory: 'Food & Dining',
    amount: 7.25,
    type: 'outflow',
    timestamp: '2025-03-11T08:04:00',
    dateGroup: 'March 11, 2025',
    timeStr: '8:04 AM',
    status: 'Contactless',
    icon: 'local_cafe',
    referenceId: 'NB-192847-BBC',
    note: 'Contactless Apple Pay tap',
    accountUsed: 'Everyday Checking (*4821)',
  },
  {
    id: 'tx-8',
    name: 'Apple Store 5th Ave',
    category: 'Shopping',
    subCategory: 'Gadgets',
    amount: 129.0,
    type: 'outflow',
    timestamp: '2025-03-10T14:15:00',
    dateGroup: 'March 11, 2025',
    timeStr: '2:15 PM',
    status: 'Settled',
    icon: 'devices',
    referenceId: 'NB-552194-APL',
    note: 'Checking • USB-C Hub & MagSafe battery',
    accountUsed: 'Everyday Checking (*4821)',
  },
  {
    id: 'tx-9',
    name: 'Starbucks Coffee',
    category: 'Food & Dining',
    subCategory: 'Food & Dining',
    amount: 6.45,
    type: 'outflow',
    timestamp: '2025-03-09T08:20:00',
    dateGroup: 'March 11, 2025',
    timeStr: '8:20 AM',
    cardLast4: '4821',
    status: 'Settled',
    icon: 'local_cafe',
    referenceId: 'NB-882711-SBUX',
    note: 'Card ••4821 • Iced Oat Milk Latte',
    accountUsed: 'Everyday Checking (*4821)',
  },
  {
    id: 'tx-10',
    name: 'Netflix Premium',
    category: 'Bills & Utilities',
    subCategory: 'Recurring',
    amount: 15.99,
    type: 'outflow',
    timestamp: '2025-03-08T00:00:00',
    dateGroup: 'March 11, 2025',
    timeStr: '12:00 AM',
    status: 'Recurring',
    icon: 'smart_display',
    isAutoPay: true,
    referenceId: 'NB-661920-NFLX',
    note: 'Auto-pay • 4K UHD Monthly Subscription',
    accountUsed: 'Everyday Checking (*4821)',
  },
];

const INITIAL_NOTIFICATIONS: BankNotification[] = [
  {
    id: 'notif-1',
    title: 'FedNow Transfer Received',
    description: '+$250.00 from Michael Chen cleared instantly via FedNow.',
    time: '9:15 AM',
    read: false,
    type: 'transfer',
  },
  {
    id: 'notif-2',
    title: 'Direct Deposit Cleared',
    description: 'TechCorp Payroll +$4,250.00 has been deposited into Everyday Checking.',
    time: '6:00 AM',
    read: false,
    type: 'transfer',
  },
  {
    id: 'notif-3',
    title: 'Smart Savings Opportunity',
    description: 'You are $145.00 under budget on dining out this month.',
    time: 'Yesterday',
    read: true,
    type: 'insight',
  },
  {
    id: 'notif-4',
    title: 'Security Shield Active',
    description: 'Biometric authorization active. Zero-Liability guarantee confirmed.',
    time: '2 days ago',
    read: true,
    type: 'security',
  },
];

const INITIAL_FILTER_STATE: FilterState = {
  searchQuery: '',
  category: 'All',
  timeframe: 'March 2025',
  transactionType: 'All Types',
  account: 'Everyday Checking (*4821)',
  maxAmount: 5000,
};

const BankContext = createContext<BankContextType | undefined>(undefined);

export const BankProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [accounts, setAccounts] = useState<BankAccount[]>(INITIAL_ACCOUNTS);
  const [selectedAccountId, setSelectedAccountId] = useState<string>('checking-4821');
  const [isBalanceHidden, setIsBalanceHidden] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [beneficiaries] = useState<Beneficiary[]>(INITIAL_BENEFICIARIES);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary>(INITIAL_BENEFICIARIES[0]);
  const [transferAmount, setTransferAmount] = useState<string>('500.00');
  const [transferNote, setTransferNote] = useState<string>('Dinner & drinks');
  const [filterState, setFilterState] = useState<FilterState>(INITIAL_FILTER_STATE);
  const [notifications, setNotifications] = useState<BankNotification[]>(INITIAL_NOTIFICATIONS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState<boolean>(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile-frame'>('desktop');
  const [quickActionModal, setQuickActionModal] = useState<'send' | 'request' | 'bills' | 'topup' | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  const selectedAccount = useMemo(() => {
    return accounts.find((a) => a.id === selectedAccountId) || accounts[0];
  }, [accounts, selectedAccountId]);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const toggleBalanceHidden = () => {
    setIsBalanceHidden((prev) => !prev);
    showToast(!isBalanceHidden ? 'Balances hidden for privacy' : 'Balances visible');
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read');
  };

  const resetFilters = () => {
    setFilterState(INITIAL_FILTER_STATE);
    showToast('Filters reset to default');
  };

  const executeTransfer = async (amount: number, recipient: Beneficiary, note: string): Promise<boolean> => {
    if (amount <= 0) {
      showToast('Please enter an amount greater than 0');
      return false;
    }
    if (selectedAccount.balance < amount) {
      showToast('Insufficient funds in selected account');
      return false;
    }

    // Deduct from current account
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === selectedAccountId) {
          return { ...acc, balance: Number((acc.balance - amount).toFixed(2)) };
        }
        return acc;
      })
    );

    // Create new transaction
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      name: `Transfer to ${recipient.name}`,
      category: 'Transfers',
      subCategory: note || 'Instant Transfer',
      amount: amount,
      type: 'outflow',
      timestamp: new Date().toISOString(),
      dateGroup: 'Today, March 14',
      timeStr: 'Just now',
      cardLast4: '4821',
      status: 'Completed',
      icon: 'arrow_outward',
      referenceId: `NB-${Math.floor(100000 + Math.random() * 900000)}-FED`,
      note: note || 'Direct instant settlement via FedNow',
      recipientTag: recipient.tag,
      accountUsed: selectedAccount.name + ` (${selectedAccount.accountNumber})`,
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Add notification
    const newNotif: BankNotification = {
      id: `notif-${Date.now()}`,
      title: 'Transfer Sent Successfully',
      description: `Sent $${amount.toFixed(2)} to ${recipient.name} (${recipient.tag}).`,
      time: 'Just now',
      read: false,
      type: 'transfer',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast(`Transferred $${amount.toFixed(2)} to ${recipient.name}!`);
    return true;
  };

  const depositSurplus = (amount: number) => {
    // Transfer $amount from Checking to Vault
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === 'checking-4821') {
          return { ...acc, balance: Number((acc.balance - amount).toFixed(2)) };
        }
        if (acc.id === 'vault-1092') {
          return { ...acc, balance: Number((acc.balance + amount).toFixed(2)) };
        }
        return acc;
      })
    );

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      name: 'Emergency Fund Savings Surplus',
      category: 'Transfers',
      subCategory: 'Automated Savings',
      amount: amount,
      type: 'outflow',
      timestamp: new Date().toISOString(),
      dateGroup: 'Today, March 14',
      timeStr: 'Just now',
      status: 'Completed',
      icon: 'savings',
      referenceId: `NB-${Math.floor(100000 + Math.random() * 900000)}-SAV`,
      note: 'AI Insight dining surplus moved to High-Yield Vault (4.65% APY)',
      accountUsed: 'Everyday Checking (*4821)',
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`Moved $${amount.toFixed(2)} surplus to High-Yield Vault!`);
  };

  // Filter calculation
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Category filter
      if (filterState.category !== 'All') {
        const cat = tx.category.toLowerCase();
        const filterCat = filterState.category.toLowerCase();
        if (!cat.includes(filterCat)) return false;
      }

      // Query filter (merchant name, note, amount)
      if (filterState.searchQuery.trim() !== '') {
        const q = filterState.searchQuery.toLowerCase().trim();
        const matchesName = tx.name.toLowerCase().includes(q);
        const matchesNote = tx.note ? tx.note.toLowerCase().includes(q) : false;
        const matchesCat = tx.category.toLowerCase().includes(q);
        const matchesAmount = tx.amount.toString().includes(q);
        if (!matchesName && !matchesNote && !matchesCat && !matchesAmount) {
          return false;
        }
      }

      // Transaction type filter
      if (filterState.transactionType === 'Money In (+)' && tx.type !== 'inflow') return false;
      if (filterState.transactionType === 'Money Out (-)' && tx.type !== 'outflow') return false;

      // Max amount filter
      if (tx.amount > filterState.maxAmount) return false;

      return true;
    });
  }, [transactions, filterState]);

  return (
    <BankContext.Provider
      value={{
        activeTab,
        setActiveTab,
        accounts,
        selectedAccountId,
        setSelectedAccountId,
        selectedAccount,
        isBalanceHidden,
        toggleBalanceHidden,
        transactions,
        filteredTransactions,
        beneficiaries,
        selectedBeneficiary,
        setSelectedBeneficiary,
        transferAmount,
        setTransferAmount,
        transferNote,
        setTransferNote,
        executeTransfer,
        filterState,
        setFilterState,
        resetFilters,
        notifications,
        unreadCount,
        markNotificationsAsRead,
        toastMessage,
        showToast,
        selectedTransaction,
        setSelectedTransaction,
        isFilterSheetOpen,
        setIsFilterSheetOpen,
        isAccountModalOpen,
        setIsAccountModalOpen,
        isSidebarOpen,
        setIsSidebarOpen,
        viewMode,
        setViewMode,
        quickActionModal,
        setQuickActionModal,
        depositSurplus,
        isReviewModalOpen,
        setIsReviewModalOpen,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => {
  const context = useContext(BankContext);
  if (!context) {
    throw new Error('useBank must be used within a BankProvider');
  }
  return context;
};
