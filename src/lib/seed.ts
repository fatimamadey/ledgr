import { Transaction, Debt, Budget } from './types';

export function generateSeedTransactions(): Omit<Transaction, 'id' | 'createdAt'>[] {
  return [
    { description: 'Whole Foods', amount: 82.50, date: '2026-04-05', category: 'Food', type: 'expense' },
    { description: 'Monthly Salary', amount: 5200, date: '2026-04-01', category: 'Income', type: 'income' },
    { description: 'Netflix', amount: 15.99, date: '2026-04-01', category: 'Subscriptions', type: 'expense' },
    { description: 'Uber to Airport', amount: 45.00, date: '2026-04-03', category: 'Transport', type: 'expense' },
    { description: 'Electricity Bill', amount: 120.00, date: '2026-04-02', category: 'Utilities', type: 'expense' },
    { description: 'Movie Tickets', amount: 32.00, date: '2026-04-04', category: 'Entertainment', type: 'expense' },
    { description: 'New Headphones', amount: 199.99, date: '2026-04-03', category: 'Shopping', type: 'expense' },
    { description: 'Gym Membership', amount: 50.00, date: '2026-04-01', category: 'Health', type: 'expense' },
    { description: 'Online Course', amount: 29.99, date: '2026-04-02', category: 'Education', type: 'expense' },
    { description: 'Freelance Payment', amount: 800, date: '2026-04-04', category: 'Income', type: 'income' },

    { description: 'Trader Joes', amount: 65.30, date: '2026-03-28', category: 'Food', type: 'expense' },
    { description: 'Monthly Salary', amount: 5200, date: '2026-03-01', category: 'Income', type: 'income' },
    { description: 'Spotify', amount: 10.99, date: '2026-03-01', category: 'Subscriptions', type: 'expense' },
    { description: 'Gas Station', amount: 55.00, date: '2026-03-15', category: 'Transport', type: 'expense' },
    { description: 'Rent', amount: 1500.00, date: '2026-03-01', category: 'Housing', type: 'expense' },
    { description: 'Dinner with Friends', amount: 78.50, date: '2026-03-20', category: 'Food', type: 'expense' },
    { description: 'Amazon Order', amount: 45.99, date: '2026-03-12', category: 'Shopping', type: 'expense' },
    { description: 'Doctor Visit', amount: 150.00, date: '2026-03-10', category: 'Health', type: 'expense' },
    { description: 'Water Bill', amount: 35.00, date: '2026-03-05', category: 'Utilities', type: 'expense' },
    { description: 'Side Project Income', amount: 450, date: '2026-03-22', category: 'Income', type: 'income' },

    { description: 'Chipotle', amount: 14.50, date: '2026-02-25', category: 'Food', type: 'expense' },
    { description: 'Monthly Salary', amount: 5200, date: '2026-02-01', category: 'Income', type: 'income' },
    { description: 'Rent', amount: 1500.00, date: '2026-02-01', category: 'Housing', type: 'expense' },
    { description: 'Concert Tickets', amount: 120.00, date: '2026-02-14', category: 'Entertainment', type: 'expense' },
    { description: 'Bus Pass', amount: 75.00, date: '2026-02-01', category: 'Transport', type: 'expense' },

    { description: 'Monthly Salary', amount: 5200, date: '2026-01-01', category: 'Income', type: 'income' },
    { description: 'Rent', amount: 1500.00, date: '2026-01-01', category: 'Housing', type: 'expense' },
    { description: 'Winter Jacket', amount: 189.00, date: '2026-01-10', category: 'Shopping', type: 'expense' },
    { description: 'Grocery Run', amount: 95.40, date: '2026-01-18', category: 'Food', type: 'expense' },

    { description: 'Monthly Salary', amount: 5200, date: '2025-12-01', category: 'Income', type: 'income' },
    { description: 'Rent', amount: 1500.00, date: '2025-12-01', category: 'Housing', type: 'expense' },
    { description: 'Holiday Gifts', amount: 350.00, date: '2025-12-20', category: 'Shopping', type: 'expense' },

    { description: 'Monthly Salary', amount: 5200, date: '2025-11-01', category: 'Income', type: 'income' },
    { description: 'Rent', amount: 1500.00, date: '2025-11-01', category: 'Housing', type: 'expense' },
    { description: 'Thanksgiving Dinner', amount: 125.00, date: '2025-11-27', category: 'Food', type: 'expense' },
  ];
}

export function generateSeedDebts(): Omit<Debt, 'id' | 'createdAt'>[] {
  return [
    { name: 'Student Loan', direction: 'owed_to', counterparty: 'Sallie Mae', totalAmount: 25000, paidAmount: 12400, dueDate: '2030-06-01' },
    { name: 'Credit Card', direction: 'owed_to', counterparty: 'Chase', totalAmount: 3200, paidAmount: 1100 },
    { name: 'Loan to Alex', direction: 'owed_from', counterparty: 'Alex', totalAmount: 500, paidAmount: 200 },
  ];
}

export function generateSeedBudgets(): Omit<Budget, 'id'>[] {
  return [
    { category: 'Food', monthlyLimit: 500 },
    { category: 'Entertainment', monthlyLimit: 150 },
    { category: 'Shopping', monthlyLimit: 300 },
    { category: 'Transport', monthlyLimit: 200 },
  ];
}
