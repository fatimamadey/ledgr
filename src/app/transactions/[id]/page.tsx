'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import PageContainer from '@/components/layout/PageContainer';
import Card from '@/components/ui/Card';
import CategoryIcon from '@/components/ui/CategoryIcon';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import CategorySpendingChart from '@/components/transactions/CategorySpendingChart';
import { useTransactionById, useSimilarTransactions } from '@/store/selectors';
import { useLedgrStore } from '@/store';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CATEGORIES, CATEGORY_COLORS } from '@/lib/constants';
import { Category, TransactionType } from '@/lib/types';

export default function TransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const transaction = useTransactionById(id);
  const similar = useSimilarTransactions(id, transaction?.category ?? 'Other', 5);
  const updateTransaction = useLedgrStore((s) => s.updateTransaction);
  const deleteTransaction = useLedgrStore((s) => s.deleteTransaction);

  const [editing, setEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Edit form state
  const [editDesc, setEditDesc] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editCategory, setEditCategory] = useState<Category>('Other');
  const [editType, setEditType] = useState<TransactionType>('expense');
  const [editNotes, setEditNotes] = useState('');

  const startEdit = () => {
    if (!transaction) return;
    setEditDesc(transaction.description);
    setEditAmount(String(transaction.amount));
    setEditDate(transaction.date);
    setEditCategory(transaction.category);
    setEditType(transaction.type);
    setEditNotes(transaction.notes ?? '');
    setEditing(true);
  };

  const saveEdit = () => {
    if (!editDesc || !editAmount || !editDate) return;
    updateTransaction(id, {
      description: editDesc,
      amount: parseFloat(editAmount),
      date: editDate,
      category: editCategory,
      type: editType,
      notes: editNotes || undefined,
    });
    setEditing(false);
    toast.success('Transaction updated');
  };

  const handleDelete = () => {
    deleteTransaction(id);
    toast.success('Transaction deleted');
    router.push('/transactions');
  };

  if (!transaction) {
    return (
      <PageContainer title="Transaction Not Found">
        <Card>
          <div className="py-12 text-center">
            <Search size={32} className="mx-auto text-muted-light" />
            <p className="mt-3 text-sm font-medium text-foreground">Transaction not found</p>
            <p className="mt-1 text-sm text-muted">This transaction may have been deleted.</p>
            <Link href="/transactions" className="mt-4 inline-block text-sm font-medium text-accent hover:text-[#4d5c4d]">
              Back to Transactions
            </Link>
          </div>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={editing ? 'Edit Transaction' : transaction.description}
      action={
        <div className="flex gap-2">
          {!editing && (
            <>
              <button
                onClick={startEdit}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-hover"
              >
                <Pencil size={14} />
                Edit
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#e0b4b9] px-3 py-2 text-sm font-medium text-[#b8606d] hover:bg-[#f8eced]"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </>
          )}
          <Link
            href="/transactions"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-hover"
          >
            <ArrowLeft size={14} />
            Back
          </Link>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {editing ? (
            <Card>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <button type="button" onClick={() => setEditType('expense')}
                    className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${editType === 'expense' ? 'bg-[#f8eced] text-[#a85060] ring-1 ring-[#e0b4b9]' : 'bg-surface-hover text-muted hover:bg-border-light'}`}>
                    Expense
                  </button>
                  <button type="button" onClick={() => setEditType('income')}
                    className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${editType === 'income' ? 'bg-[#eef3ee] text-[#5a7d5f] ring-1 ring-[#b8d4ba]' : 'bg-surface-hover text-muted hover:bg-border-light'}`}>
                    Income
                  </button>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Description</label>
                  <input type="text" value={editDesc} onChange={(e) => setEditDesc(e.target.value)}
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-surface text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Amount</label>
                    <input type="number" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} min="0.01" step="0.01"
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-surface text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Date</label>
                    <input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)}
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-surface text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Category</label>
                  <select value={editCategory} onChange={(e) => setEditCategory(e.target.value as Category)}
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-surface text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">
                    {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Notes</label>
                  <textarea value={editNotes} onChange={(e) => setEditNotes(e.target.value)} rows={2}
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-surface text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
                </div>
                <div className="flex gap-2">
                  <button onClick={saveEdit}
                    className="rounded-lg bg-[#5c6b5c] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#4d5c4d]">
                    Save Changes
                  </button>
                  <button onClick={() => setEditing(false)}
                    className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-surface-hover">
                    Cancel
                  </button>
                </div>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-border-light">
                      <CategoryIcon category={transaction.category} size={18} className="text-muted" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">{transaction.description}</h2>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
                      style={{ backgroundColor: CATEGORY_COLORS[transaction.category] + '18', color: CATEGORY_COLORS[transaction.category] }}>
                      {transaction.category}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-border-light px-3 py-1 text-xs font-medium text-muted">
                      {formatDate(transaction.date)}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${transaction.type === 'income' ? 'bg-[#eef3ee] text-[#5a7d5f]' : 'bg-[#f8eced] text-[#b8606d]'}`}>
                      {transaction.type === 'income' ? 'Income' : 'Expense'}
                    </span>
                  </div>
                </div>
                <span className={`text-2xl font-bold ${transaction.type === 'income' ? 'text-income' : 'text-expense'}`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
              </div>
              {transaction.notes && (
                <div className="mt-4 rounded-lg bg-surface-hover p-3">
                  <p className="text-xs font-medium text-muted">Notes</p>
                  <p className="mt-1 text-sm text-foreground">{transaction.notes}</p>
                </div>
              )}
            </Card>
          )}

          <Card>
            <h3 className="mb-3 text-sm font-medium text-muted">
              {transaction.category} Spending (Last 6 Months)
            </h3>
            <CategorySpendingChart category={transaction.category} />
          </Card>
        </div>

        <div>
          <Card>
            <h3 className="mb-3 text-sm font-medium text-muted">Similar Transactions</h3>
            {similar.length === 0 ? (
              <p className="py-4 text-center text-xs text-muted-light">No similar transactions found</p>
            ) : (
              <div className="space-y-2">
                {similar.map((t) => (
                  <Link key={t.id} href={`/transactions/${t.id}`}
                    className="flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-surface-hover">
                    <div>
                      <p className="text-sm font-medium text-foreground">{t.description}</p>
                      <p className="text-xs text-muted-light">{formatDate(t.date)}</p>
                    </div>
                    <span className={`text-sm font-semibold ${t.type === 'income' ? 'text-income' : 'text-expense'}`}>
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete transaction?"
        message={`This will permanently delete "${transaction.description}". This action cannot be undone.`}
      />
    </PageContainer>
  );
}
