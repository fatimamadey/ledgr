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
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-light" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search transactions..."
          className="w-full rounded-lg border border-border py-2 pl-9 pr-3 text-sm bg-surface text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filters.type}
          onChange={(e) => onChange({ ...filters, type: e.target.value as TransactionType | 'all' })}
          className="rounded-lg border border-border px-3 py-2 text-sm bg-surface text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option value="all">All Types</option>
          <option value="expense">Expenses</option>
          <option value="income">Income</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value as Category | 'all' })}
          className="rounded-lg border border-border px-3 py-2 text-sm bg-surface text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
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
          className="rounded-lg border border-border px-3 py-2 text-sm bg-surface text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />

        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => onChange({ ...filters, dateTo: e.target.value })}
          aria-label="To date"
          className="rounded-lg border border-border px-3 py-2 text-sm bg-surface text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />

        {hasFilters && (
          <button
            onClick={() => onChange({ search: '', category: 'all', type: 'all', dateFrom: '', dateTo: '' })}
            className="text-sm text-accent hover:opacity-80"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
