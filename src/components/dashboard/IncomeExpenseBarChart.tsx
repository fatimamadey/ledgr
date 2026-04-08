'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '@/components/ui/Card';
import { useMonthlyIncomeExpense } from '@/store/selectors';
import { getMonthLabel, formatCurrency } from '@/lib/utils';

export default function IncomeExpenseBarChart() {
  const data = useMonthlyIncomeExpense(6);

  const chartData = data.map((d) => ({
    ...d,
    label: getMonthLabel(d.month),
  }));

  const hasData = data.some((d) => d.income > 0 || d.expenses > 0);

  if (!hasData) {
    return (
      <Card>
        <h3 className="mb-4 text-sm font-medium text-muted">Income vs Expenses</h3>
        <div className="flex h-48 items-center justify-center text-sm text-muted-light">
          No data for the past 6 months
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="mb-4 text-sm font-medium text-muted">Income vs Expenses (Last 6 Months)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: 'var(--muted)' }} />
            <YAxis tick={{ fontSize: 12, fill: 'var(--muted)' }} tickFormatter={(v) => `$${v}`} />
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
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="income" name="Income" fill="#6b8f71" radius={[4, 4, 0, 0]} animationDuration={800} />
            <Bar dataKey="expenses" name="Expenses" fill="#c4727f" radius={[4, 4, 0, 0]} animationDuration={800} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
