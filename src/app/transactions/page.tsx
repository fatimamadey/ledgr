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
            className="rounded-lg border border-border bg-surface-hover px-4 py-2 text-sm font-medium text-accent transition-colors hover:opacity-80"
          >
            Import CSV
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-[#5c6b5c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4d5c4d]"
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

        <p className="text-center text-xs text-muted-light">
          {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
        </p>
      </div>

      <UploadModal open={showUpload} onClose={() => setShowUpload(false)} />
    </PageContainer>
  );
}
