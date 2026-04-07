'use client';

import { CATEGORIES } from '@/lib/constants';
import { Category, TransactionType } from '@/lib/types';

export interface TransactionFilterState {
  category: Category | 'all';
  type: TransactionType | 'all';
  dateFrom: string;
  dateTo: string;
}

export default function TransactionFilters({
  filters,
  onChange,
}: {
  filters: TransactionFilterState;
  onChange: (filters: TransactionFilterState) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={filters.type}
        onChange={(e) => onChange({ ...filters, type: e.target.value as TransactionType | 'all' })}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600"
      >
        <option value="all">All Types</option>
        <option value="expense">Expenses</option>
        <option value="income">Income</option>
      </select>

      <select
        value={filters.category}
        onChange={(e) => onChange({ ...filters, category: e.target.value as Category | 'all' })}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600"
      >
        <option value="all">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={filters.dateFrom}
        onChange={(e) => onChange({ ...filters, dateFrom: e.target.value })}
        placeholder="From"
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600"
      />

      <input
        type="date"
        value={filters.dateTo}
        onChange={(e) => onChange({ ...filters, dateTo: e.target.value })}
        placeholder="To"
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600"
      />

      {(filters.category !== 'all' || filters.type !== 'all' || filters.dateFrom || filters.dateTo) && (
        <button
          onClick={() =>
            onChange({ category: 'all', type: 'all', dateFrom: '', dateTo: '' })
          }
          className="text-sm text-slate-700 hover:text-slate-800"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
