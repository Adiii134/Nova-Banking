export type TabType = 'dashboard' | 'transactions' | 'transfer' | 'analytics' | 'cards';

export interface BankAccount {
  id: string;
  name: string;
  accountNumber: string;
  balance: number;
  type: 'checking' | 'savings' | 'credit';
  currency: string;
  isPrimary?: boolean;
  apy?: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  tag: string;
  bank: string;
  avatarUrl: string;
  altText: string;
  verified: boolean;
  type?: 'individual' | 'business' | 'global';
}

export interface Transaction {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  amount: number;
  type: 'inflow' | 'outflow';
  timestamp: string;
  dateGroup: 'Today, March 14' | 'Yesterday, March 13' | 'March 11, 2025' | string;
  timeStr: string;
  cardLast4?: string;
  status: 'Settled' | 'Completed' | 'Cleared' | 'Recurring' | 'Contactless' | 'Pending';
  icon: string;
  verifiedEmployer?: boolean;
  isAutoPay?: boolean;
  referenceId: string;
  note?: string;
  recipientTag?: string;
  accountUsed: string;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  timeframe: 'All Time' | 'March 2025' | 'Past 30 Days';
  transactionType: 'All Types' | 'Money In (+)' | 'Money Out (-)';
  account: string;
  maxAmount: number;
}

export interface BankNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'transfer' | 'security' | 'reward' | 'insight';
}

export interface SpendingCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
  transactionsCount: number;
  momChange: string;
  icon: string;
  status?: string;
}
