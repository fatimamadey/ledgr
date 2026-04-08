'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Debt } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useLedgrStore } from '@/store';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

export default function DebtCard({ debt }: { debt: Debt }) {
  const updateDebt = useLedgrStore((s) => s.updateDebt);
  const deleteDebt = useLedgrStore((s) => s.deleteDebt);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const percentage = debt.totalAmount > 0 ? (debt.paidAmount / debt.totalAmount) * 100 : 0;
  const remaining = debt.totalAmount - debt.paidAmount;
  const isPaidOff = remaining <= 0;

  const handlePayment = () => {
    const amount = parseFloat(paymentAmount);
    if (!amount || amount <= 0) return;
    updateDebt(debt.id, { paidAmount: Math.min(debt.paidAmount + amount, debt.totalAmount) });
    setPaymentAmount('');
    setShowPayment(false);
    toast.success(`Payment of $${amount.toFixed(2)} recorded`);
  };

  return (
    <Card hover>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-foreground">{debt.name}</h3>
          <p className="mt-0.5 text-xs text-muted">
            {debt.direction === 'owed_to' ? 'Owed to' : 'Owed by'}{' '}
            <span className="font-medium">{debt.counterparty}</span>
          </p>
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            debt.direction === 'owed_to'
              ? 'bg-[#f8eced] text-[#a85060]'
              : 'bg-[#eef3ee] text-[#5a7d5f]'
          }`}
        >
          {debt.direction === 'owed_to' ? 'I owe' : 'Owed to me'}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-end justify-between text-sm">
          <span className="font-semibold text-foreground">
            {formatCurrency(debt.paidAmount)}
          </span>
          <span className="text-muted-light">of {formatCurrency(debt.totalAmount)}</span>
        </div>
        <ProgressBar
          percentage={percentage}
          color={isPaidOff ? 'bg-[#6b8f71]' : 'bg-[#5c6b5c]'}
          className="mt-2"
        />
        <div className="mt-1.5 flex items-center justify-between text-xs">
          <span className={isPaidOff ? 'text-[#6b8f71] font-medium' : 'text-muted'}>
            {isPaidOff ? 'Paid off!' : `${formatCurrency(remaining)} remaining`}
          </span>
          <span className="text-muted-light">{Math.round(percentage)}%</span>
        </div>
      </div>

      {debt.dueDate && (
        <p className="mt-3 text-xs text-muted-light">Due: {formatDate(debt.dueDate)}</p>
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
                  className="w-full rounded-lg border border-border px-2 py-1.5 text-sm bg-surface text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <button
                  onClick={handlePayment}
                  className="rounded-lg bg-[#6b8f71] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#5a7d5f]"
                >
                  Pay
                </button>
                <button
                  onClick={() => setShowPayment(false)}
                  className="text-xs text-muted-light hover:text-foreground"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowPayment(true)}
                className="rounded-lg border border-[#b8d4ba] bg-[#eef3ee] px-3 py-1.5 text-xs font-medium text-[#5a7d5f] hover:bg-[#dce8dd]"
              >
                Make Payment
              </button>
            )}
          </>
        )}
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="ml-auto text-xs text-muted-light hover:text-[#c4727f]"
        >
          Delete
        </button>
      </div>

      <ConfirmDialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          deleteDebt(debt.id);
          toast.success('Debt deleted');
        }}
        title="Delete debt?"
        message={`This will permanently remove "${debt.name}". This action cannot be undone.`}
      />
    </Card>
  );
}
