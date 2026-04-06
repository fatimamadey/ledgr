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
        <h3 className="mb-4 text-sm font-medium text-gray-500">Income vs Expenses</h3>
        <div className="flex h-48 items-center justify-center text-sm text-gray-400">
          No data for the past 6 months
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="mb-4 text-sm font-medium text-gray-500">Income vs Expenses (Last 6 Months)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#6b7280' }} />
            <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(v) => `$${v}`} />
            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                fontSize: '13px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} animationDuration={800} />
            <Bar dataKey="expenses" name="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} animationDuration={800} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
