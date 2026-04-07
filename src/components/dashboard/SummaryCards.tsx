'use client';

import Card from '@/components/ui/Card';
import AnimatedNumber from '@/components/ui/AnimatedNumber';
import { useTotalBalance, useMonthlyIncome, useMonthlyExpenses } from '@/store/selectors';

export default function SummaryCards() {
  const balance = useTotalBalance();
  const income = useMonthlyIncome();
  const expenses = useMonthlyExpenses();

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card hover>
        <p className="text-sm font-medium text-gray-500">Total Balance</p>
        <AnimatedNumber
          value={balance}
          className={`mt-1 text-2xl font-bold ${balance >= 0 ? 'text-gray-900' : 'text-[#b8606d]'}`}
        />
      </Card>

      <Card hover>
        <p className="text-sm font-medium text-gray-500">Income This Month</p>
        <AnimatedNumber
          value={income}
          className="mt-1 text-2xl font-bold text-[#6b8f71]"
        />
      </Card>

      <Card hover>
        <p className="text-sm font-medium text-gray-500">Expenses This Month</p>
        <AnimatedNumber
          value={expenses}
          className="mt-1 text-2xl font-bold text-[#b8606d]"
        />
      </Card>
    </div>
  );
}
