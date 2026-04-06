'use client';

import Link from 'next/link';
import { Transaction } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CATEGORY_ICONS } from '@/lib/constants';

export default function TransactionList({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 py-16 text-center">
        <span className="text-4xl">💳</span>
        <p className="mt-3 text-sm font-medium text-gray-900">No transactions yet</p>
        <p className="mt-1 text-sm text-gray-500">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 font-medium text-gray-600">Description</th>
              <th className="px-4 py-3 font-medium text-gray-600">Category</th>
              <th className="px-4 py-3 font-medium text-gray-600">Date</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr
                key={t.id}
                className="border-b border-gray-100 transition-colors hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/transactions/${t.id}`}
                    className="font-medium text-gray-900 hover:text-indigo-600"
                  >
                    {t.description}
                  </Link>
                  {t.notes && (
                    <p className="mt-0.5 text-xs text-gray-400 truncate max-w-xs">{t.notes}</p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                    {CATEGORY_ICONS[t.category]} {t.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{formatDate(t.date)}</td>
                <td className={`px-4 py-3 text-right font-semibold ${
                  t.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
