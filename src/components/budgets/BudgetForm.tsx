'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useLedgrStore } from '@/store';
import { CATEGORIES } from '@/lib/constants';
import { Category } from '@/lib/types';
import Card from '@/components/ui/Card';

export default function BudgetForm({ onClose }: { onClose?: () => void }) {
  const budgets = useLedgrStore((s) => s.budgets);
  const setBudget = useLedgrStore((s) => s.setBudget);
  const [category, setCategory] = useState<Category>('Food');
  const [monthlyLimit, setMonthlyLimit] = useState('');

  const existingCategories = new Set(budgets.map((b) => b.category));
  const availableCategories = CATEGORIES.filter(
    (c) => c !== 'Income' && !existingCategories.has(c)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!monthlyLimit) return;

    setBudget({ category, monthlyLimit: parseFloat(monthlyLimit) });
    setMonthlyLimit('');
    toast.success('Budget set for ' + category);
    onClose?.();
  };

  if (availableCategories.length === 0) {
    return (
      <Card>
        <p className="text-sm text-muted">All categories have budgets set.</p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold text-foreground">Set Budget</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-surface text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          >
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Monthly Limit</label>
          <input
            type="number"
            value={monthlyLimit}
            onChange={(e) => setMonthlyLimit(e.target.value)}
            placeholder="0.00"
            min="1"
            step="0.01"
            required
            className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-surface text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-[#5c6b5c] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4d5c4d]"
          >
            Set Budget
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
