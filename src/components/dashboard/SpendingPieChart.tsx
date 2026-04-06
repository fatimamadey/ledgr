'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Card from '@/components/ui/Card';
import { useCategorySpending } from '@/store/selectors';
import { CATEGORY_COLORS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import { Category } from '@/lib/types';

export default function SpendingPieChart() {
  const spending = useCategorySpending();

  if (spending.length === 0) {
    return (
      <Card>
        <h3 className="mb-4 text-sm font-medium text-gray-500">Spending by Category</h3>
        <div className="flex h-48 items-center justify-center text-sm text-gray-400">
          No expense data this month
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="mb-4 text-sm font-medium text-gray-500">Spending by Category</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={spending}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="amount"
              nameKey="category"
              animationDuration={800}
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
                border: '1px solid #e5e7eb',
                fontSize: '13px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 flex flex-wrap gap-3">
        {spending.map((entry) => (
          <div key={entry.category} className="flex items-center gap-1.5 text-xs text-gray-600">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: CATEGORY_COLORS[entry.category as Category] }}
            />
            {entry.category}
          </div>
        ))}
      </div>
    </Card>
  );
}
