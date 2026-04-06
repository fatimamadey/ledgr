export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Food'
  | 'Transport'
  | 'Housing'
  | 'Entertainment'
  | 'Shopping'
  | 'Health'
  | 'Income'
  | 'Subscriptions'
  | 'Utilities'
  | 'Education'
  | 'Other';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: Category;
  type: TransactionType;
  notes?: string;
  createdAt: string;
}

export interface Debt {
  id: string;
  name: string;
  direction: 'owed_to' | 'owed_from';
  counterparty: string;
  totalAmount: number;
  paidAmount: number;
  dueDate?: string;
  createdAt: string;
}

export interface Budget {
  id: string;
  category: Category;
  monthlyLimit: number;
}

export interface ColumnMapping {
  description: string | null;
  amount: string | null;
  date: string | null;
}

export interface ParsedTransaction {
  description: string;
  amount: number;
  date: string;
  category: Category;
  type: TransactionType;
  selected: boolean;
}

export interface LedgrState {
  transactions: Transaction[];
  debts: Debt[];
  budgets: Budget[];

  addTransaction: (t: Omit<Transaction, 'id' | 'createdAt'>) => void;
  addTransactions: (ts: Omit<Transaction, 'id' | 'createdAt'>[]) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;

  addDebt: (d: Omit<Debt, 'id' | 'createdAt'>) => void;
  updateDebt: (id: string, updates: Partial<Debt>) => void;
  deleteDebt: (id: string) => void;

  setBudget: (b: Omit<Budget, 'id'>) => void;
  updateBudget: (id: string, updates: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
}
