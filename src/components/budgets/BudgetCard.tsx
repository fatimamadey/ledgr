'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Budget } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import CategoryIcon from '@/components/ui/CategoryIcon';
import { useBudgetProgress } from '@/store/selectors';
import { useLedgrStore } from '@/store';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import Badge from '@/components/ui/Badge';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

export default function BudgetCard({ budget }: { budget: Budget }) {
  const progress = useBudgetProgress(budget.category);
  const deleteBudget = useLedgrStore((s) => s.deleteBudget);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!progress) return null;

  const { spent, percentage, remaining } = progress;

  const getStatus = () => {
    if (percentage >= 100) return { label: 'Over Budget', variant: 'danger' as const, barColor: 'bg-[#c4727f]' };
    if (percentage >= 75) return { label: 'Warning', variant: 'warning' as const, barColor: 'bg-amber-500' };
    return { label: 'On Track', variant: 'success' as const, barColor: 'bg-[#6b8f71]' };
  };

  const status = getStatus();

  return (
    <Card hover>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
            <CategoryIcon category={budget.category} size={15} className="text-gray-500" />
          </div>
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
          <span className={remaining >= 0 ? 'text-gray-500' : 'text-[#b8606d] font-medium'}>
            {remaining >= 0
              ? `${formatCurrency(remaining)} remaining`
              : `${formatCurrency(Math.abs(remaining))} over`}
          </span>
          <span className="text-gray-400">{Math.round(percentage)}%</span>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="text-xs text-gray-400 hover:text-[#c4727f]"
        >
          Remove budget
        </button>
      </div>

      <ConfirmDialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          deleteBudget(budget.id);
          toast.success('Budget removed');
        }}
        title="Remove budget?"
        message={`This will remove the ${budget.category} budget limit.`}
      />
    </Card>
  );
}
