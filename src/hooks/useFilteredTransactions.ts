import { useMemo } from 'react';
import { Transaction } from '@/lib/types';
import { TransactionFilterState } from '@/components/transactions/TransactionFilters';
import { useLedgrStore } from '@/store';

export function useFilteredTransactions(filters: TransactionFilterState): Transaction[] {
  const transactions = useLedgrStore((s) => s.transactions);

  return useMemo(() => {
    let result = [...transactions];

    if (filters.type !== 'all') {
      result = result.filter((t) => t.type === filters.type);
    }

    if (filters.category !== 'all') {
      result = result.filter((t) => t.category === filters.category);
    }

    if (filters.dateFrom) {
      result = result.filter((t) => t.date >= filters.dateFrom);
    }

    if (filters.dateTo) {
      result = result.filter((t) => t.date <= filters.dateTo);
    }

    result.sort((a, b) => b.date.localeCompare(a.date));

    return result;
  }, [transactions, filters]);
}
