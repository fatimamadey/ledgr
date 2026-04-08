'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useLedgrStore } from '@/store';
import { CATEGORIES } from '@/lib/constants';
import { Category, TransactionType } from '@/lib/types';
import Card from '@/components/ui/Card';

export default function TransactionForm({ onClose }: { onClose?: () => void }) {
  const addTransaction = useLedgrStore((s) => s.addTransaction);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<Category>('Other');
  const [type, setType] = useState<TransactionType>('expense');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !date) return;

    addTransaction({
      description,
      amount: parseFloat(amount),
      date,
      category,
      type,
      notes: notes || undefined,
    });

    setDescription('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setCategory('Other');
    setType('expense');
    setNotes('');
    toast.success('Transaction added');
    onClose?.();
  };

  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold text-foreground">Add Transaction</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type toggle */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              type === 'expense'
                ? 'bg-[#f8eced] text-[#a85060] ring-1 ring-[#e0b4b9]'
                : 'bg-surface-hover text-muted hover:bg-border-light'
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              type === 'income'
                ? 'bg-[#eef3ee] text-[#5a7d5f] ring-1 ring-[#b8d4ba]'
                : 'bg-surface-hover text-muted hover:bg-border-light'
            }`}
          >
            Income
          </button>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Grocery shopping"
            required
            autoFocus
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              min="0.01"
              step="0.01"
              required
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional details..."
            rows={2}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-[#5c6b5c] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4d5c4d]"
          >
            Add Transaction
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </Card>
  );
}
