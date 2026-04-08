'use client';

import { useState } from 'react';
import { Target } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import BudgetForm from '@/components/budgets/BudgetForm';
import BudgetCard from '@/components/budgets/BudgetCard';
import { useLedgrStore } from '@/store';

export default function BudgetsPage() {
  const budgets = useLedgrStore((s) => s.budgets);
  const [showForm, setShowForm] = useState(false);

  return (
    <PageContainer
      title="Budgets"
      subtitle="Set spending limits by category"
      action={
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-[#5c6b5c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4d5c4d]"
        >
          {showForm ? 'Hide Form' : '+ Set Budget'}
        </button>
      }
    >
      <div className="space-y-6">
        {showForm && (
          <div className="max-w-md">
            <BudgetForm onClose={() => setShowForm(false)} />
          </div>
        )}

        {budgets.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border py-16 text-center">
            <Target size={32} className="text-muted-light" />
            <p className="mt-3 text-sm font-medium text-foreground">No budgets set</p>
            <p className="mt-1 text-sm text-muted">
              Set a monthly spending limit for a category to start tracking
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {budgets.map((budget) => (
              <BudgetCard key={budget.id} budget={budget} />
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
