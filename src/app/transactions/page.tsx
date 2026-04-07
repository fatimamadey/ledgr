'use client';

import { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import TransactionForm from '@/components/transactions/TransactionForm';
import TransactionList from '@/components/transactions/TransactionList';
import TransactionFilters, { TransactionFilterState } from '@/components/transactions/TransactionFilters';
import UploadModal from '@/components/upload/UploadModal';
import { useFilteredTransactions } from '@/hooks/useFilteredTransactions';

export default function TransactionsPage() {
  const [showForm, setShowForm] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [filters, setFilters] = useState<TransactionFilterState>({
    search: '',
    category: 'all',
    type: 'all',
    dateFrom: '',
    dateTo: '',
  });

  const transactions = useFilteredTransactions(filters);

  return (
    <PageContainer
      title="Transactions"
      subtitle="View and manage your transactions"
      action={
        <div className="flex gap-2">
          <button
            onClick={() => setShowUpload(true)}
            className="rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-200"
          >
            Import CSV
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            {showForm ? 'Hide Form' : '+ Add Transaction'}
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {showForm && (
          <div className="max-w-md">
            <TransactionForm onClose={() => setShowForm(false)} />
          </div>
        )}

        <TransactionFilters filters={filters} onChange={setFilters} />

        <TransactionList transactions={transactions} />

        <p className="text-center text-xs text-gray-400">
          {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
        </p>
      </div>

      <UploadModal open={showUpload} onClose={() => setShowUpload(false)} />
    </PageContainer>
  );
}
