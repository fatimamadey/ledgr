'use client';

import PageContainer from '@/components/layout/PageContainer';
import SummaryCards from '@/components/dashboard/SummaryCards';
import SpendingPieChart from '@/components/dashboard/SpendingPieChart';
import IncomeExpenseBarChart from '@/components/dashboard/IncomeExpenseBarChart';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import { useLedgrStore } from '@/store';
import { generateSeedTransactions, generateSeedDebts, generateSeedBudgets } from '@/lib/seed';

export default function Dashboard() {
  const transactions = useLedgrStore((s) => s.transactions);
  const addTransactions = useLedgrStore((s) => s.addTransactions);
  const addDebt = useLedgrStore((s) => s.addDebt);
  const setBudget = useLedgrStore((s) => s.setBudget);

  const loadSeedData = () => {
    const seedTx = generateSeedTransactions();
    addTransactions(seedTx);
    generateSeedDebts().forEach((d) => addDebt(d));
    generateSeedBudgets().forEach((b) => setBudget(b));
  };

  return (
    <PageContainer
      title="Dashboard"
      subtitle="Your financial overview"
      action={
        transactions.length === 0 ? (
          <button
            onClick={loadSeedData}
            className="rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100"
          >
            Load Sample Data
          </button>
        ) : undefined
      }
    >
      <div className="space-y-6">
        <SummaryCards />

        <div className="grid gap-6 lg:grid-cols-2">
          <SpendingPieChart />
          <IncomeExpenseBarChart />
        </div>

        <RecentTransactions />
      </div>
    </PageContainer>
  );
}
