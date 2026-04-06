import { useMemo } from 'react';
import { useLedgrStore } from './index';
import { Transaction, Category } from '@/lib/types';
import { getCurrentMonth, getLastNMonths } from '@/lib/utils';

export function useTransactions(): Transaction[] {
  return useLedgrStore((s) => s.transactions);
}

export function useTransactionById(id: string): Transaction | undefined {
  return useLedgrStore((s) => s.transactions.find((t) => t.id === id));
}

export function useTotalBalance(): number {
  return useLedgrStore((s) =>
    s.transactions.reduce(
      (acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount),
      0
    )
  );
}

export function useMonthlyIncome(month?: string): number {
  const m = month ?? getCurrentMonth();
  return useLedgrStore((s) =>
    s.transactions
      .filter((t) => t.date.startsWith(m) && t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0)
  );
}

export function useMonthlyExpenses(month?: string): number {
  const m = month ?? getCurrentMonth();
  return useLedgrStore((s) =>
    s.transactions
      .filter((t) => t.date.startsWith(m) && t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0)
  );
}

export function useCategorySpending(month?: string) {
  const m = month ?? getCurrentMonth();
  const transactions = useLedgrStore((s) => s.transactions);

  return useMemo(() => {
    const spending: Partial<Record<Category, number>> = {};
    transactions
      .filter((t) => t.date.startsWith(m) && t.type === 'expense')
      .forEach((t) => {
        spending[t.category] = (spending[t.category] ?? 0) + t.amount;
      });
    return Object.entries(spending).map(([category, amount]) => ({
      category: category as Category,
      amount: amount as number,
    }));
  }, [transactions, m]);
}

export function useMonthlyIncomeExpense(lastN: number = 6) {
  const months = useMemo(() => getLastNMonths(lastN), [lastN]);
  const transactions = useLedgrStore((s) => s.transactions);

  return useMemo(
    () =>
      months.map((m) => {
        const income = transactions
          .filter((t) => t.date.startsWith(m) && t.type === 'income')
          .reduce((acc, t) => acc + t.amount, 0);
        const expenses = transactions
          .filter((t) => t.date.startsWith(m) && t.type === 'expense')
          .reduce((acc, t) => acc + t.amount, 0);
        return { month: m, income, expenses };
      }),
    [transactions, months]
  );
}

export function useCategorySpendingOverTime(category: Category, lastN: number = 6) {
  const months = useMemo(() => getLastNMonths(lastN), [lastN]);
  const transactions = useLedgrStore((s) => s.transactions);

  return useMemo(
    () =>
      months.map((m) => ({
        month: m,
        amount: transactions
          .filter((t) => t.date.startsWith(m) && t.type === 'expense' && t.category === category)
          .reduce((acc, t) => acc + t.amount, 0),
      })),
    [transactions, months, category]
  );
}

export function useSimilarTransactions(id: string, category: Category, limit: number = 5) {
  const transactions = useLedgrStore((s) => s.transactions);

  return useMemo(
    () =>
      transactions
        .filter((t) => t.id !== id && t.category === category)
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, limit),
    [transactions, id, category, limit]
  );
}

export function useRecentTransactions(limit: number = 5) {
  const transactions = useLedgrStore((s) => s.transactions);

  return useMemo(
    () => [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit),
    [transactions, limit]
  );
}

export function useBudgetProgress(category: Category) {
  const m = getCurrentMonth();
  const transactions = useLedgrStore((s) => s.transactions);
  const budget = useLedgrStore((s) => s.budgets.find((b) => b.category === category));

  return useMemo(() => {
    if (!budget) return null;
    const spent = transactions
      .filter((t) => t.date.startsWith(m) && t.type === 'expense' && t.category === category)
      .reduce((acc, t) => acc + t.amount, 0);
    const percentage = budget.monthlyLimit > 0 ? (spent / budget.monthlyLimit) * 100 : 0;
    return { budget, spent, percentage, remaining: budget.monthlyLimit - spent };
  }, [transactions, budget, m, category]);
}
