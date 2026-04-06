import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LedgrState } from '@/lib/types';

export const useLedgrStore = create<LedgrState>()(
  persist(
    (set) => ({
      transactions: [],
      debts: [],
      budgets: [],

      addTransaction: (t) =>
        set((s) => ({
          transactions: [
            ...s.transactions,
            { ...t, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
          ],
        })),

      addTransactions: (ts) =>
        set((s) => ({
          transactions: [
            ...s.transactions,
            ...ts.map((t) => ({
              ...t,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            })),
          ],
        })),

      updateTransaction: (id, updates) =>
        set((s) => ({
          transactions: s.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        })),

      addDebt: (d) =>
        set((s) => ({
          debts: [
            ...s.debts,
            { ...d, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
          ],
        })),

      updateDebt: (id, updates) =>
        set((s) => ({
          debts: s.debts.map((d) => (d.id === id ? { ...d, ...updates } : d)),
        })),

      deleteDebt: (id) =>
        set((s) => ({
          debts: s.debts.filter((d) => d.id !== id),
        })),

      setBudget: (b) =>
        set((s) => {
          const existing = s.budgets.find((x) => x.category === b.category);
          if (existing) {
            return {
              budgets: s.budgets.map((x) =>
                x.category === b.category ? { ...x, monthlyLimit: b.monthlyLimit } : x
              ),
            };
          }
          return {
            budgets: [...s.budgets, { ...b, id: crypto.randomUUID() }],
          };
        }),

      updateBudget: (id, updates) =>
        set((s) => ({
          budgets: s.budgets.map((b) => (b.id === id ? { ...b, ...updates } : b)),
        })),

      deleteBudget: (id) =>
        set((s) => ({
          budgets: s.budgets.filter((b) => b.id !== id),
        })),
    }),
    { name: 'ledgr-storage' }
  )
);
