'use client';

import Link from 'next/link';
import { CreditCard } from 'lucide-react';
import { Transaction } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import CategoryIcon from '@/components/ui/CategoryIcon';

export default function TransactionList({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 py-16 text-center">
        <CreditCard size={32} className="text-gray-300" />
        <p className="mt-3 text-sm font-medium text-gray-900">No transactions yet</p>
        <p className="mt-1 text-sm text-gray-500">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden sm:block overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 font-medium text-gray-500">Description</th>
                <th className="px-4 py-3 font-medium text-gray-500">Category</th>
                <th className="px-4 py-3 font-medium text-gray-500">Date</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">Amount</th>
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
                      className="font-medium text-gray-900 hover:text-[#6b7b6b]"
                    >
                      {t.description}
                    </Link>
                    {t.notes && (
                      <p className="mt-0.5 text-xs text-gray-400 truncate max-w-xs">{t.notes}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                      <CategoryIcon category={t.category} size={13} />
                      {t.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{formatDate(t.date)}</td>
                  <td className={`px-4 py-3 text-right font-semibold ${
                    t.type === 'income' ? 'text-[#6b8f71]' : 'text-[#c4727f]'
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
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                <CategoryIcon category={t.category} size={15} className="text-gray-500" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{t.description}</p>
                <p className="text-xs text-gray-400">{formatDate(t.date)}</p>
              </div>
            </div>
            <span className={`ml-3 shrink-0 text-sm font-semibold ${
              t.type === 'income' ? 'text-[#6b8f71]' : 'text-[#c4727f]'
            }`}>
              {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
