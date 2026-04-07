'use client';

import { Search } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import { Category, TransactionType } from '@/lib/types';

export interface TransactionFilterState {
  search: string;
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
  const hasFilters = filters.search || filters.category !== 'all' || filters.type !== 'all' || filters.dateFrom || filters.dateTo;

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search transactions..."
          className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600"
        />
      </div>

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
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => onChange({ ...filters, dateFrom: e.target.value })}
          aria-label="From date"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600"
        />

        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => onChange({ ...filters, dateTo: e.target.value })}
          aria-label="To date"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600"
        />

        {hasFilters && (
          <button
            onClick={() => onChange({ search: '', category: 'all', type: 'all', dateFrom: '', dateTo: '' })}
            className="text-sm text-[#5c6b5c] hover:text-[#4d5c4d]"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
