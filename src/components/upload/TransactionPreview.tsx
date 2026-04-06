'use client';

import { ParsedTransaction } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import Card from '@/components/ui/Card';

export default function TransactionPreview({
  transactions,
  onToggle,
  onConfirm,
  onCancel,
}: {
  transactions: ParsedTransaction[];
  onToggle: (index: number) => void;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const selected = transactions.filter((t) => t.selected);

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Preview ({selected.length} of {transactions.length} selected)
        </h3>
      </div>

      <div className="max-h-96 overflow-y-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-3 py-2 font-medium text-gray-600 w-10"></th>
              <th className="px-3 py-2 font-medium text-gray-600">Description</th>
              <th className="px-3 py-2 font-medium text-gray-600">Date</th>
              <th className="px-3 py-2 text-right font-medium text-gray-600">Amount</th>
              <th className="px-3 py-2 font-medium text-gray-600">Type</th>
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
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </td>
                <td className="px-3 py-2 text-gray-900">{t.description}</td>
                <td className="px-3 py-2 text-gray-500">{t.date}</td>
                <td className={`px-3 py-2 text-right font-semibold ${
                  t.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </td>
                <td className="px-3 py-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      t.type === 'income'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {t.type}
                  </span>
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
          className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
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
    </Card>
  );
}
