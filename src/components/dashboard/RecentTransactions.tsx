'use client';

import Link from 'next/link';
import Card from '@/components/ui/Card';
import CategoryIcon from '@/components/ui/CategoryIcon';
import { useRecentTransactions } from '@/store/selectors';
import { formatCurrency, formatShortDate } from '@/lib/utils';

export default function RecentTransactions() {
  const recent = useRecentTransactions(5);

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted">Recent Transactions</h3>
        <Link href="/transactions" className="text-xs font-medium text-accent hover:opacity-80">
          View all
        </Link>
      </div>

      {recent.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-light">No transactions yet</p>
      ) : (
        <div className="space-y-1">
          {recent.map((t) => (
            <Link
              key={t.id}
              href={`/transactions/${t.id}`}
              className="flex items-center justify-between rounded-lg px-2 py-2.5 transition-colors hover:bg-surface-hover"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-border-light">
                  <CategoryIcon category={t.category} size={15} className="text-muted" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.description}</p>
                  <p className="text-xs text-muted-light">{formatShortDate(t.date)}</p>
                </div>
              </div>
              <span
                className={`text-sm font-semibold ${
                  t.type === 'income' ? 'text-income' : 'text-expense'
                }`}
              >
                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </Card>
  );
}
