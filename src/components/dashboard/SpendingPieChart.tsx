'use client';

import { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Card from '@/components/ui/Card';
import { useCategorySpending } from '@/store/selectors';
import { CATEGORY_COLORS } from '@/lib/constants';
import { formatCurrency, getLastNMonths, getMonthLabelLong } from '@/lib/utils';
import { Category } from '@/lib/types';

export default function SpendingPieChart() {
  const months = useMemo(() => getLastNMonths(6), []);
  const [index, setIndex] = useState(months.length - 1); // start on current month

  const month = months[index];
  const spending = useCategorySpending(month);

  const monthLabel = getMonthLabelLong(month);

  const canPrev = index > 0;
  const canNext = index < months.length - 1;

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted">Spending by Category</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIndex((i) => i - 1)}
            disabled={!canPrev}
            className="rounded-md p-1 text-muted-light transition-colors hover:bg-surface-hover hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-light"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="min-w-[120px] text-center text-xs font-medium text-foreground">
            {monthLabel}
          </span>
          <button
            onClick={() => setIndex((i) => i + 1)}
            disabled={!canNext}
            className="rounded-md p-1 text-muted-light transition-colors hover:bg-surface-hover hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-light"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {spending.length === 0 ? (
        <div className="flex h-48 items-center justify-center text-sm text-muted-light">
          No expense data for {monthLabel}
        </div>
      ) : (
        <>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  key={month}
                  data={spending}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="amount"
                  nameKey="category"
                  animationDuration={500}
                >
                  {spending.map((entry) => (
                    <Cell
                      key={entry.category}
                      fill={CATEGORY_COLORS[entry.category as Category]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)',
                    color: 'var(--foreground)',
                    fontSize: '13px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap gap-3">
            {spending.map((entry) => (
              <div key={entry.category} className="flex items-center gap-1.5 text-xs text-muted">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[entry.category as Category] }}
                />
                {entry.category}: {formatCurrency(entry.amount)}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Dot indicators */}
      <div className="mt-3 flex justify-center gap-1.5">
        {months.map((m, i) => (
          <button
            key={m}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-4 bg-accent' : 'w-1.5 bg-muted-light hover:bg-muted'
            }`}
          />
        ))}
      </div>
    </Card>
  );
}
