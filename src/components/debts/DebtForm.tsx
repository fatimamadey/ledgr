'use client';

import { useState } from 'react';
import { useLedgrStore } from '@/store';
import Card from '@/components/ui/Card';

export default function DebtForm({ onClose }: { onClose?: () => void }) {
  const addDebt = useLedgrStore((s) => s.addDebt);
  const [name, setName] = useState('');
  const [direction, setDirection] = useState<'owed_to' | 'owed_from'>('owed_to');
  const [counterparty, setCounterparty] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !counterparty || !totalAmount) return;

    addDebt({
      name,
      direction,
      counterparty,
      totalAmount: parseFloat(totalAmount),
      paidAmount: parseFloat(paidAmount) || 0,
      dueDate: dueDate || undefined,
    });

    setName('');
    setDirection('owed_to');
    setCounterparty('');
    setTotalAmount('');
    setPaidAmount('');
    setDueDate('');
    onClose?.();
  };

  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Add Debt</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setDirection('owed_to')}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              direction === 'owed_to'
                ? 'bg-red-50 text-red-700 ring-1 ring-red-200'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            I Owe
          </button>
          <button
            type="button"
            onClick={() => setDirection('owed_from')}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              direction === 'owed_from'
                ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            Owed to Me
          </button>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Debt Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Student Loan"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {direction === 'owed_to' ? 'Owed To' : 'Owed By'}
          </label>
          <input
            type="text"
            value={counterparty}
            onChange={(e) => setCounterparty(e.target.value)}
            placeholder="e.g. Sallie Mae"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Total Amount</label>
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              placeholder="0.00"
              min="0.01"
              step="0.01"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Already Paid</label>
            <input
              type="number"
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Due Date (optional)</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Add Debt
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </Card>
  );
}
