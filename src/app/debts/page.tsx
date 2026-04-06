'use client';

import { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import DebtForm from '@/components/debts/DebtForm';
import DebtCard from '@/components/debts/DebtCard';
import { useLedgrStore } from '@/store';
import { formatCurrency } from '@/lib/utils';

export default function DebtsPage() {
  const debts = useLedgrStore((s) => s.debts);
  const [showForm, setShowForm] = useState(false);

  const totalOwed = debts
    .filter((d) => d.direction === 'owed_to')
    .reduce((acc, d) => acc + (d.totalAmount - d.paidAmount), 0);

  const totalOwedToMe = debts
    .filter((d) => d.direction === 'owed_from')
    .reduce((acc, d) => acc + (d.totalAmount - d.paidAmount), 0);

  return (
    <PageContainer
      title="Debts"
      subtitle="Track what you owe and what's owed to you"
      action={
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          {showForm ? 'Hide Form' : '+ Add Debt'}
        </button>
      }
    >
      <div className="space-y-6">
        {showForm && (
          <div className="max-w-md">
            <DebtForm onClose={() => setShowForm(false)} />
          </div>
        )}

        {debts.length > 0 && (
          <div className="flex gap-4 text-sm">
            <span className="text-gray-500">
              Total owed: <span className="font-semibold text-red-600">{formatCurrency(totalOwed)}</span>
            </span>
            <span className="text-gray-500">
              Owed to me: <span className="font-semibold text-emerald-600">{formatCurrency(totalOwedToMe)}</span>
            </span>
          </div>
        )}

        {debts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 py-16 text-center">
            <span className="text-4xl">📋</span>
            <p className="mt-3 text-sm font-medium text-gray-900">No debts tracked</p>
            <p className="mt-1 text-sm text-gray-500">Add your first debt to start tracking</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {debts.map((debt) => (
              <DebtCard key={debt.id} debt={debt} />
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
