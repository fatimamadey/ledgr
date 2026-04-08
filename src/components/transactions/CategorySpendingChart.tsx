'use client';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useCategorySpendingOverTime } from '@/store/selectors';
import { Category } from '@/lib/types';
import { CATEGORY_COLORS } from '@/lib/constants';
import { getMonthLabel, formatCurrency } from '@/lib/utils';

export default function CategorySpendingChart({ category }: { category: Category }) {
  const data = useCategorySpendingOverTime(category, 6);

  const chartData = data.map((d) => ({
    ...d,
    label: getMonthLabel(d.month),
  }));

  const hasData = data.some((d) => d.amount > 0);

  if (!hasData) {
    return (
      <div className="flex h-32 items-center justify-center text-xs text-muted-light">
        No spending history for {category}
      </div>
    );
  }

  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'var(--muted-light)' }} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--muted-light)' }} tickFormatter={(v) => `$${v}`} width={50} />
          <Tooltip
            formatter={(value) => formatCurrency(Number(value))}
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              color: 'var(--foreground)',
              fontSize: '12px',
            }}
          />
          <Bar
            dataKey="amount"
            fill={CATEGORY_COLORS[category]}
            radius={[4, 4, 0, 0]}
            animationDuration={600}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
