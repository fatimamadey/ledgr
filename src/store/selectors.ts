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

export function useCategorySpending(month?: string): { category: Category; amount: number }[] {
  const m = month ?? getCurrentMonth();
  return useLedgrStore((s) => {
    const spending: Partial<Record<Category, number>> = {};
    s.transactions
      .filter((t) => t.date.startsWith(m) && t.type === 'expense')
      .forEach((t) => {
        spending[t.category] = (spending[t.category] ?? 0) + t.amount;
      });
    return Object.entries(spending).map(([category, amount]) => ({
      category: category as Category,
      amount: amount as number,
    }));
  });
}

export function useMonthlyIncomeExpense(lastN: number = 6) {
  const months = getLastNMonths(lastN);
  return useLedgrStore((s) =>
    months.map((m) => {
      const income = s.transactions
        .filter((t) => t.date.startsWith(m) && t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);
      const expenses = s.transactions
        .filter((t) => t.date.startsWith(m) && t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);
      return { month: m, income, expenses };
    })
  );
}

export function useCategorySpendingOverTime(category: Category, lastN: number = 6) {
  const months = getLastNMonths(lastN);
  return useLedgrStore((s) =>
    months.map((m) => ({
      month: m,
      amount: s.transactions
        .filter((t) => t.date.startsWith(m) && t.type === 'expense' && t.category === category)
        .reduce((acc, t) => acc + t.amount, 0),
    }))
  );
}

export function useSimilarTransactions(id: string, category: Category, limit: number = 5) {
  return useLedgrStore((s) =>
    s.transactions
      .filter((t) => t.id !== id && t.category === category)
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, limit)
  );
}

export function useRecentTransactions(limit: number = 5) {
  return useLedgrStore((s) =>
    [...s.transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit)
  );
}

export function useBudgetProgress(category: Category) {
  const m = getCurrentMonth();
  return useLedgrStore((s) => {
    const budget = s.budgets.find((b) => b.category === category);
    if (!budget) return null;
    const spent = s.transactions
      .filter((t) => t.date.startsWith(m) && t.type === 'expense' && t.category === category)
      .reduce((acc, t) => acc + t.amount, 0);
    const percentage = budget.monthlyLimit > 0 ? (spent / budget.monthlyLimit) * 100 : 0;
    return { budget, spent, percentage, remaining: budget.monthlyLimit - spent };
  });
}
