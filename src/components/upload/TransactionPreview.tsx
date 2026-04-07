'use client';

import { ParsedTransaction, Category, TransactionType } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

export default function TransactionPreview({
  transactions,
  onToggle,
  onUpdate,
  onConfirm,
  onCancel,
}: {
  transactions: ParsedTransaction[];
  onToggle: (index: number) => void;
  onUpdate: (index: number, field: 'category' | 'type', value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const selected = transactions.filter((t) => t.selected);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {selected.length} of {transactions.length} selected
        </p>
      </div>

      <div className="max-h-80 overflow-y-auto rounded-lg border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-3 py-2 font-medium text-gray-600 w-8"></th>
              <th className="px-3 py-2 font-medium text-gray-600">Description</th>
              <th className="px-3 py-2 font-medium text-gray-600">Date</th>
              <th className="px-3 py-2 text-right font-medium text-gray-600">Amount</th>
              <th className="px-3 py-2 font-medium text-gray-600">Type</th>
              <th className="px-3 py-2 font-medium text-gray-600">Category</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr
                key={i}
                className={`border-b border-gray-100 ${!t.selected ? 'opacity-40' : ''}`}
              >
                <td className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={t.selected}
                    onChange={() => onToggle(i)}
                    className="h-4 w-4 rounded border-gray-300 text-slate-700 focus:ring-slate-600"
                  />
                </td>
                <td className="px-3 py-2 text-gray-900 max-w-[180px] truncate">{t.description}</td>
                <td className="px-3 py-2 text-gray-500 whitespace-nowrap">{t.date}</td>
                <td className={`px-3 py-2 text-right font-semibold whitespace-nowrap ${
                  t.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </td>
                <td className="px-3 py-2">
                  <select
                    value={t.type}
                    onChange={(e) => onUpdate(i, 'type', e.target.value)}
                    className={`rounded border px-1.5 py-0.5 text-xs font-medium ${
                      t.type === 'income'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border-red-200 bg-red-50 text-red-700'
                    }`}
                  >
                    <option value="expense">expense</option>
                    <option value="income">income</option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <select
                    value={t.category}
                    onChange={(e) => onUpdate(i, 'category', e.target.value)}
                    className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-xs"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onConfirm}
          disabled={selected.length === 0}
          className="flex-1 rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Import {selected.length} Transaction{selected.length !== 1 ? 's' : ''}
        </button>
        <button
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
