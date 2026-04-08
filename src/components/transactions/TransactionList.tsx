'use client';

import Link from 'next/link';
import { CreditCard } from 'lucide-react';
import { Transaction } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import CategoryIcon from '@/components/ui/CategoryIcon';

export default function TransactionList({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border py-16 text-center">
        <CreditCard size={32} className="text-muted-light" />
        <p className="mt-3 text-sm font-medium text-foreground">No transactions yet</p>
        <p className="mt-1 text-sm text-muted">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden sm:block overflow-hidden rounded-xl border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-hover">
                <th className="px-4 py-3 font-medium text-muted">Description</th>
                <th className="px-4 py-3 font-medium text-muted">Category</th>
                <th className="px-4 py-3 font-medium text-muted">Date</th>
                <th className="px-4 py-3 text-right font-medium text-muted">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-border-light transition-colors hover:bg-surface-hover"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/transactions/${t.id}`}
                      className="font-medium text-foreground hover:text-accent"
                    >
                      {t.description}
                    </Link>
                    {t.notes && (
                      <p className="mt-0.5 text-xs text-muted-light truncate max-w-xs">{t.notes}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-border-light px-2.5 py-1 text-xs font-medium text-muted">
                      <CategoryIcon category={t.category} size={13} />
                      {t.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted">{formatDate(t.date)}</td>
                  <td className={`px-4 py-3 text-right font-semibold ${
                    t.type === 'income' ? 'text-income' : 'text-expense'
                  }`}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile card list */}
      <div className="sm:hidden space-y-2">
        {transactions.map((t) => (
          <Link
            key={t.id}
            href={`/transactions/${t.id}`}
            className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 transition-colors hover:bg-surface-hover"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-border-light">
                <CategoryIcon category={t.category} size={15} className="text-muted" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{t.description}</p>
                <p className="text-xs text-muted-light">{formatDate(t.date)}</p>
              </div>
            </div>
            <span className={`ml-3 shrink-0 text-sm font-semibold ${
              t.type === 'income' ? 'text-income' : 'text-expense'
            }`}>
              {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
