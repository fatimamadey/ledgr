'use client';

import Link from 'next/link';
import Card from '@/components/ui/Card';
import { useRecentTransactions } from '@/store/selectors';
import { formatCurrency, formatShortDate } from '@/lib/utils';
import { CATEGORY_ICONS } from '@/lib/constants';

export default function RecentTransactions() {
  const recent = useRecentTransactions(5);

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">Recent Transactions</h3>
        <Link href="/transactions" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
          View all
        </Link>
      </div>

      {recent.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-400">No transactions yet</p>
      ) : (
        <div className="space-y-3">
          {recent.map((t) => (
            <Link
              key={t.id}
              href={`/transactions/${t.id}`}
              className="flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{CATEGORY_ICONS[t.category]}</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.description}</p>
                  <p className="text-xs text-gray-400">{formatShortDate(t.date)}</p>
                </div>
              </div>
              <span
                className={`text-sm font-semibold ${
                  t.type === 'income' ? 'text-emerald-600' : 'text-red-600'
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
