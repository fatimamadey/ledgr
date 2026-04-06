'use client';

import { use } from 'react';
import Link from 'next/link';
import PageContainer from '@/components/layout/PageContainer';
import Card from '@/components/ui/Card';
import CategorySpendingChart from '@/components/transactions/CategorySpendingChart';
import { useTransactionById, useSimilarTransactions } from '@/store/selectors';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '@/lib/constants';

export default function TransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const transaction = useTransactionById(id);
  const similar = useSimilarTransactions(id, transaction?.category ?? 'Other', 5);

  if (!transaction) {
    return (
      <PageContainer title="Transaction Not Found">
        <Card>
          <div className="py-12 text-center">
            <span className="text-4xl">🔍</span>
            <p className="mt-3 text-sm font-medium text-gray-900">Transaction not found</p>
            <p className="mt-1 text-sm text-gray-500">
              This transaction may have been deleted.
            </p>
            <Link
              href="/transactions"
              className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Back to Transactions
            </Link>
          </div>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={transaction.description}
      action={
        <Link
          href="/transactions"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Back
        </Link>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main detail */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{CATEGORY_ICONS[transaction.category]}</span>
                  <h2 className="text-xl font-bold text-gray-900">{transaction.description}</h2>
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: CATEGORY_COLORS[transaction.category] + '15',
                      color: CATEGORY_COLORS[transaction.category],
                    }}
                  >
                    {transaction.category}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {formatDate(transaction.date)}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      transaction.type === 'income'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {transaction.type === 'income' ? 'Income' : 'Expense'}
                  </span>
                </div>
              </div>
              <span
                className={`text-2xl font-bold ${
                  transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </span>
            </div>

            {transaction.notes && (
              <div className="mt-4 rounded-lg bg-gray-50 p-3">
                <p className="text-xs font-medium text-gray-500">Notes</p>
                <p className="mt-1 text-sm text-gray-700">{transaction.notes}</p>
              </div>
            )}
          </Card>

          {/* Category spending chart */}
          <Card>
            <h3 className="mb-3 text-sm font-medium text-gray-500">
              {transaction.category} Spending (Last 6 Months)
            </h3>
            <CategorySpendingChart category={transaction.category} />
          </Card>
        </div>

        {/* Similar transactions sidebar */}
        <div>
          <Card>
            <h3 className="mb-3 text-sm font-medium text-gray-500">
              Similar Transactions
            </h3>
            {similar.length === 0 ? (
              <p className="py-4 text-center text-xs text-gray-400">
                No similar transactions found
              </p>
            ) : (
              <div className="space-y-2">
                {similar.map((t) => (
                  <Link
                    key={t.id}
                    href={`/transactions/${t.id}`}
                    className="flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-gray-50"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{t.description}</p>
                      <p className="text-xs text-gray-400">{formatDate(t.date)}</p>
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        t.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                      }`}
                    >
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
