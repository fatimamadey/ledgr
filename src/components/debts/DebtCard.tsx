'use client';

import { useState } from 'react';
import { Debt } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useLedgrStore } from '@/store';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';

export default function DebtCard({ debt }: { debt: Debt }) {
  const updateDebt = useLedgrStore((s) => s.updateDebt);
  const deleteDebt = useLedgrStore((s) => s.deleteDebt);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  const percentage = debt.totalAmount > 0 ? (debt.paidAmount / debt.totalAmount) * 100 : 0;
  const remaining = debt.totalAmount - debt.paidAmount;
  const isPaidOff = remaining <= 0;

  const handlePayment = () => {
    const amount = parseFloat(paymentAmount);
    if (!amount || amount <= 0) return;
    updateDebt(debt.id, { paidAmount: Math.min(debt.paidAmount + amount, debt.totalAmount) });
    setPaymentAmount('');
    setShowPayment(false);
  };

  return (
    <Card hover>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{debt.name}</h3>
          <p className="mt-0.5 text-xs text-gray-500">
            {debt.direction === 'owed_to' ? 'Owed to' : 'Owed by'}{' '}
            <span className="font-medium">{debt.counterparty}</span>
          </p>
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            debt.direction === 'owed_to'
              ? 'bg-red-50 text-red-700'
              : 'bg-emerald-50 text-emerald-700'
          }`}
        >
          {debt.direction === 'owed_to' ? 'I owe' : 'Owed to me'}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-end justify-between text-sm">
          <span className="font-semibold text-gray-900">
            {formatCurrency(debt.paidAmount)}
          </span>
          <span className="text-gray-400">of {formatCurrency(debt.totalAmount)}</span>
        </div>
        <ProgressBar
          percentage={percentage}
          color={isPaidOff ? 'bg-emerald-500' : 'bg-indigo-600'}
          className="mt-2"
        />
        <div className="mt-1.5 flex items-center justify-between text-xs">
          <span className={isPaidOff ? 'text-emerald-600 font-medium' : 'text-gray-500'}>
            {isPaidOff ? 'Paid off!' : `${formatCurrency(remaining)} remaining`}
          </span>
          <span className="text-gray-400">{Math.round(percentage)}%</span>
        </div>
      </div>

      {debt.dueDate && (
        <p className="mt-3 text-xs text-gray-400">Due: {formatDate(debt.dueDate)}</p>
      )}

      <div className="mt-4 flex gap-2">
        {!isPaidOff && (
          <>
            {showPayment ? (
              <div className="flex flex-1 gap-2">
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Amount"
                  min="0.01"
                  step="0.01"
                  className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  onClick={handlePayment}
                  className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
                >
                  Pay
                </button>
                <button
                  onClick={() => setShowPayment(false)}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowPayment(true)}
                className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
              >
                Make Payment
              </button>
            )}
          </>
        )}
        <button
          onClick={() => deleteDebt(debt.id)}
          className="ml-auto text-xs text-gray-400 hover:text-red-500"
        >
          Delete
        </button>
      </div>
    </Card>
  );
}
