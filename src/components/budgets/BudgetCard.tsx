'use client';

import { Budget } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { CATEGORY_ICONS } from '@/lib/constants';
import { useBudgetProgress } from '@/store/selectors';
import { useLedgrStore } from '@/store';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import Badge from '@/components/ui/Badge';

export default function BudgetCard({ budget }: { budget: Budget }) {
  const progress = useBudgetProgress(budget.category);
  const deleteBudget = useLedgrStore((s) => s.deleteBudget);

  if (!progress) return null;

  const { spent, percentage, remaining } = progress;

  const getStatus = () => {
    if (percentage >= 100) return { label: 'Over Budget', variant: 'danger' as const, barColor: 'bg-red-500' };
    if (percentage >= 75) return { label: 'Warning', variant: 'warning' as const, barColor: 'bg-amber-500' };
    return { label: 'On Track', variant: 'success' as const, barColor: 'bg-emerald-500' };
  };

  const status = getStatus();

  return (
    <Card hover>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{CATEGORY_ICONS[budget.category]}</span>
          <h3 className="font-semibold text-gray-900">{budget.category}</h3>
        </div>
        <Badge label={status.label} variant={status.variant} />
      </div>

      <div className="mt-4">
        <div className="flex items-end justify-between text-sm">
          <span className="font-semibold text-gray-900">{formatCurrency(spent)}</span>
          <span className="text-gray-400">of {formatCurrency(budget.monthlyLimit)}</span>
        </div>
        <ProgressBar percentage={percentage} color={status.barColor} className="mt-2" />
        <div className="mt-1.5 flex items-center justify-between text-xs">
          <span className={remaining >= 0 ? 'text-gray-500' : 'text-red-600 font-medium'}>
            {remaining >= 0
              ? `${formatCurrency(remaining)} remaining`
              : `${formatCurrency(Math.abs(remaining))} over`}
          </span>
          <span className="text-gray-400">{Math.round(percentage)}%</span>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => deleteBudget(budget.id)}
          className="text-xs text-gray-400 hover:text-red-500"
        >
          Remove budget
        </button>
      </div>
    </Card>
  );
}
